import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const token = request.cookies.get('auth-token')?.value
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    const userId = decoded.userId
    const userRole = decoded.role.toUpperCase()

    // Get user profile
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        stats: true
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    let dashboardData: any = {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role.toLowerCase(),
        avatar: user.avatar,
        profile: user.profile,
        stats: user.stats,
        lastActiveAt: user.lastActiveAt
      }
    }

    // Role-specific dashboard data
    if (userRole === 'CLIENT') {
      const [projects, totalSpentResult, activeProjects, completedProjects] = await Promise.all([
        prisma.project.findMany({
          where: { clientId: userId },
          include: {
            freelancer: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
                stats: {
                  select: {
                    rating: true,
                    reviewCount: true
                  }
                }
              }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 5
        }),
        prisma.project.aggregate({
          where: { clientId: userId, status: 'COMPLETED' },
          _sum: { totalPaid: true }
        }),
        prisma.project.count({
          where: { clientId: userId, status: { in: ['IN_PROGRESS', 'IN_REVIEW'] } }
        }),
        prisma.project.count({
          where: { clientId: userId, status: 'COMPLETED' }
        })
      ])

      dashboardData.client = {
        recentProjects: projects,
        totalProjectsPosted: await prisma.project.count({ where: { clientId: userId } }),
        activeProjects,
        totalSpent: totalSpentResult._sum.totalPaid || 0,
        completedProjects
      }

    } else if (userRole === 'FREELANCER') {
      const [projects, totalEarnedResult, activeProjects, completedProjects] = await Promise.all([
        prisma.project.findMany({
          where: { freelancerId: userId },
          include: {
            client: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true
              }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 5
        }),
        prisma.project.aggregate({
          where: { freelancerId: userId, status: 'COMPLETED' },
          _sum: { totalPaid: true }
        }),
        prisma.project.count({
          where: { freelancerId: userId, status: { in: ['IN_PROGRESS', 'IN_REVIEW'] } }
        }),
        prisma.project.count({
          where: { freelancerId: userId, status: 'COMPLETED' }
        })
      ])

      // Get available projects
      const availableProjects = await prisma.project.findMany({
        where: {
          status: 'OPEN',
          freelancerId: null
        },
        include: {
          client: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatar: true,
              stats: {
                select: {
                  rating: true,
                  reviewCount: true
                }
              }
            }
          },
          _count: {
            select: {
              proposals: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 10
      })

      // Get instructor courses
      const instructorCourses = await prisma.course.findMany({
        where: { instructorId: userId },
        orderBy: { createdAt: 'desc' },
        take: 3
      })

      dashboardData.freelancer = {
        recentProjects: projects,
        activeProjects,
        totalEarned: totalEarnedResult._sum.totalPaid || 0,
        completedProjects,
        availableProjects,
        profileViews: Math.floor(Math.random() * 100) + 50,
        proposalsSent: await prisma.proposal.count({ where: { freelancerId: userId } }),
        courses: instructorCourses.length > 0 ? instructorCourses : undefined
      }

    } else if (userRole === 'STUDENT') {
      const enrolledCourses = await prisma.enrollment.findMany({
        where: { userId },
        include: {
          course: {
            include: {
              instructor: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  avatar: true
                }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      })

      const completedCourses = enrolledCourses.filter((e: any) => e.completed).length

      // Get recommended courses based on user skills
      const recommendedCourses = await prisma.course.findMany({
        where: {
          isPublished: true,
          NOT: {
            enrollments: {
              some: {
                userId
              }
            }
          }
        },
        include: {
          instructor: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatar: true,
              stats: {
                select: {
                  rating: true,
                  reviewCount: true
                }
              }
            }
          }
        },
        orderBy: { ratingAverage: 'desc' },
        take: 6
      })

      dashboardData.student = {
        enrolledCourses: enrolledCourses.map((e: any) => e.course),
        recommendedCourses,
        completedCourses,
        totalHours: enrolledCourses.reduce((sum: number, e: any) => sum + (e.course.duration || 0), 0),
        certificates: enrolledCourses.filter((e: any) => e.completed && e.course.certificate),
        currentStreak: Math.floor(Math.random() * 30) + 1,
        nextGoal: 'Complete your first course'
      }

    } else if (userRole === 'ADMIN') {
      const [
        totalUsers,
        totalProjects,
        totalCourses,
        recentUsers,
        projectStats,
        courseStats
      ] = await Promise.all([
        prisma.user.count(),
        prisma.project.count(),
        prisma.course.count(),
        prisma.user.findMany({
          orderBy: { createdAt: 'desc' },
          take: 5,
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            createdAt: true,
            avatar: true
          }
        }),
        prisma.project.groupBy({
          by: ['status'],
          _count: { status: true },
          _sum: { budgetAmount: true }
        }),
        prisma.course.groupBy({
          by: ['category'],
          _count: { category: true },
          _sum: { enrollmentCount: true }
        })
      ])

      dashboardData.admin = {
        totalUsers,
        totalProjects,
        totalCourses,
        recentUsers,
        projectStats,
        courseStats,
        monthlyRevenue: Math.floor(Math.random() * 50000) + 25000,
        activeUsers: Math.floor(totalUsers * 0.7),
        systemHealth: 'healthy'
      }
    }

    // Add recent notifications
    dashboardData.notifications = [
      {
        id: '1',
        type: 'info',
        title: 'Welcome to CodeAxis!',
        message: 'Complete your profile to get started.',
        createdAt: new Date(),
        read: false
      }
    ]

    return NextResponse.json(dashboardData)

  } catch (error) {
    console.error('Dashboard error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    // Check if database is already initialized
    const userCount = await prisma.user.count()
    
    if (userCount > 0) {
      return NextResponse.json({
        message: 'Database already initialized',
        userCount
      })
    }

    // Hash password for all users
    const hashedPassword = await bcrypt.hash('password123', 12)

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        email: 'admin@codeaxis.com',
        password: await bcrypt.hash('admin123', 12),
        firstName: 'Admin',
        lastName: 'User',
        role: 'ADMIN',
        isVerified: true,
        profile: {
          create: {
            isComplete: true,
            bio: 'Platform administrator',
            skills: ['Management', 'Support']
          }
        },
        stats: {
          create: {
            totalProjects: 0,
            completedProjects: 0,
            totalHours: 0,
            rating: 5.0,
            reviewCount: 0
          }
        }
      }
    })

    // Create client users
    const client1 = await prisma.user.create({
      data: {
        email: 'client@example.com',
        password: await bcrypt.hash('client123', 12),
        firstName: 'John',
        lastName: 'Client',
        role: 'CLIENT',
        isVerified: true,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
        profile: {
          create: {
            isComplete: true,
            bio: 'Looking for talented developers',
            location: 'New York, USA',
            skills: ['Project Management']
          }
        },
        stats: {
          create: {
            totalProjects: 5,
            completedProjects: 3,
            totalHours: 0,
            rating: 4.8,
            reviewCount: 3
          }
        }
      }
    })

    // Create freelancer users
    const freelancers = await Promise.all([
      prisma.user.create({
        data: {
          email: 'sarah@example.com',
          password: hashedPassword,
          firstName: 'Sarah',
          lastName: 'Johnson',
          role: 'FREELANCER',
          isVerified: true,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
          profile: {
            create: {
              isComplete: true,
              bio: 'Full-stack developer with 5+ years of experience in React, Node.js, and cloud technologies.',
              location: 'San Francisco, USA',
              skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB'],
              experience: 'Senior',
              hourlyRate: 85,
              availability: 'AVAILABLE',
              timezone: 'PST',
              languages: ['English', 'Spanish']
            }
          },
          stats: {
            create: {
              totalProjects: 42,
              completedProjects: 40,
              totalHours: 1200,
              rating: 4.9,
              reviewCount: 38
            }
          }
        }
      }),
      prisma.user.create({
        data: {
          email: 'marcus@example.com',
          password: hashedPassword,
          firstName: 'Marcus',
          lastName: 'Chen',
          role: 'FREELANCER',
          isVerified: true,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
          profile: {
            create: {
              isComplete: true,
              bio: 'Mobile app developer specializing in React Native and Flutter.',
              location: 'Toronto, Canada',
              skills: ['React Native', 'Flutter', 'iOS', 'Android', 'Firebase'],
              experience: 'Expert',
              hourlyRate: 95,
              availability: 'AVAILABLE',
              timezone: 'EST',
              languages: ['English', 'Mandarin']
            }
          },
          stats: {
            create: {
              totalProjects: 35,
              completedProjects: 33,
              totalHours: 980,
              rating: 4.8,
              reviewCount: 31
            }
          }
        }
      }),
      prisma.user.create({
        data: {
          email: 'priya@example.com',
          password: hashedPassword,
          firstName: 'Priya',
          lastName: 'Patel',
          role: 'FREELANCER',
          isVerified: true,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
          profile: {
            create: {
              isComplete: true,
              bio: 'UI/UX designer and frontend developer with a passion for creating beautiful interfaces.',
              location: 'London, UK',
              skills: ['UI/UX Design', 'Figma', 'React', 'Tailwind CSS', 'Animation'],
              experience: 'Intermediate',
              hourlyRate: 70,
              availability: 'BUSY',
              timezone: 'GMT',
              languages: ['English', 'Hindi']
            }
          },
          stats: {
            create: {
              totalProjects: 28,
              completedProjects: 26,
              totalHours: 750,
              rating: 4.7,
              reviewCount: 24
            }
          }
        }
      })
    ])

    // Create student user
    const student = await prisma.user.create({
      data: {
        email: 'student@example.com',
        password: await bcrypt.hash('student123', 12),
        firstName: 'Emma',
        lastName: 'Student',
        role: 'STUDENT',
        isVerified: true,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
        profile: {
          create: {
            isComplete: true,
            bio: 'Aspiring web developer eager to learn',
            location: 'Austin, USA',
            skills: ['HTML', 'CSS', 'JavaScript']
          }
        },
        stats: {
          create: {
            totalProjects: 0,
            completedProjects: 0,
            totalHours: 0,
            rating: 0,
            reviewCount: 0
          }
        }
      }
    })

    // Create sample projects
    const projects = await Promise.all([
      prisma.project.create({
        data: {
          title: 'E-commerce Website Development',
          description: 'Need a full-featured e-commerce website with payment integration, product management, and user authentication.',
          category: 'Web Development',
          skills: ['React', 'Node.js', 'MongoDB', 'Stripe'],
          budgetType: 'FIXED',
          budgetAmount: 5000,
          budgetCurrency: 'USD',
          estimatedDuration: 60,
          deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
          priority: 'HIGH',
          tags: ['ecommerce', 'fullstack', 'urgent'],
          isUrgent: true,
          status: 'OPEN',
          clientId: client1.id
        }
      }),
      prisma.project.create({
        data: {
          title: 'Mobile App for Fitness Tracking',
          description: 'Looking for an experienced mobile developer to create a fitness tracking app with workout plans and progress tracking.',
          category: 'Mobile Development',
          skills: ['React Native', 'Firebase', 'UI/UX'],
          budgetType: 'FIXED',
          budgetAmount: 8000,
          budgetCurrency: 'USD',
          estimatedDuration: 90,
          deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
          priority: 'MEDIUM',
          tags: ['mobile', 'fitness', 'health'],
          status: 'OPEN',
          clientId: client1.id
        }
      })
    ])

    // Create sample courses
    const courses = await Promise.all([
      prisma.course.create({
        data: {
          title: 'Complete React Developer Course',
          slug: 'complete-react-developer-course',
          description: 'Master React from basics to advanced concepts including hooks, context, Redux, and more.',
          shortDescription: 'Learn React from scratch and build real-world applications',
          category: 'Web Development',
          subcategory: 'Frontend',
          level: 'BEGINNER',
          language: 'English',
          thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
          price: 49.99,
          originalPrice: 99.99,
          currency: 'USD',
          duration: 1200,
          certificate: true,
          hasSubtitles: true,
          requirements: ['Basic HTML and CSS knowledge', 'JavaScript fundamentals'],
          whatYouWillLearn: [
            'Build modern React applications',
            'Master React Hooks',
            'State management with Redux',
            'Testing React applications'
          ],
          targetAudience: ['Beginner developers', 'Frontend developers', 'Web developers'],
          tags: ['React', 'JavaScript', 'Frontend', 'Web Development'],
          isPublished: true,
          isFeatured: true,
          ratingAverage: 4.8,
          ratingCount: 245,
          enrollmentCount: 1250,
          instructorId: freelancers[0].id
        }
      }),
      prisma.course.create({
        data: {
          title: 'Mobile App Development with React Native',
          slug: 'mobile-app-development-react-native',
          description: 'Build cross-platform mobile applications using React Native and deploy to iOS and Android.',
          shortDescription: 'Create mobile apps for iOS and Android with React Native',
          category: 'Mobile Development',
          subcategory: 'Cross-Platform',
          level: 'INTERMEDIATE',
          language: 'English',
          thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
          price: 69.99,
          originalPrice: 129.99,
          currency: 'USD',
          duration: 1500,
          certificate: true,
          hasSubtitles: true,
          requirements: ['React knowledge', 'JavaScript ES6+', 'Basic mobile development concepts'],
          whatYouWillLearn: [
            'Build native mobile apps',
            'Navigation and routing',
            'State management',
            'API integration',
            'Publishing to app stores'
          ],
          targetAudience: ['React developers', 'Mobile developers', 'Full-stack developers'],
          tags: ['React Native', 'Mobile', 'iOS', 'Android'],
          isPublished: true,
          isFeatured: true,
          ratingAverage: 4.7,
          ratingCount: 189,
          enrollmentCount: 890,
          instructorId: freelancers[1].id
        }
      })
    ])

    return NextResponse.json({
      message: 'Database initialized successfully',
      data: {
        users: {
          admin: 1,
          clients: 1,
          freelancers: 3,
          students: 1
        },
        projects: projects.length,
        courses: courses.length
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Database initialization error:', error)
    return NextResponse.json(
      { error: 'Failed to initialize database', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const userCount = await prisma.user.count()
    const projectCount = await prisma.project.count()
    const courseCount = await prisma.course.count()

    return NextResponse.json({
      initialized: userCount > 0,
      stats: {
        users: userCount,
        projects: projectCount,
        courses: courseCount
      }
    })
  } catch (error) {
    console.error('Database check error:', error)
    return NextResponse.json(
      { error: 'Failed to check database status' },
      { status: 500 }
    )
  }
}

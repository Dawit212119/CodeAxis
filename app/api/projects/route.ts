import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

const createProjectSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(5000),
  category: z.string().min(1),
  skills: z.array(z.string()),
  budgetType: z.enum(['FIXED', 'HOURLY']),
  budgetAmount: z.number().min(0),
  budgetCurrency: z.string().default('USD'),
  estimatedDuration: z.number().min(1),
  deadline: z.string().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
  tags: z.array(z.string()).optional().default([]),
  isUrgent: z.boolean().default(false)
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const skills = searchParams.get('skills')?.split(',').filter(Boolean)
    const minBudget = searchParams.get('minBudget')
    const maxBudget = searchParams.get('maxBudget')
    const status = (searchParams.get('status')?.toUpperCase() || 'OPEN') as any
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const order = searchParams.get('order') || 'desc'

    // Build filter
    const where: any = { status }
    
    if (category) where.category = category
    if (skills && skills.length > 0) {
      where.skills = { hasSome: skills }
    }
    if (minBudget || maxBudget) {
      where.budgetAmount = {}
      if (minBudget) where.budgetAmount.gte = parseFloat(minBudget)
      if (maxBudget) where.budgetAmount.lte = parseFloat(maxBudget)
    }

    const skip = (page - 1) * limit
    
    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
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
          freelancer: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatar: true
            }
          },
          _count: {
            select: {
              proposals: true
            }
          }
        },
        orderBy: { [sortBy]: order },
        skip,
        take: limit
      }),
      prisma.project.count({ where })
    ])

    return NextResponse.json({
      projects,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Get projects error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
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

    const body = await request.json()
    const projectData = createProjectSchema.parse(body)

    // Create project
    const project = await prisma.project.create({
      data: {
        title: projectData.title,
        description: projectData.description,
        category: projectData.category,
        skills: projectData.skills,
        budgetType: projectData.budgetType as any,
        budgetAmount: projectData.budgetAmount,
        budgetCurrency: projectData.budgetCurrency,
        estimatedDuration: projectData.estimatedDuration,
        deadline: projectData.deadline ? new Date(projectData.deadline) : undefined,
        priority: projectData.priority as any,
        tags: projectData.tags,
        isUrgent: projectData.isUrgent,
        clientId: decoded.userId,
        status: 'DRAFT'
      },
      include: {
        client: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            stats: true
          }
        }
      }
    })

    return NextResponse.json({
      message: 'Project created successfully',
      project
    }, { status: 201 })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Create project error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
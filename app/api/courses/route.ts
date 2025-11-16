import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

const createCourseSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(5000),
  shortDescription: z.string().min(1).max(300),
  category: z.string().min(1),
  subcategory: z.string().min(1),
  level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
  language: z.string().default('English'),
  thumbnail: z.string().url(),
  previewVideo: z.string().url().optional(),
  price: z.number().min(0),
  originalPrice: z.number().min(0).optional(),
  currency: z.string().default('USD'),
  duration: z.number().min(0),
  requirements: z.array(z.string()).default([]),
  whatYouWillLearn: z.array(z.string()).default([]),
  targetAudience: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  certificate: z.boolean().default(false),
  hasSubtitles: z.boolean().default(false)
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const category = searchParams.get('category')
    const level = searchParams.get('level')?.toUpperCase() as any
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const order = searchParams.get('order') || 'desc'
    const featured = searchParams.get('featured') === 'true'

    // Build filter
    const where: any = { isPublished: true }
    
    if (category) where.category = category
    if (level) where.level = level
    if (featured) where.isFeatured = true
    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.gte = parseFloat(minPrice)
      if (maxPrice) where.price.lte = parseFloat(maxPrice)
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { tags: { has: search } }
      ]
    }

    const skip = (page - 1) * limit
    
    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
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
          },
          _count: {
            select: {
              lessons: true,
              enrollments: true
            }
          }
        },
        orderBy: { [sortBy]: order },
        skip,
        take: limit
      }),
      prisma.course.count({ where })
    ])

    return NextResponse.json({
      courses,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Get courses error:', error)
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

    // Check if user is instructor or admin
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    })
    
    if (!user || !['FREELANCER', 'ADMIN'].includes(user.role)) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const courseData = createCourseSchema.parse(body)

    // Generate slug
    const slug = slugify(courseData.title)
    
    // Check if slug exists
    const existingCourse = await prisma.course.findUnique({
      where: { slug }
    })
    
    if (existingCourse) {
      return NextResponse.json(
        { error: 'Course with similar title already exists' },
        { status: 409 }
      )
    }

    // Create course
    const course = await prisma.course.create({
      data: {
        title: courseData.title,
        slug,
        description: courseData.description,
        shortDescription: courseData.shortDescription,
        category: courseData.category,
        subcategory: courseData.subcategory,
        level: courseData.level as any,
        language: courseData.language,
        thumbnail: courseData.thumbnail,
        previewVideo: courseData.previewVideo,
        price: courseData.price,
        originalPrice: courseData.originalPrice,
        currency: courseData.currency,
        duration: courseData.duration,
        requirements: courseData.requirements,
        whatYouWillLearn: courseData.whatYouWillLearn,
        targetAudience: courseData.targetAudience,
        tags: courseData.tags,
        certificate: courseData.certificate,
        hasSubtitles: courseData.hasSubtitles,
        instructorId: decoded.userId,
        isPublished: false,
        ratingAverage: 0,
        ratingCount: 0,
        enrollmentCount: 0
      },
      include: {
        instructor: {
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
      message: 'Course created successfully',
      course
    }, { status: 201 })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Create course error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
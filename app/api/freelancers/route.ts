import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const skills = searchParams.get('skills')?.split(',').filter(Boolean)
    const minRate = searchParams.get('minRate')
    const maxRate = searchParams.get('maxRate')
    const availability = searchParams.get('availability')?.toUpperCase()
    const location = searchParams.get('location')
    const rating = searchParams.get('rating')
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const order = searchParams.get('order') || 'desc'

    // Build filter for freelancers
    const where: any = { 
      role: 'FREELANCER',
      profile: {
        isComplete: true
      }
    }
    
    if (skills && skills.length > 0) {
      where.profile = {
        ...where.profile,
        skills: { hasSome: skills }
      }
    }
    
    if (availability) {
      where.profile = {
        ...where.profile,
        availability
      }
    }
    
    if (location) {
      where.profile = {
        ...where.profile,
        location: { contains: location, mode: 'insensitive' }
      }
    }
    
    if (minRate || maxRate) {
      where.profile = {
        ...where.profile,
        hourlyRate: {}
      }
      if (minRate) where.profile.hourlyRate.gte = parseFloat(minRate)
      if (maxRate) where.profile.hourlyRate.lte = parseFloat(maxRate)
    }
    
    if (rating) {
      where.stats = {
        rating: { gte: parseFloat(rating) }
      }
    }
    
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { profile: { bio: { contains: search, mode: 'insensitive' } } }
      ]
    }

    const skip = (page - 1) * limit
    
    const [freelancers, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          avatar: true,
          lastActiveAt: true,
          createdAt: true,
          profile: true,
          stats: true
        },
        orderBy: sortBy === 'rating' ? { stats: { rating: order } } : { [sortBy]: order },
        skip,
        take: limit
      }),
      prisma.user.count({ where })
    ])

    // Add additional computed fields
    const enrichedFreelancers = freelancers.map(freelancer => ({
      ...freelancer,
      isOnline: freelancer.lastActiveAt > new Date(Date.now() - 15 * 60 * 1000),
      responseTime: Math.floor(Math.random() * 24) + 1,
      successRate: Math.min(95 + Math.random() * 5, 100),
    }))

    // Get available skills for filters
    const allFreelancers = await prisma.user.findMany({
      where: { role: 'FREELANCER', profile: { isComplete: true } },
      select: { profile: { select: { skills: true, location: true } } }
    })

    const availableSkills = [...new Set(allFreelancers.flatMap(f => f.profile?.skills || []))]
    const locations = [...new Set(allFreelancers.map(f => f.profile?.location).filter(Boolean))]

    return NextResponse.json({
      freelancers: enrichedFreelancers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      filters: {
        availableSkills: availableSkills.slice(0, 50),
        locations: locations.slice(0, 20),
        experienceLevels: ['Entry Level', 'Intermediate', 'Expert', 'Senior'],
        availabilityOptions: ['AVAILABLE', 'BUSY']
      }
    })

  } catch (error) {
    console.error('Get freelancers error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

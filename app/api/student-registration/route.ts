import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { generateToken } from '@/lib/auth'

const studentRegistrationSchema = z.object({
  personalInfo: z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(1, 'Phone number is required'),
    dateOfBirth: z.string().min(1, 'Date of birth is required')
  }),
  coursePreferences: z.array(z.string()).min(1, 'Select at least one course preference'),
  skillLevel: z.enum(['beginner', 'intermediate', 'advanced']),
  learningGoals: z.array(z.string()).min(1, 'Select at least one learning goal'),
  timeCommitment: z.string().min(1, 'Time commitment is required'),
  preferredLearningStyle: z.array(z.string()).min(1, 'Select at least one learning style'),
  motivation: z.string().min(10, 'Please provide more details about your motivation'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms and conditions')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const registrationData = studentRegistrationSchema.parse(body)
    
    const { personalInfo, password, agreeToTerms, ...studentProfile } = registrationData

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: personalInfo.email }
    })
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user with student profile
    const user = await prisma.user.create({
      data: {
        email: personalInfo.email,
        password: hashedPassword,
        firstName: personalInfo.firstName,
        lastName: personalInfo.lastName,
        role: 'STUDENT',
        profile: {
          create: {
            isComplete: true,
            bio: `Student interested in ${studentProfile.coursePreferences.join(', ')}`,
            skills: studentProfile.coursePreferences,
            experience: studentProfile.skillLevel
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
      },
      include: {
        profile: true,
        stats: true
      }
    })

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role.toLowerCase() as 'client' | 'freelancer' | 'student' | 'admin'
    })

    // Create response with cookie
    const response = NextResponse.json({
      message: 'Student registration successful',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role.toLowerCase()
      }
    }, { status: 201 })

    // Set HTTP-only cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    })

    return response

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Student registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const stats = searchParams.get('stats') === 'true'
    
    if (stats) {
      const totalStudents = await prisma.user.count({
        where: { role: 'STUDENT' }
      })
      
      const recentRegistrations = await prisma.user.count({
        where: {
          role: 'STUDENT',
          createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        }
      })
      
      const students = await prisma.user.findMany({
        where: { role: 'STUDENT' },
        include: { profile: { select: { skills: true } } }
      })

      const skillsCount: Record<string, number> = {}
      students.forEach(student => {
        student.profile?.skills.forEach(skill => {
          skillsCount[skill] = (skillsCount[skill] || 0) + 1
        })
      })

      const topCoursePreferences = Object.entries(skillsCount)
        .map(([skill, count]) => ({ _id: skill, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10)

      return NextResponse.json({
        totalStudents,
        recentRegistrations,
        topCoursePreferences
      })
    }

    return NextResponse.json({ message: 'Student registration endpoint' })

  } catch (error) {
    console.error('Get registration stats error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

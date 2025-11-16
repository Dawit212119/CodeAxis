import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'
import { ProposalStatus } from '@prisma/client'

const createProposalSchema = z.object({
  coverLetter: z.string().min(50, 'Cover letter must be at least 50 characters'),
  proposedRate: z.number().min(0),
  estimatedDuration: z.number().min(1)
})

const updateProposalSchema = z.object({
  status: z.enum(['PENDING', 'ACCEPTED', 'REJECTED', 'WITHDRAWN'])
})

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Check if user is a freelancer
    if (decoded.role !== 'freelancer') {
      return NextResponse.json(
        { error: 'Only freelancers can submit proposals' },
        { status: 403 }
      )
    }

    // Check if project exists and is open
    const project = await prisma.project.findUnique({
      where: { id: params.id }
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    if (project.status !== 'OPEN') {
      return NextResponse.json(
        { error: 'Project is not accepting proposals' },
        { status: 400 }
      )
    }

    // Check if freelancer already submitted a proposal
    const existingProposal = await prisma.proposal.findFirst({
      where: {
        projectId: params.id,
        freelancerId: decoded.userId
      }
    })

    if (existingProposal) {
      return NextResponse.json(
        { error: 'You have already submitted a proposal for this project' },
        { status: 409 }
      )
    }

    const body = await request.json()
    const proposalData = createProposalSchema.parse(body)

    // Create proposal
    const proposal = await prisma.proposal.create({
      data: {
        projectId: params.id,
        freelancerId: decoded.userId,
        coverLetter: proposalData.coverLetter,
        proposedRate: proposalData.proposedRate,
        estimatedDuration: proposalData.estimatedDuration,
        status: 'PENDING'
      },
      include: {
        freelancer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            profile: true,
            stats: true
          }
        }
      }
    })

    // Update project applicant count
    await prisma.project.update({
      where: { id: params.id },
      data: { applicantCount: { increment: 1 } }
    })

    return NextResponse.json({
      message: 'Proposal submitted successfully',
      proposal
    }, { status: 201 })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Create proposal error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Check if user is the project owner
    const project = await prisma.project.findUnique({
      where: { id: params.id }
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    if (project.clientId !== decoded.userId && decoded.role !== 'admin') {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      )
    }

    // Get all proposals for the project
    const proposals = await prisma.proposal.findMany({
      where: { projectId: params.id },
      include: {
        freelancer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            profile: true,
            stats: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ proposals })

  } catch (error) {
    console.error('Get proposals error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

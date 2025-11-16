import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'
import { MessageType } from '@prisma/client'

const sendMessageSchema = z.object({
  recipientId: z.string().min(1),
  content: z.string().min(1).max(5000),
  type: z.enum(['TEXT', 'FILE', 'IMAGE', 'SYSTEM']).default('TEXT'),
  projectId: z.string().optional(),
  fileUrl: z.string().url().optional(),
  fileName: z.string().optional(),
  fileSize: z.number().optional(),
  replyToId: z.string().optional()
})

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

    const { searchParams } = new URL(request.url)
    const userId = decoded.userId
    const conversationWith = searchParams.get('with')
    const projectId = searchParams.get('project')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')

    if (conversationWith) {
      // Get messages between two users
      const skip = (page - 1) * limit
      
      const where: any = {
        OR: [
          { senderId: userId, recipientId: conversationWith },
          { senderId: conversationWith, recipientId: userId }
        ]
      }

      if (projectId) {
        where.projectId = projectId
      }

      const messages = await prisma.message.findMany({
        where,
        include: {
          sender: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatar: true
            }
          },
          recipient: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatar: true
            }
          },
          replyTo: {
            select: {
              id: true,
              content: true,
              senderId: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      })

      // Mark messages as read
      await prisma.message.updateMany({
        where: { 
          senderId: conversationWith, 
          recipientId: userId, 
          isRead: false 
        },
        data: { 
          isRead: true, 
          readAt: new Date() 
        }
      })

      return NextResponse.json({
        messages: messages.reverse(),
        pagination: {
          page,
          limit,
          hasMore: messages.length === limit
        }
      })

    } else {
      // Get conversation list
      const sentMessages = await prisma.message.findMany({
        where: { senderId: userId },
        distinct: ['recipientId'],
        orderBy: { createdAt: 'desc' },
        include: {
          recipient: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatar: true,
              lastActiveAt: true
            }
          }
        }
      })

      const receivedMessages = await prisma.message.findMany({
        where: { recipientId: userId },
        distinct: ['senderId'],
        orderBy: { createdAt: 'desc' },
        include: {
          sender: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatar: true,
              lastActiveAt: true
            }
          }
        }
      })

      // Combine and deduplicate conversations
      const conversationMap = new Map()

      for (const msg of sentMessages) {
        const otherUserId = msg.recipientId
        if (!conversationMap.has(otherUserId)) {
          const unreadCount = await prisma.message.count({
            where: {
              senderId: otherUserId,
              recipientId: userId,
              isRead: false
            }
          })

          conversationMap.set(otherUserId, {
            user: msg.recipient,
            lastMessage: msg,
            unreadCount
          })
        }
      }

      for (const msg of receivedMessages) {
        const otherUserId = msg.senderId
        if (!conversationMap.has(otherUserId) || 
            conversationMap.get(otherUserId).lastMessage.createdAt < msg.createdAt) {
          const unreadCount = await prisma.message.count({
            where: {
              senderId: otherUserId,
              recipientId: userId,
              isRead: false
            }
          })

          conversationMap.set(otherUserId, {
            user: msg.sender,
            lastMessage: msg,
            unreadCount
          })
        }
      }

      const conversations = Array.from(conversationMap.values())
        .sort((a, b) => b.lastMessage.createdAt.getTime() - a.lastMessage.createdAt.getTime())

      return NextResponse.json({ conversations })
    }

  } catch (error) {
    console.error('Get messages error:', error)
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
    const messageData = sendMessageSchema.parse(body)

    // Verify recipient exists
    const recipient = await prisma.user.findUnique({
      where: { id: messageData.recipientId }
    })
    
    if (!recipient) {
      return NextResponse.json(
        { error: 'Recipient not found' },
        { status: 404 }
      )
    }

    // Create message
    const message = await prisma.message.create({
      data: {
        senderId: decoded.userId,
        recipientId: messageData.recipientId,
        content: messageData.content,
        type: messageData.type as MessageType,
        projectId: messageData.projectId,
        fileUrl: messageData.fileUrl,
        fileName: messageData.fileName,
        fileSize: messageData.fileSize,
        replyToId: messageData.replyToId
      },
      include: {
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true
          }
        },
        recipient: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true
          }
        },
        replyTo: {
          select: {
            id: true,
            content: true,
            senderId: true
          }
        }
      }
    })
    
    return NextResponse.json({
      message: 'Message sent successfully',
      data: message
    }, { status: 201 })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Send message error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
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

    const { searchParams } = new URL(request.url)
    const messageId = searchParams.get('id')
    const action = searchParams.get('action')

    if (action === 'mark-read') {
      const senderId = searchParams.get('sender')
      
      if (messageId) {
        await prisma.message.update({
          where: { id: messageId },
          data: {
            isRead: true,
            readAt: new Date()
          }
        })
      } else if (senderId) {
        await prisma.message.updateMany({
          where: {
            senderId,
            recipientId: decoded.userId,
            isRead: false
          },
          data: {
            isRead: true,
            readAt: new Date()
          }
        })
      }

      return NextResponse.json({ message: 'Messages marked as read' })
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )

  } catch (error) {
    console.error('Update message error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

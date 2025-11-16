import mongoose from 'mongoose'

interface IMessage {
  _id: mongoose.Types.ObjectId
  sender: mongoose.Types.ObjectId
  recipient: mongoose.Types.ObjectId
  project?: mongoose.Types.ObjectId
  content: string
  type: 'text' | 'file' | 'image' | 'system'
  fileUrl?: string
  fileName?: string
  fileSize?: number
  isRead: boolean
  readAt?: Date
  isEdited: boolean
  editedAt?: Date
  replyTo?: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const messageSchema = new mongoose.Schema<IMessage>({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  content: {
    type: String,
    required: true,
    maxlength: 5000
  },
  type: {
    type: String,
    enum: ['text', 'file', 'image', 'system'],
    default: 'text'
  },
  fileUrl: String,
  fileName: String,
  fileSize: Number,
  isRead: {
    type: Boolean,
    default: false
  },
  readAt: Date,
  isEdited: {
    type: Boolean,
    default: false
  },
  editedAt: Date,
  replyTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }
}, {
  timestamps: true
})

// Indexes
messageSchema.index({ sender: 1, recipient: 1, createdAt: -1 })
messageSchema.index({ project: 1, createdAt: -1 })
messageSchema.index({ recipient: 1, isRead: 1 })

export const Message = mongoose.models.Message || mongoose.model<IMessage>('Message', messageSchema)
export type { IMessage }
import mongoose from 'mongoose'

interface IProject {
  _id: mongoose.Types.ObjectId
  title: string
  description: string
  client: mongoose.Types.ObjectId
  freelancer?: mongoose.Types.ObjectId
  status: 'draft' | 'open' | 'in-progress' | 'in-review' | 'completed' | 'cancelled' | 'paused'
  category: string
  skills: string[]
  budget: {
    type: 'fixed' | 'hourly'
    amount: number
    currency: string
  }
  timeline: {
    estimatedDuration: number // in days
    startDate?: Date
    endDate?: Date
    deadline?: Date
  }
  priority: 'low' | 'medium' | 'high' | 'urgent'
  attachments: Array<{
    name: string
    url: string
    type: string
    size: number
    uploadedAt: Date
  }>
  proposals: mongoose.Types.ObjectId[]
  milestones: Array<{
    title: string
    description: string
    amount: number
    dueDate: Date
    status: 'pending' | 'in-progress' | 'completed' | 'approved'
    completedAt?: Date
  }>
  progress: number
  communication: {
    lastMessage?: Date
    messageCount: number
  }
  payment: {
    totalPaid: number
    pendingAmount: number
    paymentMethod?: string
  }
  rating?: {
    clientRating?: number
    freelancerRating?: number
    clientReview?: string
    freelancerReview?: string
  }
  tags: string[]
  isUrgent: boolean
  isFeatured: boolean
  viewCount: number
  applicantCount: number
  createdAt: Date
  updatedAt: Date
}

const projectSchema = new mongoose.Schema<IProject>({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    maxlength: 5000
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  freelancer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['draft', 'open', 'in-progress', 'in-review', 'completed', 'cancelled', 'paused'],
    default: 'draft'
  },
  category: {
    type: String,
    required: true
  },
  skills: [{
    type: String,
    trim: true
  }],
  budget: {
    type: {
      type: String,
      enum: ['fixed', 'hourly'],
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    currency: {
      type: String,
      default: 'USD'
    }
  },
  timeline: {
    estimatedDuration: {
      type: Number,
      required: true,
      min: 1
    },
    startDate: Date,
    endDate: Date,
    deadline: Date
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  attachments: [{
    name: String,
    url: String,
    type: String,
    size: Number,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  proposals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Proposal'
  }],
  milestones: [{
    title: String,
    description: String,
    amount: Number,
    dueDate: Date,
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed', 'approved'],
      default: 'pending'
    },
    completedAt: Date
  }],
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  communication: {
    lastMessage: Date,
    messageCount: {
      type: Number,
      default: 0
    }
  },
  payment: {
    totalPaid: {
      type: Number,
      default: 0
    },
    pendingAmount: {
      type: Number,
      default: 0
    },
    paymentMethod: String
  },
  rating: {
    clientRating: {
      type: Number,
      min: 1,
      max: 5
    },
    freelancerRating: {
      type: Number,
      min: 1,
      max: 5
    },
    clientReview: String,
    freelancerReview: String
  },
  tags: [String],
  isUrgent: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  viewCount: {
    type: Number,
    default: 0
  },
  applicantCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

// Indexes
projectSchema.index({ client: 1 })
projectSchema.index({ freelancer: 1 })
projectSchema.index({ status: 1 })
projectSchema.index({ category: 1 })
projectSchema.index({ skills: 1 })
projectSchema.index({ 'budget.amount': 1 })
projectSchema.index({ createdAt: -1 })
projectSchema.index({ isFeatured: -1, createdAt: -1 })
projectSchema.index({ isUrgent: -1, createdAt: -1 })

export const Project = mongoose.models.Project || mongoose.model<IProject>('Project', projectSchema)
export type { IProject }
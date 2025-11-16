import mongoose from 'mongoose'

interface ICourse {
  _id: mongoose.Types.ObjectId
  title: string
  slug: string
  description: string
  shortDescription: string
  instructor: mongoose.Types.ObjectId
  category: string
  subcategory: string
  level: 'beginner' | 'intermediate' | 'advanced'
  language: string
  thumbnail: string
  previewVideo?: string
  price: number
  originalPrice?: number
  currency: string
  isPublished: boolean
  isFeatured: boolean
  duration: number // in minutes
  lessons: Array<{
    title: string
    description: string
    videoUrl?: string
    duration: number // in minutes
    order: number
    isFree: boolean
    resources?: Array<{
      title: string
      type: 'pdf' | 'video' | 'link' | 'file'
      url: string
    }>
  }>
  requirements: string[]
  whatYouWillLearn: string[]
  targetAudience: string[]
  tags: string[]
  rating: {
    average: number
    count: number
  }
  enrollment: {
    count: number
    capacity?: number
  }
  certificate: boolean
  hasSubtitles: boolean
  lastUpdated: Date
  createdAt: Date
  updatedAt: Date
}

const courseSchema = new mongoose.Schema<ICourse>({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 5000
  },
  shortDescription: {
    type: String,
    required: true,
    maxlength: 300
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true
  },
  subcategory: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  language: {
    type: String,
    default: 'English'
  },
  thumbnail: {
    type: String,
    required: true
  },
  previewVideo: String,
  price: {
    type: Number,
    required: true,
    min: 0
  },
  originalPrice: Number,
  currency: {
    type: String,
    default: 'USD'
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  duration: {
    type: Number,
    required: true,
    min: 0
  },
  lessons: [{
    title: {
      type: String,
      required: true
    },
    description: String,
    videoUrl: String,
    duration: {
      type: Number,
      required: true,
      min: 0
    },
    order: {
      type: Number,
      required: true
    },
    isFree: {
      type: Boolean,
      default: false
    },
    resources: [{
      title: String,
      type: {
        type: String,
        enum: ['pdf', 'video', 'link', 'file']
      },
      url: String
    }]
  }],
  requirements: [String],
  whatYouWillLearn: [String],
  targetAudience: [String],
  tags: [String],
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  enrollment: {
    count: {
      type: Number,
      default: 0
    },
    capacity: Number
  },
  certificate: {
    type: Boolean,
    default: false
  },
  hasSubtitles: {
    type: Boolean,
    default: false
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

// Indexes
courseSchema.index({ slug: 1 })
courseSchema.index({ instructor: 1 })
courseSchema.index({ category: 1 })
courseSchema.index({ level: 1 })
courseSchema.index({ price: 1 })
courseSchema.index({ 'rating.average': -1 })
courseSchema.index({ 'enrollment.count': -1 })
courseSchema.index({ isFeatured: -1, createdAt: -1 })
courseSchema.index({ isPublished: 1, createdAt: -1 })

export const Course = mongoose.models.Course || mongoose.model<ICourse>('Course', courseSchema)
export type { ICourse }
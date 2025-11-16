import mongoose from 'mongoose'

interface IUser {
  _id: mongoose.Types.ObjectId
  email: string
  password: string
  firstName: string
  lastName: string
  role: 'client' | 'freelancer' | 'student' | 'admin'
  avatar?: string
  isVerified: boolean
  profile: {
    isComplete: boolean
    bio?: string
    location?: string
    website?: string
    skills: string[]
    experience?: string
    hourlyRate?: number
    availability?: 'available' | 'busy' | 'unavailable'
    timezone?: string
    languages?: string[]
    certifications?: string[]
  }
  stats: {
    totalProjects: number
    completedProjects: number
    totalHours: number
    rating: number
    reviewCount: number
  }
  createdAt: Date
  updatedAt: Date
  lastActiveAt: Date
}

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['client', 'freelancer', 'student', 'admin'],
    default: 'client'
  },
  avatar: {
    type: String,
    default: null
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  profile: {
    isComplete: {
      type: Boolean,
      default: false
    },
    bio: String,
    location: String,
    website: String,
    skills: [{
      type: String,
      trim: true
    }],
    experience: String,
    hourlyRate: {
      type: Number,
      min: 0
    },
    availability: {
      type: String,
      enum: ['available', 'busy', 'unavailable'],
      default: 'available'
    },
    timezone: String,
    languages: [String],
    certifications: [String]
  },
  stats: {
    totalProjects: {
      type: Number,
      default: 0
    },
    completedProjects: {
      type: Number,
      default: 0
    },
    totalHours: {
      type: Number,
      default: 0
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    reviewCount: {
      type: Number,
      default: 0
    }
  },
  lastActiveAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password
      return ret
    }
  }
})

// Indexes
userSchema.index({ email: 1 })
userSchema.index({ role: 1 })
userSchema.index({ 'profile.skills': 1 })
userSchema.index({ 'stats.rating': -1 })
userSchema.index({ lastActiveAt: -1 })

export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema)
export type { IUser }
export interface Engineer {
  id: string
  name: string
  title: string
  company: string
  location: string
  experience: string
  rating: number
  hourlyRate: number
  skills: string[]
  avatar: string
  completedProjects: number
  totalHours: number
  specialty: string
  achievements: string[]
  bio: string
}

export interface Project {
  id: string
  title: string
  client: string
  status: 'active' | 'completed' | 'pending' | 'cancelled' | 'paused' | 'in-review'
  budget: number
  progress: number
  deadline: string
  avatar: string
}

export interface Course {
  id: string
  title: string
  instructor: string
  description: string
  thumbnail: string
  rating: number
  reviewCount: number
  students: number
  duration: string
  lessons: number
  level: 'beginner' | 'intermediate' | 'advanced'
  category: string
  price: number
  originalPrice?: number
  isWishlisted: boolean
  tags: string[]
  lastUpdated: string
  language: string
  hasSubtitles: boolean
  certificate: boolean
}

export interface Material {
  id: string
  title: string
  type: 'pdf' | 'video' | 'slides' | 'code' | 'image' | 'document'
  course: string
  instructor: string
  uploadDate: string
  size: string
  downloadCount: number
  rating?: number
  description?: string
  tags: string[]
  thumbnail?: string
  duration?: string
  meetingDate?: string
}

export interface StudentData {
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    dateOfBirth: string
  }
  coursePreferences: string[]
  skillLevel: 'beginner' | 'intermediate' | 'advanced'
  learningGoals: string[]
  timeCommitment: string
  preferredLearningStyle: string[]
  motivation: string
}
'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { 
  BookOpen, 
  Clock, 
  Trophy, 
  Star,
  Play,
  CheckCircle,
  Calendar,
  Users,
  Award,
  TrendingUp,
  Target,
  Brain,
  Zap,
  Heart,
  Eye,
  ArrowRight,
  MoreHorizontal,
  Download,
  Share,
  Video,
  FileText,
  ExternalLink,
  Folder,
  PlayCircle
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProgressRing } from '@/components/ui/animated-chart'
import { StatusBadge } from '@/components/ui/status-badge'
import { cn } from '@/lib/utils'
import { pageVariants, staggerContainer, staggerItem } from '@/lib/animations'
import { RequireAuth } from '@/lib/auth-context'

interface Course {
  id: string
  title: string
  instructor: string
  progress: number
  totalLessons: number
  completedLessons: number
  nextLesson: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  category: string
  thumbnail: string
  rating: number
  enrolledDate: string
  estimatedCompletion: string
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt?: string
  progress?: number
  total?: number
}

interface UpcomingSession {
  id: string
  title: string
  instructor: string
  date: string
  time: string
  type: 'live' | 'recorded'
  duration: number
  meetingLink?: string
  meetingId?: string
  materials?: string[]
  recordingAvailable?: boolean
}

function StudentDashboardContent() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })
  const [activeTab, setActiveTab] = useState('overview')
  const [userName] = useState('Alex Johnson') // This would come from auth context

  const studentStats = {
    totalCourses: 8,
    completedCourses: 3,
    hoursLearned: 127,
    certificates: 2,
    currentStreak: 15,
    weeklyGoal: 10,
    weeklyProgress: 7.5,
  }

  const enrolledCourses: Course[] = [
    {
      id: '1',
      title: 'React Advanced Patterns',
      instructor: 'Sarah Chen',
      progress: 75,
      totalLessons: 24,
      completedLessons: 18,
      nextLesson: 'Custom Hooks Deep Dive',
      difficulty: 'advanced',
      category: 'Web Development',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
      rating: 4.9,
      enrolledDate: '2024-01-15',
      estimatedCompletion: '2024-02-28'
    },
    {
      id: '2',
      title: 'Python for Data Science',
      instructor: 'Dr. Michael Kumar',
      progress: 45,
      totalLessons: 32,
      completedLessons: 14,
      nextLesson: 'Pandas DataFrames',
      difficulty: 'intermediate',
      category: 'Data Science',
      thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop',
      rating: 4.8,
      enrolledDate: '2024-01-20',
      estimatedCompletion: '2024-03-15'
    },
    {
      id: '3',
      title: 'UI/UX Design Fundamentals',
      instructor: 'Emily Rodriguez',
      progress: 90,
      totalLessons: 20,
      completedLessons: 18,
      nextLesson: 'Final Project Review',
      difficulty: 'beginner',
      category: 'Design',
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
      rating: 4.9,
      enrolledDate: '2024-01-10',
      estimatedCompletion: '2024-02-15'
    }
  ]

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Course Completed',
      description: 'Complete your first course',
      icon: '🎓',
      unlockedAt: '2024-01-25'
    },
    {
      id: '2',
      title: 'Week Warrior',
      description: 'Learn for 7 days straight',
      icon: '🔥',
      unlockedAt: '2024-02-01'
    },
    {
      id: '3',
      title: 'Speed Learner',
      description: 'Complete 5 lessons in one day',
      icon: '⚡',
      progress: 3,
      total: 5
    },
    {
      id: '4',
      title: 'Knowledge Seeker',
      description: 'Enroll in 10 courses',
      icon: '📚',
      progress: 8,
      total: 10
    }
  ]

  const upcomingSessions: UpcomingSession[] = [
    {
      id: '1',
      title: 'React Performance Optimization',
      instructor: 'Sarah Chen',
      date: '2024-02-10',
      time: '14:00',
      type: 'live',
      duration: 90,
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      meetingId: 'abc-defg-hij',
      materials: ['React Performance Guide.pdf', 'Code Examples.zip', 'Slides.pptx']
    },
    {
      id: '2',
      title: 'Data Visualization with Python',
      instructor: 'Dr. Michael Kumar',
      date: '2024-02-12',
      time: '16:00',
      type: 'live',
      duration: 120,
      meetingLink: 'https://meet.google.com/xyz-uvwx-yz',
      meetingId: 'xyz-uvwx-yz',
      materials: ['Python Visualization Handbook.pdf', 'Dataset Files.csv', 'Jupyter Notebooks.zip'],
      recordingAvailable: true
    }
  ]

  const recommendedCourses = [
    {
      id: '4',
      title: 'Advanced JavaScript Concepts',
      instructor: 'John Smith',
      rating: 4.8,
      students: 1250,
      duration: '12 hours',
      price: 99
    },
    {
      id: '5',
      title: 'Machine Learning Basics',
      instructor: 'Dr. Lisa Wang',
      rating: 4.9,
      students: 2100,
      duration: '16 hours',
      price: 129
    }
  ]

  const getDifficultyColor = (difficulty: Course['difficulty']) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400 bg-green-500/20'
      case 'intermediate': return 'text-yellow-400 bg-yellow-500/20'
      case 'advanced': return 'text-red-400 bg-red-500/20'
    }
  }

  return (
    <motion.div
      ref={ref}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-background"
    >
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Welcome Section */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            className="mb-12"
          >
            <motion.div variants={staggerItem}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-2">
                    Welcome back, <span className="text-emerald-400">{userName}</span>! 👋
                  </h1>
                  <p className="text-xl text-gray-300">
                    Ready to continue your learning journey?
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-400 font-display">
                      {studentStats.currentStreak}
                    </div>
                    <div className="text-sm text-gray-400">Day Streak</div>
                  </div>
                  <div className="w-px h-12 bg-white/20"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400 font-display">
                      {studentStats.hoursLearned}h
                    </div>
                    <div className="text-sm text-gray-400">Total Hours</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats Overview */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
            >
              {[
                { icon: BookOpen, label: 'Enrolled Courses', value: studentStats.totalCourses, color: 'text-blue-400' },
                { icon: Trophy, label: 'Completed', value: studentStats.completedCourses, color: 'text-green-400' },
                { icon: Award, label: 'Certificates', value: studentStats.certificates, color: 'text-yellow-400' },
                { icon: Target, label: 'Weekly Goal', value: `${studentStats.weeklyProgress}/${studentStats.weeklyGoal}h`, color: 'text-purple-400' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={staggerItem}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group"
                >
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="flex items-center justify-center mb-3">
                        <div className="p-3 rounded-xl bg-white">
                          <stat.icon className={cn("w-6 h-6", stat.color)} />
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-white mb-1 font-display">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-400">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Weekly Progress */}
            <motion.div variants={staggerItem}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <TrendingUp className="w-6 h-6 text-emerald-400" />
                    Weekly Learning Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <ProgressRing 
                    progress={(studentStats.weeklyProgress / studentStats.weeklyGoal) * 100} 
                    size={120} 
                  />
                  <div className="ml-8">
                    <div className="text-sm text-gray-400 mb-2">This Week's Goal</div>
                    <div className="text-2xl font-bold text-white mb-1">
                      {studentStats.weeklyProgress} / {studentStats.weeklyGoal} hours
                    </div>
                    <div className="text-sm text-emerald-400">
                      {((studentStats.weeklyProgress / studentStats.weeklyGoal) * 100).toFixed(0)}% Complete
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Current Courses */}
              <motion.div
                variants={staggerItem}
                initial="initial"
                animate={isInView ? "animate" : "initial"}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <BookOpen className="w-6 h-6 text-blue-400" />
                      Continue Learning
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {enrolledCourses.map((course, index) => (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="group"
                      >
                        <div className="flex items-center gap-4 p-4 rounded-2xl glass hover:bg-white/10 transition-all duration-300">
                          <div className="relative w-20 h-16 rounded-lg overflow-hidden">
                            <img
                              src={course.thumbnail}
                              alt={course.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-white truncate">
                                {course.title}
                              </h3>
                              <span className={cn(
                                "px-2 py-1 rounded-full text-xs",
                                getDifficultyColor(course.difficulty)
                              )}>
                                {course.difficulty}
                              </span>
                            </div>
                            <p className="text-sm text-gray-400 mb-2">
                              by {course.instructor}
                            </p>
                            
                            <div className="flex items-center gap-4">
                              <div className="flex-1">
                                <div className="flex justify-between text-xs text-gray-400 mb-1">
                                  <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                                  <span>{course.progress}%</span>
                                </div>
                                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                  <motion.div
                                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${course.progress}%` }}
                                    transition={{ duration: 1, delay: index * 0.1 }}
                                  />
                                </div>
                              </div>
                              
                              <div className="flex gap-2">
                                <Button size="sm" variant="glass" className="group/btn">
                                  <Video className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                                  Join Class
                                </Button>
                                <Button size="sm" variant="ghost" className="group/btn">
                                  <Folder className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                                  Materials
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recommended Courses */}
              <motion.div
                variants={staggerItem}
                initial="initial"
                animate={isInView ? "animate" : "initial"}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Zap className="w-6 h-6 text-yellow-400" />
                        Recommended for You
                      </div>
                      <Button variant="ghost" size="sm">
                        View All
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {recommendedCourses.map((course, index) => (
                        <motion.div
                          key={course.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          className="p-4 rounded-xl glass hover:bg-white/10 transition-all duration-300 group"
                        >
                          <h4 className="font-semibold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                            {course.title}
                          </h4>
                          <p className="text-sm text-gray-400 mb-3">
                            by {course.instructor}
                          </p>
                          
                          <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span>{course.rating}</span>
                            </div>
                            <span>{course.students} students</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">{course.duration}</span>
                            <Button size="sm" variant="primary">
                              ${course.price}
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Sessions */}
              <motion.div
                variants={staggerItem}
                initial="initial"
                animate={isInView ? "animate" : "initial"}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Calendar className="w-6 h-6 text-purple-400" />
                      Upcoming Sessions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {upcomingSessions.map((session, index) => (
                      <motion.div
                        key={session.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-3 rounded-xl glass hover:bg-white/10 transition-colors group"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className={cn(
                              "w-2 h-2 rounded-full",
                              session.type === 'live' ? 'bg-red-400 animate-pulse' : 'bg-gray-400'
                            )}></div>
                            <span className="text-xs uppercase font-medium text-gray-400">
                              {session.type} via Google Meet
                            </span>
                          </div>
                          <Video className="w-4 h-4 text-emerald-400" />
                        </div>
                        
                        <h4 className="font-medium text-white text-sm mb-1 group-hover:text-emerald-300 transition-colors">
                          {session.title}
                        </h4>
                        <p className="text-xs text-gray-400 mb-2">
                          by {session.instructor}
                        </p>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-400">
                              {new Date(session.date).toLocaleDateString()} at {session.time}
                            </span>
                            <span className="text-gray-500">
                              {session.duration}min
                            </span>
                          </div>
                          
                          {session.meetingId && (
                            <div className="text-xs text-emerald-400 font-mono">
                              ID: {session.meetingId}
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between">
                            {session.meetingLink && (
                              <Button
                                size="sm"
                                variant="glass"
                                className="text-xs py-1 px-2 h-auto"
                                onClick={() => window.open(session.meetingLink, '_blank')}
                              >
                                <ExternalLink className="w-3 h-3 mr-1" />
                                Join Meeting
                              </Button>
                            )}
                            
                            {session.materials && session.materials.length > 0 && (
                              <div className="flex items-center gap-1 text-xs text-gray-400">
                                <FileText className="w-3 h-3" />
                                <span>{session.materials.length} files</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Achievements */}
              <motion.div
                variants={staggerItem}
                initial="initial"
                animate={isInView ? "animate" : "initial"}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Trophy className="w-6 h-6 text-yellow-400" />
                      Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {achievements.map((achievement, index) => (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={cn(
                          "p-3 rounded-xl border transition-all duration-300",
                          achievement.unlockedAt 
                            ? "border-yellow-500/30 bg-yellow-500/10" 
                            : "border-white/20 glass"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{achievement.icon}</div>
                          <div className="flex-1">
                            <h4 className="font-medium text-white text-sm">
                              {achievement.title}
                            </h4>
                            <p className="text-xs text-gray-400">
                              {achievement.description}
                            </p>
                            
                            {achievement.progress && (
                              <div className="mt-2">
                                <div className="flex justify-between text-xs text-gray-400 mb-1">
                                  <span>{achievement.progress}/{achievement.total}</span>
                                </div>
                                <div className="w-full h-1 bg-white/10 rounded-full">
                                  <div
                                    className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                                    style={{ width: `${(achievement.progress! / achievement.total!) * 100}%` }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                          
                          {achievement.unlockedAt && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="text-yellow-400"
                            >
                              <CheckCircle className="w-5 h-5" />
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </motion.div>
  )
}

export default function StudentDashboard() {
  return (
    <RequireAuth>
      <StudentDashboardContent />
    </RequireAuth>
  )
}
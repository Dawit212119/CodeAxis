'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  User,
  BookOpen,
  Target,
  Settings,
  Sparkles,
  GraduationCap,
  Clock,
  Star,
  Trophy,
  Heart,
  Brain,
  Zap
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FloatingInput, FloatingTextarea } from '@/components/ui/form-input'
import { cn } from '@/lib/utils'
import { pageVariants, staggerContainer, staggerItem } from '@/lib/animations'

interface StudentData {
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

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  coursePreferences?: string
  skillLevel?: string
  learningGoals?: string
}

export default function StudentRegistrationPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  
  const [studentData, setStudentData] = useState<StudentData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
    },
    coursePreferences: [],
    skillLevel: 'beginner',
    learningGoals: [],
    timeCommitment: '',
    preferredLearningStyle: [],
    motivation: '',
  })

  const steps = [
    {
      id: 'personal',
      title: 'Personal Information',
      description: 'Tell us about yourself',
      icon: User,
    },
    {
      id: 'courses',
      title: 'Course Interests',
      description: 'What would you like to learn?',
      icon: BookOpen,
    },
    {
      id: 'assessment',
      title: 'Skill Assessment',
      description: 'Help us understand your level',
      icon: Target,
    },
    {
      id: 'preferences',
      title: 'Learning Preferences',
      description: 'How do you learn best?',
      icon: Settings,
    },
    {
      id: 'goals',
      title: 'Your Goals',
      description: 'What do you want to achieve?',
      icon: Trophy,
    },
  ]

  const courseCategories = [
    { 
      id: 'web-development', 
      title: 'Web Development', 
      icon: '🌐',
      description: 'Frontend, Backend, Full-stack',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      id: 'mobile-development', 
      title: 'Mobile Development', 
      icon: '📱',
      description: 'iOS, Android, React Native',
      color: 'from-green-500 to-emerald-500'
    },
    { 
      id: 'data-science', 
      title: 'Data Science', 
      icon: '📊',
      description: 'Analytics, ML, AI',
      color: 'from-purple-500 to-pink-500'
    },
    { 
      id: 'ui-ux-design', 
      title: 'UI/UX Design', 
      icon: '🎨',
      description: 'User Interface, User Experience',
      color: 'from-orange-500 to-red-500'
    },
    { 
      id: 'cybersecurity', 
      title: 'Cybersecurity', 
      icon: '🔐',
      description: 'Security, Ethical Hacking',
      color: 'from-gray-500 to-slate-500'
    },
    { 
      id: 'cloud-computing', 
      title: 'Cloud Computing', 
      icon: '☁️',
      description: 'AWS, Azure, DevOps',
      color: 'from-indigo-500 to-blue-500'
    },
  ]

  const skillLevels = [
    {
      level: 'beginner',
      title: 'Beginner',
      description: 'New to programming and technology',
      icon: '🌱',
      color: 'from-green-400 to-emerald-500'
    },
    {
      level: 'intermediate',
      title: 'Intermediate', 
      description: 'Some experience with coding',
      icon: '🚀',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      level: 'advanced',
      title: 'Advanced',
      description: 'Experienced developer looking to specialize',
      icon: '⭐',
      color: 'from-purple-400 to-pink-500'
    },
  ]

  const learningStyles = [
    { id: 'visual', label: 'Visual Learning', icon: '👁️', description: 'Learn through diagrams and videos' },
    { id: 'hands-on', label: 'Hands-on Practice', icon: '🛠️', description: 'Learn by doing and building' },
    { id: 'reading', label: 'Reading & Research', icon: '📚', description: 'Learn through documentation' },
    { id: 'interactive', label: 'Interactive Sessions', icon: '💬', description: 'Learn through discussion' },
  ]

  const learningGoalOptions = [
    'Career Change', 'Skill Upgrade', 'Personal Growth', 'Academic Achievement', 
    'Freelancing', 'Startup Ideas', 'Certification', 'Portfolio Building'
  ]

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {}
    
    switch (step) {
      case 0: // Personal Info
        if (!studentData.personalInfo.firstName.trim()) newErrors.firstName = 'First name is required'
        if (!studentData.personalInfo.lastName.trim()) newErrors.lastName = 'Last name is required'
        if (!studentData.personalInfo.email.trim()) newErrors.email = 'Email is required'
        break
      case 1: // Course Preferences
        if (studentData.coursePreferences.length === 0) newErrors.coursePreferences = 'Please select at least one course category'
        break
      case 2: // Skill Level
        if (!studentData.skillLevel) newErrors.skillLevel = 'Please select your skill level'
        break
      case 4: // Learning Goals
        if (studentData.learningGoals.length === 0) newErrors.learningGoals = 'Please select at least one learning goal'
        break
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return
    
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    setTimeout(() => {
      window.location.href = '/learn/dashboard'
    }, 3000)
  }

  const toggleCourse = (courseId: string) => {
    setStudentData(prev => ({
      ...prev,
      coursePreferences: prev.coursePreferences.includes(courseId)
        ? prev.coursePreferences.filter(id => id !== courseId)
        : [...prev.coursePreferences, courseId]
    }))
  }

  const toggleLearningStyle = (styleId: string) => {
    setStudentData(prev => ({
      ...prev,
      preferredLearningStyle: prev.preferredLearningStyle.includes(styleId)
        ? prev.preferredLearningStyle.filter(id => id !== styleId)
        : [...prev.preferredLearningStyle, styleId]
    }))
  }

  const toggleLearningGoal = (goal: string) => {
    setStudentData(prev => ({
      ...prev,
      learningGoals: prev.learningGoals.includes(goal)
        ? prev.learningGoals.filter(g => g !== goal)
        : [...prev.learningGoals, goal]
    }))
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-background flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <GraduationCap className="w-12 h-12 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl font-bold text-white mb-4"
          >
            Welcome to CodeAxis Learn! 🎉
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-gray-300 mb-8 max-w-md mx-auto"
          >
            Your learning journey starts now. We're preparing your personalized dashboard...
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center justify-center gap-2 text-emerald-400"
          >
            <Sparkles className="w-5 h-5 animate-pulse" />
            <span>Redirecting to your dashboard...</span>
            <Sparkles className="w-5 h-5 animate-pulse" />
          </motion.div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-background"
    >
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="text-center mb-16"
          >
            <motion.div
              variants={staggerItem}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/20 mb-6"
            >
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-gray-300">Student Registration</span>
            </motion.div>

            <motion.h1
              variants={staggerItem}
              className="text-4xl md:text-6xl font-bold text-white font-display mb-6"
            >
              Start Your Learning
              <br />
              <span className="text-emerald-400">Journey</span>
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Join thousands of students mastering technology skills with our 
              world-class learning platform.
            </motion.p>
          </motion.div>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={cn(
                    "flex items-center gap-3 flex-1",
                    index < steps.length - 1 && "relative"
                  )}
                >
                  <motion.div 
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
                      index <= currentStep
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
                        : "glass text-gray-400"
                    )}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {index < currentStep ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </motion.div>
                  
                  <div className="hidden md:block">
                    <div className={cn(
                      "font-medium transition-colors",
                      index <= currentStep ? "text-white" : "text-gray-400"
                    )}>
                      {step.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {step.description}
                    </div>
                  </div>

                  {index < steps.length - 1 && (
                    <div className={cn(
                      "absolute top-6 left-12 w-full h-0.5 transition-colors -z-10",
                      index < currentStep 
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500" 
                        : "bg-white/10"
                    )} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Steps */}
          <Card className="mb-8" padding="lg">
            <AnimatePresence mode="wait">
              {/* Step 1: Personal Information */}
              {currentStep === 0 && (
                <motion.div
                  key="personal"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <User className="w-6 h-6 text-emerald-400" />
                      Personal Information
                    </CardTitle>
                    <p className="text-gray-400">Let's get to know you better</p>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FloatingInput
                        label="First Name"
                        value={studentData.personalInfo.firstName}
                        onChange={(e) => setStudentData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, firstName: e.target.value }
                        }))}
                        error={errors.firstName}
                      />
                      
                      <FloatingInput
                        label="Last Name"
                        value={studentData.personalInfo.lastName}
                        onChange={(e) => setStudentData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, lastName: e.target.value }
                        }))}
                        error={errors.lastName}
                      />
                    </div>

                    <FloatingInput
                      label="Email Address"
                      type="email"
                      value={studentData.personalInfo.email}
                      onChange={(e) => setStudentData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, email: e.target.value }
                      }))}
                      error={errors.email}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FloatingInput
                        label="Phone Number (Optional)"
                        type="tel"
                        value={studentData.personalInfo.phone}
                        onChange={(e) => setStudentData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, phone: e.target.value }
                        }))}
                      />
                      
                      <FloatingInput
                        label="Date of Birth"
                        type="date"
                        value={studentData.personalInfo.dateOfBirth}
                        onChange={(e) => setStudentData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, dateOfBirth: e.target.value }
                        }))}
                      />
                    </div>
                  </CardContent>
                </motion.div>
              )}

              {/* Step 2: Course Selection */}
              {currentStep === 1 && (
                <motion.div
                  key="courses"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <BookOpen className="w-6 h-6 text-emerald-400" />
                      Course Interests
                    </CardTitle>
                    <p className="text-gray-400">Select the areas you'd like to learn about</p>
                  </CardHeader>

                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {courseCategories.map((course, index) => (
                        <motion.div
                          key={course.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div
                            onClick={() => toggleCourse(course.id)}
                            className={cn(
                              "p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300",
                              "hover:bg-white/5 group",
                              studentData.coursePreferences.includes(course.id)
                                ? "border-emerald-500 bg-emerald-500/10"
                                : "border-white/20 hover:border-white/40"
                            )}
                          >
                            <div className="text-center">
                              <div className="text-4xl mb-3">{course.icon}</div>
                              <h3 className="font-semibold text-white mb-2">
                                {course.title}
                              </h3>
                              <p className="text-sm text-gray-400">
                                {course.description}
                              </p>
                              
                              {studentData.coursePreferences.includes(course.id) && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="mt-3 flex justify-center"
                                >
                                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                                    <Check className="w-4 h-4 text-white" />
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {errors.coursePreferences && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-400 text-sm mt-4"
                      >
                        {errors.coursePreferences}
                      </motion.p>
                    )}
                  </CardContent>
                </motion.div>
              )}

              {/* Step 3: Skill Assessment */}
              {currentStep === 2 && (
                <motion.div
                  key="assessment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Target className="w-6 h-6 text-emerald-400" />
                      Skill Level Assessment
                    </CardTitle>
                    <p className="text-gray-400">Help us understand your current skill level</p>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      {skillLevels.map((skill, index) => (
                        <motion.div
                          key={skill.level}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div
                            onClick={() => setStudentData(prev => ({ ...prev, skillLevel: skill.level as any }))}
                            className={cn(
                              "p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300",
                              "hover:bg-white/5 group flex items-center gap-4",
                              studentData.skillLevel === skill.level
                                ? "border-emerald-500 bg-emerald-500/10"
                                : "border-white/20 hover:border-white/40"
                            )}
                          >
                            <div className="text-3xl">{skill.icon}</div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-white text-lg">
                                {skill.title}
                              </h3>
                              <p className="text-gray-400">
                                {skill.description}
                              </p>
                            </div>
                            
                            <div className={cn(
                              "w-6 h-6 rounded-full border-2 transition-all duration-300",
                              studentData.skillLevel === skill.level
                                ? "border-emerald-500 bg-emerald-500"
                                : "border-gray-400"
                            )}>
                              {studentData.skillLevel === skill.level && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-full h-full rounded-full bg-emerald-500 flex items-center justify-center"
                                >
                                  <Check className="w-3 h-3 text-white" />
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </motion.div>
              )}

              {/* Step 4: Learning Preferences */}
              {currentStep === 3 && (
                <motion.div
                  key="preferences"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Settings className="w-6 h-6 text-emerald-400" />
                      Learning Preferences
                    </CardTitle>
                    <p className="text-gray-400">Tell us how you prefer to learn</p>
                  </CardHeader>

                  <CardContent className="space-y-8">
                    <div>
                      <h4 className="text-white font-medium mb-4">Preferred Learning Styles</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {learningStyles.map((style, index) => (
                          <motion.div
                            key={style.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div
                              onClick={() => toggleLearningStyle(style.id)}
                              className={cn(
                                "p-4 rounded-xl border cursor-pointer transition-all duration-300",
                                "hover:bg-white/5 flex items-center gap-3",
                                studentData.preferredLearningStyle.includes(style.id)
                                  ? "border-emerald-500 bg-emerald-500/10"
                                  : "border-white/20 hover:border-white/40"
                              )}
                            >
                              <div className="text-2xl">{style.icon}</div>
                              <div className="flex-1">
                                <h5 className="font-medium text-white text-sm">
                                  {style.label}
                                </h5>
                                <p className="text-xs text-gray-400">
                                  {style.description}
                                </p>
                              </div>
                              {studentData.preferredLearningStyle.includes(style.id) && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="text-emerald-400"
                                >
                                  <Check className="w-4 h-4" />
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-4">Time Commitment</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {['1-5 hours/week', '5-15 hours/week', '15+ hours/week'].map((time, index) => (
                          <motion.button
                            key={time}
                            onClick={() => setStudentData(prev => ({ ...prev, timeCommitment: time }))}
                            className={cn(
                              "p-4 rounded-xl border transition-all duration-300 text-center",
                              studentData.timeCommitment === time
                                ? "border-emerald-500 bg-emerald-500/10 text-white"
                                : "border-white/20 hover:border-white/40 text-gray-300 hover:text-white"
                            )}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Clock className="w-5 h-5 mx-auto mb-2" />
                            <div className="font-medium text-sm">{time}</div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </motion.div>
              )}

              {/* Step 5: Goals and Motivation */}
              {currentStep === 4 && (
                <motion.div
                  key="goals"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Trophy className="w-6 h-6 text-emerald-400" />
                      Learning Goals
                    </CardTitle>
                    <p className="text-gray-400">What do you want to achieve?</p>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="text-white font-medium mb-4">Select Your Goals</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {learningGoalOptions.map((goal, index) => (
                          <motion.button
                            key={goal}
                            onClick={() => toggleLearningGoal(goal)}
                            className={cn(
                              "p-3 rounded-xl border transition-all duration-300 text-center text-sm",
                              studentData.learningGoals.includes(goal)
                                ? "border-emerald-500 bg-emerald-500/10 text-white"
                                : "border-white/20 hover:border-white/40 text-gray-300 hover:text-white"
                            )}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            {goal}
                            {studentData.learningGoals.includes(goal) && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="mt-1 flex justify-center"
                              >
                                <Check className="w-3 h-3 text-emerald-400" />
                              </motion.div>
                            )}
                          </motion.button>
                        ))}
                      </div>
                      
                      {errors.learningGoals && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-red-400 text-sm mt-3"
                        >
                          {errors.learningGoals}
                        </motion.p>
                      )}
                    </div>

                    <FloatingTextarea
                      label="What motivates you to learn? (Optional)"
                      value={studentData.motivation}
                      onChange={(e) => setStudentData(prev => ({ ...prev, motivation: e.target.value }))}
                      className="min-h-[100px]"
                    />
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="disabled:opacity-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <div className="flex items-center gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    index === currentStep ? "bg-emerald-500" : "bg-white/20"
                  )}
                />
              ))}
            </div>

            {currentStep === steps.length - 1 ? (
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="relative overflow-hidden"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-black border-t-transparent rounded-full mr-2"
                    />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Start Learning
                    <Sparkles className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={nextStep}
                className="group"
              >
                Next Step
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </motion.div>
  )
}
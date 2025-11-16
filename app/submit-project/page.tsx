'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RequireAuth } from '@/lib/auth-context'
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Upload, 
  X,
  FileText,
  DollarSign,
  Calendar,
  Users,
  Briefcase,
  Sparkles,
  AlertCircle,
  CheckCircle,
  Trash2,
  Eye
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FloatingInput, FloatingTextarea } from '@/components/ui/form-input'
import { FileUpload } from '@/components/ui/file-upload'
import { SuccessAnimation } from '@/components/ui/success-animation'
import { cn } from '@/lib/utils'
import { pageVariants, staggerContainer, staggerItem } from '@/lib/animations'

interface ProjectData {
  title: string
  description: string
  category: string
  skills: string[]
  budget: string
  timeline: string
  files: File[]
  budgetType: 'fixed' | 'hourly'
  urgency: 'low' | 'medium' | 'high'
  experience: 'entry' | 'intermediate' | 'expert'
}

interface FormErrors {
  title?: string
  description?: string
  category?: string
  skills?: string
  budget?: string
  timeline?: string
}

function SubmitProjectPageContent() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isDragActive, setIsDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [projectData, setProjectData] = useState<ProjectData>({
    title: '',
    description: '',
    category: '',
    skills: [],
    budget: '',
    timeline: '',
    files: [],
    budgetType: 'fixed',
    urgency: 'medium',
    experience: 'intermediate',
  })

  const steps = [
    {
      id: 'basics',
      title: 'Project Basics',
      description: 'Tell us about your project',
      icon: Briefcase,
    },
    {
      id: 'details',
      title: 'Project Details',
      description: 'Specify requirements and scope',
      icon: FileText,
    },
    {
      id: 'budget',
      title: 'Budget & Timeline',
      description: 'Set your budget and timeline',
      icon: DollarSign,
    },
    {
      id: 'files',
      title: 'Files & Assets',
      description: 'Upload relevant files',
      icon: Upload,
    },
    {
      id: 'review',
      title: 'Review & Submit',
      description: 'Review your project details',
      icon: Check,
    },
  ]

  const categories = [
    { id: 'web-development', label: 'Web Development', icon: '🌐' },
    { id: 'mobile-development', label: 'Mobile Development', icon: '📱' },
    { id: 'ui-ux-design', label: 'UI/UX Design', icon: '🎨' },
    { id: 'graphic-design', label: 'Graphic Design', icon: '🖼️' },
    { id: 'digital-marketing', label: 'Digital Marketing', icon: '📈' },
    { id: 'content-writing', label: 'Content Writing', icon: '✍️' },
    { id: 'data-science', label: 'Data Science', icon: '📊' },
    { id: 'ai-ml', label: 'AI & Machine Learning', icon: '🤖' },
  ]

  const skillSuggestions = [
    'React', 'Vue.js', 'Angular', 'Node.js', 'Python', 'JavaScript', 'TypeScript',
    'UI/UX Design', 'Figma', 'Adobe Creative Suite', 'Sketch', 'Photoshop',
    'SEO', 'Content Marketing', 'Social Media', 'Google Ads', 'Analytics',
    'iOS Development', 'Android Development', 'React Native', 'Flutter',
    'Machine Learning', 'Data Analysis', 'TensorFlow', 'PyTorch'
  ]

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

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {}
    
    switch (step) {
      case 0: // Basic Info
        if (!projectData.title.trim()) newErrors.title = 'Project title is required'
        if (!projectData.description.trim()) newErrors.description = 'Project description is required'
        if (!projectData.category) newErrors.category = 'Please select a category'
        break
      case 1: // Details
        if (projectData.skills.length === 0) newErrors.skills = 'Please select at least one skill'
        break
      case 2: // Budget & Timeline
        if (!projectData.budget.trim()) newErrors.budget = 'Budget is required'
        if (!projectData.timeline.trim()) newErrors.timeline = 'Timeline is required'
        break
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return
    
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Show confetti effect
    setTimeout(() => {
      // Redirect to dashboard or success page
      console.log('Project submitted successfully:', projectData)
    }, 3000)
  }

  const handleFileUpload = (files: FileList) => {
    const newFiles = Array.from(files).filter(file => {
      const validTypes = ['image/', 'application/pdf', 'text/', '.doc', '.docx']
      return validTypes.some(type => file.type.startsWith(type) || file.name.includes(type))
    })
    
    setProjectData(prev => ({
      ...prev,
      files: [...prev.files, ...newFiles].slice(0, 5) // Max 5 files
    }))
  }

  const removeFile = (index: number) => {
    setProjectData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }))
  }

  const addSkill = (skill: string) => {
    if (!projectData.skills.includes(skill)) {
      setProjectData({
        ...projectData,
        skills: [...projectData.skills, skill]
      })
    }
  }

  const removeSkill = (skill: string) => {
    setProjectData({
      ...projectData,
      skills: projectData.skills.filter(s => s !== skill)
    })
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
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-300">Submit Your Project</span>
            </motion.div>

            <motion.h1
              variants={staggerItem}
              className="text-4xl md:text-6xl font-bold text-white font-display mb-6"
            >
              Bring Your Vision
              <br />
              <span className="text-gradient">To Life</span>
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Tell us about your project and we'll connect you with the perfect talent 
              to make it happen.
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
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
                    index <= currentStep
                      ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white"
                      : "glass text-gray-400"
                  )}>
                    {index < currentStep ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  
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
                      index < currentStep ? "bg-gradient-to-r from-primary-500 to-secondary-500" : "bg-white/10"
                    )} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Steps */}
          <Card className="mb-8" padding="lg">
            <AnimatePresence mode="wait">
              {/* Step 1: Project Basics */}
              {currentStep === 0 && (
                <motion.div
                  key="basics"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <CardHeader>
                    <CardTitle>Project Basics</CardTitle>
                    <p className="text-gray-400">Let's start with the fundamentals of your project.</p>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <FloatingInput
                      label="Project Title"
                      icon={Briefcase}
                      value={projectData.title}
                      onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                      error={errors.title}
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Project Category *
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {categories.map((category) => (
                          <motion.button
                            key={category.id}
                            onClick={() => setProjectData({ ...projectData, category: category.id })}
                            className={cn(
                              "p-4 rounded-xl border transition-all duration-300 text-left",
                              projectData.category === category.id
                                ? "border-primary-500 bg-primary-500/10 text-white"
                                : "border-white/10 hover:border-white/20 hover:bg-white/5 text-gray-300"
                            )}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="text-2xl mb-2">{category.icon}</div>
                            <div className="text-sm font-medium">{category.label}</div>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <FloatingTextarea
                      label="Project Description"
                      value={projectData.description}
                      onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                      error={errors.description}
                    />
                  </CardContent>
                </motion.div>
              )}

              {/* Step 2: Project Details */}
              {currentStep === 1 && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <CardHeader>
                    <CardTitle>Project Details</CardTitle>
                    <p className="text-gray-400">Specify the skills and expertise you're looking for.</p>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Required Skills *
                      </label>
                      
                      {/* Selected Skills */}
                      {projectData.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {projectData.skills.map((skill) => (
                            <span
                              key={skill}
                              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/20 text-primary-300 text-sm"
                            >
                              {skill}
                              <button
                                onClick={() => removeSkill(skill)}
                                className="hover:text-white transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Skill Suggestions */}
                      <div className="space-y-3">
                        <p className="text-sm text-gray-400">Popular skills:</p>
                        <div className="flex flex-wrap gap-2">
                          {skillSuggestions
                            .filter(skill => !projectData.skills.includes(skill))
                            .slice(0, 12)
                            .map((skill) => (
                            <motion.button
                              key={skill}
                              onClick={() => addSkill(skill)}
                              className="px-3 py-1 rounded-full glass text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              + {skill}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </motion.div>
              )}

              {/* Additional steps would continue here... */}
              {currentStep === 2 && (
                <motion.div
                  key="budget"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <CardHeader>
                    <CardTitle>Budget & Timeline</CardTitle>
                    <p className="text-gray-400">Set your project budget and expected timeline.</p>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center text-gray-400 py-12">
                      Budget & Timeline form fields would be implemented here...
                    </div>
                  </CardContent>
                </motion.div>
              )}

              {/* Step 3: Budget & Timeline */}
              {currentStep === 2 && (
                <motion.div
                  key="budget"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <CardHeader>
                    <CardTitle>Budget & Timeline</CardTitle>
                    <p className="text-gray-400">Set your project budget and expected timeline.</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-3">
                          Budget Type
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {(['fixed', 'hourly'] as const).map((type) => (
                            <motion.button
                              key={type}
                              onClick={() => setProjectData({ ...projectData, budgetType: type })}
                              className={cn(
                                "p-4 rounded-xl border transition-all duration-300 text-center",
                                projectData.budgetType === type
                                  ? "border-emerald-500 bg-emerald-500/10 text-white"
                                  : "border-white/10 hover:border-white/20 hover:bg-white/5 text-gray-300"
                              )}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <DollarSign className="w-5 h-5 mx-auto mb-2" />
                              <div className="font-medium capitalize">{type}</div>
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <FloatingInput
                        label={projectData.budgetType === 'fixed' ? 'Total Budget ($)' : 'Hourly Rate ($)'}
                        icon={DollarSign}
                        type="number"
                        value={projectData.budget}
                        onChange={(e) => setProjectData({ ...projectData, budget: e.target.value })}
                        error={errors.budget}
                      />
                    </div>

                    <FloatingInput
                      label="Expected Timeline"
                      icon={Calendar}
                      placeholder="e.g., 2 weeks, 1 month, 3 months"
                      value={projectData.timeline}
                      onChange={(e) => setProjectData({ ...projectData, timeline: e.target.value })}
                      error={errors.timeline}
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Project Urgency
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {(['low', 'medium', 'high'] as const).map((urgency) => (
                          <motion.button
                            key={urgency}
                            onClick={() => setProjectData({ ...projectData, urgency })}
                            className={cn(
                              "p-3 rounded-xl border transition-all duration-300 text-center",
                              projectData.urgency === urgency
                                ? "border-emerald-500 bg-emerald-500/10 text-white"
                                : "border-white/10 hover:border-white/20 hover:bg-white/5 text-gray-300"
                            )}
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className="font-medium capitalize">{urgency}</div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </motion.div>
              )}

              {/* Step 4: Files & Assets */}
              {currentStep === 3 && (
                <motion.div
                  key="files"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <CardHeader>
                    <CardTitle>Files & Assets</CardTitle>
                    <p className="text-gray-400">Upload any relevant files, documents, or assets.</p>
                  </CardHeader>
                  <CardContent>
                    <FileUpload
                      files={projectData.files}
                      onFilesChange={(files) => setProjectData({ ...projectData, files })}
                      maxFiles={5}
                    />
                  </CardContent>
                </motion.div>
              )}

              {/* Step 5: Review & Submit */}
              {currentStep === 4 && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <CardHeader>
                    <CardTitle>Review & Submit</CardTitle>
                    <p className="text-gray-400">Review your project details before submission.</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                        <h4 className="font-semibold text-white mb-2">Project Title</h4>
                        <p className="text-gray-300">{projectData.title}</p>
                      </div>
                      
                      <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                        <h4 className="font-semibold text-white mb-2">Budget</h4>
                        <p className="text-gray-300">
                          ${projectData.budget} ({projectData.budgetType})
                        </p>
                      </div>
                      
                      <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                        <h4 className="font-semibold text-white mb-2">Skills Required</h4>
                        <div className="flex flex-wrap gap-2">
                          {projectData.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {projectData.files.length > 0 && (
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                          <h4 className="font-semibold text-white mb-2">Uploaded Files</h4>
                          <p className="text-gray-300">{projectData.files.length} file(s) attached</p>
                        </div>
                      )}
                    </div>
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
                    index === currentStep ? "bg-primary-500" : "bg-white/20"
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
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Project
                    <Sparkles className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={nextStep}
                magnetic
              >
                Next Step
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </main>

      <Footer />
      
      <SuccessAnimation 
        isVisible={isSubmitted} 
        onComplete={() => {
          // Redirect to dashboard
          window.location.href = '/dashboard'
        }} 
      />
    </motion.div>
  )
}

export default function SubmitProjectPage() {
  return (
    <RequireAuth allowedRoles={['client', 'admin']}>
      <SubmitProjectPageContent />
    </RequireAuth>
  )
}
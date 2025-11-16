'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  FileText, 
  Download, 
  Eye, 
  Folder,
  Search,
  Filter,
  Calendar,
  Clock,
  BookOpen,
  Video,
  Image,
  Archive,
  ExternalLink,
  Star,
  ChevronDown,
  PlayCircle
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { pageVariants, staggerContainer, staggerItem } from '@/lib/animations'

interface Material {
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
  duration?: string // for videos
  meetingDate?: string // for session materials
}

export default function CourseMaterialsPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedCourse, setSelectedCourse] = useState('all')

  const materials: Material[] = [
    {
      id: '1',
      title: 'React Performance Optimization Guide',
      type: 'pdf',
      course: 'React Advanced Patterns',
      instructor: 'Sarah Chen',
      uploadDate: '2024-02-08',
      size: '2.4 MB',
      downloadCount: 156,
      rating: 4.8,
      description: 'Comprehensive guide covering React performance optimization techniques, memoization, and rendering strategies.',
      tags: ['React', 'Performance', 'Optimization', 'Memoization'],
      meetingDate: '2024-02-10'
    },
    {
      id: '2',
      title: 'Session Recording - React Hooks Deep Dive',
      type: 'video',
      course: 'React Advanced Patterns',
      instructor: 'Sarah Chen',
      uploadDate: '2024-02-05',
      size: '1.2 GB',
      downloadCount: 89,
      duration: '2h 15min',
      description: 'Complete recording of the live session covering custom hooks, useCallback, and useMemo.',
      tags: ['React', 'Hooks', 'Custom Hooks', 'Recording'],
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop',
      meetingDate: '2024-02-05'
    },
    {
      id: '3',
      title: 'Python Data Science Starter Kit',
      type: 'code',
      course: 'Python for Data Science',
      instructor: 'Dr. Michael Kumar',
      uploadDate: '2024-02-07',
      size: '45 MB',
      downloadCount: 234,
      description: 'Jupyter notebooks, datasets, and code examples for data science fundamentals.',
      tags: ['Python', 'Data Science', 'Jupyter', 'Pandas'],
      meetingDate: '2024-02-12'
    },
    {
      id: '4',
      title: 'UI/UX Design Principles Slides',
      type: 'slides',
      course: 'UI/UX Design Fundamentals',
      instructor: 'Emily Rodriguez',
      uploadDate: '2024-02-06',
      size: '15.6 MB',
      downloadCount: 178,
      rating: 4.9,
      description: 'Interactive presentation covering design thinking, user research, and prototyping methods.',
      tags: ['Design', 'UI/UX', 'Prototyping', 'User Research'],
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop'
    },
    {
      id: '5',
      title: 'JavaScript ES6+ Cheat Sheet',
      type: 'pdf',
      course: 'Advanced JavaScript',
      instructor: 'James Wilson',
      uploadDate: '2024-02-04',
      size: '1.8 MB',
      downloadCount: 312,
      rating: 4.7,
      description: 'Quick reference guide for modern JavaScript features, arrow functions, and async/await patterns.',
      tags: ['JavaScript', 'ES6', 'Cheat Sheet', 'Reference']
    },
    {
      id: '6',
      title: 'iOS App Architecture Diagrams',
      type: 'image',
      course: 'iOS Development with Swift',
      instructor: 'Alex Thompson',
      uploadDate: '2024-02-03',
      size: '8.2 MB',
      downloadCount: 67,
      description: 'Visual diagrams showing MVC, MVVM, and VIPER architecture patterns for iOS applications.',
      tags: ['iOS', 'Swift', 'Architecture', 'Diagrams'],
      thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=200&fit=crop'
    }
  ]

  const materialTypes = [
    { id: 'all', label: 'All Materials', icon: Folder, count: materials.length },
    { id: 'pdf', label: 'PDFs', icon: FileText, count: materials.filter(m => m.type === 'pdf').length },
    { id: 'video', label: 'Videos', icon: Video, count: materials.filter(m => m.type === 'video').length },
    { id: 'slides', label: 'Slides', icon: BookOpen, count: materials.filter(m => m.type === 'slides').length },
    { id: 'code', label: 'Code', icon: Archive, count: materials.filter(m => m.type === 'code').length },
    { id: 'image', label: 'Images', icon: Image, count: materials.filter(m => m.type === 'image').length },
  ]

  const courses = [
    'React Advanced Patterns',
    'Python for Data Science', 
    'UI/UX Design Fundamentals',
    'Advanced JavaScript',
    'iOS Development with Swift'
  ]

  const filteredMaterials = materials
    .filter(material => {
      const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           material.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           material.course.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = selectedType === 'all' || material.type === selectedType
      const matchesCourse = selectedCourse === 'all' || material.course === selectedCourse
      return matchesSearch && matchesType && matchesCourse
    })
    .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())

  const getFileIcon = (type: Material['type']) => {
    switch (type) {
      case 'pdf': return FileText
      case 'video': return Video
      case 'slides': return BookOpen
      case 'code': return Archive
      case 'image': return Image
      default: return FileText
    }
  }

  const getFileColor = (type: Material['type']) => {
    switch (type) {
      case 'pdf': return 'text-red-400'
      case 'video': return 'text-purple-400'
      case 'slides': return 'text-blue-400'
      case 'code': return 'text-green-400'
      case 'image': return 'text-yellow-400'
      default: return 'text-gray-400'
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
          {/* Header */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            className="mb-12"
          >
            <motion.h1
              variants={staggerItem}
              className="text-4xl md:text-5xl font-bold text-white font-display mb-4"
            >
              Course
              <br />
              <span className="text-emerald-400">Materials</span>
            </motion.h1>
            <motion.p
              variants={staggerItem}
              className="text-xl text-gray-300 max-w-3xl"
            >
              Access all your course materials, session recordings, and downloadable resources 
              from your enrolled courses. Materials are updated after each Google Meet session.
            </motion.p>
          </motion.div>

          {/* Filters and Search */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            className="mb-8"
          >
            {/* Material Type Filters */}
            <motion.div variants={staggerItem} className="mb-6">
              <div className="flex flex-wrap gap-3">
                {materialTypes.map((type) => {
                  const IconComponent = type.icon
                  return (
                    <motion.button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={cn(
                        'flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300',
                        selectedType === type.id
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                          : 'border-white/20 text-gray-300 hover:border-white/40 hover:bg-white/5'
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span className="text-sm font-medium">{type.label}</span>
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                        {type.count}
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>

            {/* Search and Course Filter */}
            <motion.div variants={staggerItem}>
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search materials, courses, or topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  />
                </div>

                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                >
                  <option value="all" className="bg-gray-900">All Courses</option>
                  {courses.map(course => (
                    <option key={course} value={course} className="bg-gray-900">
                      {course}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
          </motion.div>

          {/* Results Summary */}
          <motion.div
            variants={staggerItem}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            className="mb-8"
          >
            <p className="text-gray-300">
              Showing {filteredMaterials.length} of {materials.length} materials
            </p>
          </motion.div>

          {/* Materials Grid */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredMaterials.map((material, index) => {
              const IconComponent = getFileIcon(material.type)
              const iconColor = getFileColor(material.type)
              
              return (
                <motion.div
                  key={material.id}
                  variants={staggerItem}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group"
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      {/* File Icon and Type */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={cn("p-3 rounded-xl bg-white/10", iconColor)}>
                            <IconComponent className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="text-xs uppercase font-medium text-gray-400 mb-1">
                              {material.type}
                            </div>
                            <div className="text-sm text-gray-400">
                              {material.size}
                            </div>
                          </div>
                        </div>
                        
                        {material.rating && (
                          <div className="flex items-center gap-1 text-sm">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-gray-300">{material.rating}</span>
                          </div>
                        )}
                      </div>

                      {/* Thumbnail for videos/images */}
                      {material.thumbnail && (
                        <div className="relative mb-4 rounded-lg overflow-hidden">
                          <img
                            src={material.thumbnail}
                            alt={material.title}
                            className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {material.type === 'video' && material.duration && (
                            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                              {material.duration}
                            </div>
                          )}
                          {material.type === 'video' && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <PlayCircle className="w-12 h-12 text-white/80 group-hover:scale-110 transition-transform" />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Content */}
                      <h3 className="font-semibold text-white text-lg mb-2 group-hover:text-emerald-300 transition-colors line-clamp-2">
                        {material.title}
                      </h3>

                      <div className="text-sm text-gray-400 mb-3">
                        <div>{material.course}</div>
                        <div>by {material.instructor}</div>
                        {material.meetingDate && (
                          <div className="flex items-center gap-1 mt-1 text-emerald-400">
                            <Calendar className="w-3 h-3" />
                            Session: {new Date(material.meetingDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>

                      {material.description && (
                        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                          {material.description}
                        </p>
                      )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {material.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 text-xs rounded-full bg-white/10 text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <Download className="w-3 h-3" />
                          <span>{material.downloadCount} downloads</span>
                        </div>
                        
                        <div className="flex gap-2">
                          {material.type === 'video' ? (
                            <Button size="sm" variant="glass" className="group/btn">
                              <PlayCircle className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                              Watch
                            </Button>
                          ) : (
                            <Button size="sm" variant="glass" className="group/btn">
                              <Eye className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                              Preview
                            </Button>
                          )}
                          <Button size="sm" variant="primary" className="group/btn">
                            <Download className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Load More */}
          {filteredMaterials.length > 0 && (
            <motion.div
              variants={staggerItem}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              className="text-center mt-12"
            >
              <Button variant="glass" size="lg" className="group">
                Load More Materials
                <ChevronDown className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform" />
              </Button>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </motion.div>
  )
}
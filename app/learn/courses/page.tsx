'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Users, 
  Play,
  Heart,
  BookOpen,
  Award,
  TrendingUp,
  ChevronDown,
  X,
  Eye,
  ShoppingCart
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { pageVariants, staggerContainer, staggerItem } from '@/lib/animations'

interface Course {
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

export default function CoursesCatalogPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [sortBy, setSortBy] = useState('popular')
  const [showFilters, setShowFilters] = useState(false)
  const [previewCourse, setPreviewCourse] = useState<Course | null>(null)
  const [wishlistedCourses, setWishlistedCourses] = useState<Set<string>>(new Set())
  const [enrollingCourses, setEnrollingCourses] = useState<Set<string>>(new Set())
  const [enrolledCourses, setEnrolledCourses] = useState<Set<string>>(new Set())
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const categories = [
    { id: 'all', label: 'All Courses', count: 156 },
    { id: 'web-development', label: 'Web Development', count: 42 },
    { id: 'mobile-development', label: 'Mobile Development', count: 28 },
    { id: 'data-science', label: 'Data Science', count: 35 },
    { id: 'ui-ux-design', label: 'UI/UX Design', count: 24 },
    { id: 'cybersecurity', label: 'Cybersecurity', count: 18 },
    { id: 'cloud-computing', label: 'Cloud Computing', count: 21 },
  ]

  const levels = [
    { id: 'all', label: 'All Levels' },
    { id: 'beginner', label: 'Beginner' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'advanced', label: 'Advanced' },
  ]

  const sortOptions = [
    { id: 'popular', label: 'Most Popular' },
    { id: 'newest', label: 'Newest First' },
    { id: 'rating', label: 'Highest Rated' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'price-high', label: 'Price: High to Low' },
  ]

  const courses: Course[] = [
    {
      id: '1',
      title: 'Complete React Developer Course',
      instructor: 'Sarah Chen',
      description: 'Master React from basics to advanced patterns including hooks, context, and testing. Build production-ready applications with modern React practices.',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
      rating: 4.9,
      reviewCount: 2847,
      students: 15420,
      duration: '42 hours',
      lessons: 156,
      level: 'intermediate',
      category: 'web-development',
      price: 89,
      originalPrice: 199,
      isWishlisted: false,
      tags: ['React', 'JavaScript', 'Hooks', 'Redux'],
      lastUpdated: '2024-01-15',
      language: 'English',
      hasSubtitles: true,
      certificate: true
    },
    {
      id: '2',
      title: 'Python Machine Learning Masterclass',
      instructor: 'Dr. Michael Kumar',
      description: 'Comprehensive course covering ML algorithms, neural networks, and real-world projects. Learn scikit-learn, TensorFlow, and build intelligent systems.',
      thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop',
      rating: 4.8,
      reviewCount: 1923,
      students: 8750,
      duration: '38 hours',
      lessons: 124,
      level: 'intermediate',
      category: 'data-science',
      price: 129,
      originalPrice: 249,
      isWishlisted: false,
      tags: ['Python', 'Machine Learning', 'TensorFlow', 'Pandas'],
      lastUpdated: '2024-01-20',
      language: 'English',
      hasSubtitles: true,
      certificate: true
    },
    {
      id: '3',
      title: 'UI/UX Design from Zero to Hero',
      instructor: 'Emily Rodriguez',
      description: 'Learn design thinking, prototyping, and create stunning user interfaces. Master Figma and design systems for modern applications.',
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
      rating: 4.9,
      reviewCount: 3156,
      students: 12890,
      duration: '28 hours',
      lessons: 98,
      level: 'beginner',
      category: 'ui-ux-design',
      price: 79,
      originalPrice: 159,
      isWishlisted: true,
      tags: ['Figma', 'Design Thinking', 'Prototyping', 'User Research'],
      lastUpdated: '2024-01-25',
      language: 'English',
      hasSubtitles: true,
      certificate: true
    },
    {
      id: '4',
      title: 'Advanced JavaScript & ES6+',
      instructor: 'James Wilson',
      description: 'Deep dive into modern JavaScript features and advanced programming concepts. Master async/await, promises, and functional programming.',
      thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop',
      rating: 4.7,
      reviewCount: 1456,
      students: 6234,
      duration: '25 hours',
      lessons: 87,
      level: 'advanced',
      category: 'web-development',
      price: 99,
      isWishlisted: false,
      tags: ['JavaScript', 'ES6', 'Async/Await', 'Promises'],
      lastUpdated: '2024-02-01',
      language: 'English',
      hasSubtitles: false,
      certificate: true
    },
    {
      id: '5',
      title: 'iOS Development with Swift',
      instructor: 'Alex Thompson',
      description: 'Build professional iOS apps from scratch using Swift and SwiftUI. Create beautiful, responsive applications for Apple devices.',
      thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop',
      rating: 4.6,
      reviewCount: 892,
      students: 3456,
      duration: '35 hours',
      lessons: 112,
      level: 'intermediate',
      category: 'mobile-development',
      price: 119,
      originalPrice: 229,
      isWishlisted: false,
      tags: ['Swift', 'iOS', 'SwiftUI', 'Xcode'],
      lastUpdated: '2024-01-30',
      language: 'English',
      hasSubtitles: true,
      certificate: true
    },
    {
      id: '6',
      title: 'Cybersecurity Fundamentals',
      instructor: 'Dr. Rachel Park',
      description: 'Essential security concepts, ethical hacking, and network protection. Learn to identify vulnerabilities and secure systems effectively.',
      thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop',
      rating: 4.8,
      reviewCount: 1234,
      students: 5678,
      duration: '32 hours',
      lessons: 104,
      level: 'beginner',
      category: 'cybersecurity',
      price: 109,
      isWishlisted: false,
      tags: ['Security', 'Ethical Hacking', 'Network Security', 'Penetration Testing'],
      lastUpdated: '2024-02-05',
      language: 'English',
      hasSubtitles: true,
      certificate: true
    },
    {
      id: '7',
      title: 'Microservices Architecture & Design',
      instructor: 'David Lee',
      description: 'Design and build scalable microservices architectures. Learn service communication, API design, and distributed system patterns.',
      thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop',
      rating: 4.8,
      reviewCount: 1567,
      students: 7234,
      duration: '40 hours',
      lessons: 138,
      level: 'advanced',
      category: 'cloud-computing',
      price: 139,
      originalPrice: 279,
      isWishlisted: false,
      tags: ['Microservices', 'Architecture', 'API Design', 'Distributed Systems'],
      lastUpdated: '2024-02-10',
      language: 'English',
      hasSubtitles: true,
      certificate: true
    },
    {
      id: '8',
      title: 'Docker & Container Orchestration',
      instructor: 'Marcus Johnson',
      description: 'Master Docker containerization and Kubernetes orchestration. Deploy and manage applications at scale with modern DevOps practices.',
      thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop',
      rating: 4.7,
      reviewCount: 1234,
      students: 6789,
      duration: '36 hours',
      lessons: 128,
      level: 'intermediate',
      category: 'cloud-computing',
      price: 119,
      originalPrice: 239,
      isWishlisted: false,
      tags: ['Docker', 'Kubernetes', 'DevOps', 'Containers'],
      lastUpdated: '2024-02-08',
      language: 'English',
      hasSubtitles: true,
      certificate: true
    },
    {
      id: '9',
      title: 'Go Programming Language Essentials',
      instructor: 'Robert Chen',
      description: 'Learn Go from scratch and build high-performance applications. Master concurrency, goroutines, and build production-ready services.',
      thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop',
      rating: 4.6,
      reviewCount: 892,
      students: 4567,
      duration: '32 hours',
      lessons: 110,
      level: 'intermediate',
      category: 'web-development',
      price: 99,
      originalPrice: 199,
      isWishlisted: false,
      tags: ['Go', 'Golang', 'Concurrency', 'Backend'],
      lastUpdated: '2024-02-12',
      language: 'English',
      hasSubtitles: true,
      certificate: true
    },
    {
      id: '10',
      title: 'Rust Programming for Systems Development',
      instructor: 'Lisa Anderson',
      description: 'Master Rust and build safe, fast systems. Learn ownership, borrowing, and create efficient applications without garbage collection.',
      thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop',
      rating: 4.7,
      reviewCount: 1123,
      students: 5234,
      duration: '38 hours',
      lessons: 132,
      level: 'advanced',
      category: 'web-development',
      price: 129,
      originalPrice: 259,
      isWishlisted: false,
      tags: ['Rust', 'Systems Programming', 'Memory Safety', 'Performance'],
      lastUpdated: '2024-02-14',
      language: 'English',
      hasSubtitles: true,
      certificate: true
    },
    {
      id: '11',
      title: 'C++ Advanced Programming',
      instructor: 'Thomas Mueller',
      description: 'Advanced C++ concepts including templates, STL, and modern C++ standards. Build high-performance applications and game engines.',
      thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop',
      rating: 4.6,
      reviewCount: 945,
      students: 3890,
      duration: '44 hours',
      lessons: 156,
      level: 'advanced',
      category: 'web-development',
      price: 139,
      originalPrice: 279,
      isWishlisted: false,
      tags: ['C++', 'Templates', 'STL', 'Game Development'],
      lastUpdated: '2024-02-16',
      language: 'English',
      hasSubtitles: true,
      certificate: true
    },
    {
      id: '12',
      title: 'Java Enterprise Development',
      instructor: 'Patricia Williams',
      description: 'Build enterprise applications with Java. Learn Spring Boot, microservices, and enterprise design patterns for scalable systems.',
      thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop',
      rating: 4.8,
      reviewCount: 1678,
      students: 8234,
      duration: '40 hours',
      lessons: 142,
      level: 'intermediate',
      category: 'web-development',
      price: 119,
      originalPrice: 239,
      isWishlisted: false,
      tags: ['Java', 'Spring Boot', 'Enterprise', 'Microservices'],
      lastUpdated: '2024-02-18',
      language: 'English',
      hasSubtitles: true,
      certificate: true
    },
    {
      id: '13',
      title: 'Next.js Full Stack Development',
      instructor: 'Kevin Park',
      description: 'Build full-stack applications with Next.js. Master server-side rendering, API routes, and deploy production-ready applications.',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
      rating: 4.9,
      reviewCount: 2345,
      students: 11234,
      duration: '38 hours',
      lessons: 134,
      level: 'intermediate',
      category: 'web-development',
      price: 99,
      originalPrice: 199,
      isWishlisted: false,
      tags: ['Next.js', 'React', 'Full Stack', 'SSR'],
      lastUpdated: '2024-02-20',
      language: 'English',
      hasSubtitles: true,
      certificate: true
    },
    {
      id: '14',
      title: 'Flutter Mobile App Development',
      instructor: 'Nina Patel',
      description: 'Create beautiful cross-platform mobile apps with Flutter. Build for iOS and Android from a single codebase with Dart.',
      thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop',
      rating: 4.7,
      reviewCount: 1456,
      students: 6789,
      duration: '36 hours',
      lessons: 128,
      level: 'intermediate',
      category: 'mobile-development',
      price: 109,
      originalPrice: 219,
      isWishlisted: false,
      tags: ['Flutter', 'Dart', 'Mobile', 'Cross-platform'],
      lastUpdated: '2024-02-22',
      language: 'English',
      hasSubtitles: true,
      certificate: true
    },
    {
      id: '15',
      title: 'React Native for Cross-Platform Development',
      instructor: 'Oscar Martinez',
      description: 'Build native mobile apps using React Native. Share code between iOS and Android while maintaining native performance.',
      thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop',
      rating: 4.6,
      reviewCount: 1234,
      students: 5678,
      duration: '34 hours',
      lessons: 120,
      level: 'intermediate',
      category: 'mobile-development',
      price: 99,
      originalPrice: 199,
      isWishlisted: false,
      tags: ['React Native', 'Mobile', 'JavaScript', 'Cross-platform'],
      lastUpdated: '2024-02-24',
      language: 'English',
      hasSubtitles: true,
      certificate: true
    },
    {
      id: '16',
      title: 'Data Structures & Algorithms Masterclass',
      instructor: 'Dr. Vikram Singh',
      description: 'Master DSA with comprehensive coverage of algorithms, data structures, and problem-solving techniques for coding interviews.',
      thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop',
      rating: 4.9,
      reviewCount: 2567,
      students: 13456,
      duration: '45 hours',
      lessons: 160,
      level: 'advanced',
      category: 'data-science',
      price: 129,
      originalPrice: 259,
      isWishlisted: false,
      tags: ['DSA', 'Algorithms', 'Data Structures', 'Interview Prep'],
      lastUpdated: '2024-02-26',
      language: 'English',
      hasSubtitles: true,
      certificate: true
    },
    {
      id: '17',
      title: 'Object-Oriented Programming Principles',
      instructor: 'Dr. Elena Rossi',
      description: 'Master OOP concepts including inheritance, polymorphism, encapsulation, and design patterns for robust software architecture.',
      thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop',
      rating: 4.8,
      reviewCount: 1789,
      students: 7890,
      duration: '32 hours',
      lessons: 114,
      level: 'intermediate',
      category: 'web-development',
      price: 89,
      originalPrice: 179,
      isWishlisted: false,
      tags: ['OOP', 'Design Patterns', 'SOLID', 'Architecture'],
      lastUpdated: '2024-02-28',
      language: 'English',
      hasSubtitles: true,
      certificate: true
    }
  ]

  const filteredCourses = courses
    .filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory
      const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel
      return matchesSearch && matchesCategory && matchesLevel
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        case 'rating':
          return b.rating - a.rating
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'popular':
        default:
          return b.students - a.students
      }
    })

  const toggleWishlist = (courseId: string) => {
    setWishlistedCourses(prev => {
      const newSet = new Set(prev)
      if (newSet.has(courseId)) {
        newSet.delete(courseId)
      } else {
        newSet.add(courseId)
      }
      return newSet
    })
  }

  const handleEnroll = async (courseId: string) => {
    try {
      setError(null)
      setEnrollingCourses(prev => new Set(prev).add(courseId))

      const response = await fetch(`/api/courses/${courseId}/enroll`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.status === 401) {
        setError('Please sign in to enroll in courses')
        return
      }

      if (!response.ok) {
        const data = await response.json()
        setError(data.error || 'Failed to enroll in course')
        return
      }

      setEnrolledCourses(prev => new Set(prev).add(courseId))
      setSuccess(`Successfully enrolled in ${previewCourse?.title || 'course'}!`)
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError('An error occurred while enrolling')
      console.error('Enroll error:', err)
    } finally {
      setEnrollingCourses(prev => {
        const newSet = new Set(prev)
        newSet.delete(courseId)
        return newSet
      })
    }
  }

  const getLevelColor = (level: Course['level']) => {
    switch (level) {
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
              Discover Your Next
              <br />
              <span className="text-emerald-400">Learning Adventure</span>
            </motion.h1>
            <motion.p
              variants={staggerItem}
              className="text-xl text-gray-300 max-w-3xl"
            >
              Explore our comprehensive catalog of courses designed by industry experts. 
              From beginner to advanced, find the perfect course for your learning journey.
            </motion.p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            className="mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search Bar */}
              <motion.div variants={staggerItem} className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search courses, instructors, or topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
                  />
                </div>
              </motion.div>

              {/* Filter Controls */}
              <motion.div variants={staggerItem} className="flex gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id} className="bg-gray-900">
                      {category.label} ({category.count})
                    </option>
                  ))}
                </select>

                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                >
                  {levels.map(level => (
                    <option key={level.id} value={level.id} className="bg-gray-900">
                      {level.label}
                    </option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                >
                  {sortOptions.map(option => (
                    <option key={option.id} value={option.id} className="bg-gray-900">
                      {option.label}
                    </option>
                  ))}
                </select>
              </motion.div>
            </div>
          </motion.div>

          {/* Results Summary */}
          <motion.div
            variants={staggerItem}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <p className="text-gray-300">
                Showing {filteredCourses.length} of {courses.length} courses
              </p>
              <div className="flex items-center gap-4">
                {(searchTerm || selectedCategory !== 'all' || selectedLevel !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedCategory('all')
                      setSelectedLevel('all')
                    }}
                    className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Clear filters
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Courses Grid */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  variants={staggerItem}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group"
                >
                  <Card className="h-full overflow-hidden">
                    <div className="relative">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Course Level Badge */}
                      <div className="absolute top-3 left-3">
                        <span className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          getLevelColor(course.level)
                        )}>
                          {course.level}
                        </span>
                      </div>

                      {/* Wishlist Button */}
                      <motion.button
                        onClick={() => toggleWishlist(course.id)}
                        className="absolute top-3 right-3 p-2 rounded-full glass hover:bg-white/20 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart className={cn(
                          "w-4 h-4 transition-colors",
                          wishlistedCourses.has(course.id) 
                            ? "fill-red-400 text-red-400" 
                            : "text-white"
                        )} />
                      </motion.button>

                      {/* Play Button Overlay */}
                      <motion.div
                        className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
                      >
                        <motion.button
                          onClick={() => setPreviewCourse(course)}
                          className="p-4 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Play className="w-6 h-6 text-white" />
                        </motion.button>
                      </motion.div>

                      {/* Discount Badge */}
                      {course.originalPrice && (
                        <div className="absolute bottom-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                          {Math.round((1 - course.price / course.originalPrice) * 100)}% OFF
                        </div>
                      )}
                    </div>

                    <CardContent className="p-6">
                      <div className="mb-3">
                        <h3 className="font-bold text-white text-lg mb-2 group-hover:text-emerald-300 transition-colors line-clamp-2">
                          {course.title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          by {course.instructor}
                        </p>
                      </div>

                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {course.description}
                      </p>

                      {/* Course Stats */}
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{course.rating}</span>
                          <span>({course.reviewCount})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{course.students.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {course.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 text-xs rounded-full bg-white/10 text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Price and CTA */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-white">
                            ${course.price}
                          </span>
                          {course.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                              ${course.originalPrice}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="glass"
                            onClick={() => setPreviewCourse(course)}
                            className="group/btn"
                          >
                            <Eye className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                            Preview
                          </Button>
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => handleEnroll(course.id)}
                            disabled={enrollingCourses.has(course.id) || enrolledCourses.has(course.id)}
                            className="group/btn"
                          >
                            {enrollingCourses.has(course.id) ? (
                              <>
                                <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Enrolling...
                              </>
                            ) : enrolledCourses.has(course.id) ? (
                              <>
                                <ShoppingCart className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                                Enrolled
                              </>
                            ) : (
                              <>
                                <ShoppingCart className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                                Enroll
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Load More */}
          {filteredCourses.length > 0 && (
            <motion.div
              variants={staggerItem}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              className="text-center mt-12"
            >
              <Button variant="glass" size="lg" className="group">
                Load More Courses
                <ChevronDown className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform" />
              </Button>
            </motion.div>
          )}
        </div>
      </main>

      {/* Course Preview Modal */}
      <AnimatePresence>
        {previewCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setPreviewCourse(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {previewCourse.title}
                  </h2>
                  <p className="text-gray-400">
                    by {previewCourse.instructor}
                  </p>
                </div>
                <button
                  onClick={() => setPreviewCourse(null)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200"
                >
                  {error}
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-lg text-emerald-200"
                >
                  {success}
                </motion.div>
              )}

              <img
                src={previewCourse.thumbnail}
                alt={previewCourse.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-gray-400 text-sm">Rating</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{previewCourse.rating}</p>
                  <p className="text-xs text-gray-400">({previewCourse.reviewCount} reviews)</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400 text-sm">Students</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{(previewCourse.students / 1000).toFixed(1)}K</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400 text-sm">Duration</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{previewCourse.duration}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">About This Course</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {previewCourse.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-3">Course Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-emerald-400" />
                        <span className="text-gray-300">{previewCourse.lessons} lessons</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                        <span className="text-gray-300 capitalize">{previewCourse.level} level</span>
                      </div>
                      {previewCourse.certificate && (
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-yellow-400" />
                          <span className="text-gray-300">Certificate included</span>
                        </div>
                      )}
                      {previewCourse.hasSubtitles && (
                        <div className="flex items-center gap-2">
                          <Play className="w-4 h-4 text-emerald-400" />
                          <span className="text-gray-300">Subtitles available</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white mb-3">Topics Covered</h3>
                    <div className="flex flex-wrap gap-2">
                      {previewCourse.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-xs rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-white">
                      ${previewCourse.price}
                    </span>
                    {previewCourse.originalPrice && (
                      <span className="text-lg text-gray-400 line-through">
                        ${previewCourse.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="group"
                    onClick={() => handleEnroll(previewCourse.id)}
                    disabled={enrollingCourses.has(previewCourse.id) || enrolledCourses.has(previewCourse.id)}
                  >
                    {enrollingCourses.has(previewCourse.id) ? (
                      <>
                        <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Enrolling...
                      </>
                    ) : enrolledCourses.has(previewCourse.id) ? (
                      <>
                        <ShoppingCart className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                        Enrolled
                      </>
                    ) : (
                      <>
                        Enroll Now
                        <ShoppingCart className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </motion.div>
  )
}
'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { RequireAuth } from '@/lib/auth-context'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Briefcase, 
  DollarSign,
  Clock,
  Star,
  Activity,
  Filter,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Calendar,
  CheckCircle,
  AlertCircle,
  XCircle,
  Pause,
  Play,
  Download,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatusBadge } from '@/components/ui/status-badge'
import { Skeleton, TableSkeleton, CardSkeleton, ChartSkeleton } from '@/components/ui/loading-skeleton'
import { AnimatedBarChart, AnimatedLineChart, ProgressRing } from '@/components/ui/animated-chart'
import { cn } from '@/lib/utils'
import { pageVariants, staggerContainer, staggerItem } from '@/lib/animations'

interface Project {
  id: string
  title: string
  client: string
  status: 'active' | 'completed' | 'pending' | 'cancelled'
  budget: number
  progress: number
  deadline: string
  avatar: string
}

interface DashboardStats {
  totalProjects: number
  activeProjects: number
  completedProjects: number
  totalEarnings: number
  avgRating: number
  responseRate: number
}

export default function DashboardPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })
  const [activeTab, setActiveTab] = useState('overview')
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState<'date' | 'budget' | 'status'>('date')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const stats: DashboardStats = {
    totalProjects: 127,
    activeProjects: 8,
    completedProjects: 119,
    totalEarnings: 245000,
    avgRating: 4.9,
    responseRate: 98
  }

  const projects: Project[] = [
    {
      id: '1',
      title: 'E-commerce Platform Redesign',
      client: 'TechCorp Inc.',
      status: 'active',
      budget: 15000,
      progress: 75,
      deadline: '2024-02-15',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: '2',
      title: 'Mobile App Development',
      client: 'StartupXYZ',
      status: 'active',
      budget: 25000,
      progress: 45,
      deadline: '2024-03-01',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b734b32b?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: '3',
      title: 'Brand Identity Package',
      client: 'Creative Agency',
      status: 'completed',
      budget: 8000,
      progress: 100,
      deadline: '2024-01-20',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: '4',
      title: 'Data Analytics Dashboard',
      client: 'FinTech Solutions',
      status: 'pending',
      budget: 18000,
      progress: 0,
      deadline: '2024-04-10',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
    }
  ]

  // Chart data
  const revenueData = [
    { label: 'Jan', value: 45000 },
    { label: 'Feb', value: 52000 },
    { label: 'Mar', value: 48000 },
    { label: 'Apr', value: 61000 },
    { label: 'May', value: 55000 },
    { label: 'Jun', value: 67000 },
  ]

  const activityData = [
    { x: 'Mon', y: 12 },
    { x: 'Tue', y: 19 },
    { x: 'Wed', y: 8 },
    { x: 'Thu', y: 15 },
    { x: 'Fri', y: 22 },
    { x: 'Sat', y: 6 },
    { x: 'Sun', y: 4 },
  ]

  // Filter and sort projects
  const filteredProjects = projects
    .filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.client.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filterStatus === 'all' || project.status === filterStatus
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'budget':
          return b.budget - a.budget
        case 'status':
          return a.status.localeCompare(b.status)
        case 'date':
        default:
          return new Date(b.deadline).getTime() - new Date(a.deadline).getTime()
      }
    })

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      icon: Briefcase,
      gradient: 'from-blue-500 to-cyan-500',
      change: '+12%',
      changeType: 'positive' as const
    },
    {
      title: 'Active Projects',
      value: stats.activeProjects,
      icon: Activity,
      gradient: 'from-green-500 to-emerald-500',
      change: '+5%',
      changeType: 'positive' as const
    },
    {
      title: 'Total Earnings',
      value: `$${stats.totalEarnings.toLocaleString()}`,
      icon: DollarSign,
      gradient: 'from-purple-500 to-pink-500',
      change: '+18%',
      changeType: 'positive' as const
    },
    {
      title: 'Avg Rating',
      value: stats.avgRating,
      icon: Star,
      gradient: 'from-orange-500 to-red-500',
      change: '+0.2',
      changeType: 'positive' as const
    }
  ]

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'completed':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'cancelled':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <RequireAuth>
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
          {/* Page Header */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            className="mb-12"
          >
            <motion.div
              variants={staggerItem}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            >
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-2">
                  Dashboard
                </h1>
                <p className="text-xl text-gray-300">
                  Welcome back! Here's what's happening with your projects.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Button variant="glass" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="primary" size="sm" magnetic glow>
                  <Briefcase className="w-4 h-4 mr-2" />
                  New Project
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {isLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))
            ) : (
              statCards.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  variants={staggerItem}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Card className="group relative overflow-hidden">
                    <CardContent className="p-6 relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <motion.div 
                          className="w-12 h-12 rounded-xl bg-white flex items-center justify-center"
                          whileHover={{ rotateY: 180, scale: 1.1 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                          <stat.icon className="w-6 h-6 text-black" />
                        </motion.div>
                        <motion.span 
                          className={cn(
                            "text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1",
                            stat.changeType === 'positive' ? 'text-green-400 bg-green-500/20' : 'text-red-400 bg-red-500/20'
                          )}
                          whileHover={{ scale: 1.1 }}
                        >
                          {stat.changeType === 'positive' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          {stat.change}
                        </motion.span>
                      </div>
                      <motion.h3 
                        className="text-3xl font-bold text-white mb-2 font-display"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                      >
                        {stat.value}
                      </motion.h3>
                      <p className="text-gray-400 text-sm">
                        {stat.title}
                      </p>
                    </CardContent>
                    
                    {/* Background gradient animation */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                  </Card>
                </motion.div>
              ))
            )}
          </motion.div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {/* Revenue Chart */}
            <motion.div
              variants={staggerItem}
              className="lg:col-span-2"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <BarChart3 className="w-6 h-6 text-emerald-400" />
                    Monthly Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <ChartSkeleton height={300} />
                  ) : (
                    <AnimatedBarChart data={revenueData} height={300} />
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Activity Overview */}
            <motion.div variants={staggerItem}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Activity className="w-6 h-6 text-blue-400" />
                    Weekly Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  {isLoading ? (
                    <div className="w-32 h-32">
                      <Skeleton variant="circular" className="w-full h-full" />
                    </div>
                  ) : (
                    <ProgressRing progress={78} size={150} />
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Projects Table */}
          <motion.div
            variants={staggerItem}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
          >
            <Card className="overflow-hidden">
              <CardHeader className="border-b border-white/10">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3">
                    <Briefcase className="w-6 h-6 text-primary-400" />
                    Recent Projects
                  </CardTitle>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 input-glass w-64"
                      />
                    </div>
                    
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="input-glass w-32"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                      <option value="pending">Pending</option>
                      <option value="in-review">In Review</option>
                      <option value="paused">Paused</option>
                    </select>
                    
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as 'date' | 'budget' | 'status')}
                      className="input-glass w-32"
                    >
                      <option value="date">Sort by Date</option>
                      <option value="budget">Sort by Budget</option>
                      <option value="status">Sort by Status</option>
                    </select>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left p-6 text-gray-300 font-medium">Project</th>
                        <th className="text-left p-6 text-gray-300 font-medium">Status</th>
                        <th className="text-left p-6 text-gray-300 font-medium">Progress</th>
                        <th className="text-left p-6 text-gray-300 font-medium">Budget</th>
                        <th className="text-left p-6 text-gray-300 font-medium">Deadline</th>
                        <th className="text-left p-6 text-gray-300 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <AnimatePresence>
                        {isLoading ? (
                          <tr>
                            <td colSpan={6} className="p-6">
                              <TableSkeleton rows={6} />
                            </td>
                          </tr>
                        ) : (
                          filteredProjects.map((project, index) => (
                            <motion.tr
                              key={project.id}
                              className="border-b border-white/5 hover:bg-white/5 transition-colors"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ delay: index * 0.05 }}
                              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', scale: 1.01 }}
                            >
                          <td className="p-6">
                            <div className="flex items-center gap-3">
                              <img
                                src={project.avatar}
                                alt={project.client}
                                className="w-10 h-10 rounded-full"
                              />
                              <div>
                                <div className="font-medium text-white">
                                  {project.title}
                                </div>
                                <div className="text-sm text-gray-400">
                                  {project.client}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-6">
                            <StatusBadge 
                              status={project.status as any} 
                              animate={project.status === 'active' || project.status === 'in-review'}
                            />
                          </td>
                          <td className="p-6">
                            <div className="flex items-center gap-3">
                              <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${project.progress}%` }}
                                  transition={{ duration: 1, ease: 'easeOut', delay: index * 0.1 }}
                                />
                              </div>
                              <motion.span 
                                className="text-sm text-gray-400 font-medium"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.1 + 0.5 }}
                              >
                                {project.progress}%
                              </motion.span>
                            </div>
                          </td>
                          <td className="p-6">
                            <span className="text-white font-medium">
                              ${project.budget.toLocaleString()}
                            </span>
                          </td>
                          <td className="p-6">
                            <div className="flex items-center gap-2 text-gray-400">
                              <Clock className="w-4 h-4" />
                              <span className="text-sm">
                                {new Date(project.deadline).toLocaleDateString()}
                              </span>
                            </div>
                          </td>
                          <td className="p-6">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                            </motion.tr>
                          ))
                        )}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </motion.div>
    </RequireAuth>
  )
}
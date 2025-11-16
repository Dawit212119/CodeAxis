'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  DollarSign, 
  Clock, 
  MapPin,
  Briefcase,
  TrendingUp,
  Star,
  Users,
  Calendar,
  Award,
  Zap
} from 'lucide-react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { StatusBadge } from '@/components/ui/status-badge'
import { cn } from '@/lib/utils'
import { pageVariants, staggerContainer, staggerItem } from '@/lib/animations'

interface Project {
  id: string
  title: string
  description: string
  budgetAmount: number
  budgetType: string
  skills: string[]
  status: string
  createdAt: string
  client: {
    firstName: string
    lastName: string
    avatar: string
    stats: {
      rating: number
      reviewCount: number
    }
  }
  _count: {
    proposals: number
  }
}

export default function FindWorkPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects?status=OPEN')
      const data = await response.json()
      setProjects(data.projects || [])
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const categories = [
    { id: 'all', name: 'All Projects', count: 1250 },
    { id: 'web', name: 'Web Development', count: 450 },
    { id: 'mobile', name: 'Mobile Apps', count: 320 },
    { id: 'design', name: 'Design', count: 280 },
    { id: 'data', name: 'Data Science', count: 150 },
    { id: 'marketing', name: 'Marketing', count: 50 },
  ]

  const stats = [
    { icon: Briefcase, label: 'Active Projects', value: '1,250+', color: 'text-blue-400' },
    { icon: Users, label: 'Clients Hiring', value: '5,000+', color: 'text-emerald-400' },
    { icon: DollarSign, label: 'Total Paid', value: '$10M+', color: 'text-yellow-400' },
    { icon: Award, label: 'Success Rate', value: '98%', color: 'text-purple-400' },
  ]

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen"
    >
      <Header />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                variants={staggerItem}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/20 mb-6"
              >
                <Zap className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-gray-300">
                  1,250+ Projects Available Now
                </span>
              </motion.div>

              <motion.h1
                variants={staggerItem}
                className="text-5xl md:text-7xl font-bold text-white font-display leading-tight mb-6"
              >
                Find Your Next
                <br />
                <span className="text-emerald-400">Great Opportunity</span>
              </motion.h1>

              <motion.p
                variants={staggerItem}
                className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
              >
                Browse thousands of projects from clients worldwide. Find work that matches 
                your skills and start earning today.
              </motion.p>

              {/* Search Bar */}
              <motion.div
                variants={staggerItem}
                className="max-w-3xl mx-auto"
              >
                <div className="glass rounded-2xl p-2 border border-white/10">
                  <div className="flex flex-col md:flex-row gap-2">
                    <div className="flex-1 relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search projects by skills or keywords..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <Button variant="primary" size="lg" className="md:w-auto">
                      Search Projects
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={staggerItem}
                  className="glass rounded-2xl p-6 border border-white/10 text-center hover:border-emerald-500/50 transition-all"
                >
                  <stat.icon className={cn("w-8 h-8 mx-auto mb-3", stat.color)} />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "px-4 py-2 rounded-full border transition-all",
                    selectedCategory === category.id
                      ? "bg-emerald-500 border-emerald-500 text-white"
                      : "glass border-white/10 text-gray-300 hover:border-emerald-500/50"
                  )}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {isLoading ? (
              <div className="space-y-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="glass rounded-2xl p-6 border border-white/10 animate-pulse">
                    <div className="h-6 bg-white/5 rounded mb-4 w-3/4" />
                    <div className="h-4 bg-white/5 rounded mb-2" />
                    <div className="h-4 bg-white/5 rounded w-2/3" />
                  </div>
                ))}
              </div>
            ) : (
              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="space-y-6"
              >
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    variants={staggerItem}
                    whileHover={{ x: 10 }}
                  >
                    <Card className="hover:border-emerald-500/50 transition-all">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          {/* Project Info */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="text-xl font-semibold text-white mb-2 hover:text-emerald-400 transition-colors">
                                  <Link href={`/project/${project.id}`}>
                                    {project.title}
                                  </Link>
                                </h3>
                                <p className="text-gray-400 line-clamp-2">
                                  {project.description}
                                </p>
                              </div>
                              <StatusBadge status={project.status as any} />
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.skills.slice(0, 5).map((skill) => (
                                <span
                                  key={skill}
                                  className="px-3 py-1 text-sm rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                >
                                  {skill}
                                </span>
                              ))}
                              {project.skills.length > 5 && (
                                <span className="px-3 py-1 text-sm rounded-full bg-white/5 text-gray-400">
                                  +{project.skills.length - 5} more
                                </span>
                              )}
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                              <div className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4 text-emerald-400" />
                                <span className="text-white font-semibold">
                                  ${project.budgetAmount.toLocaleString()}
                                </span>
                                <span>({project.budgetType})</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                <span>{project._count.proposals} proposals</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>

                          {/* Client Info */}
                          <div className="md:w-48 flex md:flex-col items-center md:items-start gap-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={project.client.avatar}
                                alt={`${project.client.firstName} ${project.client.lastName}`}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                              <div>
                                <div className="text-sm font-semibold text-white">
                                  {project.client.firstName} {project.client.lastName}
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-400">
                                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                  <span>{project.client.stats?.rating || 0}</span>
                                  <span>({project.client.stats?.reviewCount || 0})</span>
                                </div>
                              </div>
                            </div>
                            <Link href={`/project/${project.id}`} className="w-full">
                              <Button variant="primary" size="sm" className="w-full">
                                Apply Now
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="glass rounded-3xl p-12 border border-white/10"
            >
              <motion.h2
                variants={staggerItem}
                className="text-3xl md:text-5xl font-bold text-white font-display mb-6"
              >
                Ready to Start Earning?
              </motion.h2>

              <motion.p
                variants={staggerItem}
                className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
              >
                Join thousands of freelancers who are building successful careers on CodeAxis.
              </motion.p>

              <motion.div
                variants={staggerItem}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link href="/auth/signup">
                  <Button variant="primary" size="xl">
                    Create Free Account
                  </Button>
                </Link>
                <Link href="/learn">
                  <Button variant="secondary" size="xl">
                    Learn More
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </motion.div>
  )
}

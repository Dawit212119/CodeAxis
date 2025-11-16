'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Briefcase, 
  DollarSign,
  Clock,
  Award,
  TrendingUp,
  Users,
  Code,
  Palette,
  Smartphone,
  Database,
  Shield,
  Cloud
} from 'lucide-react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { pageVariants, staggerContainer, staggerItem } from '@/lib/animations'

interface Freelancer {
  id: string
  firstName: string
  lastName: string
  avatar: string
  title: string
  location: string
  hourlyRate: number
  rating: number
  reviewCount: number
  completedProjects: number
  skills: string[]
  availability: string
  isOnline: boolean
}

export default function FindTalentPage() {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  useEffect(() => {
    fetchFreelancers()
  }, [])

  const fetchFreelancers = async () => {
    try {
      const response = await fetch('/api/freelancers')
      const data = await response.json()
      setFreelancers(data.freelancers || [])
    } catch (error) {
      console.error('Error fetching freelancers:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const categories = [
    { icon: Code, name: 'Web Development', count: 1250 },
    { icon: Smartphone, name: 'Mobile Development', count: 890 },
    { icon: Palette, name: 'UI/UX Design', count: 1100 },
    { icon: Database, name: 'Data Science', count: 650 },
    { icon: Shield, name: 'Cybersecurity', count: 420 },
    { icon: Cloud, name: 'Cloud Computing', count: 780 },
  ]

  const popularSkills = [
    'React', 'Node.js', 'Python', 'TypeScript', 'AWS',
    'UI/UX', 'Mobile', 'DevOps', 'AI/ML', 'Blockchain'
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
                <Users className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-gray-300">
                  50,000+ Talented Professionals
                </span>
              </motion.div>

              <motion.h1
                variants={staggerItem}
                className="text-5xl md:text-7xl font-bold text-white font-display leading-tight mb-6"
              >
                Find the Perfect
                <br />
                <span className="text-emerald-400">Talent for Your Project</span>
              </motion.h1>

              <motion.p
                variants={staggerItem}
                className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
              >
                Connect with top-rated freelancers and agencies. From web development to design, 
                find experts who can bring your vision to life.
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
                        placeholder="Search by skills, name, or expertise..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <Button variant="primary" size="lg" className="md:w-auto">
                      Search Talent
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
            >
              {categories.map((category, index) => (
                <motion.button
                  key={category.name}
                  variants={staggerItem}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass rounded-xl p-6 border border-white/10 hover:border-emerald-500/50 transition-all group"
                >
                  <category.icon className="w-8 h-8 text-emerald-400 mb-3 mx-auto group-hover:scale-110 transition-transform" />
                  <h3 className="text-sm font-semibold text-white mb-1">{category.name}</h3>
                  <p className="text-xs text-gray-400">{category.count} experts</p>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Popular Skills */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {popularSkills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => {
                    if (selectedSkills.includes(skill)) {
                      setSelectedSkills(selectedSkills.filter(s => s !== skill))
                    } else {
                      setSelectedSkills([...selectedSkills, skill])
                    }
                  }}
                  className={cn(
                    "px-4 py-2 rounded-full border transition-all",
                    selectedSkills.includes(skill)
                      ? "bg-emerald-500 border-emerald-500 text-white"
                      : "glass border-white/10 text-gray-300 hover:border-emerald-500/50"
                  )}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Freelancers Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="glass rounded-2xl p-6 border border-white/10 animate-pulse">
                    <div className="h-48 bg-white/5 rounded-xl mb-4" />
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
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {freelancers.map((freelancer) => (
                  <motion.div
                    key={freelancer.id}
                    variants={staggerItem}
                    whileHover={{ y: -10 }}
                  >
                    <Card className="h-full hover:border-emerald-500/50 transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="relative">
                            <img
                              src={freelancer.avatar}
                              alt={`${freelancer.firstName} ${freelancer.lastName}`}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            {freelancer.isOnline && (
                              <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-gray-900 rounded-full" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white mb-1">
                              {freelancer.firstName} {freelancer.lastName}
                            </h3>
                            <p className="text-sm text-gray-400">{freelancer.title}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-white">{freelancer.rating}</span>
                            <span>({freelancer.reviewCount})</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{freelancer.location}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-4 text-sm">
                          <div className="flex items-center gap-1 text-gray-400">
                            <Briefcase className="w-4 h-4" />
                            <span>{freelancer.completedProjects} projects</span>
                          </div>
                          <div className="flex items-center gap-1 text-emerald-400 font-semibold">
                            <DollarSign className="w-4 h-4" />
                            <span>${freelancer.hourlyRate}/hr</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {freelancer.skills.slice(0, 3).map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            >
                              {skill}
                            </span>
                          ))}
                          {freelancer.skills.length > 3 && (
                            <span className="px-2 py-1 text-xs rounded-full bg-white/5 text-gray-400">
                              +{freelancer.skills.length - 3}
                            </span>
                          )}
                        </div>

                        <Link href={`/freelancer/${freelancer.id}`}>
                          <Button variant="primary" size="sm" className="w-full">
                            View Profile
                          </Button>
                        </Link>
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
                Ready to Build Your Dream Team?
              </motion.h2>

              <motion.p
                variants={staggerItem}
                className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
              >
                Post your project and get proposals from qualified freelancers within hours.
              </motion.p>

              <motion.div
                variants={staggerItem}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link href="/submit-project">
                  <Button variant="primary" size="xl">
                    Post a Project
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button variant="secondary" size="xl">
                    Sign Up Free
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

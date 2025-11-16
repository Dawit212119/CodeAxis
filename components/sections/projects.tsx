'use client'

import { useState, useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ExternalLink, Calendar, DollarSign, Star, Filter } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { staggerContainer, staggerItem } from '@/lib/animations'

export function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })
  const [activeFilter, setActiveFilter] = useState('all')
  
  // Scroll-based parallax animations
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200])
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -25])

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Development' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'design', label: 'UI/UX Design' },
    { id: 'marketing', label: 'Marketing' },
  ]

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Revolution',
      category: 'web',
      description: 'Complete marketplace redesign with AI-powered recommendations',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      budget: '$50,000',
      duration: '3 months',
      rating: 5.0,
      tags: ['React', 'Node.js', 'AI/ML'],
      gradient: 'from-blue-500 to-purple-600',
    },
    {
      id: 2,
      title: 'FinTech Mobile App',
      category: 'mobile',
      description: 'Secure banking application with biometric authentication',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
      budget: '$75,000',
      duration: '4 months',
      rating: 4.9,
      tags: ['React Native', 'Blockchain', 'Security'],
      gradient: 'from-green-500 to-teal-600',
    },
    {
      id: 3,
      title: 'Brand Identity Redesign',
      category: 'design',
      description: 'Complete visual identity overhaul for global tech company',
      image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop',
      budget: '$25,000',
      duration: '2 months',
      rating: 5.0,
      tags: ['Branding', 'UI/UX', 'Motion Graphics'],
      gradient: 'from-pink-500 to-rose-600',
    },
    {
      id: 4,
      title: 'SaaS Platform Development',
      category: 'web',
      description: 'Scalable project management tool with real-time collaboration',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      budget: '$120,000',
      duration: '6 months',
      rating: 4.8,
      tags: ['Vue.js', 'Python', 'WebRTC'],
      gradient: 'from-indigo-500 to-cyan-600',
    },
    {
      id: 5,
      title: 'Social Media Campaign',
      category: 'marketing',
      description: 'Viral marketing campaign that increased brand awareness by 300%',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
      budget: '$30,000',
      duration: '1 month',
      rating: 4.9,
      tags: ['Social Media', 'Content', 'Analytics'],
      gradient: 'from-orange-500 to-red-600',
    },
    {
      id: 6,
      title: 'AR Shopping Experience',
      category: 'mobile',
      description: 'Augmented reality app for virtual product try-ons',
      image: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=800&h=600&fit=crop',
      budget: '$90,000',
      duration: '5 months',
      rating: 5.0,
      tags: ['AR/VR', 'Swift', '3D Modeling'],
      gradient: 'from-violet-500 to-purple-600',
    },
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Enhanced Background with Parallax */}
      <motion.div className="absolute inset-0 -z-10" style={{ y: backgroundY }}>
        <motion.div 
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
          animate={{ 
            rotate: -360,
            scale: [1, 0.9, 1],
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          <motion.div
            variants={staggerItem}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/20 mb-6"
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-foreground/70">Completed Projects</span>
          </motion.div>

          <motion.h2
            variants={staggerItem}
            className="text-5xl md:text-7xl font-bold text-white font-display mb-6"
            style={{ y: titleY }}
          >
            Success
            <br />
            <span className="text-emerald-400">Stories</span>
          </motion.h2>

          <motion.p
            variants={staggerItem}
            className="text-xl text-foreground/70 max-w-3xl mx-auto"
          >
            Explore our portfolio of successful projects that showcase 
            the exceptional quality and innovation our platform delivers.
          </motion.p>
        </motion.div>

        {/* Filters */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter, index) => (
            <motion.button
              key={filter.id}
              variants={staggerItem}
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                'px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300',
                'hover:scale-105',
                activeFilter === filter.id
                  ? 'bg-white text-black shadow-lg font-semibold'
                  : 'glass text-gray-300 hover:text-white hover:bg-white/10'
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid with Parallax */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{ y: cardY }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={staggerItem}
              layout
              className="group"
              whileHover={{ 
                scale: 1.03,
                transition: { type: 'spring', stiffness: 300, damping: 20 }
              }}
            >
              <div className="glass rounded-3xl overflow-hidden hover:bg-white/10 transition-all duration-500">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-t opacity-60 group-hover:opacity-40 transition-opacity duration-300",
                    project.gradient
                  )} />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full glass text-white text-sm">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{project.rating}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {project.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 text-xs rounded-full bg-white/10 text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-all duration-300">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 mb-4 text-sm">
                    {project.description}
                  </p>

                  {/* Project Details */}
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      <span>{project.budget}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{project.duration}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Button
                    variant="glass"
                    size="sm"
                    className="w-full group/btn"
                  >
                    <span>View Details</span>
                    <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={staggerItem}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="text-center mt-16"
        >
          <Button
            variant="primary"
            size="lg"
            magnetic
            glow
            className="group"
          >
            <span>View All Projects</span>
            <ExternalLink className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
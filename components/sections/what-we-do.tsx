'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import {
  Code2,
  Palette,
  Smartphone,
  Globe,
  Database,
  Shield,
  Zap,
  Users,
  TrendingUp
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { stagger3D, stagger3DItem } from '@/lib/animations'
import { SERVICES } from '@/lib/constants'
import { SectionHeader } from '@/components/shared/section-header'
import { StatCard } from '@/components/shared/stat-card'

// export function WhatWeDoSection() {
//   const ref = useRef(null)
//   const isInView = useInView(ref, { once: true, threshold: 0.1 })

//   // Scroll-based animations
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start end", "end start"]
//   })

//   const y = useTransform(scrollYProgress, [0, 1], [100, -100])
//   const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

import { ServiceCard } from '@/components/shared/service-card'

export function WhatWeDoSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const stats = [
    { icon: Zap, label: 'Projects Delivered', value: '500K+', color: 'text-yellow-400' },
    { icon: Users, label: 'Happy Clients', value: '50K+', color: 'text-blue-400' },
    { icon: TrendingUp, label: 'Success Rate', value: '98%', color: 'text-green-400' },
  ]

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader
          badge="What We Do"
          title="Crafting Digital"
          highlight="Excellence"
          subtitle="We bring together the world's top talent to deliver exceptional results across every digital discipline. From concept to completion, we make your vision a reality."
        />

        <motion.div
          variants={stagger3D}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          style={{ perspective: 1000 }}
        >
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </motion.div>

        <motion.div
          variants={stagger3D}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
              color={stat.color}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
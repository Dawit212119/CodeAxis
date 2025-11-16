'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { ArrowRight, Play, Star, Users, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { 
  heroTitle, 
  heroSubtitle, 
  heroButtons, 
  staggerContainer, 
  staggerItem,
  hero3D,
  magneticButton3D
} from '@/lib/animations'
import { ImageRotator } from '@/components/ui/image-rotator'
import { HeroBackground } from '@/components/shared/hero-background'
import { StatCard } from '@/components/shared/stat-card'

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [0, 800], [10, -10])
  const rotateY = useTransform(mouseX, [0, 1200], [-10, 10])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      
      setMousePosition({ x, y })
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const stats = [
    { icon: Users, label: 'Active Users', value: '10M+', color: 'text-blue-400' },
    { icon: Briefcase, label: 'Projects', value: '500K+', color: 'text-emerald-400' },
    { icon: Star, label: 'Success Rate', value: '98%', color: 'text-yellow-400' },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 md:pt-40">
      <HeroBackground mousePosition={mousePosition} />

      {/* 3D Content Container - Left Aligned */}
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8"
        style={{ 
          perspective: 1000,
          transformStyle: 'preserve-3d',
          rotateX: rotateX,
          rotateY: rotateY,
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <motion.div
            variants={hero3D}
            initial="initial"
            animate="animate"
            className="space-y-8 order-2 lg:order-1"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Badge */}
            <motion.div
              variants={staggerItem}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/20"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-foreground/70">
                🎉 Over 1M projects completed successfully
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              variants={heroTitle}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white font-display leading-tight"
            >
              Find Your
              <br />
              <span className="text-blue-400">
                Perfect Match
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={heroSubtitle}
              className="text-lg md:text-xl text-foreground/70 max-w-xl leading-relaxed"
            >
              Connect with world-class talent and premium projects. 
              Experience the future of work with our cutting-edge platform 
              designed for excellence.
            </motion.p>

            {/* Enhanced 3D CTA Buttons */}
            <motion.div
              variants={heroButtons}
              className="flex flex-col sm:flex-row items-start gap-4 pt-4"
              style={{ transformStyle: 'preserve-3d' }}
            >
            <motion.div
              variants={magneticButton3D}
              initial="initial"
              whileHover="whileHover"
              whileTap="whileTap"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Button
                variant="primary"
                size="xl"
                glow
                className="group relative"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <span className="relative z-10">Get Started Today</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
              </Button>
            </motion.div>

            <motion.div
              variants={magneticButton3D}
              initial="initial"
              whileHover="whileHover"
              whileTap="whileTap"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Button
                variant="glass"
                size="xl"
                className="group relative"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform relative z-10" />
                <span className="relative z-10">Watch Demo</span>
              </Button>
            </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Content - Rotating Images */}
          <motion.div
            variants={hero3D}
            initial="initial"
            animate="animate"
            className="relative h-[500px] order-1 lg:order-2"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Image Container */}
            <motion.div className="relative w-full h-full rounded-3xl overflow-hidden glass">
              <ImageRotator />
            </motion.div>

            {/* Floating Elements Around Images */}
            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full opacity-80"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full opacity-60"
              animate={{
                x: [0, 20, 0],
                rotate: [0, -180, -360],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute top-1/2 -left-6 w-4 h-4 bg-cyan-400 rounded-full opacity-70"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        </div>

        {/* Bottom Stats Section */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              whileHover={{ y: -10, scale: 1.05 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <StatCard
                icon={stat.icon}
                label={stat.label}
                value={stat.value}
                color={stat.color}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
            animate={{ y: [0, 12, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
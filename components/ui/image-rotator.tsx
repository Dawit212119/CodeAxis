'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const images = [
  {
    src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=face',
    alt: 'Software engineer coding at modern workspace',
    title: 'Full-Stack Development',
    description: 'Building robust web applications'
  },
  {
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&crop=face',
    alt: 'Team collaboration on software project',
    title: 'Team Collaboration',
    description: 'Working together on innovative solutions'
  },
  {
    src: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&crop=face',
    alt: 'Mobile app development and testing',
    title: 'Mobile Development',
    description: 'Creating native and cross-platform apps'
  }
]

export function ImageRotator() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3000) // Change image every 3 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1, rotateY: 30 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: 0.9, rotateY: -30 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="relative w-full h-full"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Main Image */}
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />

          {/* Gradient Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          />

          {/* Content Overlay */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-6 text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h3 className="text-xl font-bold mb-2 text-white">
              {images[currentIndex].title}
            </h3>
            <p className="text-gray-300 text-sm">
              {images[currentIndex].description}
            </p>
          </motion.div>

          {/* 3D Frame Effect */}
          <div className="absolute inset-0 border-4 border-white/10 rounded-3xl pointer-events-none" />
          <div className="absolute -inset-2 border border-white/5 rounded-3xl pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* Image Indicators */}
      <div className="absolute top-4 right-4 flex space-x-2">
        {images.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white scale-125' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.8 }}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{
              duration: 3,
              ease: 'linear',
              repeat: Infinity,
            }}
            key={currentIndex}
          />
        </div>
      </div>

      {/* Floating Code Elements */}
      <motion.div
        className="absolute top-8 left-8 text-xs font-mono text-green-400 opacity-60"
        animate={{
          opacity: [0.4, 0.8, 0.4],
          y: [0, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {'</>'}
      </motion.div>

      <motion.div
        className="absolute top-12 right-12 text-xs font-mono text-blue-400 opacity-60"
        animate={{
          opacity: [0.4, 0.8, 0.4],
          rotate: [0, 360],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {'{}'}
      </motion.div>

      <motion.div
        className="absolute bottom-16 left-8 text-xs font-mono text-purple-400 opacity-60"
        animate={{
          opacity: [0.4, 0.8, 0.4],
          x: [0, 5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {'()'}
      </motion.div>
    </div>
  )
}
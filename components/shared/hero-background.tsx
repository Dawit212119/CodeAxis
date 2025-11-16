'use client'

import { motion } from 'framer-motion'
import { floatingAnimation, orbitalFloat, perspectiveContainer } from '@/lib/animations'

interface HeroBackgroundProps {
  mousePosition: { x: number; y: number }
}

export function HeroBackground({ mousePosition }: HeroBackgroundProps) {
  return (
    <motion.div 
      className="absolute inset-0 z-0"
      style={{ perspective: 1000 }}
      variants={perspectiveContainer}
      initial="initial"
      animate="animate"
    >
      {/* Enhanced 3D Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary-500/30 to-secondary-500/30 rounded-full blur-3xl"
        animate={{
          x: mousePosition.x * 0.2,
          y: mousePosition.y * 0.2,
          rotateX: mousePosition.y * 0.1,
          rotateY: mousePosition.x * 0.1,
          z: 50,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-secondary-500/20 to-purple-500/20 rounded-full blur-3xl"
        animate={{
          x: mousePosition.x * -0.2,
          y: mousePosition.y * -0.2,
          rotateX: mousePosition.y * -0.1,
          rotateY: mousePosition.x * -0.1,
          z: 30,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      />

      {/* 3D Grid Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)`,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateX: mousePosition.y * 0.02,
          rotateY: mousePosition.x * 0.02,
        }}
      />
      
      {/* Orbital Floating Elements */}
      {[
        { pos: 'top-20 right-20', size: 'w-4 h-4', color: 'bg-primary-400', delay: 0 },
        { pos: 'bottom-32 left-20', size: 'w-3 h-3', color: 'bg-secondary-400', delay: 3 },
        { pos: 'top-1/2 right-1/3', size: 'w-2 h-2', color: 'bg-purple-400', delay: 6 },
      ].map((element, index) => (
        <motion.div
          key={index}
          className={`absolute ${element.pos}`}
          variants={orbitalFloat}
          animate="animate"
          style={{ 
            transformOrigin: 'center', 
            transformStyle: 'preserve-3d',
            animationDelay: `${element.delay}s` 
          }}
        >
          <motion.div
            className={`${element.size} ${element.color} rounded-full opacity-60`}
            animate={{
              rotateX: [0, 360],
              rotateY: [0, 180],
              z: [0, 40, 0],
            }}
            transition={{ duration: 8 + index * 4, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}
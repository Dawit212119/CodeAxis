'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { spinnerAnimation } from '@/lib/animations'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'spinner' | 'dots' | 'pulse' | 'skeleton'
  className?: string
}

export function Loading({ 
  size = 'md', 
  variant = 'spinner', 
  className 
}: LoadingProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }

  if (variant === 'spinner') {
    return (
      <motion.div
        variants={spinnerAnimation}
        animate="animate"
        className={cn(
          'border-2 border-gray-600 border-t-primary-500 rounded-full',
          sizes[size],
          className
        )}
      />
    )
  }

  if (variant === 'dots') {
    return (
      <div className={cn('flex space-x-1', className)}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-primary-500 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    )
  }

  if (variant === 'pulse') {
    return (
      <motion.div
        className={cn(
          'bg-primary-500 rounded-full',
          sizes[size],
          className
        )}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      />
    )
  }

  if (variant === 'skeleton') {
    return (
      <div className={cn('animate-pulse', className)}>
        <div className="bg-white/10 rounded-lg h-4 w-full mb-2" />
        <div className="bg-white/10 rounded-lg h-4 w-3/4 mb-2" />
        <div className="bg-white/10 rounded-lg h-4 w-1/2" />
      </div>
    )
  }

  return null
}

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center z-50">
      <div className="text-center">
        <motion.div
          className="w-16 h-16 border-4 border-gray-600 border-t-primary-500 rounded-full mx-auto mb-4"
          variants={spinnerAnimation}
          animate="animate"
        />
        <motion.h2
          className="text-white text-xl font-semibold mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Loading Premium Experience
        </motion.h2>
        <motion.p
          className="text-gray-400"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Preparing your workspace...
        </motion.p>
      </div>
    </div>
  )
}
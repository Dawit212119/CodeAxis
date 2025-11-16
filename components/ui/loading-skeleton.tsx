'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular'
  animation?: 'pulse' | 'wave'
}

export function Skeleton({ 
  className, 
  variant = 'rectangular', 
  animation = 'wave' 
}: SkeletonProps) {
  const baseClasses = cn(
    'bg-white/10 rounded-lg',
    variant === 'text' && 'h-4 w-full',
    variant === 'circular' && 'rounded-full aspect-square',
    variant === 'rectangular' && 'w-full h-full',
    className
  )

  if (animation === 'pulse') {
    return (
      <motion.div
        className={baseClasses}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    )
  }

  return (
    <div className={cn(baseClasses, 'relative overflow-hidden')}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  )
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton variant="circular" className="w-10 h-10" />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" className="w-3/4" />
            <Skeleton variant="text" className="w-1/2" />
          </div>
          <Skeleton className="w-20 h-8" />
          <Skeleton className="w-16 h-8" />
        </div>
      ))}
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="glass rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton variant="circular" className="w-12 h-12" />
        <Skeleton className="w-16 h-6" />
      </div>
      <Skeleton variant="text" className="w-24 h-8" />
      <Skeleton variant="text" className="w-32 h-4" />
    </div>
  )
}

export function ChartSkeleton({ height = 200 }: { height?: number }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Skeleton variant="text" className="w-32" />
        <Skeleton className="w-20 h-6" />
      </div>
      <div className={`relative h-${height} bg-white/5 rounded-lg overflow-hidden`}>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        {/* Fake chart bars */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-4 space-x-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <motion.div
              key={i}
              className="bg-white/20 rounded-t"
              style={{ 
                height: `${Math.random() * 80 + 20}%`,
                width: 'calc(100% / 7 - 8px)'
              }}
              initial={{ height: 0 }}
              animate={{ height: `${Math.random() * 80 + 20}%` }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
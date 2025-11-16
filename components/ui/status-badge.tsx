'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Clock, 
  Pause, 
  Play 
} from 'lucide-react'

interface StatusBadgeProps {
  status: 'active' | 'completed' | 'pending' | 'cancelled' | 'paused' | 'in-review'
  className?: string
  showIcon?: boolean
  animate?: boolean
}

export function StatusBadge({ 
  status, 
  className, 
  showIcon = true, 
  animate = true 
}: StatusBadgeProps) {
  const statusConfig = {
    active: {
      label: 'Active',
      icon: Play,
      color: 'bg-green-500/20 text-green-400 border-green-500/30',
      pulseColor: 'bg-green-400',
    },
    completed: {
      label: 'Completed',
      icon: CheckCircle,
      color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      pulseColor: 'bg-blue-400',
    },
    pending: {
      label: 'Pending',
      icon: Clock,
      color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      pulseColor: 'bg-yellow-400',
    },
    cancelled: {
      label: 'Cancelled',
      icon: XCircle,
      color: 'bg-red-500/20 text-red-400 border-red-500/30',
      pulseColor: 'bg-red-400',
    },
    paused: {
      label: 'Paused',
      icon: Pause,
      color: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      pulseColor: 'bg-gray-400',
    },
    'in-review': {
      label: 'In Review',
      icon: AlertCircle,
      color: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      pulseColor: 'bg-orange-400',
    },
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <motion.div
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border',
        config.color,
        className
      )}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {showIcon && (
        <div className="relative">
          <Icon className="w-3 h-3" />
          {animate && (status === 'active' || status === 'in-review') && (
            <motion.div
              className={cn('absolute inset-0 rounded-full', config.pulseColor)}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          )}
        </div>
      )}
      
      <span>{config.label}</span>
      
      {animate && (
        <motion.div
          className="w-1 h-1 rounded-full bg-current opacity-60"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}
    </motion.div>
  )
}
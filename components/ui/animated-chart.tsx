'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface ChartData {
  label: string
  value: number
  color?: string
}

interface AnimatedBarChartProps {
  data: ChartData[]
  height?: number
  className?: string
}

export function AnimatedBarChart({ 
  data, 
  height = 200, 
  className = '' 
}: AnimatedBarChartProps) {
  const [animatedData, setAnimatedData] = useState(data.map(d => ({ ...d, value: 0 })))
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedData(data)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [data])

  const maxValue = Math.max(...data.map(d => d.value))

  return (
    <div className={`relative ${className}`} style={{ height }}>
      <div className="flex items-end justify-between h-full space-x-2">
        {animatedData.map((item, index) => (
          <div key={item.label} className="flex-1 flex flex-col items-center">
            <motion.div
              className="w-full bg-gradient-to-t from-emerald-500 to-teal-400 rounded-t-lg relative overflow-hidden"
              initial={{ height: 0 }}
              animate={{ height: `${(item.value / maxValue) * 80}%` }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 20,
                delay: index * 0.1,
              }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: index * 0.2,
                }}
              />
              
              {/* Value label */}
              <motion.div
                className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-white bg-black/50 px-2 py-1 rounded opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {item.value}
              </motion.div>
            </motion.div>
            
            <motion.div
              className="mt-2 text-xs text-gray-400 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.5 }}
            >
              {item.label}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface AnimatedLineChartProps {
  data: { x: string; y: number }[]
  height?: number
  className?: string
}

export function AnimatedLineChart({ 
  data, 
  height = 200, 
  className = '' 
}: AnimatedLineChartProps) {
  const [pathLength, setPathLength] = useState(0)
  
  const maxY = Math.max(...data.map(d => d.y))
  const minY = Math.min(...data.map(d => d.y))
  const range = maxY - minY || 1
  
  const points = data.map((point, index) => ({
    x: (index / (data.length - 1)) * 100,
    y: ((maxY - point.y) / range) * 80 + 10,
  }))
  
  const pathData = points.reduce((path, point, index) => {
    const command = index === 0 ? 'M' : 'L'
    return `${path} ${command} ${point.x} ${point.y}`
  }, '')

  return (
    <div className={`relative ${className}`} style={{ height }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" className="overflow-visible">
        {/* Grid lines */}
        {Array.from({ length: 5 }).map((_, i) => (
          <line
            key={i}
            x1="0"
            y1={i * 20 + 10}
            x2="100"
            y2={i * 20 + 10}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.5"
          />
        ))}
        
        {/* Gradient area under line */}
        <defs>
          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(16, 185, 129, 0.3)" />
            <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
          </linearGradient>
        </defs>
        
        <motion.path
          d={`${pathData} L 100 90 L 0 90 Z`}
          fill="url(#chartGradient)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
        
        {/* Main line */}
        <motion.path
          d={pathData}
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
        
        {/* Data points */}
        {points.map((point, index) => (
          <motion.circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="2"
            fill="#10b981"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.5, type: 'spring', stiffness: 300 }}
            whileHover={{ scale: 1.5, r: 3 }}
          />
        ))}
      </svg>
    </div>
  )
}

interface ProgressRingProps {
  progress: number
  size?: number
  strokeWidth?: number
  className?: string
}

export function ProgressRing({ 
  progress, 
  size = 120, 
  strokeWidth = 8, 
  className = '' 
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className={`relative ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Progress text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className="text-2xl font-bold text-white"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
        >
          {progress}%
        </motion.span>
      </div>
    </div>
  )
}
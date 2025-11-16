'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ServiceCardProps {
  service: {
    icon: string
    title: string
    description: string
    gradient: string
  }
  index: number
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 60, rotateX: -45, scale: 0.8 },
        animate: { 
          opacity: 1, y: 0, rotateX: 0, scale: 1,
          transition: { type: 'spring', stiffness: 100, damping: 15, delay: index * 0.1 }
        }
      }}
      whileHover={{ scale: 1.08, rotateX: 15, rotateY: 15, z: 80 }}
      className="group"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="relative p-8 rounded-3xl glass hover:bg-white/10 transition-all duration-500 h-full" style={{ transformStyle: 'preserve-3d' }}>
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-z-[-20px]" />
        
        <motion.div 
          className="w-14 h-14 rounded-xl bg-white flex items-center justify-center mb-6"
          whileHover={{ scale: 1.2, rotateY: 180, z: 20 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="text-2xl">{service.icon}</div>
          <div className="absolute inset-0 rounded-xl bg-gray-200 transform translate-z-[-5px]" />
        </motion.div>

        <motion.h3 
          className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-all duration-300"
          whileHover={{ z: 10 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {service.title}
        </motion.h3>
        
        <motion.p 
          className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300"
          whileHover={{ z: 5 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {service.description}
        </motion.p>

        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none transform translate-z-[2px]" />
        <div className="absolute top-4 right-4 w-2 h-2 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-500" />
        <div className="absolute bottom-6 left-6 w-1 h-1 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-700" />
      </div>
    </motion.div>
  )
}
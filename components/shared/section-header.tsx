'use client'

import { motion } from 'framer-motion'
import { staggerItem } from '@/lib/animations'

interface SectionHeaderProps {
  badge?: string
  title: string
  subtitle?: string
  highlight?: string
}

export function SectionHeader({ badge, title, subtitle, highlight }: SectionHeaderProps) {
  return (
    <div className="text-center mb-16">
      {badge && (
        <motion.div
          variants={staggerItem}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/20 mb-6"
        >
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-sm text-gray-300">{badge}</span>
        </motion.div>
      )}

      <motion.h2
        variants={staggerItem}
        className="text-4xl md:text-6xl font-bold text-white font-display mb-6"
      >
        {title}
        {highlight && (
          <>
            <br />
            <span className="text-emerald-400">{highlight}</span>
          </>
        )}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={staggerItem}
          className="text-xl text-gray-300 max-w-3xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
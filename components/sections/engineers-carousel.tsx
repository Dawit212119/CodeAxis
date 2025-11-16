'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ENGINEERS } from '@/lib/constants'
import { SectionHeader } from '@/components/shared/section-header'
import { EngineerCard } from '@/components/shared/engineer-card'

export function EngineersCarousel() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const duplicatedEngineers = [...ENGINEERS, ...ENGINEERS]

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader
          badge="Featured Engineers"
          title="Meet Our"
          highlight="Top Talent"
          subtitle="Connect with world-class software engineers from leading tech companies. Each expert brings years of experience and proven track records."
        />

        {/* Engineers Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{
                x: hoveredCard ? 0 : [-1920, 0], // Move based on total width
              }}
              transition={{
                x: {
                  duration: hoveredCard ? 0 : 20, // Stop when hovered
                  repeat: hoveredCard ? 0 : Infinity,
                  ease: "linear",
                },
              }}
              style={{ width: 'max-content' }}
            >
              {duplicatedEngineers.map((engineer, index) => (
                <EngineerCard
                  key={`${engineer.id}-${index}`}
                  engineer={engineer}
                  onHover={setHoveredCard}
                />
              ))}
            </motion.div>
          </div>

          {/* Gradient Overlays */}
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black to-transparent pointer-events-none z-10"></div>
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent pointer-events-none z-10"></div>
        </div>
      </div>
    </section>
  )
}
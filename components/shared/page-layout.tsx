'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { pageVariants } from '@/lib/animations'

interface PageLayoutProps {
  children: React.ReactNode
  className?: string
}

export function PageLayout({ children, className = '' }: PageLayoutProps) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`min-h-screen bg-background ${className}`}
    >
      <Header />
      <main className="pt-24 pb-16">
        {children}
      </main>
      <Footer />
    </motion.div>
  )
}
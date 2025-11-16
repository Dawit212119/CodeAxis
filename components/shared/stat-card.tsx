'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: string | number
  color?: string
  change?: string
  changeType?: 'positive' | 'negative'
}

export function StatCard({ icon: Icon, label, value, color = 'text-emerald-400', change, changeType }: StatCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.05, y: -5 }}>
      <Card className="group">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center mb-3">
            <div className="p-3 rounded-xl bg-white">
              <Icon className={cn("w-6 h-6", color)} />
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1 font-display">
            {value}
          </div>
          <div className="text-sm text-gray-400">{label}</div>
          {change && (
            <div className={cn(
              "text-xs mt-2 px-2 py-1 rounded-full",
              changeType === 'positive' ? 'text-green-400 bg-green-500/20' : 'text-red-400 bg-red-500/20'
            )}>
              {change}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
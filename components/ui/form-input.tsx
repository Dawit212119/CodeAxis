'use client'

import { useState, forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  icon?: React.ComponentType<{ className?: string }>
}

export const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ label, error, icon: Icon, className, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const [hasValue, setHasValue] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value.length > 0)
      if (props.onChange) props.onChange(e)
    }

    return (
      <div className="relative">
        <div className="relative">
          {Icon && (
            <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
          )}
          <input
            ref={ref}
            className={cn(
              'w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-transparent',
              'focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30',
              'transition-all duration-300 peer',
              Icon && 'pl-12',
              error && 'border-red-500/50 focus:ring-red-500/30',
              className
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={handleChange}
            placeholder={label}
            {...props}
          />
          
          <motion.label
            className={cn(
              'absolute left-4 text-gray-400 pointer-events-none transition-all duration-300',
              Icon && 'left-12'
            )}
            animate={{
              top: isFocused || hasValue || props.value ? '8px' : '50%',
              fontSize: isFocused || hasValue || props.value ? '0.75rem' : '1rem',
              y: isFocused || hasValue || props.value ? 0 : '-50%',
              color: isFocused ? '#ffffff' : error ? '#ef4444' : '#9ca3af',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {label}
          </motion.label>
        </div>
        
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className="text-red-400 text-sm mt-2 flex items-center gap-2"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-4 h-4"
              >
                ⚠️
              </motion.div>
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

FloatingInput.displayName = 'FloatingInput'

interface FloatingTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
}

export const FloatingTextarea = forwardRef<HTMLTextAreaElement, FloatingTextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const [hasValue, setHasValue] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setHasValue(e.target.value.length > 0)
      if (props.onChange) props.onChange(e)
    }

    return (
      <div className="relative">
        <div className="relative">
          <textarea
            ref={ref}
            className={cn(
              'w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-transparent',
              'focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30',
              'transition-all duration-300 peer min-h-[120px] resize-none',
              error && 'border-red-500/50 focus:ring-red-500/30',
              className
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={handleChange}
            placeholder={label}
            {...props}
          />
          
          <motion.label
            className="absolute left-4 text-gray-400 pointer-events-none transition-all duration-300"
            animate={{
              top: isFocused || hasValue || props.value ? '8px' : '20px',
              fontSize: isFocused || hasValue || props.value ? '0.75rem' : '1rem',
              color: isFocused ? '#ffffff' : error ? '#ef4444' : '#9ca3af',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {label}
          </motion.label>
        </div>
        
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className="text-red-400 text-sm mt-2 flex items-center gap-2"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-4 h-4"
              >
                ⚠️
              </motion.div>
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

FloatingTextarea.displayName = 'FloatingTextarea'
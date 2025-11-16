'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { magneticButton } from '@/lib/animations'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  magnetic?: boolean
  glow?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    magnetic = false, 
    glow = false,
    children, 
    ...props 
  }, ref) => {
    const baseStyles = cn(
      'inline-flex items-center justify-center rounded-2xl font-semibold transition-all duration-300',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'relative overflow-hidden group'
    )

    const variants = {
      primary: cn(
        'bg-white text-black font-semibold',
        'hover:bg-gray-100',
        'dark:focus:ring-white/50 light:focus:ring-gray-400',
        glow && 'shadow-lg dark:shadow-white/25 light:shadow-gray-300/50 hover:shadow-xl dark:hover:shadow-white/40 light:hover:shadow-gray-400/60'
      ),
      secondary: cn(
        'border backdrop-blur-sm',
        'dark:bg-white/10 dark:text-gray-300 dark:border-white/20',
        'light:bg-gray-100/80 light:text-gray-700 light:border-gray-200',
        'dark:hover:bg-white/20 dark:hover:text-white dark:hover:border-white/30',
        'light:hover:bg-gray-200 light:hover:text-gray-900 light:hover:border-gray-300'
      ),
      ghost: cn(
        'dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/10',
        'light:text-gray-600 light:hover:text-gray-900 light:hover:bg-gray-100'
      ),
      glass: cn(
        'glass',
        'dark:text-white dark:hover:bg-white/20',
        'light:text-gray-900 light:hover:bg-white/90'
      )
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
      xl: 'px-12 py-5 text-lg'
    }

    const buttonClasses = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      className
    )

    if (magnetic) {
      return (
        <motion.button
          ref={ref}
          className={buttonClasses}
          variants={magneticButton}
          whileHover="whileHover"
          whileTap="whileTap"
          {...props}
        >
          <span className="relative z-10">{children}</span>
          {variant === 'primary' && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          )}
        </motion.button>
      )
    }

    return (
      <button ref={ref} className={buttonClasses} {...props}>
        <span className="relative z-10">{children}</span>
        {variant === 'primary' && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
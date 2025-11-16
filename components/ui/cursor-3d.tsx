'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Cursor3DProps {
  className?: string
}

export function Cursor3D({ className }: Cursor3DProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [cursorText, setCursorText] = useState('')

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
      setIsVisible(true)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    // Add hover effects for interactive elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      if (target.closest('button, a, [role="button"]')) {
        setIsHovering(true)
        setCursorText('Click')
      } else if (target.closest('.magnetic-hover, .card-glass')) {
        setIsHovering(true)
        setCursorText('Explore')
      } else {
        setIsHovering(false)
        setCursorText('')
      }
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseover', handleElementHover)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseover', handleElementHover)
    }
  }, [cursorX, cursorY])

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className={cn(
          'fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 mix-blend-difference',
          isVisible ? 'opacity-100' : 'opacity-0',
          className
        )}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          rotateZ: isHovering ? 45 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 30,
        }}
      >
        {/* Outer ring */}
        <motion.div
          className="w-full h-full rounded-full border-2 border-white relative"
          animate={{
            scale: isHovering ? 0.8 : 1,
            rotateX: isHovering ? [0, 360] : 0,
          }}
          transition={{
            rotateX: { duration: 2, repeat: Infinity, ease: 'linear' }
          }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Inner dot */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full"
            style={{
              transform: 'translate(-50%, -50%)',
              transformStyle: 'preserve-3d',
            }}
            animate={{
              scale: isHovering ? 0.5 : 1,
              rotateY: isHovering ? [0, 360] : 0,
              z: isHovering ? 10 : 0,
            }}
            transition={{
              rotateY: { duration: 1.5, repeat: Infinity, ease: 'linear' }
            }}
          />

          {/* Floating particles */}
          {isHovering && (
            <>
              <motion.div
                className="absolute w-1 h-1 bg-primary-400 rounded-full"
                style={{
                  top: '10%',
                  right: '10%',
                }}
                animate={{
                  y: [-5, 5, -5],
                  opacity: [0.5, 1, 0.5],
                  rotateZ: [0, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="absolute w-1 h-1 bg-secondary-400 rounded-full"
                style={{
                  bottom: '10%',
                  left: '10%',
                }}
                animate={{
                  x: [-3, 3, -3],
                  opacity: [0.3, 1, 0.3],
                  rotateZ: [360, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </>
          )}
        </motion.div>

        {/* Cursor text */}
        {cursorText && (
          <motion.div
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-white text-black text-xs rounded-full font-medium whitespace-nowrap"
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            {cursorText}
          </motion.div>
        )}
      </motion.div>

      {/* Trailing effect */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-40"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          scale: isVisible ? (isHovering ? 0.3 : 0.2) : 0,
          opacity: isVisible ? 0.4 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 30,
          delay: 0.1,
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 blur-md" />
      </motion.div>
    </>
  )
}
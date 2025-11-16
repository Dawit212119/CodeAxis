import { Variants, MotionValue } from 'framer-motion'

// Page transitions
export const pageTransition = {
  type: 'tween',
  ease: [0.25, 0.1, 0.25, 1],
  duration: 0.6,
}

export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: pageTransition,
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { ...pageTransition, duration: 0.4 },
  },
}

// Stagger animations
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export const staggerItem: Variants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
  },
}

// Hero animations
export const heroTitle: Variants = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
      delay: 0.2,
    },
  },
}

export const heroSubtitle: Variants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
      delay: 0.4,
    },
  },
}

export const heroButtons: Variants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
      delay: 0.6,
    },
  },
}

// 3D Card animations for Awwwards-level effects
export const cardHover: Variants = {
  initial: {
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    z: 0,
  },
  hover: {
    scale: 1.05,
    rotateX: -10,
    rotateY: 10,
    rotateZ: 2,
    z: 50,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 15,
    },
  },
  tap: {
    scale: 0.95,
    rotateX: 5,
    rotateY: -5,
    z: 25,
  },
}

// Advanced 3D card with tilt effect
export const card3DTilt: Variants = {
  initial: {
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    z: 0,
  },
  hover: {
    scale: 1.08,
    rotateX: 15,
    rotateY: 15,
    z: 80,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
}

// Parallax card effect
export const parallaxCard: Variants = {
  initial: {
    y: 0,
    scale: 1,
    rotateX: 0,
    opacity: 1,
  },
  animate: {
    y: [-20, 20, -20],
    scale: [1, 1.02, 1],
    rotateX: [0, 5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Fade in animations
export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
  },
}

export const fadeInLeft: Variants = {
  initial: {
    opacity: 0,
    x: -50,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
  },
}

export const fadeInRight: Variants = {
  initial: {
    opacity: 0,
    x: 50,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
  },
}

// Scale animations
export const scaleIn: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 20,
    },
  },
}

// Magnetic button effect
export const magneticButton = {
  whileHover: {
    scale: 1.05,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
  whileTap: {
    scale: 0.95,
  },
}

// Floating animation
export const floatingAnimation: Variants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Gradient animation
export const gradientAnimation = {
  animate: {
    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

// Loading spinner
export const spinnerAnimation: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

// Text reveal animation
export const textReveal: Variants = {
  initial: {
    opacity: 0,
    y: '100%',
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
  },
}

// Advanced 3D text animations
export const text3D: Variants = {
  initial: {
    opacity: 0,
    y: 50,
    rotateX: -90,
    transformPerspective: 1000,
  },
  animate: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
  },
}

// 3D perspective container
export const perspectiveContainer: Variants = {
  initial: {
    perspective: 1000,
  },
  animate: {
    perspective: 1200,
    transition: {
      duration: 0.5,
    },
  },
}

// Advanced magnetic button with 3D tilt
export const magneticButton3D = {
  initial: {
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    z: 0,
  },
  whileHover: {
    scale: 1.1,
    rotateX: -5,
    rotateY: 5,
    z: 30,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
  whileTap: {
    scale: 0.95,
    rotateX: 10,
    rotateY: -5,
    z: 15,
  },
}

// Orbital animation for floating elements
export const orbitalFloat: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

// Complex hero animation with 3D transforms
export const hero3D: Variants = {
  initial: {
    opacity: 0,
    y: 100,
    rotateX: -30,
    scale: 0.8,
    transformPerspective: 1200,
  },
  animate: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 20,
      duration: 1.2,
    },
  },
}

// Morphing container animation
export const morphingContainer: Variants = {
  initial: {
    borderRadius: '20px',
    scale: 1,
  },
  hover: {
    borderRadius: ['20px', '40px', '20px'],
    scale: [1, 1.02, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
    },
  },
}

// Advanced stagger with 3D rotation
export const stagger3D: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export const stagger3DItem: Variants = {
  initial: {
    opacity: 0,
    y: 60,
    rotateX: -45,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
}

// Mouse tracking for 3D tilt effect
export const createMouseTilt = (
  mouseX: MotionValue<number>,
  mouseY: MotionValue<number>
) => ({
  rotateY: mouseX,
  rotateX: mouseY,
  transformPerspective: 1000,
})

// Liquid morphing animation
export const liquidMorph: Variants = {
  initial: {
    borderRadius: '20px',
  },
  animate: {
    borderRadius: ['20px', '50px', '30px', '40px', '20px'],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Advanced page transition with 3D flip
export const pageFlip: Variants = {
  initial: {
    rotateY: -90,
    opacity: 0,
    transformPerspective: 1000,
  },
  animate: {
    rotateY: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
      duration: 0.8,
    },
  },
  exit: {
    rotateY: 90,
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
}
'use client'

import { motion, useScroll, useTransform, useSpring, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

// Parallax component
export function ParallaxContainer({
  children,
  speed = 0.5,
  className = ''
}: {
  children: React.ReactNode
  speed?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 200])

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  )
}

// Reveal on scroll
export function RevealOnScroll({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className = ''
}: {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale'
  delay?: number
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  const animations = {
    up: { y: [50, 0], opacity: [0, 1] },
    down: { y: [-50, 0], opacity: [0, 1] },
    left: { x: [50, 0], opacity: [0, 1] },
    right: { x: [-50, 0], opacity: [0, 1] },
    fade: { opacity: [0, 1] },
    scale: { scale: [0.8, 1], opacity: [0, 1] }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={direction === 'fade' ? { opacity: 0 } : direction === 'scale' ? { scale: 0.8, opacity: 0 } : { 
        ...(direction === 'up' && { y: 50 }),
        ...(direction === 'down' && { y: -50 }),
        ...(direction === 'left' && { x: 50 }),
        ...(direction === 'right' && { x: -50 }),
        opacity: 0 
      }}
      animate={hasAnimated ? animations[direction] : {}}
      transition={{
        duration,
        delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  )
}

// Text reveal animation
export function TextReveal({
  text,
  className = '',
  delay = 0,
  staggerDelay = 0.02
}: {
  text: string
  className?: string
  delay?: number
  staggerDelay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay
      }
    }
  }

  const childVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      rotateX: 90
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={hasAnimated ? "visible" : "hidden"}
      style={{ transformStyle: "preserve-3d" }}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          variants={childVariants}
          className="inline-block"
          style={{ transformOrigin: "50% 100%" }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  )
}

// Progress indicator based on scroll
export function ScrollProgress({
  className = '',
  height = 4,
  color = 'bg-gradient-to-r from-purple-600 to-pink-600'
}: {
  className?: string
  height?: number
  color?: string
}) {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 z-50 ${className}`}
      style={{ height }}
    >
      <motion.div
        className={`h-full ${color}`}
        style={{ scaleX: scrollYProgress }}
        transformTemplate={({ scaleX }) => `scaleX(${scaleX})`}
        style={{ transformOrigin: "0%" }}
      />
    </motion.div>
  )
}

// Scroll-triggered counter
export function ScrollCounter({
  from = 0,
  to,
  duration = 2,
  className = ''
}: {
  from?: number
  to: number
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [current, setCurrent] = useState(from)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          
          const startTime = Date.now()
          const range = to - from
          
          const updateCounter = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / (duration * 1000), 1)
            
            const easeOutQuart = 1 - Math.pow(1 - progress, 4)
            const currentValue = Math.round(from + (range * easeOutQuart))
            
            setCurrent(currentValue)
            
            if (progress < 1) {
              requestAnimationFrame(updateCounter)
            }
          }
          
          requestAnimationFrame(updateCounter)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated, from, to, duration])

  return (
    <span ref={ref} className={className}>
      {current.toLocaleString()}
    </span>
  )
}

// Sticky reveal element
export function StickyReveal({
  children,
  className = '',
  offset = 100
}: {
  children: React.ReactNode
  className?: string
  offset?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${offset}px`, `end ${offset}px`]
  })

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <motion.div
      ref={ref}
      className={`sticky top-32 ${className}`}
      style={{ scale, opacity, y }}
    >
      {children}
    </motion.div>
  )
}

// Mouse trail effect
export function MouseTrail() {
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([])

  useEffect(() => {
    let animationId: number

    const handleMouseMove = (e: MouseEvent) => {
      const newPoint = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now()
      }

      setTrail(prev => [...prev.slice(-20), newPoint])
    }

    const animate = () => {
      setTrail(prev => prev.slice(1))
      animationId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="absolute w-2 h-2 bg-purple-500 rounded-full"
          style={{
            left: point.x - 4,
            top: point.y - 4,
          }}
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ 
            scale: 0,
            opacity: 0
          }}
          transition={{ 
            duration: 1,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  )
}

// Scroll velocity indicator
export function ScrollVelocityIndicator() {
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })

  const scale = useTransform(smoothVelocity, [-1000, 0, 1000], [2, 1, 2])
  const opacity = useTransform(smoothVelocity, [-1000, 0, 1000], [1, 0, 1])

  return (
    <motion.div
      className="fixed top-4 right-4 w-4 h-4 bg-purple-500 rounded-full z-50"
      style={{ scale, opacity }}
    />
  )
}

// Magnetic scroll effect
export function MagneticScroll({
  children,
  strength = 0.1,
  className = ''
}: {
  children: React.ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  
  const x = useTransform(scrollYProgress, [0, 1], [0, strength * 100])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, strength * 10])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, rotate }}
    >
      {children}
    </motion.div>
  )
}

// Infinite scroll text
export function InfiniteScrollText({
  text,
  speed = 50,
  className = ''
}: {
  text: string
  speed?: number
  className?: string
}) {
  const x = useMotionValue(0)

  useAnimationFrame(() => {
    x.set(x.get() - speed / 60)
  })

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-block"
        style={{ x }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className="inline-block mr-8">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// Scroll snap sections
export function ScrollSnapSection({
  children,
  className = ''
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0])

  return (
    <motion.div
      ref={ref}
      className={`min-h-screen flex items-center justify-center ${className}`}
      style={{ scale, opacity }}
    >
      {children}
    </motion.div>
  )
}
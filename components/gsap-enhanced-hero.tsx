'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsapAnimations } from '../lib/gsap-animations'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function GSAPEnhancedHero() {
  const heroRef = useRef<HTMLElement>(null)
  const matrixRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const avatarRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -500])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const springY = useSpring(y, { stiffness: 300, damping: 30 })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      // Hero entrance timeline
      const tl = gsap.timeline()

      // Matrix rain background effect
      if (matrixRef.current) {
        gsapAnimations.matrixRain(matrixRef.current)
      }

      // Floating particles
      if (particlesRef.current) {
        gsapAnimations.createFloatingParticles(particlesRef.current, 30)
      }

      // Enhanced title animation with glitch effect
      if (titleRef.current) {
        // Split text into characters for better animation
        const titleText = titleRef.current.textContent || ''
        titleRef.current.innerHTML = titleText
          .split('')
          .map(char => `<span class="char inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
          .join('')

        // Main title animation
        tl.from('.char', {
          duration: 0.8,
          opacity: 0,
          scale: 0,
          y: 80,
          rotationX: 180,
          transformOrigin: "0% 50% -50",
          ease: "back.out(1.7)",
          stagger: 0.05
        })

        // Add periodic glitch effect
        gsap.delayedCall(2, () => {
          setInterval(() => {
            if (Math.random() > 0.7) { // 30% chance of glitch
              gsapAnimations.glitchEffect(titleRef.current, 0.5)
            }
          }, 3000)
        })
      }

      // Avatar magnetic hover effect
      if (avatarRef.current) {
        const avatar = avatarRef.current

        // Magnetic field effect
        const handleMouseMove = (e: MouseEvent) => {
          const rect = avatar.getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const centerY = rect.top + rect.height / 2
          const deltaX = (e.clientX - centerX) * 0.15
          const deltaY = (e.clientY - centerY) * 0.15

          gsap.to(avatar, {
            duration: 0.3,
            x: deltaX,
            y: deltaY,
            ease: "power2.out"
          })
        }

        const handleMouseLeave = () => {
          gsap.to(avatar, {
            duration: 0.5,
            x: 0,
            y: 0,
            ease: "elastic.out(1, 0.3)"
          })
        }

        document.addEventListener('mousemove', handleMouseMove)
        avatar.addEventListener('mouseleave', handleMouseLeave)

        return () => {
          document.removeEventListener('mousemove', handleMouseMove)
          avatar.removeEventListener('mouseleave', handleMouseLeave)
        }
      }

      // Cyberpunk breathing light effect
      gsap.to('.cyber-glow', {
        duration: 2,
        opacity: 0.3,
        scale: 1.1,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true
      })

      // Holographic text effect
      gsap.to('.holo-text', {
        duration: 3,
        backgroundPosition: '200% center',
        ease: "none",
        repeat: -1
      })

      // Scan line effect
      gsap.to('.scan-line', {
        duration: 2,
        y: '100vh',
        ease: "none",
        repeat: -1,
        delay: 1
      })

    }, heroRef)

    return () => {
      ctx.revert()
      gsapAnimations.cleanup()
    }
  }, [])

  const skills = [
    { icon: '⚛️', label: 'React', color: 'from-blue-500 to-cyan-500' },
    { icon: '🎨', label: 'Design', color: 'from-purple-500 to-pink-500' },
    { icon: '⚡', label: 'Performance', color: 'from-green-500 to-emerald-500' }
  ]

  return (
    <motion.section
      ref={heroRef}
      style={{ y: springY, opacity, scale }}
      className="hero-bg relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900"
    >
      {/* Matrix Rain Background */}
      <div 
        ref={matrixRef}
        className="absolute inset-0 opacity-20 pointer-events-none"
      />

      {/* Floating Particles Container */}
      <div 
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Scan Line Effect */}
      <div className="scan-line absolute left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70 pointer-events-none" 
           style={{ top: '-2px' }} />

      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      {/* Floating Geometric Shapes with Enhanced Effects */}
      <div className="absolute inset-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className={`cyber-glow absolute rounded-full blur-xl opacity-20`}
            style={{
              left: `${10 + (i * 15)}%`,
              top: `${20 + (i * 12)}%`,
              width: `${80 + (i * 20)}px`,
              height: `${80 + (i * 20)}px`,
              background: `linear-gradient(45deg, 
                hsl(${i * 60}, 70%, 60%), 
                hsl(${(i * 60) + 120}, 70%, 60%)
              )`
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Enhanced Avatar with Magnetic Effect */}
        <motion.div className="mb-8">
          <div 
            ref={avatarRef}
            className="hero-avatar relative w-32 h-32 mx-auto mb-6 cursor-pointer"
          >
            {/* Cyberpunk Ring Effects */}
            <div className="absolute inset-0 rounded-full">
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
                  style={{
                    margin: `${i * 8}px`,
                  }}
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.5
                  }}
                />
              ))}
            </div>
            
            <motion.div 
              className="relative w-full h-full rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 p-1"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="relative w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-4xl overflow-hidden">
                <motion.span
                  animate={{
                    scale: [1, 1.2, 1],
                    filter: [
                      "hue-rotate(0deg)",
                      "hue-rotate(180deg)", 
                      "hue-rotate(360deg)"
                    ]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  👩‍💻
                </motion.span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Title with Holographic Effect */}
        <div className="mb-6">
          <h1 
            ref={titleRef}
            className="hero-title holo-text text-5xl md:text-7xl font-bold leading-tight"
            style={{
              background: 'linear-gradient(45deg, #8b5cf6, #06b6d4, #f59e0b, #8b5cf6)',
              backgroundSize: '400% 400%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Frontend Developer
          </h1>
        </div>

        {/* Enhanced Subtitle */}
        <motion.p 
          className="hero-subtitle text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          Crafting beautiful, responsive web experiences with{' '}
          <span className="text-cyan-400 font-semibold relative">
            modern technologies
            <motion.span
              className="absolute inset-0 bg-cyan-400/20 blur-sm"
              animate={{
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </span>
          {' '}and creative design
        </motion.p>

        {/* Enhanced Skill Icons */}
        <div className="flex justify-center space-x-8 mb-12">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.label}
              className="hero-skill flex flex-col items-center group cursor-pointer"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2 + index * 0.2, type: "spring", stiffness: 200 }}
              whileHover={{ 
                scale: 1.2,
                rotateY: 360,
                transition: { duration: 0.6 }
              }}
            >
              <div 
                className={`relative w-20 h-20 rounded-full bg-gradient-to-r ${skill.color} flex items-center justify-center text-3xl mb-3 shadow-lg overflow-hidden`}
                style={{
                  boxShadow: '0 0 30px rgba(139, 92, 246, 0.3)'
                }}
              >
                {/* Cyber border effect */}
                <div className="absolute inset-0 rounded-full border-2 border-cyan-400/50 animate-pulse" />
                <span className="relative z-10">{skill.icon}</span>
              </div>
              <span className="text-sm font-medium text-gray-300 group-hover:text-cyan-400 transition-colors">
                {skill.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Enhanced CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3, type: "spring", stiffness: 200 }}
        >
          <motion.button
            className="hero-cta relative bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white px-8 py-4 rounded-full text-lg font-semibold overflow-hidden group"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 40px rgba(139, 92, 246, 0.6)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated border */}
            <div className="absolute inset-0 rounded-full border-2 border-cyan-400/50">
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-cyan-400"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  background: 'conic-gradient(from 0deg, transparent, #06b6d4, transparent)'
                }}
              />
            </div>
            
            <span className="relative z-10 flex items-center space-x-2">
              <span>Explore My Work</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                →
              </motion.span>
            </span>
          </motion.button>
        </motion.div>

        {/* Enhanced Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
        >
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="flex flex-col items-center text-gray-400 cursor-pointer hover:text-cyan-400 transition-colors group"
          >
            <span className="text-sm mb-2 group-hover:text-cyan-400 transition-colors">
              Scroll to explore
            </span>
            <div className="relative">
              <ArrowDown className="w-5 h-5" />
              <motion.div
                className="absolute inset-0 border border-cyan-400/50 rounded"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
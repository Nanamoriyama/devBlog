'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { ArrowDown } from 'lucide-react'
import { RevealOnScroll, ParallaxContainer } from './scroll-animations'

export function AnimatedHero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -500])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  
  const springY = useSpring(y, { stiffness: 300, damping: 30 })

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, 0, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const staggerItem = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }

  return (
    <motion.section
      ref={ref}
      style={{ y: springY, opacity, scale }}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <motion.div 
          className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Floating Geometric Shapes */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-10 w-20 h-20 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 blur-lg"
          style={{ animationDelay: '0s' }}
        />
        
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-40 right-20 w-32 h-32 rounded-lg bg-gradient-to-r from-blue-400 to-cyan-400 opacity-15 blur-xl rotate-45"
          style={{ animationDelay: '-2s' }}
        />
        
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute bottom-32 left-1/4 w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 opacity-25 blur-lg"
          style={{ animationDelay: '-4s' }}
        />
        
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute bottom-20 right-1/3 w-24 h-24 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-400 opacity-20 blur-xl rotate-12"
          style={{ animationDelay: '-1s' }}
        />

        {/* Animated Orbs */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-500/30 rounded-full"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${20 + (i * 8)}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 text-center relative z-10"
      >
        {/* Avatar */}
        <motion.div 
          variants={staggerItem}
          className="mb-8"
        >
          <motion.div 
            className="relative w-32 h-32 mx-auto mb-6"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.div 
              className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 opacity-75"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <div className="relative w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-4xl font-bold text-gray-500 dark:text-gray-400 border-4 border-white dark:border-gray-800 overflow-hidden">
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                👩‍💻
              </motion.span>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Heading with Typewriter Effect */}
        <motion.div variants={staggerItem}>
          <motion.h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <motion.span
              className="inline-block bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundSize: '200% 200%'
              }}
            >
              Frontend
            </motion.span>
            <br />
            <motion.span
              className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['100% 50%', '0% 50%', '100% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
                delay: 0.5
              }}
              style={{
                backgroundSize: '200% 200%'
              }}
            >
              Developer
            </motion.span>
          </motion.h1>
        </motion.div>

        {/* Animated Subtitle */}
        <motion.p 
          variants={staggerItem}
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Crafting beautiful, responsive web experiences with{' '}
          <motion.span
            className="text-purple-600 dark:text-purple-400 font-semibold"
            animate={{
              textShadow: [
                '0 0 0px rgba(147, 51, 234, 0)',
                '0 0 10px rgba(147, 51, 234, 0.5)',
                '0 0 0px rgba(147, 51, 234, 0)'
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            modern technologies
          </motion.span>
          {' '}and creative design
        </motion.p>

        {/* Skill Icons */}
        <motion.div 
          variants={staggerItem}
          className="flex justify-center space-x-8 mb-12"
        >
          {[
            { icon: '⚛️', label: 'React', color: 'from-blue-500 to-cyan-500' },
            { icon: '🎨', label: 'Design', color: 'from-purple-500 to-pink-500' },
            { icon: '⚡', label: 'Performance', color: 'from-green-500 to-emerald-500' }
          ].map((skill, index) => (
            <motion.div
              key={skill.label}
              className="flex flex-col items-center group cursor-pointer"
              whileHover={{ 
                scale: 1.1, 
                rotate: [0, -10, 10, 0],
                transition: { duration: 0.5 }
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.2 }}
            >
              <motion.div 
                className={`w-20 h-20 rounded-full bg-gradient-to-r ${skill.color} flex items-center justify-center text-3xl mb-3 shadow-lg group-hover:shadow-2xl transition-shadow relative overflow-hidden`}
                whileHover={{ boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10">{skill.icon}</span>
              </motion.div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {skill.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div variants={staggerItem}>
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 25px 50px rgba(147, 51, 234, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold overflow-hidden group transition-all duration-300"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundSize: '200% 200%'
              }}
            />
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

        {/* Scroll Indicator */}
        <motion.div 
          variants={staggerItem}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
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
            className="flex flex-col items-center text-gray-400 dark:text-gray-500 cursor-pointer hover:text-purple-500 transition-colors group"
          >
            <span className="text-sm mb-2 group-hover:text-purple-500 transition-colors">
              Scroll to explore
            </span>
            <motion.div
              animate={{
                y: [0, 5, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Particle System */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-500/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -1000],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
    </motion.section>
  )
}
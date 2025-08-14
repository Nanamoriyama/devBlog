'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Code, Palette, Sparkles } from 'lucide-react'

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 0.8
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
      
      {/* Floating Elements */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-20 left-10 hidden lg:block"
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 blur-lg"></div>
      </motion.div>
      
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-40 right-20 hidden lg:block"
        style={{ animationDelay: '-2s' }}
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-20 blur-lg"></div>
      </motion.div>

      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute bottom-20 left-20 hidden lg:block"
        style={{ animationDelay: '-4s' }}
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 opacity-20 blur-lg"></div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 text-center relative z-10"
      >
        {/* Profile Image */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 opacity-75 animate-pulse"></div>
            <div className="relative w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-4xl font-bold text-gray-500 dark:text-gray-400 border-4 border-white dark:border-gray-800">
              👩‍💻
            </div>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6 leading-tight"
        >
          Frontend
          <span className="block">Developer</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p 
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Crafting beautiful, responsive web experiences with modern technologies and creative design
        </motion.p>

        {/* Feature Icons */}
        <motion.div 
          variants={itemVariants}
          className="flex justify-center space-x-8 mb-12"
        >
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="flex flex-col items-center group"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-2 group-hover:shadow-lg transition-shadow">
              <Code className="w-8 h-8 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Clean Code</span>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.1, rotate: -5 }}
            className="flex flex-col items-center group"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mb-2 group-hover:shadow-lg transition-shadow">
              <Palette className="w-8 h-8 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">UI/UX Design</span>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="flex flex-col items-center group"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mb-2 group-hover:shadow-lg transition-shadow">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Innovation</span>
          </motion.div>
        </motion.div>

        {/* CTA Button */}
        <motion.div variants={itemVariants}>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10">Explore My Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          variants={itemVariants}
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
            className="flex flex-col items-center text-gray-400 dark:text-gray-500 cursor-pointer hover:text-purple-500 transition-colors"
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'

export function SimpleHero() {
  const fadeInUp = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
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

  const skills = [
    { name: 'React', color: 'from-blue-500 to-cyan-500' },
    { name: 'TypeScript', color: 'from-purple-500 to-blue-500' },
    { name: 'Next.js', color: 'from-gray-700 to-gray-900' },
    { name: 'Tailwind', color: 'from-teal-500 to-cyan-500' }
  ]

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 flex items-center justify-center overflow-hidden">
      {/* Simple animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      </div>

      {/* Floating orbs */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-xl"
        animate={{
          y: [0, 20, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          {/* Avatar */}
          <motion.div 
            variants={fadeInUp}
            className="mb-8"
          >
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 p-0.5">
                <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                  <span className="text-3xl">👩‍💻</span>
                </div>
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 opacity-20 blur-md animate-pulse" />
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.div variants={fadeInUp} className="mb-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
              <span className="block">Frontend</span>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Developer
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Crafting beautiful, responsive web experiences with modern technologies
            and creative design solutions.
          </motion.p>

          {/* Skills */}
          <motion.div 
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className={`px-4 py-2 rounded-full bg-gradient-to-r ${skill.color} bg-opacity-10 border border-white/10 backdrop-blur-sm`}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.05)"
                }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-white text-sm font-medium">{skill.name}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            >
              View My Work
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 border border-gray-600 text-gray-300 rounded-lg font-semibold hover:border-gray-500 hover:bg-gray-800/50 transition-all duration-300"
            >
              Download CV
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            variants={fadeInUp}
            className="flex justify-center gap-6 mb-16"
          >
            {[
              { icon: Github, href: '#', label: 'GitHub' },
              { icon: Linkedin, href: '#', label: 'LinkedIn' },
              { icon: Mail, href: '#', label: 'Email' }
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full bg-gray-800/50 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-600 transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col items-center text-gray-500"
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Github, Linkedin, Mail, Code, Zap, Cpu, ArrowDown } from 'lucide-react'

export function CoolHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const slideInGlow = {
    hidden: { 
      opacity: 0, 
      y: 30,
      filter: "blur(5px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const skills = [
    { name: 'React', icon: Code, color: 'neon-cyan' },
    { name: 'TypeScript', icon: Zap, color: 'neon-green' },
    { name: 'Next.js', icon: Cpu, color: 'neon-pink' }
  ]

  return (
    <section className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Dynamic background with mouse movement */}
      <div 
        className="absolute inset-0 transition-all duration-700 ease-out"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0, 255, 159, 0.15) 0%, transparent 50%),
            radial-gradient(circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, rgba(255, 0, 110, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.1) 0%, transparent 50%)
          `
        }}
      />

      {/* Animated grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      {/* Matrix rain effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-20 bg-gradient-to-b from-transparent via-green-400 to-transparent animate-matrix-rain opacity-30"
            style={{
              left: `${(i * 8.33) + Math.random() * 5}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 border border-green-400/30 rotate-45 animate-float"
          animate={{
            rotate: [45, 135, 45],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-32 right-16 w-24 h-24 rounded-full border-2 border-pink-500/30 animate-neon-pulse"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 right-20 w-16 h-16 bg-cyan-400/10 rotate-12 animate-float"
          animate={{
            rotate: [12, 192, 12],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto"
        >
          {/* Terminal-style greeting */}
          <motion.div 
            variants={slideInGlow}
            className="mb-6"
          >
            <div className="glass rounded-lg p-4 mb-8 font-mono text-left max-w-md mx-auto border border-green-400/30">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-green-400 text-sm">
                <span className="text-gray-400">$</span> whoami
              </div>
              <div className="text-green-300 text-sm">
                frontend-developer
              </div>
            </div>
          </motion.div>

          {/* Avatar with holographic effect */}
          <motion.div 
            variants={slideInGlow}
            className="mb-8"
          >
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 via-pink-500 to-cyan-400 p-1 animate-border-glow">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-text-shimmer"></div>
                  <span className="text-4xl relative z-10">👩‍💻</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main title with shimmer effect */}
          <motion.div variants={slideInGlow} className="mb-8">
            <div className="mb-4">
              <h2 className="text-2xl md:text-3xl font-mono neon-cyan mb-2">
                HELLO, I'M
              </h2>
              <h1 className="text-4xl md:text-6xl font-bold font-mono animate-text-shimmer mb-4">
                NANA MORIYAMA
              </h1>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold">
              <div className="animate-text-shimmer">
                FRONTEND
              </div>
              <div className="neon-green text-4xl md:text-6xl">
                DEVELOPER
              </div>
            </h1>
          </motion.div>

          {/* Glitch-style subtitle */}
          <motion.div variants={slideInGlow} className="mb-10">
            <p className="text-xl md:text-2xl text-gray-300 font-mono">
              <span className="text-gray-500">{'{'}</span>
              <br />
              <span className="ml-4 neon-cyan">"crafting"</span>
              <span className="text-white">: </span>
              <span className="text-green-400">"digital experiences"</span>
              <span className="text-white">,</span>
              <br />
              <span className="ml-4 neon-pink">"technologies"</span>
              <span className="text-white">: [</span>
              <span className="text-yellow-400">"React", "TypeScript", "Next.js"</span>
              <span className="text-white">]</span>
              <br />
              <span className="text-gray-500">{'}'}</span>
            </p>
          </motion.div>

          {/* Tech stack with neon icons */}
          <motion.div 
            variants={slideInGlow}
            className="flex justify-center gap-8 mb-12"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="group glass-hover rounded-xl p-6 border border-white/10 hover-glow"
                whileHover={{ scale: 1.05, rotateY: 10 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`${skill.color} mb-3 flex justify-center`}>
                  <skill.icon className="w-8 h-8" />
                </div>
                <div className="text-white font-semibold text-sm">
                  {skill.name}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA buttons with neon effects */}
          <motion.div 
            variants={slideInGlow}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          >
            <motion.a
              href="/projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-8 py-4 bg-gradient-to-r from-green-400 to-cyan-400 text-black font-bold rounded-lg overflow-hidden group hover-glow inline-block"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">VIEW PROJECTS</span>
            </motion.a>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 glass border border-pink-500/50 text-pink-400 font-bold rounded-lg hover-glow neon-pink"
            >
              DOWNLOAD CV
            </motion.button>
          </motion.div>

          {/* Social links with hover effects */}
          <motion.div 
            variants={slideInGlow}
            className="flex justify-center gap-6 mb-16"
          >
            {[
              { icon: Github, href: '#', color: 'neon-green' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/nanamoriyama', color: 'neon-cyan' },
              { icon: Mail, href: 'mailto:nana.moriyama.amsterdam@gmail.com', color: 'neon-pink' }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : '_self'}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : ''}
                className="w-14 h-14 glass rounded-xl flex items-center justify-center hover-glow group border border-white/10"
                whileHover={{ scale: 1.1, rotateZ: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className={`w-6 h-6 ${social.color} group-hover:animate-neon-pulse`} />
              </motion.a>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div 
            variants={slideInGlow}
            className="flex flex-col items-center neon-green"
          >
            <span className="text-sm mb-3 font-mono uppercase tracking-wider">Scroll_to_explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="animate-neon-pulse"
            >
              <ArrowDown className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, Code, Briefcase, Heart, Star, ArrowRight } from 'lucide-react'

export default function ProjectsPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" }
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

  const projects = [
    {
      title: 'WIF Client Portal',
      description: 'A sophisticated enterprise client management system built during my time at Inbound Technology in Japan. This comprehensive platform handles client communications, project tracking, and business workflows with a focus on scalability and user experience.',
      longDescription: 'This enterprise-grade solution serves as the backbone for client relationship management at Inbound Technology. Features include real-time project tracking, automated workflow management, secure document sharing, and advanced analytics dashboard.',
      url: 'https://wif.ib-tec.co.jp/client',
      type: 'Professional',
      company: 'Inbound Technology',
      year: '2024',
      tech: ['React', 'TypeScript', 'Enterprise Solutions', 'REST APIs', 'Performance Optimization'],
      color: 'neon-green',
      status: 'Production',
      impact: 'Improved client management efficiency by 40%'
    },
    {
      title: 'World in Freelance',
      description: 'A comprehensive freelance marketplace platform that connects businesses with skilled freelancers worldwide. Built with modern React architecture and focused on delivering exceptional user experience for both clients and freelancers.',
      longDescription: 'A full-featured marketplace platform supporting project posting, freelancer profiles, secure payment systems, and real-time communication tools. Implemented advanced search and filtering capabilities with responsive design.',
      url: 'https://worldinfreelance.ib-tec.co.jp/',
      type: 'Professional', 
      company: 'Inbound Technology',
      year: '2024',
      tech: ['React', 'Next.js', 'Platform Development', 'Database Design', 'Payment Integration'],
      color: 'neon-cyan',
      status: 'Production',
      impact: 'Facilitated 500+ successful project completions'
    },
    {
      title: 'Fashion Web Practice',
      description: 'A personal creative project focused on pushing the boundaries of modern web design and user interface patterns. This fashion-focused website serves as a playground for experimenting with cutting-edge CSS techniques and interactive elements.',
      longDescription: 'An experimental fashion website showcasing advanced CSS Grid layouts, smooth animations, and modern design principles. Built as a learning exercise to explore creative web design and improve UX/UI skills.',
      url: 'https://fashion-web-practice.vercel.app/',
      type: 'Personal',
      company: 'Personal Project',
      year: '2023',
      tech: ['React', 'UI/UX Design', 'Responsive Design', 'CSS Animations', 'Vercel Deployment'],
      color: 'neon-pink',
      status: 'Live Demo',
      impact: 'Showcases advanced CSS and animation techniques'
    }
  ]

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-green-400/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/2 right-20 w-24 h-24 bg-cyan-400/10 rounded-full blur-2xl animate-float" />
      </div>

      <div className="container mx-auto px-6 py-32 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          {/* Header Section */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <div className="glass rounded-2xl p-8 border border-green-400/30 mb-8">
              <h1 className="text-5xl md:text-7xl font-bold font-mono mb-4">
                <span className="animate-text-shimmer">MY_PROJECTS</span>
              </h1>
              <p className="text-xl text-gray-300 font-mono">
                <span className="neon-green">const</span>
                <span className="text-white"> portfolio = </span>
                <span className="text-cyan-400">"Building digital experiences that matter"</span>
              </p>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div variants={fadeInUp} className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { label: 'PROJECTS', value: '3+', color: 'neon-green' },
              { label: 'EXPERIENCE', value: '3 YEARS', color: 'neon-cyan' },
              { label: 'TECH_STACK', value: '10+', color: 'neon-pink' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="glass glass-hover rounded-xl p-6 border border-white/10 text-center"
              >
                <div className={`text-3xl font-bold font-mono ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-400 font-mono text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <div className="space-y-12">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={fadeInUp}
                className="glass glass-hover rounded-xl border border-white/10 hover:border-green-400/50 transition-all duration-500 overflow-hidden"
              >
                <div className="p-8">
                  {/* Project Header */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                    <div className="mb-4 md:mb-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className={`text-3xl font-bold font-mono ${project.color}`}>
                          {project.title.toUpperCase()}
                        </h2>
                        <span className={`text-xs px-3 py-1 rounded-full font-mono ${ 
                          project.type === 'Professional' 
                            ? 'bg-green-400/10 text-green-400 border border-green-400/30' 
                            : 'bg-pink-400/10 text-pink-400 border border-pink-400/30'
                        }`}>
                          {project.type.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400 font-mono">
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {project.company}
                        </span>
                        <span>{project.year}</span>
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          {project.status}
                        </span>
                      </div>
                    </div>
                    
                    <motion.a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-400 to-cyan-400 text-black font-bold font-mono rounded-lg hover-glow"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>VIEW_LIVE</span>
                    </motion.a>
                  </div>

                  {/* Project Description */}
                  <div className="mb-6">
                    <p className="text-gray-300 leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {project.longDescription}
                    </p>
                  </div>

                  {/* Impact */}
                  <div className="mb-6 p-4 bg-gray-900/30 rounded-lg border border-gray-700">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="w-4 h-4 neon-pink" />
                      <span className="font-mono text-pink-400 text-sm">IMPACT</span>
                    </div>
                    <p className="text-gray-300 text-sm font-mono">
                      {project.impact}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Code className="w-4 h-4 neon-cyan" />
                      <span className="font-mono text-cyan-400 text-sm">TECH_STACK</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-mono bg-gray-800/50 text-gray-400 px-3 py-1 rounded-full border border-gray-600/50 hover:border-green-400/50 hover:text-green-400 transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                    <div className="text-sm text-gray-500 font-mono">
                      Project #{String(index + 1).padStart(2, '0')}
                    </div>
                    <motion.a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-cyan-400 text-sm font-mono hover:neon-cyan transition-all duration-300 group"
                    >
                      <span>EXPLORE_PROJECT</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div variants={fadeInUp} className="text-center mt-16">
            <div className="glass glass-hover rounded-xl p-8 border border-cyan-500/30">
              <h3 className="text-3xl font-bold font-mono neon-cyan mb-4">
                INTERESTED_IN_WORKING_TOGETHER?
              </h3>
              <p className="text-gray-300 font-mono mb-6">
                Let's create something amazing together. I'm always excited about new projects and opportunities.
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-400 to-cyan-400 text-black font-bold font-mono rounded-lg hover-glow"
              >
                <span>GET_IN_TOUCH</span>
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
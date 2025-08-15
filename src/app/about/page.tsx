'use client'

import { motion } from 'framer-motion'
import { MapPin, Calendar, Code, Mail, Globe, Heart, Zap, Coffee, ArrowRight } from 'lucide-react'

export default function AboutPage() {
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

  const skills = [
    { name: 'React', level: 90, color: 'neon-cyan' },
    { name: 'TypeScript', level: 85, color: 'neon-green' },
    { name: 'Next.js', level: 80, color: 'neon-pink' },
    { name: 'JavaScript', level: 95, color: 'text-yellow-400' },
    { name: 'CSS/SCSS', level: 90, color: 'neon-cyan' },
    { name: 'Tailwind CSS', level: 85, color: 'neon-green' }
  ]

  const timeline = [
    {
      year: '2021',
      title: 'Started Frontend Journey',
      description: 'Began learning web development, focusing on modern JavaScript and React',
      location: 'Japan 🇯🇵'
    },
    {
      year: '2022',
      title: 'Frontend Developer at Inbound Technology',
      description: 'Developed enterprise web applications and client projects using React and modern frontend technologies',
      location: 'Japan 🇯🇵'
    },
    {
      year: '2023',
      title: 'Personal Project Development',
      description: 'Created fashion web practice project to explore advanced CSS techniques and modern design principles',
      location: 'Japan 🇯🇵'
    },
    {
      year: '2024',
      title: 'Advanced Frontend & International Move',
      description: 'Built complex client solutions at Inbound Technology, then moved to Amsterdam expanding horizons with international teams',
      location: 'Japan 🇯🇵 → Amsterdam 🇳🇱'
    }
  ]

  const projects = [
    {
      title: 'WIF Client Portal',
      description: 'Enterprise client management system built at Inbound Technology',
      url: 'https://wif.ib-tec.co.jp/client',
      type: 'Professional',
      tech: ['React', 'TypeScript', 'Enterprise Solutions'],
      color: 'neon-green'
    },
    {
      title: 'World in Freelance',
      description: 'Freelance marketplace platform developed at Inbound Technology',
      url: 'https://worldinfreelance.ib-tec.co.jp/',
      type: 'Professional', 
      tech: ['React', 'Next.js', 'Platform Development'],
      color: 'neon-cyan'
    },
    {
      title: 'Fashion Web Practice',
      description: 'Personal UX/UI practice project focusing on modern design principles',
      url: 'https://fashion-web-practice.vercel.app/',
      type: 'Personal',
      tech: ['React', 'UI/UX Design', 'Responsive Design'],
      color: 'neon-pink'
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
                <span className="animate-text-shimmer">ABOUT_ME</span>
              </h1>
              <p className="text-xl text-gray-300 font-mono">
                <span className="neon-green">const</span>
                <span className="text-white"> developer = </span>
                <span className="text-cyan-400">"passionate frontend engineer"</span>
              </p>
            </div>
          </motion.div>

          {/* Profile Section */}
          <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Left - Profile Info */}
            <div className="glass glass-hover rounded-xl p-8 border border-pink-500/30">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full flex items-center justify-center animate-border-glow mr-4">
                  <span className="text-2xl">👩‍💻</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold font-mono neon-green">NANA MORIYAMA</h2>
                  <p className="text-gray-400 font-mono">Frontend Developer</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 neon-cyan" />
                  <span className="font-mono text-gray-300">Amsterdam, Netherlands 🇳🇱</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 neon-pink" />
                  <span className="font-mono text-gray-300">Originally from Japan 🇯🇵</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 neon-green" />
                  <span className="font-mono text-gray-300">3+ Years Experience</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 neon-cyan" />
                  <a 
                    href="mailto:nana.moriyama.amsterdam@gmail.com" 
                    className="font-mono text-gray-300 hover:neon-cyan transition-all duration-300 hover-glow"
                  >
                    nana.moriyama.amsterdam@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Right - Code Block */}
            <div className="glass glass-hover rounded-xl p-8 border border-cyan-500/30">
              <div className="font-mono text-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-gray-400 ml-2">developer.js</span>
                </div>
                
                <div className="space-y-2 text-gray-300">
                  <div><span className="neon-pink">const</span> <span className="neon-cyan">developer</span> <span className="text-white">=</span> <span className="text-yellow-400">{'{'}</span></div>
                  <div className="ml-4"><span className="neon-green">name</span><span className="text-white">:</span> <span className="text-orange-400">"Nana Moriyama"</span><span className="text-white">,</span></div>
                  <div className="ml-4"><span className="neon-green">origin</span><span className="text-white">:</span> <span className="text-orange-400">"Japan"</span><span className="text-white">,</span></div>
                  <div className="ml-4"><span className="neon-green">location</span><span className="text-white">:</span> <span className="text-orange-400">"Amsterdam"</span><span className="text-white">,</span></div>
                  <div className="ml-4"><span className="neon-green">experience</span><span className="text-white">:</span> <span className="text-blue-400">3</span><span className="text-white">,</span></div>
                  <div className="ml-4"><span className="neon-green">specialization</span><span className="text-white">:</span> <span className="text-orange-400">"Frontend"</span><span className="text-white">,</span></div>
                  <div className="ml-4"><span className="neon-green">passionate_about</span><span className="text-white">:</span> <span className="text-yellow-400">[</span></div>
                  <div className="ml-8"><span className="text-orange-400">"Modern web technologies"</span><span className="text-white">,</span></div>
                  <div className="ml-8"><span className="text-orange-400">"User experience design"</span><span className="text-white">,</span></div>
                  <div className="ml-8"><span className="text-orange-400">"Performance optimization"</span></div>
                  <div className="ml-4"><span className="text-yellow-400">]</span></div>
                  <div><span className="text-yellow-400">{'}'}</span></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div variants={fadeInUp} className="mb-16">
            <div className="glass glass-hover rounded-xl p-8 border border-green-400/30">
              <h3 className="text-3xl font-bold font-mono neon-green mb-8 text-center">
                TECH_STACK
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className={`font-mono font-bold ${skill.color}`}>
                        {skill.name.toUpperCase()}
                      </span>
                      <span className="text-gray-400 font-mono text-sm">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${
                          skill.color === 'neon-green' ? 'from-green-400 to-green-600' :
                          skill.color === 'neon-cyan' ? 'from-cyan-400 to-cyan-600' :
                          skill.color === 'neon-pink' ? 'from-pink-400 to-pink-600' :
                          'from-yellow-400 to-yellow-600'
                        } animate-border-glow`}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Timeline Section */}
          <motion.div variants={fadeInUp} className="mb-16">
            <div className="glass glass-hover rounded-xl p-8 border border-pink-500/30">
              <h3 className="text-3xl font-bold font-mono neon-pink mb-8 text-center">
                JOURNEY_TIMELINE
              </h3>
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                    className="flex items-start space-x-4 group"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full flex items-center justify-center font-mono font-bold text-black animate-border-glow">
                        {item.year.slice(-2)}
                      </div>
                    </div>
                    <div className="glass glass-hover rounded-lg p-4 flex-1 border border-white/10 group-hover:border-cyan-400/50 transition-all duration-300">
                      <h4 className="font-bold font-mono neon-cyan text-lg mb-1">
                        {item.title}
                      </h4>
                      <p className="text-gray-300 mb-2">
                        {item.description}
                      </p>
                      <span className="text-sm font-mono neon-green">
                        📍 {item.location}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Projects Section */}
          <motion.div variants={fadeInUp} className="mb-16">
            <div className="glass glass-hover rounded-xl p-8 border border-green-400/30">
              <h3 className="text-3xl font-bold font-mono neon-green mb-8 text-center">
                FEATURED_PROJECTS
              </h3>
              <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                  <motion.a
                    key={project.title}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                    whileHover={{ scale: 1.02, rotateY: 5 }}
                    className="glass glass-hover rounded-lg p-6 border border-white/10 hover:border-green-400/50 transition-all duration-300 group block"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className={`font-bold font-mono ${project.color} text-lg`}>
                          {project.title.toUpperCase()}
                        </h4>
                        <span className={`text-xs px-2 py-1 rounded-md font-mono ${
                          project.type === 'Professional' 
                            ? 'bg-green-400/10 text-green-400 border border-green-400/30' 
                            : 'bg-pink-400/10 text-pink-400 border border-pink-400/30'
                        }`}>
                          {project.type.toUpperCase()}
                        </span>
                      </div>
                      
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs font-mono bg-gray-800/50 text-gray-400 px-2 py-1 rounded border border-gray-600/50"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center text-cyan-400 text-sm font-mono group-hover:neon-cyan transition-all duration-300">
                        <span className="mr-2">VIEW_PROJECT</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Fun Facts */}
          <motion.div variants={fadeInUp}>
            <div className="glass glass-hover rounded-xl p-8 border border-cyan-500/30">
              <h3 className="text-3xl font-bold font-mono neon-cyan mb-8 text-center">
                FUN_FACTS
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center space-y-3">
                  <Coffee className="w-12 h-12 neon-green mx-auto animate-neon-pulse" />
                  <h4 className="font-mono font-bold text-green-400">COFFEE POWERED</h4>
                  <p className="text-gray-400 text-sm">
                    Debugging is 20% logic, 80% coffee
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <Heart className="w-12 h-12 neon-pink mx-auto animate-neon-pulse" />
                  <h4 className="font-mono font-bold text-pink-400">UI/UX ENTHUSIAST</h4>
                  <p className="text-gray-400 text-sm">
                    Beautiful interfaces make the world better
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <Zap className="w-12 h-12 neon-cyan mx-auto animate-neon-pulse" />
                  <h4 className="font-mono font-bold text-cyan-400">PERFORMANCE GEEK</h4>
                  <p className="text-gray-400 text-sm">
                    Every millisecond counts for great UX
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
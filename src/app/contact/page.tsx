'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Calendar, Github, Linkedin, Twitter, Send, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setStatusMessage('Message sent successfully! I&apos;ll get back to you soon.')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setSubmitStatus('error')
        setStatusMessage(result.error || 'Failed to send message. Please try again.')
      }
    } catch {
      setSubmitStatus('error')
      setStatusMessage('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

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

  const contactMethods = [
    {
      icon: Mail,
      title: 'EMAIL',
      subtitle: 'Direct Contact',
      value: 'nana.moriyama.amsterdam@gmail.com',
      href: 'mailto:nana.moriyama.amsterdam@gmail.com',
      color: 'neon-green'
    },
    {
      icon: MapPin,
      title: 'LOCATION',
      subtitle: 'Based in',
      value: 'Amsterdam, Netherlands',
      href: '#',
      color: 'neon-cyan'
    },
    {
      icon: Calendar,
      title: 'AVAILABILITY',
      subtitle: 'Open for',
      value: 'Freelance & Full-time',
      href: '#',
      color: 'neon-pink'
    }
  ]

  const socialLinks = [
    {
      icon: Github,
      name: 'GitHub',
      href: '#',
      color: 'neon-green'
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/nanamoriyama',
      color: 'neon-cyan'
    },
    {
      icon: Twitter,
      name: 'Twitter',
      href: '#',
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
                <span className="animate-text-shimmer">CONTACT_ME</span>
              </h1>
              <p className="text-xl text-gray-300 font-mono">
                <span className="neon-green">console.log</span>
                <span className="text-white">(</span>
                <span className="text-cyan-400">&quot;Let&apos;s build something amazing together!&quot;</span>
                <span className="text-white">)</span>
              </p>
            </div>
          </motion.div>

          {/* Contact Methods */}
          <motion.div variants={fadeInUp} className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.title}
                href={method.href}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="glass glass-hover rounded-xl p-8 border border-white/10 hover:border-green-400/50 transition-all duration-300 group block"
                whileHover={{ scale: 1.02, rotateY: 5 }}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full flex items-center justify-center animate-border-glow group-hover:animate-neon-pulse">
                    <method.icon className="w-8 h-8 text-black" />
                  </div>
                  <div>
                    <h3 className={`font-mono font-bold text-lg ${method.color} mb-1`}>
                      {method.title}
                    </h3>
                    <p className="text-gray-400 text-sm font-mono mb-2">
                      {method.subtitle}
                    </p>
                    <p className="text-white font-mono text-sm break-all">
                      {method.value}
                    </p>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Left - Contact Form */}
            <div className="glass glass-hover rounded-xl p-8 border border-cyan-500/30">
              <div className="flex items-center mb-6">
                <MessageCircle className="w-8 h-8 neon-cyan mr-3" />
                <h2 className="text-2xl font-bold font-mono neon-cyan">SEND_MESSAGE</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-mono neon-green mb-2">
                    NAME*
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white font-mono focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-mono neon-green mb-2">
                    EMAIL*
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white font-mono focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-mono neon-green mb-2">
                    SUBJECT*
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white font-mono focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all duration-300"
                    placeholder="Project collaboration"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-mono neon-green mb-2">
                    MESSAGE*
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white font-mono focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                
                {/* Status Message */}
                {submitStatus !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg border font-mono text-sm flex items-center gap-2 ${
                      submitStatus === 'success'
                        ? 'bg-green-400/10 border-green-400/30 text-green-400'
                        : 'bg-red-400/10 border-red-400/30 text-red-400'
                    }`}
                  >
                    {submitStatus === 'success' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <AlertCircle className="w-4 h-4" />
                    )}
                    {statusMessage}
                  </motion.div>
                )}
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`w-full font-bold font-mono py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                    isSubmitting
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-400 to-cyan-400 text-black hover-glow'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-gray-400 border-t-gray-200 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span>SENDING...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>SEND_MESSAGE</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>

            {/* Right - Terminal Style Info */}
            <div className="glass glass-hover rounded-xl p-8 border border-pink-500/30">
              <div className="font-mono">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-gray-400 ml-2">contact.terminal</span>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="text-gray-400">$ whoami</div>
                  <div className="text-green-400">nana-moriyama</div>
                  
                  <div className="text-gray-400">$ cat contact.json</div>
                  <div className="ml-2 space-y-1 text-gray-300">
                    <div><span className="text-cyan-400">{`{`}</span></div>
                    <div className="ml-2"><span className="neon-pink">&quot;name&quot;</span>: <span className="text-yellow-400">&quot;Nana Moriyama&quot;</span>,</div>
                    <div className="ml-2"><span className="neon-pink">&quot;role&quot;</span>: <span className="text-yellow-400">&quot;Frontend Developer&quot;</span>,</div>
                    <div className="ml-2"><span className="neon-pink">&quot;experience&quot;</span>: <span className="text-blue-400">3</span>,</div>
                    <div className="ml-2"><span className="neon-pink">&quot;location&quot;</span>: <span className="text-yellow-400">&quot;Amsterdam, NL&quot;</span>,</div>
                    <div className="ml-2"><span className="neon-pink">&quot;origin&quot;</span>: <span className="text-yellow-400">&quot;Japan&quot;</span>,</div>
                    <div className="ml-2"><span className="neon-pink">&quot;email&quot;</span>: <span className="text-yellow-400">&quot;nana.moriyama.amsterdam@gmail.com&quot;</span>,</div>
                    <div className="ml-2"><span className="neon-pink">&quot;availability&quot;</span>: <span className="text-green-400">true</span>,</div>
                    <div className="ml-2"><span className="neon-pink">&quot;timezone&quot;</span>: <span className="text-yellow-400">&quot;CET (UTC+1)&quot;</span></div>
                    <div><span className="text-cyan-400">{`}`}</span></div>
                  </div>
                  
                  <div className="text-gray-400 mt-4">$ curl -X GET /availability</div>
                  <div className="text-green-400">Status: Open for opportunities ✨</div>
                  
                  <div className="text-gray-400 mt-4">$ echo $INTERESTS</div>
                  <div className="text-cyan-400">React • TypeScript • Next.js • UX/UI</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={fadeInUp} className="text-center">
            <div className="glass glass-hover rounded-xl p-8 border border-green-400/30">
              <h3 className="text-2xl font-bold font-mono neon-green mb-8">
                CONNECT_WITH_ME
              </h3>
              <div className="flex justify-center space-x-8">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : '_self'}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : ''}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2 + 0.5, duration: 0.6 }}
                    whileHover={{ scale: 1.2, rotateZ: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-16 h-16 glass rounded-xl flex items-center justify-center hover-glow group border border-white/10 hover:border-green-400/50 transition-all duration-300"
                  >
                    <social.icon className={`w-8 h-8 ${social.color} group-hover:animate-neon-pulse`} />
                  </motion.a>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-gray-900/30 rounded-lg border border-gray-700">
                <p className="text-gray-300 font-mono text-sm">
                  <span className="neon-cyan">Response time:</span> 
                  <span className="text-white"> Usually within 24 hours ⚡</span>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
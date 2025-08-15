'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowUp, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  Heart,
  Settings,
  Github,
  Twitter,
  Linkedin,
  Mail
} from 'lucide-react'

export function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const shareUrl = () => {
    if (navigator.share) {
      navigator.share({
        title: 'DevBlog - Frontend Developer Portfolio',
        text: 'Check out this amazing frontend developer blog!',
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      // You could show a toast notification here
    }
  }

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com', color: 'hover:bg-gray-700' },
    { icon: Twitter, label: 'Twitter', href: 'https://twitter.com', color: 'hover:bg-blue-500' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com', color: 'hover:bg-blue-600' },
    { icon: Mail, label: 'Email', href: 'mailto:hello@example.com', color: 'hover:bg-green-500' }
  ]

  const mainActions = [
    {
      icon: Heart,
      label: 'Like',
      active: liked,
      onClick: () => setLiked(!liked),
      color: liked ? 'bg-red-500 text-white' : 'bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500'
    },
    {
      icon: Bookmark,
      label: 'Bookmark',
      active: bookmarked,
      onClick: () => setBookmarked(!bookmarked),
      color: bookmarked ? 'bg-yellow-500 text-white' : 'bg-white dark:bg-gray-800 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 hover:text-yellow-600'
    },
    {
      icon: Share2,
      label: 'Share',
      active: false,
      onClick: shareUrl,
      color: 'bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600'
    },
    {
      icon: MessageCircle,
      label: 'Feedback',
      active: false,
      onClick: () => window.open('mailto:feedback@example.com'),
      color: 'bg-white dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600'
    }
  ]

  return (
    <>
      {/* Main FAB */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center relative overflow-hidden group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ rotate: isExpanded ? 45 : 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          <Settings className="w-6 h-6 relative z-10" />
          
          {/* Ripple effect */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={isExpanded ? {
              scale: [1, 1.5],
              opacity: [0.3, 0]
            } : {}}
            transition={{ duration: 0.6 }}
            style={{
              background: 'radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, transparent 70%)'
            }}
          />
        </motion.button>

        {/* Action Menu */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="absolute bottom-16 right-0 space-y-3"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              {mainActions.map((action, index) => (
                <motion.div
                  key={action.label}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.span
                    className="bg-white dark:bg-gray-800 px-3 py-1 rounded-lg text-sm font-medium shadow-lg border border-gray-200 dark:border-gray-700 whitespace-nowrap"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.1 }}
                  >
                    {action.label}
                  </motion.span>
                  <motion.button
                    onClick={action.onClick}
                    className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 border border-gray-200 dark:border-gray-700 ${action.color}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
                  >
                    <action.icon className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              ))}

              {/* Social Links */}
              <motion.div
                className="pt-3 border-t border-gray-200 dark:border-gray-700 space-y-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={social.label}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <motion.span
                      className="bg-white dark:bg-gray-800 px-3 py-1 rounded-lg text-sm font-medium shadow-lg border border-gray-200 dark:border-gray-700 whitespace-nowrap"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 + 0.1 }}
                    >
                      {social.label}
                    </motion.span>
                    <motion.a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 border border-gray-200 dark:border-gray-700 ${social.color} text-gray-700 dark:text-gray-300`}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.1, type: "spring", stiffness: 300 }}
                    >
                      <social.icon className="w-4 h-4" />
                    </motion.a>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-6 left-6 w-12 h-12 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center border border-gray-200 dark:border-gray-700 z-50 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            initial={{ opacity: 0, y: 100, scale: 0 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>


      {/* Background overlay when FAB is expanded */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
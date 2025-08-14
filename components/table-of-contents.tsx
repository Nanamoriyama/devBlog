'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { List, ChevronRight } from 'lucide-react'

interface TableOfContentsProps {
  content: string
}

interface TocItem {
  id: string
  title: string
  level: number
  index: number
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([])
  const [activeSection, setActiveSection] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Extract headings from content
    const headings: TocItem[] = []
    const lines = content.split('\n')
    
    lines.forEach((line, index) => {
      const match = line.match(/^(#{1,3})\s+(.+)/)
      if (match) {
        const level = match[1].length
        const title = match[2].trim()
        const id = `heading-${index}`
        headings.push({ id, title, level, index })
      }
    })

    setTocItems(headings)
  }, [content])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0% -80% 0%',
        threshold: 0
      }
    )

    tocItems.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [tocItems])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsOpen(false)
    }
  }

  if (tocItems.length === 0) {
    return null
  }

  return (
    <div className="relative">
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-4"
      >
        <div className="flex items-center space-x-2">
          <List className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <span className="font-medium text-gray-900 dark:text-white">Table of Contents</span>
        </div>
        <ChevronRight className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </button>

      {/* Desktop Version */}
      <div className="hidden lg:block">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-4">
            <List className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Contents</h3>
          </div>
          
          <nav className="space-y-2">
            {tocItems.map(({ id, title, level }) => (
              <motion.button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`
                  w-full text-left px-3 py-2 rounded-lg transition-all text-sm
                  ${level === 1 ? 'font-semibold' : level === 2 ? 'font-medium ml-4' : 'font-normal ml-8'}
                  ${
                    activeSection === id
                      ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                  }
                `}
                whileHover={{ x: 2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="flex items-center space-x-2">
                  {activeSection === id && (
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  )}
                  <span className="truncate">{title}</span>
                </div>
              </motion.button>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <nav className="p-4 space-y-2 max-h-96 overflow-y-auto">
              {tocItems.map(({ id, title, level }) => (
                <motion.button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`
                    w-full text-left px-3 py-2 rounded-lg transition-all text-sm
                    ${level === 1 ? 'font-semibold' : level === 2 ? 'font-medium ml-4' : 'font-normal ml-8'}
                    ${
                      activeSection === id
                        ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                    }
                  `}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-2">
                    {activeSection === id && (
                      <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    )}
                    <span className="truncate">{title}</span>
                  </div>
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
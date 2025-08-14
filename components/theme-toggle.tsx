'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from '../contexts/theme-context'

export function ThemeToggle() {
  const { theme, toggleTheme, isLoading } = useTheme()

  if (isLoading) {
    return (
      <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
    )
  }

  const isDark = theme === 'dark'

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:shadow-xl transition-shadow duration-300 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 opacity-0 group-hover:opacity-10 dark:from-purple-400 dark:via-blue-400 dark:to-indigo-400 transition-opacity duration-300" />
      
      {/* Icon container */}
      <div className="relative w-6 h-6 flex items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute"
            >
              <Moon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute"
            >
              <Sun className="w-6 h-6 text-yellow-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tooltip */}
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        Switch to {isDark ? 'light' : 'dark'} mode
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              isDark ? 'bg-purple-400' : 'bg-yellow-400'
            }`}
            style={{
              left: `${20 + i * 10}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
    </motion.button>
  )
}

export function ThemeToggleExpanded() {
  const { theme, toggleTheme, isLoading } = useTheme()

  if (isLoading) {
    return (
      <div className="flex items-center space-x-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse">
        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded" />
        <div className="w-20 h-4 bg-gray-300 dark:bg-gray-600 rounded" />
      </div>
    )
  }

  const isDark = theme === 'dark'

  return (
    <motion.button
      onClick={toggleTheme}
      className="flex items-center space-x-3 px-4 py-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Icon */}
      <div className="relative w-6 h-6 flex items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ opacity: 0, rotate: -180, scale: 0 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 180, scale: 0 }}
              transition={{ duration: 0.4, ease: "backOut" }}
              className="absolute"
            >
              <Moon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ opacity: 0, rotate: 180, scale: 0 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -180, scale: 0 }}
              transition={{ duration: 0.4, ease: "backOut" }}
              className="absolute"
            >
              <Sun className="w-6 h-6 text-yellow-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Text */}
      <div className="flex flex-col items-start">
        <motion.span
          key={isDark ? 'dark' : 'light'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-sm font-medium text-gray-900 dark:text-white"
        >
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-xs text-gray-500 dark:text-gray-400"
        >
          Click to switch
        </motion.span>
      </div>

      {/* Background gradient */}
      <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${
        isDark 
          ? 'bg-gradient-to-r from-purple-500 to-blue-500'
          : 'bg-gradient-to-r from-yellow-500 to-orange-500'
      }`} />
    </motion.button>
  )
}
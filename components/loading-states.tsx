'use client'

import { motion } from 'framer-motion'

// Skeleton Components
export function SkeletonText({ lines = 1, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <motion.div
          key={i}
          className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md shimmer"
          style={{ width: `${85 + Math.random() * 15}%` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
        />
      ))}
    </div>
  )
}

export function SkeletonImage({ className = '', aspectRatio = 'aspect-square' }: { className?: string; aspectRatio?: string }) {
  return (
    <motion.div
      className={`${aspectRatio} bg-gray-200 dark:bg-gray-700 rounded-lg shimmer overflow-hidden ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded"
        />
      </div>
    </motion.div>
  )
}

export function SkeletonCard({ showImage = true, showMeta = true, className = '' }: {
  showImage?: boolean
  showMeta?: boolean
  className?: string
}) {
  return (
    <motion.div
      className={`p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {showImage && (
        <SkeletonImage className="mb-4" aspectRatio="aspect-video" />
      )}
      
      <div className="space-y-3">
        <SkeletonText lines={1} className="w-3/4" />
        <SkeletonText lines={3} />
        
        {showMeta && (
          <div className="flex items-center space-x-4 pt-2">
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full shimmer" />
            <div className="flex-1">
              <SkeletonText lines={1} className="w-24" />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export function SkeletonList({ items = 5, className = '' }: { items?: number; className?: string }) {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: items }).map((_, i) => (
        <motion.div
          key={i}
          className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
        >
          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg shimmer flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <SkeletonText lines={1} className="w-2/3" />
            <SkeletonText lines={1} className="w-1/2" />
          </div>
          <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded shimmer flex-shrink-0" />
        </motion.div>
      ))}
    </div>
  )
}

// Loading Spinners
export function LoadingSpinner({ size = 'md', className = '' }: {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }

  return (
    <motion.div
      className={`${sizes[size]} ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <div className="w-full h-full border-2 border-gray-300 dark:border-gray-600 border-t-purple-600 rounded-full" />
    </motion.div>
  )
}

export function LoadingDots({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-purple-600 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2
          }}
        />
      ))}
    </div>
  )
}

export function LoadingPulse({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`w-8 h-8 bg-purple-600 rounded-full ${className}`}
      animate={{
        scale: [1, 1.5, 1],
        opacity: [1, 0.5, 1]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  )
}

export function LoadingWave({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-end space-x-1 ${className}`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="w-1 bg-purple-600 rounded-full"
          animate={{
            height: ["8px", "24px", "8px"]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

// Progress Indicators
export function ProgressBar({ progress, className = '', showPercentage = false }: {
  progress: number
  className?: string
  showPercentage?: boolean
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      {showPercentage && (
        <motion.p
          className="text-sm text-gray-600 dark:text-gray-400 text-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {Math.round(progress)}%
        </motion.p>
      )}
    </div>
  )
}

export function CircularProgress({ progress, size = 60, strokeWidth = 4, className = '' }: {
  progress: number
  size?: number
  strokeWidth?: number
  className?: string
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-gray-200 dark:text-gray-700"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-purple-600"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  )
}

// Loading States for Components
export function BlogPostSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Hero */}
      <div className="space-y-4">
        <SkeletonText lines={1} className="w-3/4" />
        <SkeletonImage aspectRatio="aspect-video" />
      </div>
      
      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <SkeletonText lines={8} />
          <SkeletonImage aspectRatio="aspect-video" className="my-6" />
          <SkeletonText lines={6} />
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          <SkeletonCard showImage={false} showMeta={false} />
          <SkeletonCard showImage={false} showMeta={false} />
        </div>
      </div>
    </div>
  )
}

export function BlogGridSkeleton({ columns = 3 }: { columns?: number }) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

export function AdminDashboardSkeleton() {
  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <SkeletonText lines={1} className="w-48" />
          <SkeletonText lines={1} className="w-32" />
        </div>
        <div className="w-32 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg shimmer" />
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl shimmer" />
              <SkeletonText lines={1} className="w-16" />
            </div>
            <SkeletonText lines={1} className="w-20" />
            <SkeletonText lines={1} className="w-24" />
          </motion.div>
        ))}
      </div>
      
      {/* Content */}
      <BlogGridSkeleton />
    </div>
  )
}

// Empty States
export function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action,
  className = ''
}: {
  icon?: React.ComponentType<any>
  title: string
  description: string
  action?: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={`text-center py-12 ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {Icon && (
        <motion.div
          className="w-20 h-20 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <Icon className="w-10 h-10 text-gray-400" />
        </motion.div>
      )}
      
      <motion.h3
        className="text-xl font-semibold text-gray-900 dark:text-white mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {title}
      </motion.h3>
      
      <motion.p
        className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {description}
      </motion.p>
      
      {action && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {action}
        </motion.div>
      )}
    </motion.div>
  )
}
'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ImageIcon, Loader } from 'lucide-react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  fill?: boolean
  priority?: boolean
  quality?: number
  sizes?: string
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  onLoad?: () => void
  onError?: () => void
  showLoadingState?: boolean
  enableLazyLoad?: boolean
  aspectRatio?: string
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  fill = false,
  priority = false,
  quality = 75,
  sizes,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError,
  showLoadingState = true,
  enableLazyLoad = true,
  aspectRatio
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(!enableLazyLoad || priority)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!enableLazyLoad || priority || isInView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.01
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [enableLazyLoad, priority, isInView])

  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
    onError?.()
  }

  const generatePlaceholder = () => {
    if (blurDataURL) return blurDataURL
    
    // Generate a simple placeholder based on dimensions
    const w = width || 400
    const h = height || 300
    const svg = `
      <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#e5e7eb;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#f3f4f6;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)"/>
      </svg>
    `
    return `data:image/svg+xml;base64,${btoa(svg)}`
  }

  const containerClasses = `relative overflow-hidden ${className} ${
    aspectRatio ? `aspect-[${aspectRatio}]` : ''
  }`

  const ImageComponent = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="relative w-full h-full"
    >
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        quality={quality}
        sizes={sizes}
        placeholder={placeholder}
        blurDataURL={placeholder === 'blur' ? generatePlaceholder() : undefined}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-all duration-300 ${
          isLoading ? 'scale-105 blur-sm' : 'scale-100 blur-0'
        } ${fill ? 'object-cover' : ''}`}
      />
    </motion.div>
  )

  const LoadingComponent = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800"
    >
      <div className="flex flex-col items-center space-y-3">
        <Loader className="w-8 h-8 text-gray-400 animate-spin" />
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading image...</p>
      </div>
    </motion.div>
  )

  const ErrorComponent = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800"
    >
      <div className="flex flex-col items-center space-y-3 p-6 text-center">
        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
          <ImageIcon className="w-8 h-8 text-gray-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            Failed to load image
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            The image could not be displayed
          </p>
        </div>
      </div>
    </motion.div>
  )

  const PlaceholderComponent = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent animate-pulse" />
    </motion.div>
  )

  return (
    <div ref={imgRef} className={containerClasses}>
      {/* Placeholder while not in view */}
      {!isInView && <PlaceholderComponent />}
      
      {/* Main image */}
      {isInView && !hasError && <ImageComponent />}
      
      {/* Loading overlay */}
      <AnimatePresence>
        {isInView && isLoading && showLoadingState && <LoadingComponent />}
      </AnimatePresence>
      
      {/* Error state */}
      {isInView && hasError && <ErrorComponent />}
    </div>
  )
}

// Preset configurations for common use cases
export const ImagePresets = {
  hero: {
    quality: 90,
    priority: true,
    placeholder: 'blur' as const,
    sizes: '100vw'
  },
  thumbnail: {
    quality: 60,
    placeholder: 'empty' as const,
    sizes: '(max-width: 768px) 100vw, 300px'
  },
  gallery: {
    quality: 75,
    placeholder: 'blur' as const,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
  },
  avatar: {
    quality: 80,
    placeholder: 'blur' as const,
    sizes: '(max-width: 768px) 96px, 128px'
  },
  blogPost: {
    quality: 85,
    placeholder: 'blur' as const,
    sizes: '(max-width: 768px) 100vw, 800px'
  }
}

// Helper component for responsive images with multiple breakpoints
interface ResponsiveImageProps extends Omit<OptimizedImageProps, 'src'> {
  sources: {
    media?: string
    srcSet: string
    type?: string
  }[]
  fallbackSrc: string
}

export function ResponsiveImage({ sources, fallbackSrc, ...props }: ResponsiveImageProps) {
  return (
    <picture>
      {sources.map((source, index) => (
        <source
          key={index}
          media={source.media}
          srcSet={source.srcSet}
          type={source.type}
        />
      ))}
      <OptimizedImage src={fallbackSrc} {...props} />
    </picture>
  )
}

// Helper component for art-directed images
interface ArtDirectedImageProps extends OptimizedImageProps {
  breakpoints: {
    minWidth: number
    src: string
    width: number
    height: number
  }[]
}

export function ArtDirectedImage({ breakpoints, src, ...props }: ArtDirectedImageProps) {
  const sources = breakpoints.map(bp => ({
    media: `(min-width: ${bp.minWidth}px)`,
    srcSet: bp.src
  }))

  return (
    <ResponsiveImage
      sources={sources}
      fallbackSrc={src}
      {...props}
    />
  )
}
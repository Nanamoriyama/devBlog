'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Download, 
  Share2,
  Heart,
  Maximize,
  Minimize
} from 'lucide-react'

interface GalleryImage {
  id: string
  src: string
  alt: string
  title?: string
  description?: string
  width?: number
  height?: number
}

interface ImageGalleryProps {
  images: GalleryImage[]
  columns?: 2 | 3 | 4 | 5
  spacing?: 'tight' | 'normal' | 'wide'
  showTitles?: boolean
  enableLightbox?: boolean
  enableZoom?: boolean
  enableDownload?: boolean
}

export function ImageGallery({ 
  images, 
  columns = 3, 
  spacing = 'normal',
  showTitles = true,
  enableLightbox = true,
  enableZoom = true,
  enableDownload = false
}: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [likedImages, setLikedImages] = useState<Set<string>>(new Set())

  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
  }

  const spacingClass = {
    tight: 'gap-2',
    normal: 'gap-4',
    wide: 'gap-8'
  }

  const handleImageClick = (index: number) => {
    if (enableLightbox) {
      setSelectedImage(index)
      setZoomLevel(1)
    }
  }

  const handlePrevious = useCallback(() => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage > 0 ? selectedImage - 1 : images.length - 1)
      setZoomLevel(1)
    }
  }, [selectedImage, images.length])

  const handleNext = useCallback(() => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage < images.length - 1 ? selectedImage + 1 : 0)
      setZoomLevel(1)
    }
  }, [selectedImage, images.length])

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3))
  }

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 0.5))
  }

  const handleDownload = async (src: string, filename: string) => {
    try {
      const response = await fetch(src)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename || 'image.jpg'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  const toggleLike = (imageId: string) => {
    setLikedImages(prev => {
      const newSet = new Set(prev)
      if (newSet.has(imageId)) {
        newSet.delete(imageId)
      } else {
        newSet.add(imageId)
      }
      return newSet
    })
  }

  const shareImage = async (image: GalleryImage) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.title || 'Shared Image',
          text: image.description || 'Check out this image!',
          url: image.src
        })
      } catch (error) {
        console.log('Sharing failed:', error)
      }
    } else {
      // Fallback to copy URL
      navigator.clipboard.writeText(image.src)
    }
  }

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <Image className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 dark:text-gray-400">No images to display</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Gallery Grid */}
      <div className={`grid ${gridCols[columns]} ${spacingClass[spacing]}`}>
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="group relative cursor-pointer overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800"
            onClick={() => handleImageClick(index)}
          >
            <div className="aspect-square relative">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes={`(max-width: 768px) 100vw, (max-width: 1200px) ${100/columns}vw, ${100/columns}vw`}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Hover Actions */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-white/20 backdrop-blur-sm rounded-full"
                >
                  <ZoomIn className="w-6 h-6 text-white" />
                </motion.div>
              </div>

              {/* Like Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggleLike(image.id)
                }}
                className="absolute top-2 right-2 p-2 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <Heart className={`w-5 h-5 ${
                  likedImages.has(image.id) 
                    ? 'text-red-500 fill-red-500' 
                    : 'text-white'
                }`} />
              </button>

              {/* Title */}
              {showTitles && (image.title || image.description) && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {image.title && (
                    <h3 className="text-white font-semibold text-sm mb-1">
                      {image.title}
                    </h3>
                  )}
                  {image.description && (
                    <p className="text-white/80 text-xs line-clamp-2">
                      {image.description}
                    </p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Navigation */}
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Controls */}
              <div className="absolute top-4 left-4 flex space-x-2 z-10">
                {enableZoom && (
                  <>
                    <button
                      onClick={handleZoomOut}
                      className="p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
                      disabled={zoomLevel <= 0.5}
                    >
                      <ZoomOut className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleZoomIn}
                      className="p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
                      disabled={zoomLevel >= 3}
                    >
                      <ZoomIn className="w-5 h-5" />
                    </button>
                  </>
                )}
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
                >
                  {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                </button>
              </div>

              {/* Bottom Controls */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                <button
                  onClick={() => shareImage(images[selectedImage])}
                  className="p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                {enableDownload && (
                  <button
                    onClick={() => handleDownload(
                      images[selectedImage].src, 
                      images[selectedImage].title || 'image'
                    )}
                    className="p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={() => toggleLike(images[selectedImage].id)}
                  className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                >
                  <Heart className={`w-5 h-5 ${
                    likedImages.has(images[selectedImage].id) 
                      ? 'text-red-500 fill-red-500' 
                      : 'text-white'
                  }`} />
                </button>
              </div>

              {/* Image */}
              <motion.div
                className="relative max-w-full max-h-full flex items-center justify-center overflow-hidden rounded-lg"
                animate={{ scale: zoomLevel }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <Image
                  src={images[selectedImage].src}
                  alt={images[selectedImage].alt}
                  width={images[selectedImage].width || 1200}
                  height={images[selectedImage].height || 800}
                  className="max-w-full max-h-full object-contain"
                  priority
                />
              </motion.div>

              {/* Image Info */}
              <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white max-w-sm z-10">
                {images[selectedImage].title && (
                  <h3 className="font-semibold mb-1">
                    {images[selectedImage].title}
                  </h3>
                )}
                {images[selectedImage].description && (
                  <p className="text-sm text-white/80">
                    {images[selectedImage].description}
                  </p>
                )}
                <p className="text-xs text-white/60 mt-2">
                  {selectedImage + 1} of {images.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
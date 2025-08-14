'use client'

import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { 
  Upload, 
  X, 
  Trash2, 
  Download, 
  Copy, 
  Edit, 
  Folder,
  Grid,
  List,
  Search,
  Filter,
  ChevronDown,
  Image as ImageIcon,
  Plus
} from 'lucide-react'
import { uploadImage } from '../lib/blog-operations'

interface PhotoItem {
  id: string
  src: string
  name: string
  size: number
  type: string
  uploadDate: string
  folder: string
  alt?: string
  description?: string
}

interface PhotoManagerProps {
  onSelectPhoto?: (photo: PhotoItem) => void
  multiSelect?: boolean
  showFolders?: boolean
  allowUpload?: boolean
}

export function PhotoManager({ 
  onSelectPhoto, 
  multiSelect = false,
  showFolders = true,
  allowUpload = true
}: PhotoManagerProps) {
  const [photos, setPhotos] = useState<PhotoItem[]>([])
  const [selectedPhotos, setSelectedPhotos] = useState<Set<string>>(new Set())
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFolder, setSelectedFolder] = useState<string>('all')
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const folders = ['all', 'blog-posts', 'gallery', 'thumbnails', 'avatars', 'misc']

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = Array.from(e.dataTransfer.files)
    handleFileUpload(files)
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    handleFileUpload(files)
  }

  const handleFileUpload = async (files: File[]) => {
    if (files.length === 0) return

    setIsUploading(true)
    const uploadedPhotos: PhotoItem[] = []

    for (const file of files) {
      if (file.type.startsWith('image/')) {
        try {
          const uploadedUrl = await uploadImage(file, selectedFolder === 'all' ? 'uploads' : selectedFolder)
          if (uploadedUrl) {
            const newPhoto: PhotoItem = {
              id: `photo-${Date.now()}-${Math.random()}`,
              src: uploadedUrl,
              name: file.name,
              size: file.size,
              type: file.type,
              uploadDate: new Date().toISOString(),
              folder: selectedFolder === 'all' ? 'uploads' : selectedFolder
            }
            uploadedPhotos.push(newPhoto)
          }
        } catch (error) {
          console.error('Upload failed for', file.name, error)
        }
      }
    }

    setPhotos(prev => [...prev, ...uploadedPhotos])
    setIsUploading(false)
  }

  const filteredPhotos = photos.filter(photo => {
    const matchesSearch = searchQuery === '' || 
      photo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (photo.description && photo.description.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesFolder = selectedFolder === 'all' || photo.folder === selectedFolder
    
    return matchesSearch && matchesFolder
  })

  const togglePhotoSelection = (photoId: string) => {
    if (multiSelect) {
      setSelectedPhotos(prev => {
        const newSet = new Set(prev)
        if (newSet.has(photoId)) {
          newSet.delete(photoId)
        } else {
          newSet.add(photoId)
        }
        return newSet
      })
    } else {
      const photo = photos.find(p => p.id === photoId)
      if (photo && onSelectPhoto) {
        onSelectPhoto(photo)
      }
    }
  }

  const copyImageUrl = async (src: string) => {
    try {
      await navigator.clipboard.writeText(src)
      // Show success message
    } catch (error) {
      console.error('Copy failed:', error)
    }
  }

  const deletePhotos = (photoIds: string[]) => {
    setPhotos(prev => prev.filter(photo => !photoIds.includes(photo.id)))
    setSelectedPhotos(new Set())
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Photo Manager
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Manage and organize your images
            </p>
          </div>

          {allowUpload && (
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Upload Photos</span>
            </button>
          )}
        </div>

        {/* Controls */}
        <div className="mt-6 flex flex-col lg:flex-row gap-4 items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search photos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Folder Filter */}
          {showFolders && (
            <div className="relative">
              <select
                value={selectedFolder}
                onChange={(e) => setSelectedFolder(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {folders.map(folder => (
                  <option key={folder} value={folder}>
                    {folder === 'all' ? 'All Folders' : folder.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          )}

          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 rounded-lg transition-all flex items-center space-x-2 ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-gray-600 shadow-sm text-purple-600 dark:text-purple-400'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 rounded-lg transition-all flex items-center space-x-2 ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-gray-600 shadow-sm text-purple-600 dark:text-purple-400'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Selected Actions */}
        {selectedPhotos.size > 0 && (
          <div className="mt-4 flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {selectedPhotos.size} selected
            </span>
            <button
              onClick={() => deletePhotos(Array.from(selectedPhotos))}
              className="flex items-center space-x-1 px-3 py-1 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
            <button
              onClick={() => setSelectedPhotos(new Set())}
              className="flex items-center space-x-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
              <span>Clear</span>
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {isUploading && (
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full" />
              <span className="text-blue-700 dark:text-blue-400">Uploading photos...</span>
            </div>
          </div>
        )}

        {filteredPhotos.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {searchQuery || selectedFolder !== 'all' ? 'No photos found' : 'No photos uploaded'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {searchQuery || selectedFolder !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Upload some photos to get started'
              }
            </p>
            {allowUpload && !searchQuery && selectedFolder === 'all' && (
              <button
                onClick={() => setShowUploadModal(true)}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Upload Your First Photo
              </button>
            )}
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`group relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                  selectedPhotos.has(photo.id)
                    ? 'border-purple-500 ring-2 ring-purple-200 dark:ring-purple-800'
                    : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                }`}
                onClick={() => togglePhotoSelection(photo.id)}
              >
                <div className="aspect-square relative bg-gray-100 dark:bg-gray-700">
                  <Image
                    src={photo.src}
                    alt={photo.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Actions */}
                  <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        copyImageUrl(photo.src)
                      }}
                      className="p-1 bg-white/20 backdrop-blur-sm rounded text-white hover:bg-white/30 transition-colors"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deletePhotos([photo.id])
                      }}
                      className="p-1 bg-red-500/80 backdrop-blur-sm rounded text-white hover:bg-red-600/80 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Selection indicator */}
                  {selectedPhotos.has(photo.id) && (
                    <div className="absolute top-2 left-2 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                
                <div className="p-2">
                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                    {photo.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {formatFileSize(photo.size)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                className={`flex items-center space-x-4 p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedPhotos.has(photo.id)
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                onClick={() => togglePhotoSelection(photo.id)}
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
                  <Image
                    src={photo.src}
                    alt={photo.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white truncate">
                    {photo.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatFileSize(photo.size)} • {photo.folder}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {new Date(photo.uploadDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      copyImageUrl(photo.src)
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deletePhotos([photo.id])
                    }}
                    className="p-2 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Upload Photos
                  </h3>
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                    dragActive
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Drag and drop photos here, or
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Browse Files
                  </button>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
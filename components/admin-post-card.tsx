'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Edit, Trash2, Eye, Calendar, Clock, Image as ImageIcon } from 'lucide-react'
import { BlogPost } from '../lib/supabase'
import { formatDate, getReadingTime } from '../lib/utils'

interface AdminPostCardProps {
  post: BlogPost
  viewMode: 'grid' | 'list'
  index: number
  onEdit: (post: BlogPost) => void
  onDelete: (id: string) => void
}

export function AdminPostCard({ post, viewMode, index, onEdit, onDelete }: AdminPostCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0
    }
  }

  if (viewMode === 'list') {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{
          duration: 0.6,
          delay: index * 0.1,
          ease: "easeOut"
        }}
        whileHover={{ x: 4 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
      >
        <div className="flex items-center space-x-4">
          {/* Image */}
          <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-purple-400 to-pink-400">
            {post.image_url ? (
              <Image
                src={post.image_url}
                alt={post.title}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-white opacity-60" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate pr-4">
                {post.title}
              </h3>
              <div className="flex items-center space-x-2 flex-shrink-0">
                <motion.button
                  onClick={() => onEdit(post)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </motion.button>
                <motion.button
                  onClick={() => onDelete(post.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
              {post.excerpt}
            </p>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.published_at)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{getReadingTime(post.content)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{Math.floor(Math.random() * 500) + 50} views</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden group border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400">
        {post.image_url ? (
          <Image
            src={post.image_url}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="w-16 h-16 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-white opacity-60" />
            </div>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex space-x-2">
            <motion.button
              onClick={() => onEdit(post)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors"
            >
              <Edit className="w-4 h-4" />
            </motion.button>
            <motion.button
              onClick={() => onDelete(post.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-red-500/80 backdrop-blur-sm text-white rounded-lg hover:bg-red-600/80 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Status Badge */}
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 bg-green-500/80 backdrop-blur-sm text-white text-sm rounded-full font-medium">
            Published
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 leading-tight">
          {post.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>
        
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full font-medium"
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full font-medium">
                +{post.tags.length - 3}
              </span>
            )}
          </div>
        )}
        
        {/* Meta */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.published_at)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{getReadingTime(post.content)}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 text-gray-400 dark:text-gray-500">
            <Eye className="w-4 h-4" />
            <span>{Math.floor(Math.random() * 500) + 50}</span>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
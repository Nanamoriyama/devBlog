'use client'

import { motion } from 'framer-motion'
import { BlogPost } from '../lib/supabase'

interface BlogPostContentProps {
  post: BlogPost
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  const formatContent = (content: string) => {
    // Simple markdown-like formatting for demonstration
    return content
      .split('\n\n')
      .map((paragraph, index) => {
        if (paragraph.startsWith('# ')) {
          return (
            <h1 
              key={index} 
              id={`heading-${index}`}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 mt-12 first:mt-0 scroll-mt-8"
            >
              {paragraph.slice(2)}
            </h1>
          )
        }
        
        if (paragraph.startsWith('## ')) {
          return (
            <h2 
              key={index} 
              id={`heading-${index}`}
              className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 mt-10 first:mt-0 scroll-mt-8"
            >
              {paragraph.slice(3)}
            </h2>
          )
        }
        
        if (paragraph.startsWith('### ')) {
          return (
            <h3 
              key={index} 
              id={`heading-${index}`}
              className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-3 mt-8 first:mt-0 scroll-mt-8"
            >
              {paragraph.slice(4)}
            </h3>
          )
        }

        if (paragraph.startsWith('```')) {
          const code = paragraph.slice(3, -3)
          return (
            <pre key={index} className="bg-gray-900 dark:bg-gray-800 text-gray-100 p-6 rounded-xl overflow-x-auto mb-6 border border-gray-200 dark:border-gray-700">
              <code className="text-sm font-mono">{code}</code>
            </pre>
          )
        }

        if (paragraph.startsWith('> ')) {
          return (
            <blockquote key={index} className="border-l-4 border-purple-500 pl-6 py-2 italic text-gray-700 dark:text-gray-300 bg-purple-50 dark:bg-purple-900/20 rounded-r-lg mb-6">
              {paragraph.slice(2)}
            </blockquote>
          )
        }

        return (
          <p 
            key={index} 
            className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6 font-light"
            style={{ lineHeight: '1.8' }}
          >
            {paragraph}
          </p>
        )
      })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 dark:border-gray-700"
    >
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <div className="space-y-1">
          {formatContent(post.content)}
        </div>
      </div>

      {/* Author Section */}
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-2xl">
            👩‍💻
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Frontend Developer
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Passionate about creating beautiful web experiences
            </p>
          </div>
        </div>
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
            Tags
          </h4>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-sm rounded-full hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <motion.a
            href="/"
            whileHover={{ x: -5 }}
            className="inline-flex items-center space-x-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
          >
            <span>← Back to all posts</span>
          </motion.a>
          
          <motion.button
            whileHover={{ y: -2 }}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Back to top ↑
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
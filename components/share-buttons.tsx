'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Share2, Twitter, Facebook, Linkedin, Link as LinkIcon, Check } from 'lucide-react'

interface ShareButtonsProps {
  title: string
  slug: string
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  
  const url = typeof window !== 'undefined' ? `${window.location.origin}/blog/${slug}` : ''
  const encodedTitle = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(url)

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-2 mb-4">
        <Share2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        <h3 className="font-semibold text-gray-900 dark:text-white">Share this post</h3>
      </div>

      <div className="space-y-3">
        {/* Social Share Buttons */}
        <motion.a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center space-x-3 p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors group"
        >
          <Twitter className="w-5 h-5" />
          <span className="font-medium">Share on Twitter</span>
        </motion.a>

        <motion.a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center space-x-3 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors group"
        >
          <Facebook className="w-5 h-5" />
          <span className="font-medium">Share on Facebook</span>
        </motion.a>

        <motion.a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center space-x-3 p-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors group"
        >
          <Linkedin className="w-5 h-5" />
          <span className="font-medium">Share on LinkedIn</span>
        </motion.a>

        {/* Copy Link Button */}
        <motion.button
          onClick={copyToClipboard}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex items-center space-x-3 p-3 rounded-lg transition-all w-full ${
            copied
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-5 h-5" />
              <span className="font-medium">Link copied!</span>
            </>
          ) : (
            <>
              <LinkIcon className="w-5 h-5" />
              <span className="font-medium">Copy link</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Reading Stats */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
          <div className="flex justify-between">
            <span>Published:</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Reading time:</span>
            <span>5 min read</span>
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          Enjoyed this post? Consider sharing it with others!
        </p>
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 px-3 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-sm font-medium rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
          >
            👍 Like
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 px-3 py-2 bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300 text-sm font-medium rounded-lg hover:bg-pink-200 dark:hover:bg-pink-800 transition-colors"
          >
            ❤️ Love
          </motion.button>
        </div>
      </div>
    </div>
  )
}
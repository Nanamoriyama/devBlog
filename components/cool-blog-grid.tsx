'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight, Terminal } from 'lucide-react'
import { BlogPost } from '../lib/supabase'
import { formatDate, getReadingTime } from '../lib/utils'

interface CoolBlogGridProps {
  posts: BlogPost[]
}

export function CoolBlogGrid({ posts }: CoolBlogGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      filter: "blur(5px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  if (posts.length === 0) {
    return (
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="glass rounded-xl p-12 max-w-md mx-auto border border-green-400/30">
              <Terminal className="w-16 h-16 neon-green mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4 font-mono">
                NO_POSTS_FOUND
              </h2>
              <p className="text-gray-400 font-mono text-sm">
                {'>'} Check back soon for amazing content!
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto border border-pink-500/30 mb-8">
            <h2 className="text-4xl md:text-6xl font-bold font-mono mb-4">
              <span className="animate-text-shimmer">LATEST_POSTS</span>
            </h2>
            <p className="text-gray-300 text-lg font-mono">
              <span className="neon-cyan">console.log</span>
              <span className="text-white">(</span>
              <span className="text-green-400">"Insights & tutorials on modern development"</span>
              <span className="text-white">)</span>
            </p>
          </div>
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              variants={cardVariants}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <article className="glass glass-hover rounded-xl overflow-hidden border border-white/10 hover:border-green-400/50 transition-all duration-300 relative">
                  {/* Holographic border effect */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-border-glow pointer-events-none" />
                  
                  {/* Post Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image_url || '/api/placeholder/600/400'}
                      alt={post.title}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Scan line effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12" />
                  </div>

                  {/* Post Content */}
                  <div className="p-6 relative">
                    {/* Terminal-style tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs font-mono font-bold rounded-md bg-green-400/10 neon-green border border-green-400/30 hover-glow"
                          >
                            #{tag.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:neon-cyan transition-all duration-300 line-clamp-2 font-mono">
                      {post.title.toUpperCase()}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-400 mb-4 line-clamp-3 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4 font-mono">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(post.published_at).toUpperCase()}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{getReadingTime(post.content)}MIN</span>
                        </span>
                      </div>
                    </div>

                    {/* Read More Button */}
                    <div className="flex items-center text-pink-400 font-mono font-bold group-hover:neon-pink transition-all duration-300">
                      <span className="mr-2">READ_MORE</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                    </div>

                    {/* Corner accent */}
                    <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-cyan-400 opacity-50" />
                    <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-pink-400 opacity-50" />
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom decorative elements */}
        <div className="flex justify-center mt-16">
          <div className="glass rounded-full px-6 py-3 border border-green-400/30">
            <span className="text-green-400 font-mono text-sm animate-neon-pulse">
              _END_OF_TRANSMISSION_
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
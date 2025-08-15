'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BlogPost } from '../lib/supabase'
import { formatDate, getReadingTime } from '../lib/utils'
import { gsapAnimations } from '../lib/gsap-animations'

interface GSAPBlogGridProps {
  posts: BlogPost[]
}

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function GSAPBlogGrid({ posts }: GSAPBlogGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      // Grid reveal animation
      gsap.from('.blog-section-title', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.blog-section',
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      })

      // Staggered card reveal
      gsap.from('.blog-card', {
        duration: 0.8,
        y: 100,
        opacity: 0,
        scale: 0.9,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: '.blog-grid',
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      })

      // Individual card hover effects
      const cards = gsap.utils.toArray('.blog-card')
      cards.forEach((card: any) => {
        gsapAnimations.cardHoverEffect(card)

        // Parallax effect for card images
        const image = card.querySelector('.blog-card-image')
        if (image) {
          gsap.to(image, {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          })
        }

        // Glowing border effect on scroll
        ScrollTrigger.create({
          trigger: card,
          start: "top 90%",
          end: "bottom 10%",
          onEnter: () => {
            gsap.to(card, {
              duration: 0.5,
              boxShadow: "0 0 30px rgba(139, 92, 246, 0.2)",
              ease: "power2.out"
            })
          },
          onLeave: () => {
            gsap.to(card, {
              duration: 0.5,
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              ease: "power2.out"
            })
          },
          onEnterBack: () => {
            gsap.to(card, {
              duration: 0.5,
              boxShadow: "0 0 30px rgba(139, 92, 246, 0.2)",
              ease: "power2.out"
            })
          },
          onLeaveBack: () => {
            gsap.to(card, {
              duration: 0.5,
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              ease: "power2.out"
            })
          }
        })
      })

    }, gridRef)

    return () => ctx.revert()
  }, [posts])

  if (posts.length === 0) {
    return (
      <section className="blog-section py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <motion.h2 
              className="blog-section-title text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              No Posts Yet
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Check back soon for amazing content!
            </motion.p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="blog-section py-20 bg-slate-900" ref={gridRef}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="blog-section-title text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Latest Posts
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover insights, tutorials, and thoughts on modern frontend development
          </p>
        </div>

        {/* Blog Grid */}
        <div className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="block group"
            >
              <motion.article
                className="blog-card relative bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-slate-700 hover:border-purple-500/50"
                style={{
                  background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)'
                }}
              >
                {/* Cyberpunk Border Effect */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 rounded-xl border border-cyan-400/50 animate-pulse" />
                </div>

                {/* Post Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image_url || '/api/placeholder/600/400'}
                    alt={post.title}
                    fill
                    className="blog-card-image object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-800/60 to-transparent" />
                  
                  {/* Glitch Overlay Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Post Content */}
                <div className="p-6">
                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs font-medium rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-300 mb-4 line-clamp-2 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.published_at)}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{getReadingTime(post.content)} min read</span>
                      </span>
                    </div>
                  </div>

                  {/* Read More Button */}
                  <div className="flex items-center text-cyan-400 font-medium group-hover:text-cyan-300 transition-colors">
                    <span className="mr-2">Read more</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Cyber Lines */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.article>
            </Link>
          ))}
        </div>

        {/* Floating Elements for Ambiance */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400/30 rounded-full"
              style={{
                left: `${20 + (i * 20)}%`,
                top: `${30 + (i * 15)}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
import { notFound } from 'next/navigation'
import { getBlogPostBySlug, getAllBlogPosts } from '../../../../lib/blog-operations'
import { BlogPostContent } from '../../../../components/blog-post-content'
import { ReadingProgress } from '../../../../components/reading-progress'
import { TableOfContents } from '../../../../components/table-of-contents'
import { ShareButtons } from '../../../../components/share-buttons'
import { RelatedPosts } from '../../../../components/related-posts'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  
  if (!post) {
    notFound()
  }

  const allPosts = await getAllBlogPosts()
  const relatedPosts = allPosts
    .filter(p => p.id !== post.id && p.tags?.some(tag => post.tags?.includes(tag)))
    .slice(0, 3)

  return (
    <>
      <ReadingProgress />
      <article className="min-h-screen bg-white dark:bg-gray-900">
        <div className="relative">
          {/* Hero Section */}
          <div className="relative h-[60vh] bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 overflow-hidden">
            {post.image_url && (
              <div className="absolute inset-0">
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
            )}
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="container mx-auto px-6 text-center text-white">
                <div className="max-w-4xl mx-auto">
                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    {post.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                    {post.title}
                  </h1>
                  
                  <p className="text-xl md:text-2xl opacity-90 leading-relaxed mb-8">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-lg">
                    <div className="flex items-center space-x-2">
                      <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        📅
                      </span>
                      <span>{new Date(post.published_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        ⏱️
                      </span>
                      <span>{Math.ceil(post.content.split(' ').length / 200)} min read</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="relative -mt-20">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {/* Table of Contents - Desktop */}
                <div className="hidden lg:block lg:col-span-1">
                  <div className="sticky top-8">
                    <TableOfContents content={post.content} />
                  </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-2">
                  <BlogPostContent post={post} />
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="sticky top-8 space-y-8">
                    <ShareButtons 
                      title={post.title}
                      slug={post.slug}
                    />
                    
                    {/* Table of Contents - Mobile */}
                    <div className="lg:hidden">
                      <TableOfContents content={post.content} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="py-20 bg-gray-50 dark:bg-gray-800">
              <RelatedPosts posts={relatedPosts} />
            </div>
          )}
        </div>
      </article>
    </>
  )
}
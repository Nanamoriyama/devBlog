import { HeroSection } from '../../components/hero-section'
import { BlogListing } from '../../components/blog-listing'
import { getAllBlogPosts } from '../../lib/blog-operations'

export default async function Home() {
  const posts = await getAllBlogPosts()

  return (
    <main className="min-h-screen">
      <HeroSection />
      <BlogListing posts={posts} />
    </main>
  )
}

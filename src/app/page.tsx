import { AnimatedHero } from '../../components/animated-hero'
import { BlogListing } from '../../components/blog-listing'
import { getAllBlogPosts } from '../../lib/blog-operations'
import { PerformanceMonitor, PerformanceBudget, ResourceTimingAnalyzer } from '../../components/performance-monitor'

export default async function Home() {
  const posts = await getAllBlogPosts()

  return (
    <>
      <PerformanceMonitor />
      <PerformanceBudget />
      <ResourceTimingAnalyzer />
      <main className="min-h-screen">
        <AnimatedHero />
        <BlogListing posts={posts} />
      </main>
    </>
  )
}

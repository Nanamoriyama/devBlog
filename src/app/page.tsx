import { CoolHero } from '../../components/cool-hero'
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
        <CoolHero />
        <BlogListing posts={posts} />
      </main>
    </>
  )
}

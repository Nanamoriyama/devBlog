import { MetadataRoute } from 'next'
import { getAllBlogPosts } from '../../lib/blog-operations'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllBlogPosts()
  
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://your-domain.com/blog/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    {
      url: 'https://your-domain.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...postEntries,
  ]
}
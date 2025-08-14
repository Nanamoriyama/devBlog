import { supabase, BlogPost } from './supabase'
import { v4 as uuidv4 } from 'uuid'
import { mockBlogPosts } from './mock-data'

export const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false })

    if (error) {
      console.log('Using mock data - Supabase not configured:', error.message)
      return mockBlogPosts
    }

    return data && data.length > 0 ? data : mockBlogPosts
  } catch (error) {
    console.log('Using mock data - Supabase connection failed:', error)
    return mockBlogPosts
  }
}

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      console.log('Using mock data - Supabase not configured:', error.message)
      return mockBlogPosts.find(post => post.slug === slug) || null
    }

    return data || mockBlogPosts.find(post => post.slug === slug) || null
  } catch (error) {
    console.log('Using mock data - Supabase connection failed:', error)
    return mockBlogPosts.find(post => post.slug === slug) || null
  }
}

export const createBlogPost = async (post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<BlogPost | null> => {
  const slug = post.slug || createSlug(post.title)
  
  const { data, error } = await supabase
    .from('blog_posts')
    .insert([{ ...post, slug }])
    .select()
    .single()

  if (error) {
    console.error('Error creating blog post:', error)
    return null
  }

  return data
}

export const updateBlogPost = async (id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating blog post:', error)
    return null
  }

  return data
}

export const deleteBlogPost = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting blog post:', error)
    return false
  }

  return true
}

export const uploadImage = async (file: File, folder: string = 'posts'): Promise<string | null> => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${folder}/${uuidv4()}.${fileExt}`

  const { data, error } = await supabase.storage
    .from('blog-images')
    .upload(fileName, file)

  if (error) {
    console.error('Error uploading image:', error)
    return null
  }

  const { data: { publicUrl } } = supabase.storage
    .from('blog-images')
    .getPublicUrl(data.path)

  return publicUrl
}
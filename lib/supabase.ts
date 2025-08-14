import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type BlogPost = {
  id: string
  title: string
  content: string
  excerpt: string
  image_url?: string
  published_at: string
  created_at: string
  updated_at: string
  slug: string
  tags?: string[]
}

export type Tables = {
  blog_posts: BlogPost
}
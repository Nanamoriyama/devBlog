#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.log('⚠️ Supabase credentials not found, updating mock data instead');
}

// Frontend development topics for blog posts
const blogTopics = [
  "Advanced React Patterns and Performance Optimization",
  "CSS-in-JS vs Traditional CSS: Modern Styling Approaches", 
  "Web Components: The Future of Reusable UI",
  "State Management Evolution: From Redux to Zustand",
  "Building Accessible Web Applications with ARIA",
  "Modern JavaScript Features Every Developer Should Know",
  "Progressive Web Apps: Native-Like Experiences",
  "Micro-frontends Architecture and Implementation",
  "Web Performance: Core Web Vitals and Optimization",
  "TypeScript Best Practices for Large Applications",
  "Modern CSS Layout Techniques and Grid Systems",
  "API Design: GraphQL vs REST in Frontend Applications",
  "Testing Strategies for Modern Frontend Applications",
  "Browser Security: XSS, CSRF, and Content Security Policy",
  "Responsive Design: Beyond Media Queries",
  "Web Animations: CSS vs JavaScript vs WAAPI",
  "Module Bundling: Webpack, Vite, and Beyond",
  "Design Systems: Building Scalable Component Libraries",
  "Frontend Monitoring and Error Tracking",
  "Headless CMS Integration in Modern Web Apps"
];

// Utility function to create slug from title
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Generate blog post content
async function generateBlogPost() {
  const randomTopic = blogTopics[Math.floor(Math.random() * blogTopics.length)];
  
  // Use template-based generation (no OpenAI dependency)
  return generateTemplatePost(randomTopic);
}

function extractTags(title) {
  const commonTags = ['Frontend', 'Web Development', 'JavaScript'];
  const specificTags = {
    'React': ['React', 'Hooks', 'Components'],
    'CSS': ['CSS', 'Styling', 'Design'],
    'TypeScript': ['TypeScript', 'Types', 'JavaScript'],
    'Performance': ['Performance', 'Optimization', 'Speed'],
    'Testing': ['Testing', 'Quality Assurance', 'TDD'],
    'Security': ['Security', 'Best Practices', 'OWASP'],
    'API': ['API', 'Backend', 'Integration'],
    'PWA': ['PWA', 'Mobile', 'Offline'],
    'Accessibility': ['Accessibility', 'A11y', 'UX']
  };
  
  let tags = [...commonTags];
  
  for (const [key, values] of Object.entries(specificTags)) {
    if (title.includes(key)) {
      tags = [...tags, ...values];
      break;
    }
  }
  
  return tags.slice(0, 5); // Limit to 5 tags
}

function getRandomUnsplashImage() {
  // Curated list of high-quality tech/programming images from Unsplash
  const images = [
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop&q=80&auto=format', // Code on screen
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop&q=80&auto=format', // Code editor
    'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=400&fit=crop&q=80&auto=format', // Code on laptop
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop&q=80&auto=format', // Testing code
    'https://images.unsplash.com/photo-1605379399642-870262d3d051?w=800&h=400&fit=crop&q=80&auto=format', // Code screen
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=400&fit=crop&q=80&auto=format', // Technology
    'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=400&fit=crop&q=80&auto=format', // Code editor dark
    'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=800&h=400&fit=crop&q=80&auto=format', // Programming
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=400&fit=crop&q=80&auto=format', // JavaScript
    'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop&q=80&auto=format', // React code
  ];
  
  const randomImage = images[Math.floor(Math.random() * images.length)];
  return randomImage;
}

function generateTemplatePost(topic) {
  const content = `# ${topic}

## Introduction

Welcome to another deep dive into frontend development! Today we're exploring ${topic.toLowerCase()}, a crucial aspect of modern web development that every frontend developer should understand.

## Why This Matters

In today's rapidly evolving web landscape, staying up-to-date with the latest technologies and best practices is essential. ${topic} represents a key area where developers can significantly impact user experience and application performance.

## Key Concepts

### Understanding the Fundamentals

Before diving into advanced techniques, it's important to understand the core principles behind ${topic.toLowerCase()}. These fundamentals serve as the foundation for more complex implementations.

### Best Practices

Here are some essential best practices to keep in mind:

1. **Performance First**: Always consider the performance implications of your implementation choices
2. **Accessibility**: Ensure your solutions are accessible to all users
3. **Maintainability**: Write code that your future self (and your team) will thank you for
4. **Testing**: Implement comprehensive testing strategies

## Practical Implementation

\`\`\`javascript
// Example implementation
const exampleFunction = () => {
  // Your implementation here
  console.log('Building amazing frontend experiences!');
};
\`\`\`

## Common Pitfalls to Avoid

Even experienced developers can fall into traps when working with ${topic.toLowerCase()}. Here are some common mistakes and how to avoid them:

- **Over-engineering**: Keep solutions simple and focused
- **Ignoring browser compatibility**: Always test across different browsers
- **Performance oversight**: Monitor and optimize regularly

## Looking Forward

The frontend development landscape continues to evolve rapidly. Staying informed about ${topic.toLowerCase()} and related technologies will help you build better, more efficient applications.

## Conclusion

${topic} is an essential skill for modern frontend developers. By understanding these concepts and applying best practices, you can create more robust and user-friendly web applications.

Keep experimenting, keep learning, and most importantly, keep building amazing things!

---

*What are your thoughts on ${topic.toLowerCase()}? Share your experiences and questions in the comments below.*`;

  return {
    title: topic,
    content,
    excerpt: `Exploring ${topic.toLowerCase()} and its importance in modern frontend development. Learn key concepts, best practices, and practical implementation strategies.`,
    slug: createSlug(topic),
    tags: extractTags(topic),
    image_url: getRandomUnsplashImage()
  };
}

// Update mock data file
async function updateMockData(newPost) {
  try {
    const mockDataPath = path.join(__dirname, '../lib/mock-data.ts');
    const mockDataContent = await fs.readFile(mockDataPath, 'utf8');
    
    // Parse existing posts
    const postsMatch = mockDataContent.match(/export const mockBlogPosts: BlogPost\[\] = \[([\s\S]*?)\]/);
    if (!postsMatch) {
      throw new Error('Could not parse mock data file');
    }
    
    // Create new post object
    const newPostObject = `  {
    id: '${Date.now()}',
    title: '${newPost.title}',
    content: \`${newPost.content.replace(/`/g, '\\`')}\`,
    excerpt: '${newPost.excerpt.replace(/'/g, "\\'")}',
    image_url: '${newPost.image_url}',
    published_at: '${new Date().toISOString()}',
    slug: '${newPost.slug}',
    tags: [${newPost.tags.map(tag => `'${tag}'`).join(', ')}]
  }`;
    
    // Insert new post at the beginning
    const existingPosts = postsMatch[1].trim();
    const updatedPosts = `  ${newPostObject},\n${existingPosts}`;
    
    // Keep only the latest 10 posts to avoid file bloat
    const postObjects = updatedPosts.split('\n  },').slice(0, 10);
    const finalPosts = postObjects.join('\n  },').replace(/,$/, '');
    
    const updatedContent = mockDataContent.replace(
      /export const mockBlogPosts: BlogPost\[\] = \[([\s\S]*?)\]/,
      `export const mockBlogPosts: BlogPost[] = [\n${finalPosts}\n]`
    );
    
    await fs.writeFile(mockDataPath, updatedContent, 'utf8');
    console.log('✅ Mock data updated successfully');
  } catch (error) {
    console.error('❌ Error updating mock data:', error);
  }
}

// Insert post into Supabase
async function insertIntoSupabase(post) {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([{
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
        slug: post.slug,
        tags: post.tags,
        image_url: post.image_url,
        published_at: new Date().toISOString()
      }]);
    
    if (error) {
      throw error;
    }
    
    console.log('✅ Post inserted into Supabase successfully');
    return data;
  } catch (error) {
    console.error('❌ Error inserting into Supabase:', error);
    throw error;
  }
}

// Main execution
async function main() {
  try {
    console.log('🤖 Generating weekly blog post...');
    
    const newPost = await generateBlogPost();
    console.log(`📝 Generated post: "${newPost.title}"`);
    
    // Try to insert into Supabase first
    if (supabaseUrl && supabaseKey) {
      try {
        await insertIntoSupabase(newPost);
        console.log('🎉 Blog post published to Supabase!');
      } catch (error) {
        console.log('⚠️ Supabase insertion failed, updating mock data instead');
        await updateMockData(newPost);
      }
    } else {
      await updateMockData(newPost);
    }
    
    console.log('✨ Weekly blog post generation completed!');
  } catch (error) {
    console.error('❌ Error in main execution:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { generateBlogPost, insertIntoSupabase, updateMockData };
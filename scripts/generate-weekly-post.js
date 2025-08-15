#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
const OpenAI = require('openai');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const openaiApiKey = process.env.OPENAI_API_KEY;

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
  
  // If OpenAI API key is available, use AI to generate content
  if (openaiApiKey) {
    try {
      const openai = new OpenAI({ apiKey: openaiApiKey });
      
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an expert frontend developer and technical writer. Write comprehensive, informative blog posts about frontend development topics. Include code examples, best practices, and practical insights."
          },
          {
            role: "user",
            content: `Write a detailed blog post about "${randomTopic}". The post should be around 800-1200 words, include practical examples, and be structured with proper headings. Use markdown formatting.`
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      });

      const content = completion.choices[0].message.content;
      const excerpt = content.split('\n').find(line => line.length > 50)?.substring(0, 150) + '...';
      
      return {
        title: randomTopic,
        content,
        excerpt,
        slug: createSlug(randomTopic),
        tags: extractTags(randomTopic),
        image_url: getRandomUnsplashImage()
      };
    } catch (error) {
      console.log('OpenAI API error, falling back to template:', error.message);
    }
  }
  
  // Fallback to template-based generation
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
  const keywords = ['coding', 'programming', 'developer', 'computer', 'technology', 'web', 'software'];
  const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
  return `https://images.unsplash.com/photo-${Date.now()}?w=800&h=400&fit=crop&q=80&auto=format&ixlib=rb-4.0.3&keyword=${randomKeyword}`;
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
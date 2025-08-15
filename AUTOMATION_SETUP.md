# 🤖 Weekly Blog Post Automation Setup

This system automatically generates and publishes new blog posts every week to keep your Supabase database active and prevent auto-pausing.

## ⚡ Quick Setup

### 1. GitHub Repository Setup
1. Push this code to your GitHub repository
2. Go to your repository → **Settings** → **Secrets and variables** → **Actions**
3. Add the following secrets:

**Required Secrets:**
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Your Supabase anonymous key

**Optional Secret:**
- `OPENAI_API_KEY` - For AI-generated content (otherwise uses templates)

### 2. Environment Variables
Your Supabase credentials from `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Enable GitHub Actions
1. Go to your repository → **Actions** tab
2. If prompted, click "I understand my workflows, go ahead and enable them"
3. The workflow will run automatically every Monday at 10:00 AM UTC

## 🔧 How It Works

### Automated Schedule
- **When**: Every Monday at 10:00 AM UTC
- **What**: Generates a new blog post about frontend development topics
- **Where**: Posts directly to your Supabase database

### Content Generation
The system uses two methods:

1. **AI-Powered** (if OpenAI API key provided):
   - Uses GPT-3.5 to generate comprehensive, unique blog posts
   - Topics rotate through 20+ frontend development subjects
   - 800-1200 word articles with code examples

2. **Template-Based** (fallback):
   - Professional templates covering frontend topics
   - Still unique with randomized topics and content
   - Maintains high quality even without AI

### Topics Covered
- React patterns and performance
- CSS and styling approaches
- TypeScript and JavaScript features
- Web components and architecture
- Testing and security practices
- Performance optimization
- Modern development tools

## 🚀 Manual Testing

Test the system locally:

```bash
# Install dependencies (if not already done)
npm install

# Test the blog post generator
npm run generate-post
```

Or run the workflow manually:
1. Go to **Actions** → **Weekly Blog Post Generator**
2. Click **Run workflow** → **Run workflow**

## 📝 Customization

### Change Schedule
Edit `.github/workflows/weekly-blog-post.yml`:
```yaml
schedule:
  # Every Sunday at 2 PM UTC
  - cron: '0 14 * * 0'
```

### Add Topics
Edit `scripts/generate-weekly-post.js` and add to the `blogTopics` array:
```javascript
const blogTopics = [
  "Your Custom Topic Here",
  // ... existing topics
];
```

### Customize Content
Modify the `generateTemplatePost()` function in `scripts/generate-weekly-post.js` to change the blog post structure and content.

## 🛡️ Fallback System

The automation is designed to be robust:

1. **Primary**: Posts to Supabase database
2. **Fallback**: Updates mock data if Supabase fails
3. **Graceful**: Continues working even without OpenAI API

Your blog will always have new content, regardless of external service availability.

## 📊 Benefits

- **Prevents Supabase auto-pause**: Regular database activity keeps it active
- **Fresh content**: New blog posts showcase your ongoing development knowledge
- **SEO boost**: Regular content publication improves search rankings
- **Portfolio enhancement**: Demonstrates automation and DevOps skills
- **Zero maintenance**: Runs completely automatically

## 🔍 Monitoring

Check automation status:
1. **GitHub Actions** tab shows execution history
2. **Supabase** database shows new posts
3. **Your blog** displays the latest articles

## ⚙️ Troubleshooting

**Workflow not running?**
- Check GitHub Actions are enabled in repository settings
- Verify secrets are correctly configured
- Check the Actions tab for error logs

**Posts not appearing in Supabase?**
- Verify database credentials in GitHub secrets
- Check Supabase RLS policies allow insertions
- Review the workflow logs for specific errors

**Want to stop automation?**
- Disable the workflow in `.github/workflows/weekly-blog-post.yml`
- Or delete the workflow file entirely

---

🎉 **Your blog will now stay active and continuously grow with high-quality content!**
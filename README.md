# DevBlog - Modern Frontend Developer Portfolio 🚀

A stunning, modern blog application built to showcase frontend development skills. Features cutting-edge technologies, beautiful animations, and professional UI/UX design.

![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23.12-pink?style=for-the-badge&logo=framer)

## ✨ Features

### 🎨 **Modern Design & UX**
- **Stunning Animated Hero Section** with floating elements and particle effects
- **Dark/Light Mode** with smooth transitions and system preference detection
- **Fully Responsive Design** that works beautifully on all devices
- **Modern Typography** using Inter and JetBrains Mono fonts

### 📱 **Advanced Blog Functionality**
- **Smart Blog Listing** with real-time search, tag filtering, and sorting
- **Individual Post Pages** with reading progress, TOC, and social sharing
- **Complete Admin Dashboard** for content management with drag-drop uploads
- **Advanced Image Gallery** with lightbox, zoom, and photo management
- **Tag System** with visual indicators and filtering

### 🚀 **Performance & SEO**
- **Next.js 15** with App Router for optimal performance
- **Image Optimization** with lazy loading, WebP/AVIF support
- **SEO Optimized** with meta tags, structured data, sitemap
- **Performance Monitoring** with Web Vitals tracking
- **Bundle Analysis** and resource optimization tools

### 🎭 **Animations & Interactions**
- **Framer Motion** powered smooth animations throughout
- **Scroll-triggered animations** and parallax effects
- **Micro-interactions** for buttons, cards, hover effects
- **Loading states** with skeleton screens and spinners
- **Floating Action Menu** with social links and quick actions

### 🛠 **Developer Experience**
- **TypeScript** for type safety and better DX
- **Component-driven architecture** with reusable, tested components
- **Mock data included** - works without backend setup
- **Performance budgets** and monitoring tools built-in
- **Clean, maintainable code** with modern patterns

## 🚀 **Quick Start**

### Prerequisites
- Node.js 18+
- npm or yarn

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment (Optional)
For full functionality with Supabase:
```bash
# Copy environment template
cp .env.local .env.local

# Add your Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

**Note:** The app works perfectly with mock data if you skip this step!

### 3. Run the Supabase schema (Optional)
If using Supabase, run the SQL in `supabase/schema.sql` in your Supabase SQL editor.

### 4. Start development server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) - Your blog is ready! 🎉

## 🏗 **Tech Stack**

- **Framework:** Next.js 15.4.6 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4 + CSS Custom Properties  
- **Animations:** Framer Motion 12.23.12
- **Database:** Supabase (with fallback to mock data)
- **UI Components:** Custom built with Radix UI primitives
- **Icons:** Lucide React
- **Fonts:** Inter & JetBrains Mono

## 📁 **Project Structure**

```
dev-blog/
├── src/app/                    # Next.js App Router
│   ├── admin/                 # Admin dashboard
│   ├── blog/[slug]/          # Dynamic blog posts
│   └── layout.tsx            # Root layout with theme
├── components/               # React components
│   ├── ui/                  # Base UI components
│   ├── blog-*.tsx          # Blog functionality
│   ├── admin-*.tsx         # Admin features
│   └── *-animations.tsx    # Animation components
├── lib/                     # Core utilities
│   ├── blog-operations.ts  # Database operations
│   ├── mock-data.ts       # Sample content
│   └── utils.ts           # Helpers
└── contexts/               # React contexts
    └── theme-context.tsx   # Theme management
```

## 🎯 **Key Features Showcase**

### 🏠 Homepage
- Animated hero with floating particles
- Blog listing with advanced search/filtering
- Smooth scroll animations
- Dark/light mode toggle

### 📝 Blog Posts  
- Reading progress indicator
- Floating table of contents
- Social sharing buttons
- Related posts suggestions
- Beautiful typography

### ⚙️ Admin Dashboard
- Complete content management
- Drag-and-drop image uploads
- Real-time preview
- Performance analytics
- Photo management system

### 📱 Mobile Experience
- Touch-optimized interactions
- Responsive navigation
- Mobile-first design
- Fast loading on all devices

## 🚀 **Deployment**

### Vercel (Recommended)
```bash
# Deploy to Vercel
vercel --prod

# Or connect your GitHub repo to Vercel dashboard
```

### Environment Variables for Production
```env
NEXT_PUBLIC_SUPABASE_URL=your_production_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_key
```

## 🎨 **Customization**

### Brand Colors
Update the color scheme in `tailwind.config.js` and component files. Default theme uses purple-pink-blue gradients.

### Content
- Edit `lib/mock-data.ts` for sample blog posts
- Customize navigation in `components/navigation.tsx`
- Update social links in `components/floating-actions.tsx`

### Performance
- Configure image domains in `next.config.ts`
- Adjust performance budgets in `components/performance-monitor.tsx`

## 📊 **Performance Features**

- **Core Web Vitals monitoring** - LCP, FID, CLS tracking
- **Resource analysis** - Bundle size and loading optimization  
- **Performance budgets** - Automatic performance checks
- **Image optimization** - WebP/AVIF with lazy loading
- **Code splitting** - Route-based automatic splitting

## 🤝 **Contributing**

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 **License**

MIT License - see [LICENSE](LICENSE) for details.

---

⭐ **Built with modern web technologies to showcase frontend development skills!**

Perfect for developers looking to create an impressive portfolio that demonstrates:
- Advanced React/Next.js knowledge
- Modern animation techniques
- Performance optimization
- TypeScript mastery
- UI/UX design skills

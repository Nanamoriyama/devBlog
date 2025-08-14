'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

export function PerformanceMonitor() {
  useEffect(() => {
    // Web Vitals monitoring
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Measure and report Core Web Vitals
      const reportWebVitals = (metric: any) => {
        // Send to analytics (replace with your analytics service)
        console.log(`${metric.name}: ${metric.value}${metric.unit || ''}`)
        
        // Send to Google Analytics if available
        if (window.gtag) {
          window.gtag('event', metric.name, {
            custom_parameter_1: metric.value,
            custom_parameter_2: metric.unit,
          })
        }
      }

      // Largest Contentful Paint (LCP)
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        
        reportWebVitals({
          name: 'LCP',
          value: lastEntry.startTime,
          unit: 'ms'
        })
      })
      observer.observe({ entryTypes: ['largest-contentful-paint'] })

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          reportWebVitals({
            name: 'FID',
            value: entry.processingStart - entry.startTime,
            unit: 'ms'
          })
        })
      })
      fidObserver.observe({ entryTypes: ['first-input'] })

      // Cumulative Layout Shift (CLS)
      let clsValue = 0
      let clsEntries: any[] = []
      const clsObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsEntries.push(entry)
            clsValue += entry.value
          }
        })
        
        reportWebVitals({
          name: 'CLS',
          value: clsValue,
          unit: ''
        })
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })

      // Time to First Byte (TTFB)
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      if (navigation) {
        reportWebVitals({
          name: 'TTFB',
          value: navigation.responseStart - navigation.requestStart,
          unit: 'ms'
        })
      }

      // First Contentful Paint (FCP)
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            reportWebVitals({
              name: 'FCP',
              value: entry.startTime,
              unit: 'ms'
            })
          }
        })
      })
      fcpObserver.observe({ entryTypes: ['paint'] })

      // Memory usage (if available)
      if ('memory' in performance) {
        const memoryInfo = (performance as any).memory
        reportWebVitals({
          name: 'Memory Usage',
          value: Math.round(memoryInfo.usedJSHeapSize / 1024 / 1024),
          unit: 'MB'
        })
      }

      // Page Load Time
      window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart
        reportWebVitals({
          name: 'Page Load Time',
          value: loadTime,
          unit: 'ms'
        })
      })

      // Connection information
      if ('connection' in navigator) {
        const connection = (navigator as any).connection
        console.log(`Connection: ${connection.effectiveType}, Downlink: ${connection.downlink} Mbps`)
      }

      return () => {
        observer.disconnect()
        fidObserver.disconnect()
        clsObserver.disconnect()
        fcpObserver.disconnect()
      }
    }
  }, [])

  return null // This component doesn't render anything
}

// Performance budget checker
export function PerformanceBudget() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const checkBudget = () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        
        if (navigation) {
          const budgets = {
            loadTime: 3000, // 3 seconds
            domContentLoaded: 2000, // 2 seconds
            firstPaint: 1000, // 1 second
          }

          const metrics = {
            loadTime: navigation.loadEventEnd - navigation.navigationStart,
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.navigationStart,
            firstPaint: performance.getEntriesByType('paint')
              .find(entry => entry.name === 'first-paint')?.startTime || 0
          }

          // Check if budgets are exceeded
          Object.entries(budgets).forEach(([key, budget]) => {
            const actual = metrics[key as keyof typeof metrics]
            if (actual > budget) {
              console.warn(`⚠️  Performance budget exceeded for ${key}: ${actual}ms (budget: ${budget}ms)`)
            } else {
              console.log(`✅ Performance budget met for ${key}: ${actual}ms (budget: ${budget}ms)`)
            }
          })
        }
      }

      // Check budget after page load
      if (document.readyState === 'complete') {
        checkBudget()
      } else {
        window.addEventListener('load', checkBudget)
        return () => window.removeEventListener('load', checkBudget)
      }
    }
  }, [])

  return null
}

// Resource timing analyzer
export function ResourceTimingAnalyzer() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const analyzeResources = () => {
        const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
        
        const resourceStats = {
          images: { count: 0, totalSize: 0, totalTime: 0 },
          scripts: { count: 0, totalSize: 0, totalTime: 0 },
          stylesheets: { count: 0, totalSize: 0, totalTime: 0 },
          fonts: { count: 0, totalSize: 0, totalTime: 0 },
        }

        resources.forEach(resource => {
          const duration = resource.responseEnd - resource.startTime
          const size = resource.transferSize || 0
          
          if (resource.name.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/i)) {
            resourceStats.images.count++
            resourceStats.images.totalSize += size
            resourceStats.images.totalTime += duration
          } else if (resource.name.match(/\.(js)$/i)) {
            resourceStats.scripts.count++
            resourceStats.scripts.totalSize += size
            resourceStats.scripts.totalTime += duration
          } else if (resource.name.match(/\.(css)$/i)) {
            resourceStats.stylesheets.count++
            resourceStats.stylesheets.totalSize += size
            resourceStats.stylesheets.totalTime += duration
          } else if (resource.name.match(/\.(woff|woff2|ttf|otf)$/i)) {
            resourceStats.fonts.count++
            resourceStats.fonts.totalSize += size
            resourceStats.fonts.totalTime += duration
          }
        })

        console.group('📊 Resource Analysis')
        Object.entries(resourceStats).forEach(([type, stats]) => {
          if (stats.count > 0) {
            console.log(`${type}: ${stats.count} files, ${(stats.totalSize / 1024).toFixed(2)} KB, ${stats.totalTime.toFixed(2)}ms`)
          }
        })
        console.groupEnd()

        // Find slow resources
        const slowResources = resources
          .filter(resource => resource.duration > 1000)
          .sort((a, b) => b.duration - a.duration)

        if (slowResources.length > 0) {
          console.group('🐌 Slow Resources (>1s)')
          slowResources.forEach(resource => {
            console.log(`${resource.name}: ${resource.duration.toFixed(2)}ms`)
          })
          console.groupEnd()
        }
      }

      window.addEventListener('load', analyzeResources)
      return () => window.removeEventListener('load', analyzeResources)
    }
  }, [])

  return null
}

// Bundle size analyzer
export function BundleAnalyzer() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const analyzeBundles = () => {
        const scripts = Array.from(document.querySelectorAll('script[src]')) as HTMLScriptElement[]
        const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]')) as HTMLLinkElement[]

        console.group('📦 Bundle Analysis')
        
        scripts.forEach(script => {
          if (script.src.includes('/_next/static/')) {
            fetch(script.src, { method: 'HEAD' })
              .then(response => {
                const size = response.headers.get('content-length')
                if (size) {
                  console.log(`JS Bundle: ${script.src.split('/').pop()}: ${(parseInt(size) / 1024).toFixed(2)} KB`)
                }
              })
              .catch(() => {}) // Ignore errors for cross-origin requests
          }
        })

        stylesheets.forEach(link => {
          if (link.href.includes('/_next/static/')) {
            fetch(link.href, { method: 'HEAD' })
              .then(response => {
                const size = response.headers.get('content-length')
                if (size) {
                  console.log(`CSS Bundle: ${link.href.split('/').pop()}: ${(parseInt(size) / 1024).toFixed(2)} KB`)
                }
              })
              .catch(() => {}) // Ignore errors for cross-origin requests
          }
        })

        console.groupEnd()
      }

      window.addEventListener('load', analyzeBundles)
      return () => window.removeEventListener('load', analyzeBundles)
    }
  }, [])

  return null
}
'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export class GSAPAnimations {
  private static instance: GSAPAnimations
  private tl: GSAPTimeline | null = null

  constructor() {
    if (typeof window !== 'undefined') {
      // Set default ease
      gsap.defaults({ ease: "power2.out", duration: 1 })
    }
  }

  static getInstance(): GSAPAnimations {
    if (!GSAPAnimations.instance) {
      GSAPAnimations.instance = new GSAPAnimations()
    }
    return GSAPAnimations.instance
  }

  // Cyberpunk text reveal animation
  animateTextReveal(element: string | Element, options?: any) {
    if (typeof window === 'undefined') return

    const tl = gsap.timeline()
    
    // Split text into characters for individual animation
    const chars = gsap.utils.toArray(`${element} .char`)
    
    tl.from(chars, {
      duration: 0.8,
      opacity: 0,
      scale: 0,
      y: 80,
      rotationX: 180,
      transformOrigin: "0% 50% -50",
      ease: "back.out(1.7)",
      stagger: 0.01,
      ...options
    })

    return tl
  }

  // Glitch effect animation
  glitchEffect(element: string | Element, duration: number = 2) {
    if (typeof window === 'undefined') return

    const tl = gsap.timeline({ repeat: -1, yoyo: true })
    
    tl.to(element, {
      duration: 0.1,
      skewX: () => gsap.utils.random(-20, 20),
      skewY: () => gsap.utils.random(-5, 5),
      x: () => gsap.utils.random(-10, 10),
      filter: "hue-rotate(90deg)",
      ease: "power2.inOut"
    })
    .to(element, {
      duration: 0.1,
      skewX: 0,
      skewY: 0,
      x: 0,
      filter: "hue-rotate(0deg)",
      ease: "power2.inOut"
    })
    .to(element, {
      duration: duration,
      ease: "none"
    })

    return tl
  }

  // Cyberpunk card hover effect
  cardHoverEffect(element: string | Element) {
    if (typeof window === 'undefined') return

    const card = gsap.utils.toArray(element)[0] as Element
    if (!card) return

    const handleMouseEnter = () => {
      gsap.to(card, {
        duration: 0.3,
        scale: 1.05,
        rotationY: 10,
        rotationX: 5,
        z: 100,
        boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)",
        filter: "brightness(1.1)",
        ease: "power2.out"
      })

      // Animate border glow
      gsap.to(card, {
        duration: 0.3,
        "--glow-opacity": 1,
        ease: "power2.out"
      })
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        duration: 0.3,
        scale: 1,
        rotationY: 0,
        rotationX: 0,
        z: 0,
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        filter: "brightness(1)",
        ease: "power2.out"
      })

      gsap.to(card, {
        duration: 0.3,
        "--glow-opacity": 0,
        ease: "power2.out"
      })
    }

    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }

  // Floating particles animation
  createFloatingParticles(container: string | Element, count: number = 20) {
    if (typeof window === 'undefined') return

    const particles: HTMLElement[] = []
    const containerEl = typeof container === 'string' ? document.querySelector(container) : container

    if (!containerEl) return

    // Create particles
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div')
      particle.className = 'particle'
      particle.style.cssText = `
        position: absolute;
        width: ${gsap.utils.random(2, 8)}px;
        height: ${gsap.utils.random(2, 8)}px;
        background: linear-gradient(45deg, #8b5cf6, #06b6d4);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        opacity: 0.6;
      `
      
      containerEl.appendChild(particle)
      particles.push(particle)

      // Animate particle
      gsap.set(particle, {
        x: gsap.utils.random(0, containerEl.clientWidth),
        y: gsap.utils.random(0, containerEl.clientHeight)
      })

      gsap.to(particle, {
        duration: gsap.utils.random(10, 20),
        x: `+=${gsap.utils.random(-200, 200)}`,
        y: `+=${gsap.utils.random(-200, 200)}`,
        rotation: 360,
        opacity: gsap.utils.random(0.3, 0.8),
        ease: "none",
        repeat: -1,
        yoyo: true
      })
    }

    return particles
  }

  // Matrix rain effect
  matrixRain(container: string | Element) {
    if (typeof window === 'undefined') return

    const containerEl = typeof container === 'string' ? document.querySelector(container) : container
    if (!containerEl) return

    const chars = '01ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝ'
    const columns = Math.floor(containerEl.clientWidth / 20)

    for (let i = 0; i < columns; i++) {
      const drop = document.createElement('div')
      drop.style.cssText = `
        position: absolute;
        left: ${i * 20}px;
        top: -20px;
        color: #00ff00;
        font-family: 'JetBrains Mono', monospace;
        font-size: 14px;
        opacity: 0.7;
        pointer-events: none;
        z-index: 1;
      `
      
      drop.textContent = chars[Math.floor(Math.random() * chars.length)]
      containerEl.appendChild(drop)

      gsap.to(drop, {
        duration: gsap.utils.random(2, 5),
        y: containerEl.clientHeight + 20,
        opacity: 0,
        ease: "none",
        repeat: -1,
        delay: gsap.utils.random(0, 2),
        onRepeat: () => {
          drop.textContent = chars[Math.floor(Math.random() * chars.length)]
          gsap.set(drop, { y: -20, opacity: 0.7 })
        }
      })
    }
  }

  // Scroll-triggered animations
  setupScrollAnimations() {
    if (typeof window === 'undefined') return

    // Parallax sections
    gsap.utils.toArray('.gsap-parallax').forEach((section: any) => {
      gsap.to(section, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      })
    })

    // Reveal animations
    gsap.utils.toArray('.gsap-reveal').forEach((element: any) => {
      gsap.from(element, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      })
    })

    // Scale on scroll
    gsap.utils.toArray('.gsap-scale').forEach((element: any) => {
      gsap.from(element, {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      })
    })
  }

  // Hero entrance animation
  heroEntrance() {
    if (typeof window === 'undefined') return

    const tl = gsap.timeline()

    // Animate hero background
    tl.from('.hero-bg', {
      duration: 2,
      scale: 1.2,
      opacity: 0,
      ease: "power2.out"
    })

    // Animate avatar with magnetic effect
    tl.from('.hero-avatar', {
      duration: 1.5,
      scale: 0,
      rotation: 180,
      ease: "back.out(1.7)"
    }, "-=1.5")

    // Animate title with typewriter effect
    tl.from('.hero-title .char', {
      duration: 0.8,
      opacity: 0,
      y: 50,
      rotationX: 90,
      stagger: 0.05,
      ease: "back.out(1.7)"
    }, "-=1")

    // Animate subtitle
    tl.from('.hero-subtitle', {
      duration: 1,
      opacity: 0,
      y: 30,
      ease: "power2.out"
    }, "-=0.5")

    // Animate skills
    tl.from('.hero-skill', {
      duration: 0.8,
      scale: 0,
      rotation: 180,
      stagger: 0.2,
      ease: "back.out(1.7)"
    }, "-=0.5")

    // Animate CTA button
    tl.from('.hero-cta', {
      duration: 1,
      scale: 0,
      ease: "elastic.out(1, 0.5)"
    }, "-=0.3")

    return tl
  }

  // Cleanup method
  cleanup() {
    if (typeof window !== 'undefined') {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      gsap.killTweensOf("*")
    }
  }
}

export const gsapAnimations = GSAPAnimations.getInstance()
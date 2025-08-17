import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Footer from './components/Footer'
import Tools from './components/Tools'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import ScrollingPath from './components/ScrollingPath'

export default function App(){
  // Enhanced smooth scroll management with proper top positioning
  React.useEffect(() => {
    // IMMEDIATE scroll to top on any page load - before anything else
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    
    // Scroll to top on initial page load/reload
    const scrollToTop = () => {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }

    const scrollToSection = (el, smooth = true) => {
      if (!el) return
      const headerHeight = 120 // Account for fixed header
      const rect = el.getBoundingClientRect()
      const targetY = window.scrollY + rect.top - headerHeight
      window.scrollTo({ 
        top: Math.max(0, targetY), 
        behavior: smooth ? 'smooth' : 'instant' 
      })
    }

    // Handle hash-based navigation for smooth scrolling
    const onDocClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href^="#"]')
      if (!a) return
      
      const href = a.getAttribute('href') || ''
      if (href === '#' || href.length < 2) return
      
      const sectionId = href.slice(1)
      if (!['home', 'tools', 'experience', 'projects', 'contact'].includes(sectionId)) return
      
      const el = document.getElementById(sectionId)
      if (!el) return
      
      e.preventDefault()
      
      // Update URL without page reload for better UX and SEO
      try { 
        history.replaceState(null, '', href) 
      } catch {}
      
      if (sectionId === 'home') {
        scrollToTop()
      } else {
        scrollToSection(el, true) // Always smooth for clicks
      }
    }

    // Handle hash changes (browser back/forward, direct URL access)
    const onHashChange = () => {
      const hash = (window.location.hash || '').replace('#', '')
      if (!hash) {
        scrollToTop()
        return
      }
      
      if (!['home', 'tools', 'experience', 'projects', 'contact'].includes(hash)) return
      
      const el = document.getElementById(hash)
      if (el) {
        if (hash === 'home') {
          scrollToTop()
        } else {
          scrollToSection(el, false) // No smooth for initial load
        }
      }
    }

    // Handle initial page load
    const handleInitialLoad = () => {
      // Force scroll to absolute top immediately and aggressively
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      
      // Clear any hash from URL on page load/reload
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname + window.location.search)
      }
      
      // Force another scroll after a tiny delay to ensure it sticks
      setTimeout(() => {
        window.scrollTo(0, 0)
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      }, 10)
    }

    document.addEventListener('click', onDocClick)
    window.addEventListener('hashchange', onHashChange)
    
    // Handle initial load
    handleInitialLoad()

    return () => {
      document.removeEventListener('click', onDocClick)
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col bg-text-cream text-text-brown dark:bg-darker-bg dark:text-text-cream font-body">
  {/* Global scrolling path overlay */}
  <ScrollingPath />
      <Header />
  <main className="flex-1">
  <Hero />
  <Tools />
  <Experience />
  <Projects />
  <Contact />
      </main>
      <Footer />
    </div>
  )
}

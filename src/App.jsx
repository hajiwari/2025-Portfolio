import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Footer from './components/Footer'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import ScrollingPath from './components/ScrollingPath'

export default function App(){
  // Center-scroll any in-page anchor target (e.g., #page-3) so the section lands in the viewport middle
  React.useEffect(() => {
    const scrollSectionIntoCenter = (el) => {
      if (!el) return
      const rect = el.getBoundingClientRect()
      const doc = document.documentElement
      const docHeight = Math.max(
        doc.scrollHeight,
        doc.offsetHeight,
        doc.clientHeight
      )
      const targetY = window.scrollY + rect.top + rect.height / 2 - window.innerHeight / 2
      const maxY = Math.max(0, docHeight - window.innerHeight)
      const y = Math.min(Math.max(0, targetY), maxY)
      window.scrollTo({ top: y, behavior: 'smooth' })
    }

    const onDocClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href^="#"]')
      if (!a) return
      const href = a.getAttribute('href') || ''
      if (href === '#' || href.length < 2) return
      const id = href.slice(1)
      if (id !== 'page-3') return // only handle Contact
      const el = document.getElementById(id)
      if (!el) return
      e.preventDefault()
      // Update hash without native jump, then center-scroll
      try { history.replaceState(null, '', href) } catch {}
      scrollSectionIntoCenter(el)
    }

    const onHashChange = () => {
      const hash = (window.location.hash || '').replace('#', '')
      if (!hash || hash !== 'page-3') return
      const el = document.getElementById(hash)
      if (el) scrollSectionIntoCenter(el)
    }

    document.addEventListener('click', onDocClick)
    window.addEventListener('hashchange', onHashChange)

    // If landing on a hash, center it after initial paint
  if (window.location.hash === '#page-3') {
      requestAnimationFrame(() => onHashChange())
    }

    return () => {
      document.removeEventListener('click', onDocClick)
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-text-cream text-text-brown dark:bg-darker-bg dark:text-text-cream font-body">
  {/* Global scrolling path overlay */}
  <ScrollingPath />
      <Header />
      <main>
  <Hero />
  <About />
  <Experience />
  <Projects />
  <Contact />
      </main>
      <Footer />
    </div>
  )
}

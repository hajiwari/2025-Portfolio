import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { HiSun, HiMoon } from 'react-icons/hi'

export default function Header(){
  const [dark, setDark] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  
  // Check if this is a first visit - do this IMMEDIATELY, synchronously
  const [isFirstVisit] = useState(() => {
    if (typeof window === 'undefined') return true
    return !sessionStorage.getItem('heroAnimationSeen')
  })
  
  const [ready, setReady] = useState(() => {
    if (typeof window === 'undefined') return false
    return !isFirstVisit // Only show immediately if NOT first visit
  })

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    const enabled = saved ? saved === 'dark' : prefersDark
    setDark(enabled)
    document.documentElement.classList.toggle('dark', enabled)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setScrolled(scrollPosition > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!isFirstVisit) {
      // On return visits, header is already shown via initial state
      return
    }
    
    // On first visit, wait for hero animation to complete
    let timeout = setTimeout(() => setReady(true), 10000) // safety fallback (hero + extra 2s)
    const onReady = () => {
      clearTimeout(timeout)
      // Add extra 0.1s delay before revealing header
      timeout = setTimeout(() => setReady(true), 100)
    }
    window.addEventListener('hero:ready', onReady)
    return () => {
      window.removeEventListener('hero:ready', onReady)
      clearTimeout(timeout)
    }
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  // Close mobile menu when navigating
  useEffect(() => {
    const close = () => setMenuOpen(false)
    window.addEventListener('hashchange', close)
    return () => window.removeEventListener('hashchange', close)
  }, [])

  // IMMEDIATELY return null for first visits before ANY rendering
  if (isFirstVisit && !ready) {
    return null
  }

  // Don't render header at all on first visit until ready
  if (isFirstVisit && !ready) {
    return (
      <>
        {/* Floating Theme Toggle - still show on first visit */}
        <motion.button 
          onClick={toggle} 
          aria-label="Toggle dark mode" 
          className="fixed bottom-6 right-6 z-40 p-4 bg-black text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ delay: 0.05, duration: 0.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            key={dark}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {dark ? <HiSun className="w-6 h-6" /> : <HiMoon className="w-6 h-6" />}
          </motion.div>
        </motion.button>
      </>
    )
  }

  return (
    <>
      <motion.header 
        initial={{ y: -120, opacity: 0 }}
        animate={{ y: ready ? 0 : -120, opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed w-full z-40 backdrop-blur-md transition-all duration-300 ${
          scrolled ? 'bg-white/70 dark:bg-black/60' : 'bg-white dark:bg-black'
        }`}
      > 
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-8">
          <motion.a href="#home" initial={{ y: -10, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{duration:0.4}} className="text-lg tracking-[0.5em] font-heading font-extrabold text-gray-900 dark:text-white no-underline">H A J I</motion.a>
          <nav className="hidden sm:flex items-center gap-8 text-base">
            <a href="#home" className="hover:text-accent text-gray-900 dark:text-white transition-colors no-underline">HOME</a>
            <a href="#tools" className="hover:text-accent text-gray-900 dark:text-white transition-colors no-underline">TOOLS</a>
            <a href="#projects" className="hover:text-accent text-gray-900 dark:text-white transition-colors no-underline">PROJECTS</a>
            <a href="#contact" className="text-gray-900 px-5 py-3 rounded font-medium transition-opacity no-underline hover:opacity-90" style={{backgroundColor: '#ba8e64'}}>CONTACT ME</a>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="sm:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-gray-900 dark:text-white"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="sr-only">Menu</span>
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="sm:hidden overflow-hidden"
            >
              <div className="px-6 pb-6 pt-0 flex flex-col gap-4 text-base text-gray-900 dark:text-white">
                <a href="#home" className="hover:text-accent no-underline">HOME</a>
                <a href="#tools" className="hover:text-accent no-underline">TOOLS</a>
                <a href="#projects" className="hover:text-accent no-underline">PROJECTS</a>
                <a href="#contact" className="text-gray-900 px-4 py-2 rounded font-medium no-underline inline-block hover:opacity-90" style={{backgroundColor: '#ba8e64'}}>CONTACT ME</a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
      
      {/* Floating Theme Toggle */}
      <motion.button 
        onClick={toggle} 
        aria-label="Toggle dark mode" 
        className="fixed bottom-6 right-6 z-40 p-4 bg-black text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: ready ? 1 : 0, opacity: ready ? 1 : 0 }}
        transition={{ delay: 0.05, duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          key={dark}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {dark ? <HiSun className="w-6 h-6" /> : <HiMoon className="w-6 h-6" />}
        </motion.div>
      </motion.button>
    </>
  )
}

import React from 'react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { HiSun, HiMoon } from 'react-icons/hi'

export default function Header(){
  const [dark, setDark] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [ready, setReady] = useState(false) // delay header reveal slightly to sync with intro

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
    const t = setTimeout(() => setReady(true), 700)
    return () => clearTimeout(t)
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <>
      <motion.header 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : -10 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className={`fixed w-full z-40 backdrop-blur-md transition-all duration-300 ${
          scrolled ? 'bg-black/60' : 'bg-black'
        }`}
      > 
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-8">
          <motion.a href="#page-0" initial={{ y: -10, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{duration:0.4}} className="text-lg tracking-[0.5em] font-heading font-extrabold text-white no-underline">H A J I M E</motion.a>
          <nav className="hidden sm:flex items-center gap-8 text-base">
            <a href="#page-0" className="hover:text-accent text-white transition-colors no-underline">HOME</a>
            <a href="#page-1" className="hover:text-accent text-white transition-colors no-underline">ABOUT</a>
            <a href="#page-2" className="hover:text-accent text-white transition-colors no-underline">PROJECTS</a>
            <a href="#page-3" className="hover:text-gray-300 text-gray-800 px-5 py-3 rounded font-medium transition-colors no-underline" style={{backgroundColor: '#ba8e64'}}>CONTACT ME</a>
          </nav>
        </div>
      </motion.header>
      
      {/* Floating Theme Toggle */}
      <motion.button 
        onClick={toggle} 
        aria-label="Toggle dark mode" 
        className="fixed bottom-6 right-6 z-40 p-4 bg-black text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
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

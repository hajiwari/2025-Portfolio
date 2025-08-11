import React from 'react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Header(){
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    const enabled = saved ? saved === 'dark' : prefersDark
    setDark(enabled)
    document.documentElement.classList.toggle('dark', enabled)
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <header className="fixed w-full z-30 bg-text-cream/80 dark:bg-dark-bg/80 backdrop-blur-md border-b border-brown-200/60 dark:border-text-brown/60"> 
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <motion.a href="#page-0" initial={{ y: -10, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{duration:0.4}} className="text-base tracking-[0.5em] font-heading font-extrabold">H A J I M E</motion.a>
        <nav className="hidden sm:flex items-center gap-6 text-sm">
          <a href="#page-0" className="hover:text-accent">HOME</a>
          <a href="#page-1" className="hover:text-accent">ABOUT</a>
          <a href="#page-2" className="hover:text-accent">PROJECTS</a>
          <a href="#page-3" className="hover:text-accent">CONTACT ME</a>
          <button onClick={toggle} aria-label="Toggle dark mode" className="ml-3 px-3 py-1 rounded border border-text-gray dark:border-text-brown text-xs hover:bg-brown-100 dark:hover:bg-text-brown transition-colors">
            {dark ? 'Light' : 'Dark'}
          </button>
        </nav>
      </div>
    </header>
  )
}

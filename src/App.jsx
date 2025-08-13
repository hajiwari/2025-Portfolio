import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Footer from './components/Footer'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import ScrollingPath from './components/ScrollingPath'

export default function App(){
  return (
    <div className="relative min-h-screen bg-text-cream text-text-brown dark:bg-darker-bg dark:text-text-cream font-body">
  {/* Global scrolling path overlay */}
  <ScrollingPath />
      <Header />
      <main>
  <Hero />
  <About />
  <Skills />
  <Projects />
  <Contact />
      </main>
      <Footer />
    </div>
  )
}

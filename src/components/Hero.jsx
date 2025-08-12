import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Hero(){
  const [scrolled, setScrolled] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [intro, setIntro] = useState(true) // Show only "Hi I'm" for 0.7s
  const fullText = 'HAJIME'

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setScrolled(scrollPosition > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Initial intro: show only "Hi I'm" for 0.7s
    const t = setTimeout(() => setIntro(false), 700)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.substring(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
      }
    }, 200) // 200ms delay between each letter

    return () => clearInterval(typingInterval)
  }, [])
  return (
    <section id="page-0" className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: 'radial-gradient(circle at bottom left, #0a0907 0%, #000000 40%)' }}>
      {/* Intro overlay: only "Hi I'm" centered for 0.7s, then fades out */}
      <AnimatePresence>
        {intro && (
          <motion.div
            key="intro-overlay"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div layoutId="hi-text" className="mb-0">
              <span className="text-3xl md:text-4xl font-heading font-light text-text-brown dark:text-text-cream">
                Hi I'm
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div className="absolute top-20 right-20 w-32 h-32 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-brown-300 rounded-full blur-2xl"></div>
      </div>

  <div className="max-w-7xl mx-auto px-6 lg:px-8 relative w-full min-h-screen flex flex-col items-center justify-center">
        {/* Hi I'm */}
        {!intro && (
          <motion.div 
            layoutId="hi-text"
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4 relative z-10"
          >
            <span className="text-2xl md:text-3xl font-heading font-light text-text-brown dark:text-text-cream">
              Hi I'm
            </span>
          </motion.div>
        )}

        {/* HAJIME - SMOOTH TYPING ANIMATION */}
        {!intro && (
          <div className="relative mb-8">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="text-[10rem] md:text-[16rem] lg:text-[20rem] xl:text-[24rem] font-league font-bold leading-none relative z-0 text-accent"
              style={{ 
                letterSpacing: '0.08em'
              }}
            >
              {typedText}
            </motion.h1>
          </div>
        )}

        {/* Game-style subtitle - EXTRA TIGHT tracking */}
        {!intro && (
          <motion.div
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-12 text-center relative z-10"
          >
            <p className="text-sm md:text-base lg:text-lg font-game font-black tracking-[0.15em] text-text-brown dark:text-text-cream uppercase transform scale-y-110">
              DESIGNER / DEVELOPER / TECHNICAL SPECIALIST
            </p>
          </motion.div>
        )}

        {/* CTA Buttons */}
        {!intro && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center relative z-10"
          >
            <motion.a 
              whileHover={{ scale: 1.05, y: -2 }} 
              whileTap={{ scale: 0.98 }} 
              href="#page-3" 
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-accent text-text-cream font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">GET IN TOUCH</span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-brown-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.a>
            
            <motion.a 
              whileHover={{ scale: 1.05, y: -2 }} 
              whileTap={{ scale: 0.98 }}
              href="#page-2" 
              className="group inline-flex items-center justify-center px-8 py-4 border-2 border-text-brown dark:border-text-cream text-text-brown dark:text-text-cream font-semibold rounded-xl hover:bg-text-brown hover:text-text-cream dark:hover:bg-text-cream dark:hover:text-text-brown transition-all duration-300"
            >
              VIEW PROJECTS
              <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </motion.div>
        )}
      </div>

      {/* Floating decorative elements */}
      <motion.div
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        className="absolute top-20 left-10 w-6 h-6 bg-accent/30 rounded-full blur-sm"
      ></motion.div>
      
      <motion.div
        animate={{ 
          y: [0, 15, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 0.5
        }}
        className="absolute bottom-20 right-10 w-4 h-4 bg-brown-300/40 rounded-full blur-sm"
      ></motion.div>

      {/* Scroll indicator - Hide when scrolled */}
      {!intro && (
        <motion.div
          initial={{ opacity: 0, y: 20 }} 
          animate={{ 
            opacity: scrolled ? 0 : 1, 
            y: scrolled ? 20 : 0 
          }} 
          transition={{ duration: 0.3 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className="flex flex-col items-center text-text-gray dark:text-text-gray"
          >
            <span className="text-xs mb-2 tracking-wider">SCROLL</span>
            <div className="w-px h-8 bg-current opacity-50"></div>
            <svg className="w-4 h-4 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      )}

      {/* Social Icons - Bottom Left */}
      {!intro && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 1.2 }}
          className="absolute bottom-8 left-8 z-10"
        >
          <div className="flex gap-6">
          {/* Facebook */}
          <a href="#" className="text-gray-800/50 hover:text-gray-600/70 transition-colors duration-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          
          {/* Instagram - FIXED MINIMALIST */}
          <a href="#" className="text-gray-800/50 hover:text-gray-600/70 transition-colors duration-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          
          {/* GitHub */}
          <a href="#" className="text-gray-800/50 hover:text-gray-600/70 transition-colors duration-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          </div>
        </motion.div>
      )}

      {/* Hero image - BRUSH STROKE PAINT REVEAL EFFECT */}
      {!intro && (
  <div className="absolute bottom-0 right-0 z-0 overflow-hidden">
          <motion.div
            className="relative w-96 h-[30rem] md:w-[32rem] md:h-[38rem] lg:w-[40rem] lg:h-[48rem] xl:w-[48rem] xl:h-[56rem]"
          >
          {/* Base image - COMPLETELY HIDDEN - no image visible initially */}
          
          {/* Big Brush Strokes Coming from Bottom - Alternating Left/Right */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 overflow-hidden"
              initial={{ 
                clipPath: i % 2 === 0 
                  ? `polygon(-25% ${100 - i * 12.5}%, -25% ${100 - i * 12.5}%, -25% ${100 - i * 12.5 - 15}%, -25% ${100 - i * 12.5 - 15}%)` // Left to Right - From bottom
                  : `polygon(125% ${100 - i * 12.5}%, 125% ${100 - i * 12.5}%, 125% ${100 - i * 12.5 - 15}%, 125% ${100 - i * 12.5 - 15}%)` // Right to Left - From bottom
              }}
              animate={{ 
                clipPath: i % 2 === 0 
                  ? `polygon(-25% ${100 - i * 12.5 + Math.sin(i) * 3}%, 125% ${100 - i * 12.5 + Math.cos(i) * 4}%, 125% ${100 - i * 12.5 - 15 + Math.sin(i + 1) * 3}%, -25% ${100 - i * 12.5 - 15 + Math.cos(i + 2) * 4}%)` // Sweep Left to Right
                  : `polygon(125% ${100 - i * 12.5 + Math.sin(i) * 3}%, -25% ${100 - i * 12.5 + Math.cos(i) * 4}%, -25% ${100 - i * 12.5 - 15 + Math.sin(i + 1) * 3}%, 125% ${100 - i * 12.5 - 15 + Math.cos(i + 2) * 4}%)` // Sweep Right to Left
              }}
              transition={{
                duration: 0.167,
                delay: 1.2 + i * 0.167,
                ease: "linear",
              }}
            >
              <img 
                src="/assets/hero.jpg" 
                alt="Hero image" 
                className="w-full h-full object-cover"
                style={{
                  filter: `brightness(${0.99 + (i % 2) * 0.005}) contrast(${1.005 + (i % 2) * 0.005})`,
                }}
              />
            </motion.div>
          ))}
          </motion.div>
        </div>
      )}
    </section>
  )
}
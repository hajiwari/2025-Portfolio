import React from 'react'
import { motion, AnimatePresence, LayoutGroup, useAnimationFrame } from 'framer-motion'
import { useEffect, useState, useMemo, useRef } from 'react'

export default function Hero(){
  const [scrolled, setScrolled] = useState(false)
  const [showLines, setShowLines] = useState(false)
  const [linesAnimating, setLinesAnimating] = useState(false)
  const [waveStartKey, setWaveStartKey] = useState(0)
  const heroReadySent = useRef(false)
  const heroImgLoaded = useRef(false)
  const firstStrokeStarted = useRef(false)
  const [typedText, setTypedText] = useState('')
  const [intro, setIntro] = useState(false) // No overlay; sequence runs inline
  const [hiNearFinal, setHiNearFinal] = useState(false) // deprecated, kept for layout stability (no-op)
  const [hiBrick, setHiBrick] = useState(false) // toggle Brick Sans after 0.5s
  const [hiText, setHiText] = useState("Hey!") // standalone then "Hey! I'm"
  const [showHi, setShowHi] = useState(true)
  const [showFullName, setShowFullName] = useState(false) // "Jaime Dela Cruz III"
  const [showCallMe, setShowCallMe] = useState(false) // pill: "but you can call me"
  const [revealHajime, setRevealHajime] = useState(false) // finally reveal HAJIME
  const fullText = 'HAJIME'
  const [nameShrink, setNameShrink] = useState(false)

  // Build meta for lines that meet at x=0; shape animated per-line (not as a group)
  const abstractLines = useMemo(() => {
    const W = 1440
    const yAnchor = 450
  const count = 1
    const baseSpacing = 12
  const ampBase = 120 // very tall peak at center
    const grads = ['url(#heroLineA)', 'url(#heroLineB)', 'url(#heroLineC)']
    const lines = []
    for (let i = 0; i < count; i++) {
      const idxFromCenter = i - Math.floor((count - 1) / 2)
      lines.push({
        idx: i,
        idxFromCenter,
        stroke: grads[i % grads.length],
        width: 1.4 + ((i % 5) * 0.12),
        opacity: 0.2 - (i % 7) * 0.007,
        amp: ampBase, // same amplitude for consistent shape across lines
        offset: idxFromCenter * baseSpacing,
        endX: W,
      })
    }
    return { lines, W, yAnchor, centerIdx: Math.floor((count - 1) / 2) }
  }, [])

  // Smoothstep helper for gradual dispersion near the anchor
  const smoothstep = (edge0, edge1, x) => {
    const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)))
    return t * t * (3 - 2 * t)
  }

  // Preload hero image so reveal isn't blocked by network
  useEffect(() => {
    const img = new Image()
    img.decoding = 'async'
    img.loading = 'eager'
    img.src = '/assets/hero.jpg'
    img.onload = () => { heroImgLoaded.current = true }
  }, [])

  // Per-line animated path that keeps the start pinned at (0, yAnchor)
  const LinePath = ({ meta, config }) => {
    const pathRef = useRef(null)
    const startRef = useRef(0)
  useEffect(() => { startRef.current = performance.now() }, [])
  // Reset the phase start when runId changes (e.g., blur completes)
  useEffect(() => { startRef.current = performance.now() }, [config.runId])
    useAnimationFrame((t) => {
      const elapsed = (t - startRef.current) / 1000
  const phaseTime = linesAnimating ? Math.max(0, elapsed - config.delay) : 0
      const phase = phaseTime * config.speed // same speed for all lines
  const steps = 420
      let d = `M 0 ${config.yAnchor}`
      for (let s = 1; s <= steps; s++) {
        const tt = s / steps
        const x = tt * meta.endX
        // Hold perfectly straight for the first ~20% of width, then ramp in smoothly
        const env = smoothstep(config.anchorHoldPx, config.anchorHoldPx + config.anchorRampPx, x)
        // Normalize x to the post-hold region so we get exactly two humps total (one full cycle)
        const xRel = Math.max(0, x - config.anchorHoldPx)
  const denom = Math.max(1, meta.endX - config.anchorHoldPx)
  let tWave = Math.pow(xRel / denom, config.phaseGamma)
  // slight horizontal wobble so it isn't purely vertical
  tWave = Math.max(0, Math.min(1, tWave + 0.012 * Math.sin(phase * 0.35)))
  const endBoost = 1 - Math.pow(1 - tt, config.widenEndBoostExp)
  const widenTail = 1 + (config.widenEndGain * Math.pow(tt, config.widenEndGainExp))
  // Temporal pulse so right-end gaps breathe over time (cloth-like)
  const gapPulse = 1 + (config.widenTemporalAmp * Math.sin(phase * config.widenTemporalRate)) * Math.pow(tt, config.widenTemporalExp)
  const widenEase = Math.pow(tt, config.widenExp) * endBoost * widenTail * gapPulse // strong, time-varying widening near end
  // (diag bias removed)
        // Amplitude decay so second hump is flatter than first
        const ampEnv = 1 - (config.ampDecay * Math.pow(tWave, config.ampDecayExp))
        // Traveling wave: natural up/down bumps moving across the width
  const spatial = Math.sin(Math.PI * tWave) // fixed crest at center
  const ampMod = Math.sin(phase + 0.001) // start with non-zero velocity for immediate motion
        const frontEnv = smoothstep(config.frontStart, config.frontEnd, tWave) // subtle near left, full afterward
        const ampCenter = Math.pow(Math.sin(Math.PI * Math.min(1, Math.max(0, tWave))), config.centerAmpExp) // tallest at center
        const ampDrift = 0.7 + 0.25 * Math.sin(phase * 0.9) + 0.15 * Math.sin(phase * 0.41 + 0.7)
        const y = config.yAnchor
          + spatial * (meta.amp * ampEnv) * frontEnv * ampCenter * ampMod * ampDrift * env
          + meta.offset * widenEase * env
        d += ` L ${x} ${y}`
      }
      if (pathRef.current) pathRef.current.setAttribute('d', d)
    })
    return (
      <path
        ref={pathRef}
        d={`M 0 ${config.yAnchor} L ${meta.endX} ${config.yAnchor}`}
        fill="none"
        stroke={meta.stroke}
        strokeOpacity={meta.opacity}
        strokeWidth={meta.width}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setScrolled(scrollPosition > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // No global auto-start; reveal is controlled by brush start + image load

  // Reset motion flag when hidden
  useEffect(() => {
    if (!showLines) setLinesAnimating(false)
  }, [showLines])

  // Stage the sequence inline on mount
  useEffect(() => {
    const timers = []
    // 2.0s: change text to "I'm" (keep heading font), show full name
    timers.push(setTimeout(() => {
      setHiText("I'm")
      setShowFullName(true)
    }, 2000))
    // 4.5s: show the pill before HAJIME
    timers.push(setTimeout(() => {
      setShowCallMe(true)
    }, 4500))
    // 7.0s: switch back to "Hey! I'm" and to Brick Sans, hide pill and reveal HAJIME + others
    timers.push(setTimeout(() => {
      setHiText("Hey! I'm")
      setHiBrick(true)
      setShowCallMe(false)
      setRevealHajime(true)
    }, 7000))
    return () => timers.forEach(clearTimeout)
  }, [])

  // Remove typing animation: set full name once
  useEffect(() => {
    setTypedText(fullText)
  }, [])

  // When HAJIME reveals, keep name large during move, then shrink after
  useEffect(() => {
    if (revealHajime) {
      setNameShrink(false)
      const t = setTimeout(() => setNameShrink(true), 450)
      return () => clearTimeout(t)
    } else {
      setNameShrink(false)
    }
  }, [revealHajime])

  // Reset motion flag if lines are ever hidden again
  useEffect(() => {
    if (!showLines) setLinesAnimating(false)
  }, [showLines])
  return (
    <section id="page-0" className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: 'radial-gradient(circle at bottom left, #0a0907 0%, #000000 40%)' }}>
  {/* No overlay; inline sequence */}
  {/* Background line removed as requested */}

  <LayoutGroup>
  <div className="max-w-7xl mx-auto px-6 lg:px-8 relative w-full min-h-screen flex flex-col items-center justify-center">
        {/* Hi! I'm - smooth font crossfade near final position (centered), hidden when HAJIME reveals */}
            <motion.div layout="position" className="w-full flex flex-col items-center">
              <motion.div 
                key="hi-line"
                layout="position"
                initial={{ y: 20, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`relative z-10 w-full flex justify-center ${revealHajime ? 'mb-4' : 'mb-1'}`}
              >
                <span className="relative inline-block leading-none text-2xl md:text-3xl font-light text-text-brown dark:text-text-cream text-center">
                  {/* Overlay two fonts and crossfade to avoid layout jump */}
                  <motion.span
                    className="font-heading block absolute inset-0 whitespace-nowrap"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: hiBrick ? 0 : 1 }}
                    transition={{ duration: 0.25 }}
                    aria-hidden={hiBrick}
                  >
                    {hiText}
                  </motion.span>
                  <motion.span
                    className="font-brick block absolute inset-0 whitespace-nowrap"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hiBrick ? 1 : 0 }}
                    transition={{ duration: 0.25 }}
                    aria-hidden={!hiBrick}
                  >
                    {hiText}
                  </motion.span>
                  {/* Placeholder locks the width to prevent stretch */}
                  <span className="invisible block whitespace-nowrap">{hiText}</span>
                </span>
              </motion.div>

        {/* Initial full name: appears after "I'm" and hides before the pill */}
          {showFullName && !revealHajime && (
            <motion.div
              key="full-name-initial"
              layoutId="full-name"
              layout
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative z-20 w-full flex justify-center mb-[2px]"
            >
              <h2 className="font-game font-bold leading-none whitespace-nowrap tracking-wide text-text-brown dark:text-text-cream text-center text-2xl md:text-3xl lg:text-4xl">
                Jaime Dela Cruz III
              </h2>
            </motion.div>
          )}
            </motion.div>
        

        {/* Temporary pill: "but you can call me" */}
  {(
          <AnimatePresence>
            {showCallMe && (
              <motion.div
                key="call-me-pill"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="mb-6 relative z-10"
              >
                <div className="inline-block px-4 py-1.5 rounded-full bg-transparent text-text-brown dark:text-text-cream font-sans text-xs md:text-sm">
                  but you can call me
                </div>
              </motion.div>
            )}
          </AnimatePresence>
  )}

  {/* HAJIME - reveal only after pill hides */}
        {revealHajime && (
          <div className="relative -mt-1 mb-0 flex justify-center">
            {/* Base filled title (under hero image by DOM order and z-0) */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-[10rem] md:text-[16rem] lg:text-[20rem] xl:text-[24rem] font-bold leading-none relative z-0 text-accent invisible"
              style={{ 
                letterSpacing: '0.08em',
                fontFamily: 'Bebas Neue, Anton, Impact, "Arial Black", sans-serif',
                fontWeight: 700,
                color: '#dac8ab'
              }}
            >
              {typedText}
            </motion.h1>

            {/* Filled SVG duplicate (beneath hero image) for perfect alignment with outline */}
            <motion.div
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
            >
              <div
                className="font-bold leading-none text-center text-[10rem] md:text-[16rem] lg:text-[20rem] xl:text-[24rem]"
                style={{ letterSpacing: '0.08em' }}
              >
                <svg
                  width="100%"
                  height="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ overflow: 'visible', display: 'block' }}
                >
                  <text
                    x="50%"
                    y="0.8em"
                    textAnchor="middle"
                    fill="#dac8ab"
                    style={{
                      fontFamily: 'Bebas Neue, Anton, Impact, "Arial Black", sans-serif',
                      fontWeight: 700,
                      letterSpacing: '0.08em'
                    }}
                  >
                    {typedText}
                  </text>
                </svg>
              </div>
            </motion.div>

            {/* Outline-only duplicate positioned exactly on top (SVG, true outline) */}
            <motion.div
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
            >
              <div
                className="font-bold leading-none text-center text-[10rem] md:text-[16rem] lg:text-[20rem] xl:text-[24rem]"
                style={{ letterSpacing: '0.08em' }}
              >
                <svg
                  width="100%"
                  height="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ overflow: 'visible', display: 'block' }}
                >
                  <defs>
                    {/* Outside-only outline with slight inner overlap to avoid seams */}
                    <filter id="hajime-outline" filterUnits="userSpaceOnUse" x="-150%" y="-150%" width="400%" height="400%" colorInterpolationFilters="sRGB">
                      <feMorphology in="SourceAlpha" operator="dilate" radius="2.2" result="dilate" />
                      <feMorphology in="SourceAlpha" operator="erode" radius="0.6" result="eroded" />
                      <feComposite in="dilate" in2="eroded" operator="out" result="ring" />
                      <feFlood floodColor="#dac8ab" result="color" />
                      <feComposite in="color" in2="ring" operator="in" result="coloredRing" />
                      <feMerge>
                        <feMergeNode in="coloredRing" />
                      </feMerge>
                    </filter>
                  </defs>
                  <text
                    x="50%"
                    y="0.8em"
                    textAnchor="middle"
                    fill="#000"
                    filter="url(#hajime-outline)"
                    style={{
                      fontFamily: 'Bebas Neue, Anton, Impact, "Arial Black", sans-serif',
                      fontWeight: 700,
                      letterSpacing: '0.08em'
                    }}
                  >
                    {typedText}
                  </text>
                </svg>
              </div>
            </motion.div>
          </div>
        )}

        {/* Full name below HAJIME (simple slide into final position on reveal) */}
        {revealHajime && (
          <motion.div
            layoutId="full-name"
            layout
            transition={{ type: 'spring', stiffness: 240, damping: 32 }}
            className="-mt-6 md:-mt-8 lg:-mt-10 mb-7 md:mb-10 text-center relative z-20 w-full flex justify-center"
          >
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: nameShrink ? 0.62 : 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
              style={{ transformOrigin: 'top center', willChange: 'transform' }}
            >
              <h2 className="font-game font-bold leading-none whitespace-nowrap tracking-wide text-text-brown dark:text-text-cream text-center text-2xl md:text-3xl lg:text-4xl">
                Jaime Dela Cruz III
              </h2>
            </motion.div>
          </motion.div>
        )}

        {/* Game-style subtitle - EXTRA TIGHT tracking */}
        {revealHajime && (
          <motion.div
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 text-center relative z-10"
          >
            <p className="text-sm md:text-base lg:text-lg font-game font-black tracking-[0.15em] text-text-brown dark:text-text-cream uppercase transform scale-y-110">
              DESIGNER / DEVELOPER / TECHNICAL SPECIALIST
            </p>
          </motion.div>
        )}

        {/* CTA Buttons */}
        {revealHajime && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.6, delay: 0.3 }}
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

  {/* Bokeh animations removed */}

  {/* Scroll indicator - Hide when scrolled */}
  {revealHajime && (
        <motion.div
          initial={{ opacity: 0, y: 20 }} 
          animate={{ 
            opacity: scrolled ? 0 : 1, 
            y: scrolled ? 20 : 0 
          }} 
          transition={{ duration: 0.3 }}
          className="absolute bottom-8 inset-x-0 flex justify-center"
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
  {revealHajime && (
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
    {revealHajime && (
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
        // Delay hero image ~1s after other elements load (last element delay ~1.2s)
        delay: 0.8 + i * 0.167,
                ease: "linear",
              }}
              onAnimationStart={() => {
                if (i === 0) {
                  firstStrokeStarted.current = true
                  if (heroImgLoaded.current && !showLines) setShowLines(true)
                }
              }}
              onAnimationComplete={() => {
                // Only announce readiness after the image is confirmed loaded
                if (i === 7 && !heroReadySent.current && heroImgLoaded.current) {
                  heroReadySent.current = true
                  try { window.dispatchEvent(new CustomEvent('hero:ready')) } catch (e) {}
                }
              }}
            >
              <img 
                src="/assets/hero.jpg" 
                alt="Hero image" 
                className="w-full h-full object-cover"
                style={{
                  filter: `brightness(${0.99 + (i % 2) * 0.005}) contrast(${1.005 + (i % 2) * 0.005})`,
                }}
                onLoad={() => {
                  heroImgLoaded.current = true
                  if (firstStrokeStarted.current && !showLines) setShowLines(true)
                  if (!heroReadySent.current) {
                    heroReadySent.current = true
                    try { window.dispatchEvent(new CustomEvent('hero:ready')) } catch (e) {}
                  }
                }}
              />
            </motion.div>
          ))}
          </motion.div>
        </div>
      )}
  </LayoutGroup>
  </section>
  )
}
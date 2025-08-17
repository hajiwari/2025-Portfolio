import React from 'react'
import { motion } from 'framer-motion'
import Glide from '@glidejs/glide'
import '@glidejs/glide/dist/css/glide.core.min.css'
import '@glidejs/glide/dist/css/glide.theme.min.css'

const projects = [
  {
    title: 'Illustrations',
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'],
    pageAspect: 4 / 5,
    cardHeightRem: 16,
    cardCount: 6,
    images: [
      'https://i.ibb.co/j9pFzX5v/2.png',
      'https://i.ibb.co/HTbyX88C/3.png',
      'https://i.ibb.co/Q71d4dFy/1.png',
    ],
  },
  {
    title: 'Ad posters',
    colors: ['#96CEB4', '#FFEAA7', '#DDA0DD', '#FF6B6B', '#4ECDC4', '#45B7D1'],
    pageAspect: 4 / 5,
    cardHeightRem: 14,
    cardCount: 6,
    images: [
      'https://i.ibb.co/mV0hBpWN/1.png',
      'https://i.ibb.co/XxqVQmN1/2.png',
      'https://i.ibb.co/6Ryd3dFg/3.png',
      'https://i.ibb.co/8nQLypz0/4.png',
      'https://i.ibb.co/mpsc5cT/5.png',
      'https://i.ibb.co/nNPv1Br0/6.png',
      'https://i.ibb.co/9mTFyT5h/7.png',
      'https://i.ibb.co/jv0pqQHS/8.png',
      'https://i.ibb.co/GfGrwNZ5/9.png',
    ],
  },
  {
    title: 'Presentation',
    colors: ['#74B9FF', '#FD79A8', '#FDCB6E', '#00B894', '#00CEC9', '#55A3FF'],
    pageAspect: 16 / 9,
    cardHeightRem: 12,
    cardCount: 6,
  },
  {
    title: 'Web Design',
    colors: ['#6C5CE7', '#A29BFE', '#FD79A8', '#74B9FF', '#FDCB6E', '#00B894'],
    pageAspect: 4 / 3,
    cardHeightRem: 14,
    cardCount: 6,
  },
  {
    title: 'Mobile Design',
    colors: ['#00B894', '#00CEC9', '#55A3FF', '#6C5CE7', '#A29BFE', '#FD79A8'],
    pageAspect: 9 / 16,
    cardHeightRem: 18,
    cardCount: 6,
  },
  {
    title: 'Web developments',
    colors: ['#E17055', '#FDCB6E', '#6C5CE7', '#00B894', '#FF6B6B', '#4ECDC4'],
    pageAspect: 16 / 10,
    cardHeightRem: 12,
    cardCount: 6,
  },
]

export default function Projects(){
  const ref = React.useRef(null)
  const glideRefs = React.useRef({})

  React.useEffect(() => {
    // Lazy-init Glide when each carousel enters the viewport
    const observers = []
    projects.forEach((project, projectIndex) => {
      const glideElement = glideRefs.current[project.title]
      if (!glideElement) return

      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          if (glideRefs.current[`${project.title}_mounted`]) {
            obs.unobserve(entry.target)
            return
          }

          const isLeftToRight = projectIndex % 2 === 0
          const startDelay = projectIndex * 1000

          const baseHRem = project.cardHeightRem ?? 14
          const derivedWidthRem = project.pageAspect ? baseHRem * project.pageAspect : 20
          const isNarrowCard = derivedWidthRem < 12
          const adjustedGap = isNarrowCard ? 20 : 30
          const adjustedPeek = isNarrowCard ? 40 : 60

          const effectiveCount = (project.images && project.images.length > 0) ? project.images.length : project.cardCount
          const glide = new Glide(glideElement, {
            type: 'carousel',
            startAt: isLeftToRight ? 0 : Math.max(0, (effectiveCount || 1) - 1),
            perView: (project.title === 'Illustrations' || project.title === 'Ad posters' || project.title === 'Mobile Design') ? 4 : 3,
            gap: adjustedGap,
            peek: { before: adjustedPeek, after: adjustedPeek },
            autoplay: false,
            hoverpause: true,
            keyboard: true,
            animationDuration: 600,
            animationTimingFunc: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
            direction: isLeftToRight ? 'ltr' : 'rtl',
            breakpoints: {
              1024: {
                perView: (project.title === 'Illustrations' || project.title === 'Ad posters' || project.title === 'Mobile Design') ? 3 : 2,
                gap: adjustedGap,
                peek: { before: adjustedPeek, after: adjustedPeek }
              },
              768: {
                perView: (project.title === 'Illustrations' || project.title === 'Ad posters' || project.title === 'Mobile Design') ? 2 : 1,
                gap: adjustedGap,
                peek: { before: adjustedPeek, after: adjustedPeek }
              }
            }
          })

          glide.mount()
          setTimeout(() => {
            glide.update({ autoplay: 4000 })
            glide.play()
          }, startDelay)

          glideRefs.current[`${project.title}_instance`] = glide
          glideRefs.current[`${project.title}_mounted`] = true
          obs.unobserve(entry.target)
        })
      }, { root: null, threshold: 0.15 })

      observer.observe(glideElement)
      observers.push(observer)
    })

    // Cleanup
    return () => {
      Object.keys(glideRefs.current).forEach(key => {
        if (key.endsWith('_instance')) {
          const glide = glideRefs.current[key]
          if (glide && glide.destroy) glide.destroy()
        }
      })
      observers.forEach(o => o.disconnect())
    }
  }, [])

  return (
    <section id="page-2" className="py-16 bg-text-cream dark:bg-darker-bg projects-criss-cross overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="max-w-6xl mx-auto px-6 relative z-[1]"
      >
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-heading font-bold tracking-wider text-text-brown dark:text-text-cream">PROJECTS</h2>
          <a href="#page-2" className="text-sm text-accent hover:text-brown-600 dark:hover:text-brown-400 transition-colors">SEE MY PROJECTS</a>
        </div>
        <div ref={ref} className="relative mt-8 projects-root">
          <div className="space-y-10">
            {projects.map((p, projectIndex) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="flex items-start gap-5"
              >
                {/* Caption outside, at the left of the stack */}
                <div className="w-40 shrink-0 pt-2 font-semibold tracking-wide text-text-brown dark:text-text-cream">{p.title}</div>

                {/* Invisible divider used to anchor the global scrolling path between caption and cards */}
                <div className="projects-divider relative h-56 w-0" aria-hidden />

                {/* Glide Carousel */}
                <div className="relative w-full max-w-5xl group">
                  <div
                    className="glide"
                    ref={el => (glideRefs.current[p.title] = el)}
                    data-project={p.title}
                    data-index={projectIndex}
                    style={{
                      paddingTop: '0.5rem',
                      paddingBottom: '0.5rem',
                      paddingLeft: '2rem',
                      paddingRight: '2rem',
                    }}
                  >
                    <div className="glide__track" data-glide-el="track">
                      <ul className="glide__slides">
                        {p.images && p.images.length > 0
                          ? p.images.map((src, idx) => {
                              const baseHRem = p.cardHeightRem ?? 14
                              const derivedWidthRem = p.pageAspect ? baseHRem * p.pageAspect : 20
                              const isHighPriority = (projectIndex % 2 === 0)
                                ? idx === 0
                                : idx === ((p.images?.length || (p.cardCount || 1)) - 1)
                              return (
                                <li key={`${p.title}-img-${idx}`} className="glide__slide">
                                  <div
                                    className="project-card overflow-hidden rounded-2xl shadow-lg cursor-pointer transition-all duration-300 hover:scale-[1.08] bg-gray-200"
                                    style={{
                                      width: `${derivedWidthRem}rem`,
                                      height: `${baseHRem}rem`,
                                      margin: '0.25rem',
                                    }}
                                  >
                                    <img
                                      src={src}
                                      alt={`${p.title} ${idx + 1}`}
                                      className="w-full h-full object-cover"
                                      loading="lazy"
                                      decoding="async"
                                      fetchpriority={isHighPriority ? 'high' : 'auto'}
                                    />
                                  </div>
                                </li>
                              )
                            })
                          : Array.from({ length: p.cardCount || 6 }, (_, idx) => {
                              const color = p.colors?.[idx % p.colors.length] || '#E5E7EB'
                              const baseHRem = p.cardHeightRem ?? 14
                              const derivedWidthRem = p.pageAspect ? baseHRem * p.pageAspect : 20
                              return (
                                <li key={`${p.title}-slide-${idx}`} className="glide__slide">
                                  <div
                                    className="project-card overflow-hidden rounded-2xl shadow-lg cursor-pointer transition-all duration-300 hover:scale-[1.08]"
                                    style={{
                                      width: `${derivedWidthRem}rem`,
                                      height: `${baseHRem}rem`,
                                      backgroundColor: color,
                                      margin: '0.25rem',
                                    }}
                                  >
                                    <div className="h-full w-full flex items-center justify-center text-white font-medium text-lg opacity-70">
                                      {p.title} {idx + 1}
                                    </div>
                                  </div>
                                </li>
                              )
                            })}
                      </ul>
                    </div>

                    {/* Custom Navigation Arrows - Hidden by default, shown on group hover */}
                    <div className="glide__arrows opacity-0 group-hover:opacity-100 transition-opacity duration-300" data-glide-el="controls">
                      <button
                        className="glide__arrow glide__arrow--left absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-200"
                        data-glide-dir="<"
                      >
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        className="glide__arrow glide__arrow--right absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-200"
                        data-glide-dir=">"
                      >
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

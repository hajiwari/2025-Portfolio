import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import Glide from '@glidejs/glide'
import '@glidejs/glide/dist/css/glide.core.min.css'
import '@glidejs/glide/dist/css/glide.theme.min.css'

// Only keep the requested sections; remove unused fields
const projects = [
  {
    title: 'Web developments',
    pageAspect: 16 / 10,
    cardHeightRem: 12,
    images: [
      { src: 'https://i.ibb.co/ymVbN3k9/Figuro1.gif', href: 'https://figuroshop.vercel.app/' },
      { src: 'https://i.ibb.co/Rpz1y3B7/Evolve-Elsevier.gif', href: 'https://evolve-project.vercel.app/' },
      { src: 'https://i.ibb.co/CKn71q4D/ARTIFICI.png', href: 'https://ai-chatbot-beta-jade.vercel.app/' },
      { src: 'https://i.ibb.co/k6xgXNSg/Studio-V.gif', href: 'https://studio-v-omega.vercel.app/' },
    ],
  },
  {
    title: 'Illustrations',
    pageAspect: 4 / 5,
    cardHeightRem: 16,
    images: [
      'https://i.ibb.co/j9pFzX5v/2.png',
      'https://i.ibb.co/HTbyX88C/3.png',
      'https://i.ibb.co/Q71d4dFy/1.png',
    ],
  },
  {
    title: 'Ad posters',
    pageAspect: 4 / 5,
    cardHeightRem: 14,
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
]

export default function Projects(){
  const ref = React.useRef(null)
  const glideRefs = React.useRef({})
  const [adPosterWidths, setAdPosterWidths] = React.useState({})
  const [previewModal, setPreviewModal] = React.useState(null) // { projectTitle, images, currentIndex }

  const openPreview = (projectTitle, images, currentIndex) => {
    console.log('Opening preview:', projectTitle, currentIndex) // Debug log
    // Only open preview for non-web development projects
    if (projectTitle === 'Web developments') return
    
    // Calculate scrollbar width to prevent layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    
    // Just prevent scrolling without changing position
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbarWidth}px`
    
    // Disable all Glide instances
    Object.keys(glideRefs.current).forEach(key => {
      if (key.endsWith('_instance')) {
        const glide = glideRefs.current[key]
        if (glide && glide.disable) {
          glide.disable()
        }
      }
    })
    
    setPreviewModal({ projectTitle, images, currentIndex })
  }

  const closePreview = () => {
    // Simply restore body styles
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
    
    // Re-enable all Glide instances
    Object.keys(glideRefs.current).forEach(key => {
      if (key.endsWith('_instance')) {
        const glide = glideRefs.current[key]
        if (glide && glide.enable) {
          glide.enable()
        }
      }
    })
    
    setPreviewModal(null)
  }

  const goToNext = () => {
    if (!previewModal) return
    const nextIndex = (previewModal.currentIndex + 1) % previewModal.images.length
    setPreviewModal(prev => ({ ...prev, currentIndex: nextIndex }))
  }

  const goToPrevious = () => {
    if (!previewModal) return
    const prevIndex = previewModal.currentIndex === 0 
      ? previewModal.images.length - 1 
      : previewModal.currentIndex - 1
    setPreviewModal(prev => ({ ...prev, currentIndex: prevIndex }))
  }

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (!previewModal) return
      
      switch (e.key) {
        case 'Escape':
          closePreview()
          break
        case 'ArrowRight':
          goToNext()
          break
        case 'ArrowLeft':
          goToPrevious()
          break
      }
    }

    if (previewModal) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [previewModal])

  React.useEffect(() => {
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
          const baseGap = isNarrowCard ? 20 : 30
          const basePeek = isNarrowCard ? 40 : 60
          const isWebDev = project.title === 'Web developments'
          const isIllustrations = project.title === 'Illustrations'
          const adjustedGap = isWebDev ? 16 : (isIllustrations ? 0 : baseGap)
          // Always start from left, cut on right by setting peek values
          const adjustedPeekBefore = 0  // No peek before (start from left)
          const adjustedPeekAfter = isWebDev ? 64 : (isIllustrations ? 24 : basePeek)  // Peek after (cut on right)
          const animDuration = isIllustrations ? 700 : 700
          const animEase = 'cubic-bezier(0.22, 1, 0.36, 1)'

          const effectiveCount = (project.images && project.images.length > 0) ? project.images.length : 1
          const glide = new Glide(glideElement, {
            type: 'carousel',
            startAt: 0,  // Always start at the first item (leftmost)
            perView:
              (project.title === 'Ad posters')
                ? 4
                : (project.title === 'Illustrations'
                    ? Math.min(4, effectiveCount || 1)
                    : (project.title === 'Web developments' ? 4 : 3)
                  ),
            gap: adjustedGap,
            peek: { before: adjustedPeekBefore, after: adjustedPeekAfter },
            autoplay: false,
            hoverpause: true,
            keyboard: true,
            animationDuration: animDuration,
            animationTimingFunc: animEase,
            direction: 'ltr', // Force left-to-right for consistent behavior
            rewind: false, // Prevent rewind jumps
            bound: true, // Prevent overscroll
            breakpoints: {
              1024: {
                perView:
                  (project.title === 'Ad posters')
                    ? 3
                    : (project.title === 'Illustrations'
                        ? Math.min(3, effectiveCount || 1)
                        : (project.title === 'Web developments' ? 3 : 2)
                      ),
                gap: adjustedGap,
                peek: { before: adjustedPeekBefore, after: adjustedPeekAfter }
              },
              768: {
                perView:
                  (project.title === 'Ad posters')
                    ? 2
                    : (project.title === 'Illustrations'
                        ? Math.min(2, effectiveCount || 1)
                        : (project.title === 'Web developments' ? 2 : 1)
                      ),
                gap: adjustedGap,
                peek: { before: adjustedPeekBefore, after: adjustedPeekAfter }
              }
            }
          })

          // Hide initially to prevent jump, then mount
          glideElement.style.opacity = '0'
          glide.mount()
          
          // Show after mount with smooth transition
          requestAnimationFrame(() => {
            glideElement.style.transition = 'opacity 0.3s ease'
            glideElement.style.opacity = '1'
          })
          
          // Add event delegation to handle clicks on all slides including clones
          const handleSlideClick = (e) => {
            const projectCard = e.target.closest('.project-card')
            if (!projectCard) return
            
            const projectTitle = projectCard.getAttribute('data-project')
            const imageIndex = parseInt(projectCard.getAttribute('data-index'), 10)
            
            // Only handle non-web development projects
            if (projectTitle && projectTitle !== 'Web developments' && !isNaN(imageIndex)) {
              e.preventDefault()
              e.stopPropagation()
              console.log('Slide clicked via delegation:', projectTitle, imageIndex)
              openPreview(projectTitle, project.images, imageIndex)
            }
          }
          
          glideElement.addEventListener('click', handleSlideClick)
          glideRefs.current[`${project.title}_clickHandler`] = () => {
            glideElement.removeEventListener('click', handleSlideClick)
          }
          
          // Pause autoplay when hovering arrow buttons
          const arrows = glideElement.querySelectorAll('.glide__arrow')
          const removeArrowListeners = []
          arrows.forEach(btn => {
            const onEnter = () => {
              try { glide.pause() } catch {}
            }
            const onLeave = () => {
              try { glide.play() } catch {}
            }
            btn.addEventListener('mouseenter', onEnter)
            btn.addEventListener('mouseleave', onLeave)
            removeArrowListeners.push(() => {
              btn.removeEventListener('mouseenter', onEnter)
              btn.removeEventListener('mouseleave', onLeave)
            })
          })
          glideRefs.current[`${project.title}_arrowsCleanup`] = removeArrowListeners
          
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

    return () => {
      Object.keys(glideRefs.current).forEach(key => {
        if (key.endsWith('_instance')) {
          const glide = glideRefs.current[key]
          if (glide && glide.destroy) glide.destroy()
        }
      })
      Object.keys(glideRefs.current).forEach(key => {
        if (key.endsWith('_arrowsCleanup')) {
          const cleaners = glideRefs.current[key]
          if (Array.isArray(cleaners)) {
            cleaners.forEach(fn => { try { fn() } catch {} })
          }
        }
      })
      Object.keys(glideRefs.current).forEach(key => {
        if (key.endsWith('_clickHandler')) {
          const cleanup = glideRefs.current[key]
          if (typeof cleanup === 'function') {
            try { cleanup() } catch {}
          }
        }
      })
      observers.forEach(o => o.disconnect())
    }
  }, [])

  React.useEffect(() => {
    const glide = glideRefs.current['Ad posters_instance']
    if (glide && glide.update) {
      try {
        glide.update({})
      } catch {}
    }
  }, [adPosterWidths])

  React.useEffect(() => {
  projects.forEach(p => {
      if (p.images && p.images.length) {
        p.images.forEach(item => {
          const src = typeof item === 'string' ? item : item?.src
          if (src) {
            const img = new Image()
            img.decoding = 'async'
            img.loading = 'eager'
      try { img.fetchPriority = p.title === 'Illustrations' ? 'high' : 'auto' } catch {}
            img.src = src
          }
        })
      }
    })
  }, [])

  return (
    <section id="projects" className="py-16 bg-text-cream dark:bg-darker-bg projects-criss-cross overflow-hidden">
    <style>{`
        [data-project="Ad posters"] .glide__slides { display: flex; }
        [data-project="Ad posters"] .glide__slide { width: auto !important; }
        [data-project="Ad posters"] img { display: block; }
        [data-project="Web developments"] .project-card { transition: transform 300ms; }
        [data-project="Web developments"] .project-card:hover { transform: scale(1.02); }
        [data-project="Web developments"] .glide__slides { display: flex; gap: 1rem !important; padding: 0 !important; }
        [data-project="Web developments"] .glide__slide { width: auto !important; padding: 0 !important; margin: 0 !important; }
  /* Tighten Illustrations more */
  [data-project="Illustrations"] .glide__slides { gap: 0rem !important; padding-left: 1rem !important; }
  [data-project="Illustrations"] .project-card { margin: 0rem !important; }
  /* Smooth dim/undim effect */
  .project-card img { transition: transform 250ms ease, opacity 220ms ease, filter 220ms ease; }
  /* Light dimming: slightly brighten in light mode, tiny change in dark mode */
  .project-card:hover img { opacity: 0.99; transform: scale(1.01); filter: brightness(1.03) contrast(1.01); }
      `}</style>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="max-w-6xl mx-auto px-6 relative z-[1]"
      >
        <div className="flex items-end justify-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-wide text-text-brown dark:text-text-cream">PROJECTS</h2>
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
                className="flex flex-col md:flex-row items-start gap-3 md:gap-5"
              >
                <div className="w-full md:w-40 shrink-0 pt-2 font-semibold tracking-wide text-text-brown dark:text-text-cream">{p.title}</div>
                <div className="projects-divider relative h-0 md:h-56 w-0" aria-hidden />
                <div className="relative w-full max-w-5xl group mt-2 md:mt-0">
                  <div
                    className="glide"
                    ref={el => (glideRefs.current[p.title] = el)}
                    data-project={p.title}
                    data-index={projectIndex}
                    style={{
                      paddingTop: '0.5rem',
                      paddingBottom: '0.5rem',
                      paddingLeft: p.title === 'Web developments' ? '0.5rem' : (p.title === 'Illustrations' ? '0rem' : '2rem'),
                      paddingRight: p.title === 'Web developments' ? '0.5rem' : '2rem',
                    }}
                  >
                    <div className="glide__track" data-glide-el="track">
                      <ul className="glide__slides">
                        {p.images && p.images.length > 0
                          ? p.images.map((imgItem, idx) => {
                              const src = typeof imgItem === 'string' ? imgItem : imgItem?.src
                              const href = typeof imgItem === 'string' ? undefined : imgItem?.href
                              const baseHRem = p.cardHeightRem ?? 14
                              const derivedWidthRem = p.pageAspect ? baseHRem * p.pageAspect : 20
                              const isHighPriority = (projectIndex % 2 === 0)
                                ? idx === 0
                                : idx === ((p.images?.length || 1) - 1)
                              const isAdPosters = p.title === 'Ad posters'
                              const isWebDevCard = p.title === 'Web developments'
                              const isIllustrations = p.title === 'Illustrations'
                              const key = `${p.title}-${idx}`
                              const computedWidthRem = isAdPosters && adPosterWidths[key] ? adPosterWidths[key] : derivedWidthRem
                              
                              // Create unique ID for each image including source hash
                              const srcHash = src ? src.split('').reduce((a,b) => {a=((a<<5)-a)+b.charCodeAt(0);return a&a},0) : idx
                              const uniqueId = `${p.title.replace(/\s+/g, '')}-${projectIndex}-${idx}-${Math.abs(srcHash)}`
                              
                              return (
                                <li
                                  key={uniqueId}
                                  className="glide__slide"
                                  style={isAdPosters ? { width: `${computedWidthRem}rem` } : undefined}
                                >
                                  {href ? (
                                    <a href={href} target="_blank" rel="noopener noreferrer" className="block">
                                      <div
                                        className="project-card overflow-hidden rounded-2xl shadow-lg cursor-pointer transition-all duration-300 hover:scale-[1.08]"
                                        style={{
                                          width: `${computedWidthRem}rem`,
                                          height: `${baseHRem}rem`,
                                          margin: isWebDevCard ? '0rem' : '0.25rem',
                                        }}
                                      >
                                        <img
                                          src={src}
                                          alt={`${p.title} ${idx + 1}`}
                                          className={isAdPosters ? 'block w-full h-full object-contain' : 'block w-full h-full object-cover'}
                                          onLoad={isAdPosters ? (e => {
                                            const img = e.currentTarget
                                            const naturalW = img.naturalWidth
                                            const naturalH = img.naturalHeight
                                            if (naturalW && naturalH) {
                                              const ratio = naturalW / naturalH
                                              const wRem = baseHRem * ratio
                                              setAdPosterWidths(prev => ({ ...prev, [key]: wRem }))
                                            }
                                          }) : undefined}
                                          loading={isWebDevCard ? 'eager' : (isIllustrations ? 'eager' : 'lazy')}
                                          decoding="async"
                                          fetchpriority={(isHighPriority || isWebDevCard || isIllustrations) ? 'high' : 'auto'}
                                          draggable={false}
                                        />
                                      </div>
                                    </a>
                                  ) : (
                                    <div
                                      className="project-card overflow-hidden rounded-2xl shadow-lg cursor-pointer transition-all duration-300 hover:scale-[1.08]"
                                      style={{
                                        width: `${computedWidthRem}rem`,
                                        height: `${baseHRem}rem`,
                                        margin: isWebDevCard ? '0rem' : '0.25rem',
                                      }}
                                      data-project={p.title}
                                      data-index={idx}
                                      data-unique-id={uniqueId}
                                    >
                                      <img
                                        src={src}
                                        alt={`${p.title} ${idx + 1}`}
                                        className={isAdPosters ? 'block w-full h-full object-contain' : 'block w-full h-full object-cover'}
                                        onLoad={isAdPosters ? (e => {
                                          const img = e.currentTarget
                                          const naturalW = img.naturalWidth
                                          const naturalH = img.naturalHeight
                                          if (naturalW && naturalH) {
                                            const ratio = naturalW / naturalH
                                            const wRem = baseHRem * ratio
                                            setAdPosterWidths(prev => ({ ...prev, [key]: wRem }))
                                          }
                                        }) : undefined}
                                        loading={isWebDevCard ? 'eager' : (isIllustrations ? 'eager' : 'lazy')}
                                        decoding="async"
                                        fetchpriority={(isHighPriority || isWebDevCard || isIllustrations) ? 'high' : 'auto'}
                                        draggable={false}
                                        style={{ pointerEvents: 'none' }}
                                      />
                                    </div>
                                  )}
                                </li>
                              )
                            })
                          : null}
                      </ul>
                    </div>

                    <div className="glide__arrows opacity-0 group-hover:opacity-100 transition-opacity duration-300" data-glide-el="controls">
                      <button
            className="glide__arrow glide__arrow--left absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-brown-900 rounded-full flex items-center justify-center shadow-lg hover:bg-brown-900 hover:scale-110 transition-all duration-200"
                        data-glide-dir="<"
                      >
            <svg className="w-6 h-6 text-text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
            className="glide__arrow glide__arrow--right absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-brown-900 rounded-full flex items-center justify-center shadow-lg hover:bg-brown-900 hover:scale-110 transition-all duration-200"
                        data-glide-dir=">"
                      >
            <svg className="w-6 h-6 text-text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Image Preview Modal - Portal to body */}
      {previewModal && createPortal(
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-90"
          style={{ zIndex: 999999 }}
        >
          {/* Backdrop - clicking closes modal */}
          <div 
            className="absolute inset-0 cursor-pointer"
            onClick={closePreview}
          />
          
          {/* Modal Content */}
          <div className="relative max-w-4xl max-h-[90vh] mx-4" onClick={(e) => e.stopPropagation()}>
            {/* Image */}
            <div className="relative">
              <img
                src={typeof previewModal.images[previewModal.currentIndex] === 'string' 
                  ? previewModal.images[previewModal.currentIndex] 
                  : previewModal.images[previewModal.currentIndex]?.src
                }
                alt={`${previewModal.projectTitle} ${previewModal.currentIndex + 1}`}
                className="block object-contain rounded-lg shadow-2xl"
                style={{ 
                  width: '80vw', 
                  height: '80vh', 
                  maxWidth: '800px', 
                  maxHeight: '600px' 
                }}
                draggable={false}
              />
              
              {/* Close Button - positioned beside the image on right */}
              <button
                onClick={closePreview}
                className="absolute top-0 -right-12 z-[10000] w-10 h-10 flex items-center justify-center transition-all duration-200"
                aria-label="Close preview"
              >
                <svg className="w-8 h-8 text-white hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Image Counter */}
              {previewModal.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  {previewModal.currentIndex + 1} / {previewModal.images.length}
                </div>
              )}
            </div>

            {/* Previous Button */}
            {previewModal.images.length > 1 && (
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-[10000] w-14 h-14 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm border border-white border-opacity-20"
                aria-label="Previous image"
              >
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Next Button */}
            {previewModal.images.length > 1 && (
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-[10000] w-14 h-14 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm border border-white border-opacity-20"
                aria-label="Next image"
              >
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Project Title */}
            <div className="absolute -bottom-12 left-0 text-white text-lg font-semibold">
              {previewModal.projectTitle}
            </div>
          </div>
        </motion.div>,
        document.body
      )}
    </section>
  )
}

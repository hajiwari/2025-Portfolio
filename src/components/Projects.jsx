import React from 'react'
import { motion } from 'framer-motion'
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
          // Stronger left cut for Illustrations, larger peek overall for Web Dev
          const adjustedPeekBefore = isWebDev ? 64 : (isIllustrations ? 48 : basePeek)
          const adjustedPeekAfter  = isWebDev ? 64 : (isIllustrations ? 24 : basePeek)
          const animDuration = isIllustrations ? 700 : 700
          const animEase = 'cubic-bezier(0.22, 1, 0.36, 1)'

          const effectiveCount = (project.images && project.images.length > 0) ? project.images.length : 1
          const glide = new Glide(glideElement, {
            type: 'carousel',
            startAt: isLeftToRight ? 0 : Math.max(0, (effectiveCount || 1) - 1),
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
            direction: isLeftToRight ? 'ltr' : 'rtl',
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

          glide.mount()
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
    <section id="page-2" className="py-16 bg-text-cream dark:bg-darker-bg projects-criss-cross overflow-hidden">
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
  .project-card img { transition: transform 250ms ease, opacity 220ms ease; }
  .project-card:hover img { opacity: 0.95; transform: scale(1.01); }
      `}</style>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="max-w-6xl mx-auto px-6 relative z-[1]"
      >
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-heading font-bold tracking-wider text-text-brown dark:text-text-cream">PROJECTS</h2>
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
                <div className="w-40 shrink-0 pt-2 font-semibold tracking-wide text-text-brown dark:text-text-cream">{p.title}</div>
                <div className="projects-divider relative h-56 w-0" aria-hidden />
                <div className="relative w-full max-w-5xl group">
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
                              return (
                                <li
                                  key={`${p.title}-img-${idx}`}
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
    </section>
  )
}

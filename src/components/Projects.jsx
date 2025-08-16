import React from 'react'
import Glide from '@glidejs/glide'
import '@glidejs/glide/dist/css/glide.core.min.css'
import '@glidejs/glide/dist/css/glide.theme.min.css'

const projects = [
  {
    title: 'Posters',
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'],
    pageAspect: 4 / 5,
    cardHeightRem: 16,
    cardCount: 6,
  },
  {
    title: 'Ad posters',
    colors: ['#96CEB4', '#FFEAA7', '#DDA0DD', '#FF6B6B', '#4ECDC4', '#45B7D1'],
    pageAspect: 4 / 5,
    cardHeightRem: 14,
    cardCount: 6,
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
    // Initialize Glide for each project with alternating directions and delays
    projects.forEach((project, projectIndex) => {
      const glideElement = glideRefs.current[project.title]
      if (glideElement) {
        // Alternate direction: even index = left-to-right, odd index = right-to-left
        const isLeftToRight = projectIndex % 2 === 0
        // Staggered start delay: 0ms, 1000ms, 2000ms, etc.
        const startDelay = projectIndex * 1000
        
        // Adjust gap based on card width to maintain consistent visual spacing
        const baseHRem = project.cardHeightRem ?? 14
        const derivedWidthRem = project.pageAspect ? baseHRem * project.pageAspect : 20
        const isNarrowCard = derivedWidthRem < 12 // Ad posters (11.2rem) and Mobile Design (10.125rem)
        const adjustedGap = isNarrowCard ? 20 : 30 // Reduce gap for narrow cards
        const adjustedPeek = isNarrowCard ? 40 : 60 // Reduce peek for narrow cards
        
        const glide = new Glide(glideElement, {
          type: 'carousel',
          startAt: isLeftToRight ? 0 : project.cardCount - 1, // Start from opposite ends
          perView: (project.title === 'Posters' || project.title === 'Ad posters' || project.title === 'Mobile Design') ? 4 : 3, // Show 4 cards for Posters, Ad posters, and Mobile Design
          gap: adjustedGap, // Adjusted gap based on card width
          peek: { before: adjustedPeek, after: adjustedPeek }, // Adjusted peek based on card width
          autoplay: false, // We'll start it manually with delay
          hoverpause: true,
          keyboard: true,
          animationDuration: 600,
          animationTimingFunc: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
          direction: isLeftToRight ? 'ltr' : 'rtl', // Set direction
          breakpoints: {
            1024: {
              perView: (project.title === 'Posters' || project.title === 'Ad posters' || project.title === 'Mobile Design') ? 3 : 2, // 3 cards for Posters/Ad posters/Mobile Design on medium screens
              gap: adjustedGap, // Use same adjusted gap
              peek: { before: adjustedPeek, after: adjustedPeek } // Use same adjusted peek
            },
            768: {
              perView: (project.title === 'Posters' || project.title === 'Ad posters' || project.title === 'Mobile Design') ? 2 : 1, // 2 cards for Posters/Ad posters/Mobile Design on small screens
              gap: adjustedGap, // Use same adjusted gap
              peek: { before: adjustedPeek, after: adjustedPeek } // Use same adjusted peek
            }
          }
        })
        
        glide.mount()
        
        // Start autoplay with delay and direction
        setTimeout(() => {
          glide.update({
            autoplay: 4000 // 4 second intervals after initial delay
          })
          glide.play()
        }, startDelay)
        
        // Store glide instance for cleanup
        glideRefs.current[`${project.title}_instance`] = glide
      }
    })

    // Cleanup function
    return () => {
      Object.keys(glideRefs.current).forEach(key => {
        if (key.endsWith('_instance')) {
          const glide = glideRefs.current[key]
          if (glide && glide.destroy) {
            glide.destroy()
          }
        }
      })
    }
  }, [])

  return (
  <section id="page-2" className="py-16 bg-brown-100 dark:bg-dark-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-heading font-bold tracking-wider text-text-brown dark:text-text-cream">PROJECTS</h2>
      <a href="#page-2" className="text-sm text-accent hover:text-brown-600 dark:hover:text-brown-400 transition-colors">SEE MY PROJECTS</a>
        </div>
  <div ref={ref} className="relative mt-8 projects-root">
          <div className="space-y-10">
            {projects.map((p, projectIndex) => (
              <div key={p.title} className="flex items-start gap-5">
                {/* Caption outside, at the left of the stack */}
                <div className="w-40 shrink-0 pt-2 font-semibold tracking-wide text-text-brown dark:text-text-cream">{p.title}</div>

    {/* Invisible divider used to anchor the global scrolling path between caption and cards */}
    <div className="projects-divider relative h-56 w-0" aria-hidden />

                {/* Glide Carousel */}
                <div 
                  className="relative w-full max-w-5xl group"
                >
                  <div 
                    className="glide"
                    ref={el => glideRefs.current[p.title] = el}
                    style={{ 
                      paddingTop: '0.5rem',
                      paddingBottom: '0.5rem',
                      paddingLeft: '2rem',
                      paddingRight: '2rem'
                    }}
                  >
                    <div className="glide__track" data-glide-el="track">
                      <ul className="glide__slides">
                        {Array.from({ length: p.cardCount || 6 }, (_, idx) => {
                          const color = p.colors?.[idx % p.colors.length] || '#E5E7EB'
                          const baseHRem = p.cardHeightRem ?? 14
                          const derivedWidthRem = p.pageAspect ? baseHRem * p.pageAspect : 20
                          
                          return (
                            <li key={`${p.title}-slide-${idx}`} className="glide__slide">
                              <div
                                className={"project-card overflow-hidden rounded-2xl shadow-lg cursor-pointer transition-all duration-300 hover:scale-[1.08]"}
                                style={{ 
                                  width: `${derivedWidthRem}rem`,
                                  height: `${baseHRem}rem`,
                                  backgroundColor: color,
                                  margin: '0.25rem'
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

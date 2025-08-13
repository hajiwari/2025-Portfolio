import React from 'react'
import { motion } from 'framer-motion'

const projects = [
  { title: 'Posters', images: ['/assets/gallery1.jpg', '/assets/gallery2.jpg', '/assets/gallery3.jpg'] },
  { title: 'Ad posters', images: ['/assets/gallery2.jpg', '/assets/gallery3.jpg', '/assets/gallery1.jpg'] },
  { title: 'Presentation', images: ['/assets/gallery3.jpg', '/assets/gallery1.jpg', '/assets/gallery2.jpg'] },
  { title: 'Web Design', images: ['/assets/hero.jpg', '/assets/gallery2.jpg', '/assets/gallery1.jpg'] },
  { title: 'Mobile Design', images: ['/assets/gallery2.jpg', '/assets/hero.jpg', '/assets/gallery3.jpg'] },
  { title: 'Web developments', images: ['/assets/gallery1.jpg', '/assets/gallery3.jpg', '/assets/gallery2.jpg'] },
]

export default function Projects(){
  const ref = React.useRef(null)

  return (
  <section id="page-2" className="py-16 bg-brown-100 dark:bg-dark-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-heading font-bold tracking-wider text-text-brown dark:text-text-cream">PROJECTS</h2>
      <a href="#page-2" className="text-sm text-accent hover:text-brown-600 dark:hover:text-brown-400 transition-colors">SEE MY PROJECTS</a>
        </div>
  <div ref={ref} className="relative mt-8 projects-root">
          <div className="space-y-10">
            {projects.map(p => (
              <div key={p.title} className="flex items-start gap-5">
                {/* Caption outside, at the left of the stack */}
                <div className="w-40 shrink-0 pt-2 font-semibold tracking-wide text-text-brown dark:text-text-cream">{p.title}</div>

    {/* Invisible divider used to anchor the global scrolling path between caption and cards */}
    <div className="projects-divider relative h-56 w-0" aria-hidden />

                {/* Stacked cards */}
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  className="relative isolate h-56 w-full max-w-3xl"
                >
                  {[2, 1, 0].map((idx) => {
                    const src = p.images[idx]
                    const i = idx
                    const fills = ['#5B3A29', '#4A2E21', '#3A2318']
                    const fill = fills[i % fills.length]
                    return (
                      <motion.div
                        key={src + i}
                        className="absolute top-0 left-0 h-56 w-80 md:w-96 lg:w-[28rem] overflow-hidden rounded-2xl border-2 shadow"
                        style={{ zIndex: 3 - i, pointerEvents: i === 0 ? 'auto' : 'none', borderColor: fill }}
                        variants={{
                          rest: { x: 0, boxShadow: '0 10px 20px rgba(0,0,0,0.15)' },
                          hover: { x: i === 0 ? 0 : i * 36, boxShadow: '0 14px 28px rgba(0,0,0,0.18)' },
                        }}
                        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                      >
                        <div className="absolute left-0 top-0 h-full w-1.5 pointer-events-none" style={{ backgroundColor: fill }} aria-hidden />
                        <img
                          src={src}
                          alt={`${p.title} ${i + 1}`}
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, 60vw"
                          className="h-full w-full object-cover select-none"
                        />
                      </motion.div>
                    )
                  })}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

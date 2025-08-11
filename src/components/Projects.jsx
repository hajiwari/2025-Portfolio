import React from 'react'
import { motion } from 'framer-motion'

const projects = [
  { title: 'XZERO', img: '/assets/gallery1.jpg' },
  { title: 'Posters', img: '/assets/gallery2.jpg' },
  { title: 'Presentations', img: '/assets/gallery3.jpg' },
]

export default function Projects(){
  return (
  <section id="page-2" className="py-16 bg-brown-100 dark:bg-dark-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-heading font-bold tracking-wider text-text-brown dark:text-text-cream">PROJECTS</h2>
      <a href="#page-2" className="text-sm text-accent hover:text-brown-600 dark:hover:text-brown-400 transition-colors">SEE MY PROJECTS</a>
        </div>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {projects.map(p => (
            <motion.div key={p.title} whileHover={{ y:-6 }} className="rounded-2xl overflow-hidden shadow bg-text-cream dark:bg-text-brown border border-brown-200 dark:border-text-brown">
              <img src={p.img} alt={p.title} loading="lazy" sizes="(max-width: 768px) 100vw, 33vw" className="w-full h-56 object-cover" />
              <div className="p-4 font-semibold text-text-brown dark:text-text-cream">{p.title}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

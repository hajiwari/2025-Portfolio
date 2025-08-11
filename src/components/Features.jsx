import React from 'react'
import { motion } from 'framer-motion'

const items = [
  {title:'Design-first', desc:'Pixel-perfect layouts and typography'},
  {title:'Responsive', desc:'Looks great on phones, tablets, and desktops'},
  {title:'Animations', desc:'Framer Motion subtle micro-interactions'},
]

export default function Features(){
  return (
    <section id="features" className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-heading font-bold">Features</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {items.map((it) => (
            <motion.div key={it.title} whileHover={{ y:-6 }} className="p-6 bg-white rounded-2xl shadow"> 
              <div className="text-lg font-semibold">{it.title}</div>
              <div className="mt-2 text-sm text-gray-600">{it.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

import React from 'react'
import { motion } from 'framer-motion'

export default function CTA(){
  return (
    <section className="py-12 bg-gradient-to-r from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h4 initial={{ y:10, opacity:0 }} animate={{ y:0, opacity:1 }} className="text-2xl font-heading font-bold">Ready to start?</motion.h4>
        <motion.p className="mt-3 text-gray-600">Get in touch and we’ll build the site fast — faithful to the original Canva layout.</motion.p>
        <div className="mt-6">
          <motion.a whileHover={{ scale:1.03 }} href="#contact" className="inline-block px-6 py-3 bg-accent text-white rounded-lg">Contact</motion.a>
        </div>
      </div>
    </section>
  )
}
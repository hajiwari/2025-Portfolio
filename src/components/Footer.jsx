import React from 'react'
import { motion } from 'framer-motion'

export default function Footer(){
  return (
    <footer className="mt-12 border-t border-brown-200 dark:border-text-brown pt-8 pb-12 bg-brown-100 dark:bg-dark-bg">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="max-w-6xl mx-auto px-6 text-center text-sm text-text-gray dark:text-text-cream"
      >
        <div>© {new Date().getFullYear()} Hajime • Terms & Support</div>
      </motion.div>
    </footer>
  )
}
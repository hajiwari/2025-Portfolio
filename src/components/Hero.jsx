import React from 'react'
import { motion } from 'framer-motion'

export default function Hero(){
  return (
    <section id="page-0" className="min-h-screen flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <motion.div initial={{ x:-20, opacity:0 }} animate={{ x:0, opacity:1 }} className="text-xs tracking-[0.6em] text-text-gray dark:text-text-gray">HI! I'M</motion.div>
          <motion.h1 initial={{ x:-30, opacity:0 }} animate={{ x:0, opacity:1 }} transition={{duration:0.5}} className="mt-2 text-4xl md:text-5xl font-heading font-extrabold leading-tight text-text-brown dark:text-text-cream">Jaime Dela Cruz III</motion.h1>
          <motion.p initial={{ x:-10, opacity:0 }} animate={{ x:0, opacity:1 }} transition={{duration:0.6}} className="mt-3 text-sm tracking-wider uppercase text-text-gray dark:text-text-gray">d e s i g n e r /  d e v e l o p e r /  t e c h n i c a l  S P E C I A L I S T</motion.p>

          <div className="mt-8 flex gap-4">
            <motion.a whileHover={{ scale:1.03 }} whileTap={{ scale:0.98 }} href="#page-3" className="inline-block px-6 py-3 bg-accent text-text-cream rounded-lg shadow-lg hover:bg-brown-600 transition-colors">CONTACT ME</motion.a>
            <motion.a whileHover={{ scale:1.03 }} href="#page-2" className="inline-block px-6 py-3 border border-text-gray dark:border-text-brown rounded-lg hover:bg-brown-100 dark:hover:bg-text-brown transition-colors">PROJECTS</motion.a>
          </div>
        </div>

        <div className="relative">
          <motion.div initial={{ scale:0.98, rotate:-2, opacity:0 }} animate={{ scale:1, rotate:0, opacity:1 }} transition={{duration:0.6}} className="mx-auto w-full max-w-md">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img src="/assets/hero.jpg" alt="Hajime hero" loading="lazy" sizes="(max-width: 768px) 100vw, 480px" className="w-full h-auto object-cover" />
            </div>
          </motion.div>

          <motion.div initial={{ y:10, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{delay:0.4}} className="absolute -bottom-8 left-6 bg-text-cream dark:bg-dark-bg rounded-xl p-4 shadow-md w-48 border border-brown-200 dark:border-text-brown">
            <div className="text-xs tracking-wider text-text-gray dark:text-text-gray">H A J I M E</div>
            <div className="text-sm font-semibold text-text-brown dark:text-text-cream">Portfolio</div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

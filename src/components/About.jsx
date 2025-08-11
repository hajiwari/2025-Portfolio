import React from 'react'
import { motion } from 'framer-motion'

export default function About(){
  return (
  <section id="page-1" className="py-16 bg-brown-100 dark:bg-dark-bg">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-2xl font-heading font-bold tracking-[0.4em] text-text-brown dark:text-text-cream">A B O U T  M E</h2>
          <motion.p initial={{opacity:0,y:6}} whileInView={{opacity:1,y:0}} viewport={{ once: true }} className="mt-4 text-text-gray dark:text-text-cream leading-relaxed">
            I'm a tech-driven professional with a strong passion for exploring diverse roles across the digital landscape.
            I've worn many hats—developer, designer, and technical support specialist—each role sharpening my adaptability
            and problem-solving skills. From managing projects, building websites, to supporting users, I bring hands-on
            experience across different areas of tech. I'm driven by curiosity, a strong learning mindset, and a commitment
            to delivering thoughtful, effective solutions in every challenge I take on.
          </motion.p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="p-4 bg-text-cream dark:bg-text-brown rounded-xl shadow border border-brown-200 dark:border-text-brown">
            <div className="font-semibold text-text-brown dark:text-text-cream">Web & Mobile</div>
            <div className="mt-1 text-text-gray dark:text-text-cream">HTML, CSS, JavaScript</div>
          </div>
          <div className="p-4 bg-text-cream dark:bg-text-brown rounded-xl shadow border border-brown-200 dark:border-text-brown">
            <div className="font-semibold text-text-brown dark:text-text-cream">WordPress</div>
            <div className="mt-1 text-text-gray dark:text-text-cream">Themes, Plugins</div>
          </div>
          <div className="p-4 bg-text-cream dark:bg-text-brown rounded-xl shadow border border-brown-200 dark:border-text-brown">
            <div className="font-semibold text-text-brown dark:text-text-cream">Tools</div>
            <div className="mt-1 text-text-gray dark:text-text-cream">VS Code, Git</div>
          </div>
          <div className="p-4 bg-text-cream dark:bg-text-brown rounded-xl shadow border border-brown-200 dark:border-text-brown">
            <div className="font-semibold text-text-brown dark:text-text-cream">Design</div>
            <div className="mt-1 text-text-gray dark:text-text-cream">Posters, Presentations</div>
          </div>
        </div>
      </div>
    </section>
  )
}

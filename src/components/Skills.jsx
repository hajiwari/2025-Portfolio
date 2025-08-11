import React from 'react'
import { motion } from 'framer-motion'

const skills = [
  { name: 'HTML/CSS', level: 90 },
  { name: 'JavaScript', level: 80 },
  { name: 'React', level: 75 },
  { name: 'Tailwind CSS', level: 85 },
  { name: 'WordPress', level: 70 },
  { name: 'Design/Canva', level: 88 },
]

export default function Skills(){
  return (
    <section id="skills" className="py-16 bg-text-cream dark:bg-darker-bg">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-2xl font-heading font-bold tracking-wider text-text-brown dark:text-text-cream">SKILLS</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          {skills.map(s => (
            <div key={s.name} className="p-4 bg-brown-100 dark:bg-text-brown rounded-xl shadow border border-brown-200 dark:border-text-brown">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold text-text-brown dark:text-text-cream">{s.name}</span>
                <span className="text-text-gray dark:text-text-cream">{s.level}%</span>
              </div>
              <div className="h-2 bg-brown-200 dark:bg-darker-bg rounded">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="h-2 bg-accent rounded"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

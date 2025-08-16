import React from 'react'
import { motion } from 'framer-motion'

const experiences = [
  {
    title: 'Frontend Engineer',
    company: 'Vercel',
    year: '2024 — Present',
    icon: 'https://logo.clearbit.com/vercel.com',
    description:
      'Building fast, accessible marketing sites and dashboards. Focus on React, performance budgets, and DX improvements across the team.'
  },
  {
    title: 'Web Developer',
    company: 'GitHub',
    year: '2022 — 2024',
    icon: 'https://logo.clearbit.com/github.com',
    description:
      'Shipped UI features for docs and community surfaces. Led migration to Tailwind and component-driven theming with Storybook.'
  },
  {
    title: 'Product Designer / Developer',
    company: 'Figma',
    year: '2021 — 2022',
    icon: 'https://logo.clearbit.com/figma.com',
    description:
      'Prototyped design systems and interactive components. Bridged design/dev handoff and automated token workflows.'
  },
  {
    title: 'Frontend Contractor',
    company: 'OpenAI',
    year: '2019 — 2021',
    icon: 'https://logo.clearbit.com/openai.com',
    description:
      'Delivered landing pages and internal tools. Emphasis on accessibility, responsiveness, and progressive enhancement.'
  }
]

export default function Experience(){
  return (
    <section id="experience" className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-wide text-text-brown dark:text-text-cream">WORK EXPERIENCE</h2>

        <div className="mt-10 space-y-12">
          {experiences.map((job, idx) => {
            const isLeft = idx % 2 === 0
            return (
              <motion.div
                key={`${job.company}-${idx}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-24 items-start"
              >
                {/* Left column */}
                <div className={
                  isLeft
                    ? 'md:order-none text-right flex md:justify-end items-start'
                    : 'md:order-2 text-left flex md:justify-start items-start'
                }>
                  <div className="md:max-w-md">
                    <div className={isLeft ? 'text-right' : 'text-left'}>
                      <h3 className="text-xl md:text-2xl font-heading font-semibold tracking-wide text-text-brown dark:text-text-cream">
                        {job.title}
                      </h3>
                      <p className="mt-1 text-base md:text-lg text-text-brown dark:text-text-brown">
                        {job.company}
                      </p>
                      <p className="mt-0.5 text-sm md:text-base text-text-gray dark:text-text-cream/80">
                        {job.year}
                      </p>
                      <div className={isLeft ? 'mt-3 flex justify-end' : 'mt-3 flex justify-start'}>
                        <img
                          src={job.icon}
                          alt={`${job.company} logo`}
                          className="h-8 w-8 md:h-10 md:w-10 object-contain"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right column */}
                <div className={
                  isLeft
                    ? 'mt-4 md:mt-0 md:order-2 text-left flex md:justify-start items-start'
                    : 'mt-4 md:mt-0 md:order-none text-right flex md:justify-end items-start'
                }>
                  <p className="md:max-w-md text-base md:text-lg text-text-brown dark:text-text-cream leading-relaxed">
                    {job.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

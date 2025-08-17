import React from 'react'
import { motion } from 'framer-motion'

const experiences = [
  {
    title: 'Technical Marketing Assistant',
    company: 'VSL - Social Media Agency (Remote, US)',
    year: 'Apr 2025 — Present',
  icon: 'https://assets.cdn.filesafe.space/54PiEFlRWZcrTNV8UnPz/media/67816fccd1dc9840d201b3c1.png',
    description:
      'Managed full-funnel ops for 50+ accounts (Meta buying, funnels, CRM) and built GHL automations, tracking, and revenue dashboards to speed sales decisions.'
  },
  {
    title: 'Technical Associate',
    company: 'Reed Elsevier Philippines, Quezon City, PH',
    year: 'Jul 2024',
  icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAF2Zflk8QSG1GXcNI1hMhXOfkdyfdI2O81Q&s',
    description:
      'Primary comms POC with timely, accurate responses; partnered on process improvements to streamline workflows.'
  },
  {
    title: 'Technical Support',
    company: 'Concentrix Corporation, Makati, PH',
    year: 'Feb 2024 — Jul 2024',
  icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJeJhkP_dt5zB6XcJfi0h9rM4BRwvMHJd6Pg&s',
    description:
      'Aligned IT initiatives with business goals and delivered presentations/reports translating technical insights into action.'
  },
  {
    title: 'Web Developer Intern',
    company: "Employees' Compensation Commission, Makati, PH",
    year: 'Mar 2024 — Jul 2024',
  icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyF0erjo7-Q2ME1qcMcBaM3m74WCS1sGuEDQ&s',
    description:
      'Built and maintained a WordPress/PHP site on Apache with SQL; shipped features per requirements with senior dev guidance.'
  },
  {
    title: 'Digital/Traditional Graphic Designer',
    company: 'Haji Graphics, Pangasinan, PH',
    year: 'Jan 2019 — Oct 2022',
  icon: null,
    description:
      'Designed logos and marketing collateral; managed projects with industry-standard tools to deliver on-brand visuals.'
  },
  {
    title: 'Event Designer',
    company: 'Hotel and Restaurant Company, Pangasinan, PH',
    year: 'Feb 2018 — Sep 2021',
  icon: null,
    description:
      'Created event branding (logos, banners, signage) and marketing materials; coordinated on-site visual execution with planners.'
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
                      <h3 className="text-xl md:text-2xl font-heading font-semibold tracking-wide text-brown-400 dark:text-brown-400">
                        {job.title}
                      </h3>
                      <p className="mt-1 text-base md:text-lg text-text-brown dark:text-text-brown">
                        {job.company}
                      </p>
                      <p className="mt-0.5 text-sm md:text-base text-text-gray dark:text-text-cream/80">
                        {job.year}
                      </p>
                      {job.icon && (
                        <div className={isLeft ? 'mt-3 flex justify-end' : 'mt-3 flex justify-start'}>
                          <img
                            src={job.icon}
                            alt={`${job.company} logo`}
                            className="h-8 w-8 md:h-10 md:w-10 rounded-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      )}
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

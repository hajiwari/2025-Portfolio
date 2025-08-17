import React from 'react'
import { motion } from 'framer-motion'

const categories = [
  {
    title: "DEV",
    description: "Building robust web applications and scalable solutions",
    tools: [
      { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
      { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
      { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
      { name: "Vue.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg" },
      { name: "Angular", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg" },
      { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg" },
      { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" },
      { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" },
      { name: "GitHub", icon: "https://cdn-icons-png.flaticon.com/512/25/25231.png" },
      { name: "WordPress", icon: "https://cdn-icons-png.flaticon.com/512/174/174881.png" },
      { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" },
      { name: "Apache", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apache/apache-original.svg" },
      { name: "Oracle", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg" }
    ]
  },
  {
    title: "AUTOMATE",
    description: "Streamlining workflows and business process automation",
    tools: [
      { name: "Zapier", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrVwOzVey6XcMevohRDman3xgDFw91v8qZfw&s" },
      { name: "GoHighLevel", icon: "https://play-lh.googleusercontent.com/MAbanjWwLE2Ps3c6ZxUgLE6SMSzwy8PQ5mYvc_Txhn_1zv9gLEEKSsLYqW89y1wGdww" },
      { name: "HubSpot", icon: "https://cdn.worldvectorlogo.com/logos/hubspot-1.svg" },
      { name: "SmartLead AI", icon: "https://app.smartlead.ai/favicon.ico" },
      { name: "Apollo", icon: "https://cdn.prod.website-files.com/630533bb38a04b2d7788387f/64b93cd388a9fb7db0b08fce_64b157c1d4f47d5d53098ea2_apolli.io%2520logo.jpeg" },
      { name: "RB2B", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe0UkGWGL7a1_HB3FYoec7at3nlsojTmcFOUUjv7mQbImYohJuLvyGZxSjlTu4k5jkUec" },
      { name: "Zendesk", icon: "https://images.icon-icons.com/2429/PNG/512/zendesk_logo_icon_147198.png" },
      { name: "MS Office", icon: "https://images.icon-icons.com/1156/PNG/512/1486565573-microsoft-office_81557.png" },
      { name: "Tableau", icon: "https://cdn.worldvectorlogo.com/logos/tableau-software.svg" },
      { name: "Meta Business", icon: "https://i.pinimg.com/1200x/1f/e6/88/1fe6884bf0022011fff5c9e6cb26baa7.jpg" }
    ]
  },
  {
    title: "DESIGN",
    description: "Creating beautiful interfaces and compelling visual content",
    tools: [
      { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
      { name: "Photoshop", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg" },
      { name: "Lightroom", icon: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Adobe_Photoshop_Lightroom_CC_logo.svg" },
      { name: "Canva", icon: "https://img.utdstc.com/icon/431/c6b/431c6be8e8dbb358738980c75c35c56ee8e8c3238089ed9b6f04d295d4008970:200" },
      { name: "CapCut", icon: "https://static.vecteezy.com/system/resources/previews/013/948/546/non_2x/capcut-logo-on-transparent-white-background-free-vector.jpg" }
    ]
  }
]

export default function Tools(){
  return (
    <section id="tools" className="py-16 bg-brown-100 dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="text-center mb-12 bg-brown-300 dark:bg-stone-800 py-8 px-6 rounded-xl relative z-20"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-wide text-text-brown dark:text-text-cream">TOOLS & SKILLS</h2>
          <p className="mt-4 text-text-gray dark:text-text-cream leading-relaxed max-w-3xl mx-auto">
            A comprehensive toolkit spanning development, design, automation, and support - 
            enabling me to deliver end-to-end solutions across the digital landscape.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* DEV - Full left column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ 
              duration: 0.5, 
              ease: 'easeOut',
              delay: 0 * 0.1 
            }}
            className="relative p-5 group"
          >
            {/* Top-right corner */}
            <div className="absolute top-0 right-0 w-4 h-4 group-hover:scale-105 transition-transform duration-200 ease-out">
              <div className="absolute top-0 right-0 w-4 h-0.5 bg-text-brown dark:bg-text-cream"></div>
              <div className="absolute top-0 right-0 w-0.5 h-4 bg-text-brown dark:bg-text-cream"></div>
            </div>
            {/* Bottom-left corner */}
            <div className="absolute bottom-0 left-0 w-4 h-4 group-hover:scale-105 transition-transform duration-200 ease-out">
              <div className="absolute bottom-0 left-0 w-4 h-0.5 bg-text-brown dark:bg-text-cream"></div>
              <div className="absolute bottom-0 left-0 w-0.5 h-4 bg-text-brown dark:bg-text-cream"></div>
            </div>

            <div className="mb-4 group-hover:scale-105 transition-transform duration-200 ease-out">
              <h3 className="text-xl font-heading font-bold tracking-[0.2em] text-text-brown dark:text-text-cream mb-1">
                {categories[0].title}
              </h3>
              <p className="text-sm text-text-gray dark:text-gray-300 leading-relaxed">
                {categories[0].description}
              </p>
            </div>

            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-6 xl:grid-cols-8 gap-2">
              {categories[0].tools.map((tool, toolIndex) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ 
                    duration: 0.2, 
                    ease: 'easeOut'
                  }}
                  whileHover={{ scale: 1.15 }}
                  className="flex flex-col items-center p-1.5 transition-transform duration-150 ease-out group"
                >
                  <div className="w-7 h-7 mb-1 flex items-center justify-center">
                    <img 
                      src={tool.icon} 
                      alt={tool.name}
                      className="w-5 h-5 object-contain rounded group-hover:scale-110 transition-transform duration-150"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-purple-600 rounded hidden items-center justify-center text-white text-xs font-bold">
                      {tool.name.charAt(0)}
                    </div>
                  </div>
                  <span className="text-xs text-center text-gray-700 dark:text-gray-300 font-medium leading-tight hidden sm:block">
                    {tool.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right column - AUTOMATE and DESIGN stacked */}
          <div className="space-y-8">
            {/* AUTOMATE - Top right */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ 
                duration: 0.5, 
                ease: 'easeOut',
                delay: 1 * 0.1 
              }}
              className="relative p-5 group"
            >
              {/* Corner borders */}
              <div className="absolute top-0 right-0 w-4 h-4 group-hover:scale-105 transition-transform duration-200 ease-out">
                <div className="absolute top-0 right-0 w-4 h-0.5 bg-text-brown dark:bg-text-cream"></div>
                <div className="absolute top-0 right-0 w-0.5 h-4 bg-text-brown dark:bg-text-cream"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-4 h-4 group-hover:scale-105 transition-transform duration-200 ease-out">
                <div className="absolute bottom-0 left-0 w-4 h-0.5 bg-text-brown dark:bg-text-cream"></div>
                <div className="absolute bottom-0 left-0 w-0.5 h-4 bg-text-brown dark:bg-text-cream"></div>
              </div>

              <div className="mb-4 group-hover:scale-105 transition-transform duration-200 ease-out">
                <h3 className="text-xl font-heading font-bold tracking-[0.2em] text-text-brown dark:text-text-cream mb-1">
                  {categories[1].title}
                </h3>
                <p className="text-sm text-text-gray dark:text-gray-300 leading-relaxed">
                  {categories[1].description}
                </p>
              </div>

              <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-6 xl:grid-cols-8 gap-2">
                {categories[1].tools.map((tool, toolIndex) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ 
                      duration: 0.2, 
                      ease: 'easeOut'
                    }}
                    whileHover={{ scale: 1.15 }}
                    className="flex flex-col items-center p-1.5 transition-transform duration-150 ease-out group"
                  >
                    <div className="w-7 h-7 mb-1 flex items-center justify-center">
                      <img 
                        src={tool.icon} 
                        alt={tool.name}
                        className="w-5 h-5 object-contain rounded group-hover:scale-110 transition-transform duration-150"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-purple-600 rounded hidden items-center justify-center text-white text-xs font-bold">
                        {tool.name.charAt(0)}
                      </div>
                    </div>
                    <span className="text-xs text-center text-gray-700 dark:text-gray-300 font-medium leading-tight hidden sm:block">
                      {tool.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* DESIGN - Bottom right */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ 
                duration: 0.5, 
                ease: 'easeOut',
                delay: 2 * 0.1 
              }}
              className="relative p-5 group"
            >
              {/* Corner borders */}
              <div className="absolute top-0 right-0 w-4 h-4 group-hover:scale-105 transition-transform duration-200 ease-out">
                <div className="absolute top-0 right-0 w-4 h-0.5 bg-text-brown dark:bg-text-cream"></div>
                <div className="absolute top-0 right-0 w-0.5 h-4 bg-text-brown dark:bg-text-cream"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-4 h-4 group-hover:scale-105 transition-transform duration-200 ease-out">
                <div className="absolute bottom-0 left-0 w-4 h-0.5 bg-text-brown dark:bg-text-cream"></div>
                <div className="absolute bottom-0 left-0 w-0.5 h-4 bg-text-brown dark:bg-text-cream"></div>
              </div>

              <div className="mb-4 group-hover:scale-105 transition-transform duration-200 ease-out">
                <h3 className="text-xl font-heading font-bold tracking-[0.2em] text-text-brown dark:text-text-cream mb-1">
                  {categories[2].title}
                </h3>
                <p className="text-sm text-text-gray dark:text-gray-300 leading-relaxed">
                  {categories[2].description}
                </p>
              </div>

              <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-6 xl:grid-cols-8 gap-2">
                {categories[2].tools.map((tool, toolIndex) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ 
                      duration: 0.2, 
                      ease: 'easeOut'
                    }}
                    whileHover={{ scale: 1.15 }}
                    className="flex flex-col items-center p-1.5 transition-transform duration-150 ease-out group"
                  >
                    <div className="w-7 h-7 mb-1 flex items-center justify-center">
                      <img 
                        src={tool.icon} 
                        alt={tool.name}
                        className="w-5 h-5 object-contain rounded group-hover:scale-110 transition-transform duration-150"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-purple-600 rounded hidden items-center justify-center text-white text-xs font-bold">
                        {tool.name.charAt(0)}
                      </div>
                    </div>
                    <span className="text-xs text-center text-gray-700 dark:text-gray-300 font-medium leading-tight hidden sm:block">
                      {tool.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

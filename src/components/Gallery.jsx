import React from 'react'
import { motion } from 'framer-motion'

const photos = ['/assets/gallery1.jpg','/assets/gallery2.jpg','/assets/gallery3.jpg']

export default function Gallery(){
  return (
    <section id="gallery" className="py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h3 className="text-xl font-heading font-bold">Gallery</h3>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((p,i)=> (
            <motion.div key={p} whileHover={{ scale:1.03 }} className="rounded-xl overflow-hidden shadow">
              <img src={p} alt={`gallery-${i}`} className="w-full h-40 object-cover" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

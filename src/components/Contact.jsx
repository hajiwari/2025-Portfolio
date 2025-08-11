import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function Contact(){
  const formRef = useRef(null)
  const [status, setStatus] = useState(null)

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const service = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const template = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const user = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      if (!service || !template || !user) {
        throw new Error('EmailJS env vars missing')
      }
      const { default: emailjs } = await import('@emailjs/browser')
      await emailjs.sendForm(service, template, formRef.current, user)
      setStatus('sent')
      formRef.current.reset()
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
  <section id="page-3" className="py-16 bg-text-cream dark:bg-darker-bg">
      <div className="max-w-4xl mx-auto px-6">
    <h2 className="text-2xl font-heading font-bold tracking-wider text-text-brown dark:text-text-cream">Contact</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6 text-sm">
          <div className="p-4 bg-brown-100 dark:bg-text-brown rounded-xl shadow border border-brown-200 dark:border-text-brown">
            <div className="font-semibold text-text-brown dark:text-text-cream">Email</div>
            <a className="text-accent hover:text-brown-600 dark:hover:text-brown-400 transition-colors" href="mailto:office.jaimedelacruziii@gmail.com">office.jaimedelacruziii@gmail.com</a>
          </div>
          <div className="p-4 bg-brown-100 dark:bg-text-brown rounded-xl shadow border border-brown-200 dark:border-text-brown">
            <div className="font-semibold text-text-brown dark:text-text-cream">Instagram</div>
            <a className="text-accent hover:text-brown-600 dark:hover:text-brown-400 transition-colors" href="https://instagram.com/jaimedelacruziii" target="_blank" rel="noreferrer">@jaimedelacruziii</a>
          </div>
          <div className="p-4 bg-brown-100 dark:bg-text-brown rounded-xl shadow border border-brown-200 dark:border-text-brown">
            <div className="font-semibold text-text-brown dark:text-text-cream">Phone</div>
            <div className="text-text-gray dark:text-text-cream">+63 993-559-6199</div>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-heading font-bold text-text-brown dark:text-text-cream mb-4">Send a Message</h3>
          <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" name="name" placeholder="Your Name" required className="w-full p-3 rounded-lg border border-text-gray dark:border-text-brown bg-text-cream dark:bg-text-brown text-text-brown dark:text-text-cream placeholder-text-gray dark:placeholder-text-cream focus:border-accent focus:outline-none" />
              <input type="email" name="email" placeholder="Your Email" required className="w-full p-3 rounded-lg border border-text-gray dark:border-text-brown bg-text-cream dark:bg-text-brown text-text-brown dark:text-text-cream placeholder-text-gray dark:placeholder-text-cream focus:border-accent focus:outline-none" />
            </div>
            <input type="text" name="subject" placeholder="Subject" required className="w-full p-3 rounded-lg border border-text-gray dark:border-text-brown bg-text-cream dark:bg-text-brown text-text-brown dark:text-text-cream placeholder-text-gray dark:placeholder-text-cream focus:border-accent focus:outline-none" />
            <textarea name="message" placeholder="Your Message" rows={4} required className="w-full p-3 rounded-lg border border-text-gray dark:border-text-brown bg-text-cream dark:bg-text-brown text-text-brown dark:text-text-cream placeholder-text-gray dark:placeholder-text-cream focus:border-accent focus:outline-none resize-none"></textarea>
            <button type="submit" disabled={status === 'sending'} className="bg-accent hover:bg-brown-600 text-text-cream px-6 py-3 rounded-lg shadow-lg transition-colors disabled:opacity-50">
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            {status === 'sent' && <p className="text-green-600 dark:text-green-400">Message sent successfully!</p>}
            {status === 'error' && <p className="text-red-600 dark:text-red-400">Failed to send. Check your EmailJS setup.</p>}
          </form>
        </div>
      </div>
    </section>
  )
}

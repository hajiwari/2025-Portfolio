import React, { useRef, useState } from 'react'
import { SiGithub, SiLinkedin, SiUpwork } from 'react-icons/si'

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
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-2xl font-heading font-bold tracking-wider text-text-brown dark:text-text-cream">Get in Touch</h2>

        <div className="mt-8 grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Contact Information */}
          <div>
            <h3 className="text-xl font-heading font-bold text-text-brown dark:text-text-cream">Contact Information</h3>
            <ul className="mt-6 space-y-4">
              <li className="flex items-center gap-3">
                {/* Email icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 text-accent">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H4.5a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5H4.5a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.917l-6.75 4.05a2.25 2.25 0 0 1-2.31 0l-6.75-4.05A2.25 2.25 0 0 1 2.25 6.993V6.75" />
                </svg>
                <a className="text-text-brown dark:text-text-cream hover:text-accent transition-colors" href="mailto:office.jaimedelacruziii@gmail.com">office.jaimedelacruziii@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                {/* Phone icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 text-accent">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0-1.243 1.007-2.25 2.25-2.25h2.318c.9 0 1.688.57 1.957 1.427l.804 2.562a2.25 2.25 0 0 1-.567 2.31l-1.05 1.05a14.25 14.25 0 0 0 6.364 6.364l1.05-1.05a2.25 2.25 0 0 1 2.31-.567l2.562.804a2.062 2.062 0 0 1 1.427 1.957V19.5a2.25 2.25 0 0 1-2.25 2.25h-1.5C8.593 21.75 2.25 15.407 2.25 7.5v-0.75z" />
                </svg>
                <a className="text-text-brown dark:text-text-cream hover:text-accent transition-colors" href="tel:+639935596199">+63 993-559-6199</a>
              </li>
              {/* Social icons row */}
              <li className="pt-2">
                <div className="flex items-center gap-4">
                  <a
                    href="https://github.com/hajiwari"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="text-text-brown dark:text-text-cream hover:text-accent transition-colors"
                  >
                    <SiGithub size={22} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/jaimedelacruziii/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="text-text-brown dark:text-text-cream hover:text-accent transition-colors"
                  >
                    <SiLinkedin size={22} />
                  </a>
                  <a
                    href="https://www.upwork.com/freelancers/~01b5ccba82dca5ae62?mp_source=share"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Upwork"
                    className="text-text-brown dark:text-text-cream hover:text-accent transition-colors"
                  >
                    <SiUpwork size={22} />
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Right: Send a Message */}
          <div>
            <h3 className="text-xl font-heading font-bold text-text-brown dark:text-text-cream">Send a Message</h3>
            <form ref={formRef} onSubmit={onSubmit} className="mt-4 space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-text-brown dark:text-text-cream">Name</label>
                <input id="name" type="text" name="name" required className="w-full p-3 rounded-lg border border-text-gray dark:border-text-brown bg-text-cream dark:bg-text-brown text-text-brown dark:text-text-cream focus:outline-none focus:border-brown-600 focus:ring-1 focus:ring-brown-600 dark:focus:border-brown-400 dark:focus:ring-brown-400" />
              </div>
              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-text-brown dark:text-text-cream">Email</label>
                <input id="email" type="email" name="email" required className="w-full p-3 rounded-lg border border-text-gray dark:border-text-brown bg-text-cream dark:bg-text-brown text-text-brown dark:text-text-cream focus:outline-none focus:border-brown-600 focus:ring-1 focus:ring-brown-600 dark:focus:border-brown-400 dark:focus:ring-brown-400" />
              </div>
              {/* Subject */}
              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-medium text-text-brown dark:text-text-cream">Subject</label>
                <input id="subject" type="text" name="subject" required className="w-full p-3 rounded-lg border border-text-gray dark:border-text-brown bg-text-cream dark:bg-text-brown text-text-brown dark:text-text-cream focus:outline-none focus:border-brown-600 focus:ring-1 focus:ring-brown-600 dark:focus:border-brown-400 dark:focus:ring-brown-400" />
              </div>
              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-text-brown dark:text-text-cream">Message</label>
                <textarea id="message" name="message" rows={4} required className="w-full p-3 rounded-lg border border-text-gray dark:border-text-brown bg-text-cream dark:bg-text-brown text-text-brown dark:text-text-cream focus:outline-none focus:border-brown-600 focus:ring-1 focus:ring-brown-600 dark:focus:border-brown-400 dark:focus:ring-brown-400 resize-none"></textarea>
              </div>
              <button type="submit" disabled={status === 'sending'} className="w-full bg-accent hover:bg-brown-600 text-text-cream px-6 py-3 rounded-lg shadow-lg transition-colors disabled:opacity-50">
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              {status === 'sent' && <p className="text-green-600 dark:text-green-400">Message sent successfully!</p>}
              {status === 'error' && <p className="text-red-600 dark:text-red-400">Failed to send. Check your EmailJS setup.</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

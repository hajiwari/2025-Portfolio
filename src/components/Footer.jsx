import React from 'react'

export default function Footer(){
  return (
    <footer className="mt-12 border-t border-brown-200 dark:border-text-brown pt-8 pb-12 bg-brown-100 dark:bg-dark-bg">
      <div className="max-w-6xl mx-auto px-6 text-center text-sm text-text-gray dark:text-text-cream">
        <div>© {new Date().getFullYear()} Hajime • Terms & Support</div>
        <div className="mt-1">
          <a className="underline hover:text-accent transition-colors" href="https://www.canva.com/" target="_blank" rel="noreferrer">Designed with Canva</a>
        </div>
      </div>
    </footer>
  )
}
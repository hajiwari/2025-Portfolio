# Hajime Portfolio

Modern portfolio built with React, Vite, and Tailwind CSS. Includes dark mode, an EmailJS-powered contact form, and Vercel deployment.

## Features

- React 18 + Vite 5 + Tailwind CSS
- Dark mode toggle (persisted in localStorage)
- Contact form via EmailJS
- Ready for Vercel deploy (with `vercel.json`)
- SEO assets: robots.txt, sitemap.xml, web manifest

## Requirements

- Node.js 18+ and npm

## Local development

```cmd
npm install
npm run dev
```

## Build and preview

```cmd
npm run build
npm run preview
```

## Environment variables (EmailJS)

Create a `.env.local` (or `.env`) in the project root:

```ini
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

These are required for the contact form in `src/components/Contact.jsx`.

## Deploying to Vercel

1. Connect the repository in Vercel.
2. Build Command: `npm run build`  •  Output Directory: `dist`.
3. Add the three `VITE_EMAILJS_*` env vars in Project Settings.
4. Deploy.

## Notes

- SEO/meta tags are defined in `index.html`.
- `public/` contains `robots.txt`, `sitemap.xml`, and `site.webmanifest`.
- Available scripts: `dev`, `build`, `preview`, `lint`.

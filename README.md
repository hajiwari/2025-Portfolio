# Hajime Portfolio

React + Vite + Tailwind portfolio with dark mode, EmailJS contact form, and Vercel deploy config.

## Run locally

```cmd
npm install
npm run dev
```

## Production build

```cmd
npm run build
npm run preview
```

## Dark mode

- Toggle via the header button; preference is saved in localStorage.

## EmailJS (contact form)

1. Create an EmailJS account and a service + template.
2. Add a .env file in the project root with:

```ini
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## Deploy to Vercel

1. Push to a Git repo (GitHub).
2. Import in Vercel, set Build Command: `npm run build`, Output Directory: `dist`.
3. Add the three VITE_EMAILJS_* env vars in Project Settings.
4. Deploy.

## SEO

- index.html includes meta title/description and social preview tags.
- robots.txt, sitemap.xml, and site.webmanifest are in /public.

import React from 'react'

// A single page-wide SVG path with a glowing orb that advances with scroll.
// Path starts at About (center), continues to Skills (center), then Projects
// (between caption and cards), and ends at Contact (left side). Direction
// changes are horizontal (orthogonal path using vertical then horizontal legs).
export default function ScrollingPath(){
  const svgRef = React.useRef(null)
  const pathRef = React.useRef(null)
  const [dims, setDims] = React.useState({ width: 0, height: 0 })
  const [points, setPoints] = React.useState(null) // {about, skills, projects, contact}
  const [len, setLen] = React.useState(0)
  const [progress, setProgress] = React.useState(0)
  const [visible, setVisible] = React.useState(false)

  // Measure anchors and document size
  const measure = React.useCallback(() => {
    const docHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.documentElement.clientHeight
    )
    const width = document.documentElement.clientWidth

    // Helpers
    const absRect = (el) => {
      if (!el) return null
      const r = el.getBoundingClientRect()
      const x = r.left + window.scrollX
      const y = r.top + window.scrollY
      return { x, y, width: r.width, height: r.height }
    }

  const aboutSection = document.querySelector('#page-1')
  const aboutBox = absRect(aboutSection)
    const skillsBox = absRect(document.querySelector('#skills .max-w-5xl'))
  // Top of projects section for the vertical turn, and divider for horizontal X
  const projSection = document.querySelector('#page-2')
  const projBox = absRect(projSection)
  const projDivider = document.querySelector('.projects-divider')
  const projDivBox = absRect(projDivider)
    const contactBox = absRect(document.querySelector('#page-3 .max-w-4xl'))

  if (!aboutBox || !skillsBox || !projBox || !contactBox) {
      setDims({ width, height: docHeight })
      setPoints(null)
      return
    }

    const about = {
      // Start at the top middle of the About section
      x: aboutBox.x + aboutBox.width / 2,
      y: aboutBox.y + 0,
    }
    const skills = {
      x: skillsBox.x + skillsBox.width / 2,
      y: skillsBox.y + skillsBox.height / 2,
    }
    const projects = {
      // Y at the top of the Project section; X from divider center (fallback to container mid)
      x: projDivBox
        ? (projDivBox.x + (projDivBox.width || 1) / 2)
        : (projBox.x + projBox.width / 2),
      y: projBox.y, // top of the projects section
    }
    const contact = {
      // Left-hand side of contact section
      x: contactBox.x + 24,
      y: contactBox.y + contactBox.height / 2,
    }

    setDims({ width, height: docHeight })
    setPoints({ about, skills, projects, contact })
  }, [])

  React.useEffect(() => {
    measure()
    const ro = new ResizeObserver(() => measure())
    ro.observe(document.documentElement)
    window.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
    }
  }, [measure])

  // Build an orthogonal path (V then H at each section)
  const d = React.useMemo(() => {
    if (!points) return ''
    const { about, skills, projects, contact } = points
    // M at about, then V to skills.y, H to skills.x, V to projects.y, H to projects.x, V to contact.y, H to contact.x
    return [
      `M ${about.x},${about.y}`,
      `V ${skills.y}`,
      `H ${skills.x}`,
      `V ${projects.y}`,
      `H ${projects.x}`,
      `V ${contact.y}`,
      `H ${contact.x}`,
    ].join(' ')
  }, [points])

  // Update length when path changes (ensure measurement path is in DOM)
  React.useEffect(() => {
    if (!d) { setLen(0); return }
    // Delay to next frame to ensure DOM update
    const id = requestAnimationFrame(() => {
      if (pathRef.current) {
        try {
          const l = pathRef.current.getTotalLength()
          setLen(l)
        } catch {
          setLen(0)
        }
      }
    })
    return () => cancelAnimationFrame(id)
  }, [d])

  // Track scroll progress relative to About center -> Contact center
  React.useEffect(() => {
    const compute = () => {
  if (!points || !len) return
      const middle = window.scrollY + window.innerHeight / 2
  const start = points.about.y
      const end = points.contact.y
      const t = Math.min(1, Math.max(0, (middle - start) / Math.max(1, end - start)))
      setProgress(t)
  // become visible slightly before the very top of About enters center
  setVisible(middle >= start - 60)
    }
    compute()
    window.addEventListener('scroll', compute, { passive: true })
    window.addEventListener('resize', compute)
    return () => {
      window.removeEventListener('scroll', compute)
      window.removeEventListener('resize', compute)
    }
  }, [points, len])

  // Recompute progress once when length becomes available
  React.useEffect(() => {
    if (!len) return
    const middle = window.scrollY + window.innerHeight / 2
    if (!points) return
  const t = Math.min(1, Math.max(0, (middle - points.about.y) / Math.max(1, points.contact.y - points.about.y)))
    setProgress(t)
  }, [len, points])

  // Compute orb position on the path
  const orb = React.useMemo(() => {
    if (!pathRef.current || !len) return null
    const p = pathRef.current.getPointAtLength(len * progress)
    return { x: p.x, y: p.y }
  }, [progress, len])

  if (!points || !d) return null

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-0 left-0 z-30"
      style={{ width: '100%', height: dims.height }}
    >
  <svg ref={svgRef} width="100%" height={dims.height} viewBox={`0 0 ${dims.width} ${dims.height}`}>
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="pathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ba8e64" />
            <stop offset="100%" stopColor="#e0c3a6" />
          </linearGradient>
        </defs>

        {/* Hidden measurement path (always in DOM to compute length) */}
        <path ref={pathRef} d={d} stroke="transparent" strokeWidth="0" fill="none" />

        {/* Visible progress line only (no gray base path) */}
        {visible && (
          <path
            d={d}
            stroke="url(#pathGrad)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            style={{
              strokeDasharray: len ? `${len * progress} ${len}` : undefined,
              strokeDashoffset: 0,
            }}
          />
        )}

        {/* Glowing orb at the end of progress */}
        {visible && orb && (
          <g filter="url(#glow)">
            <circle cx={orb.x} cy={orb.y} r="8" fill="#ffe8cc" opacity="0.9" />
            <circle cx={orb.x} cy={orb.y} r="16" fill="#ba8e64" opacity="0.35" />
            <circle cx={orb.x} cy={orb.y} r="28" fill="#ba8e64" opacity="0.12" />
          </g>
        )}
      </svg>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useExperience } from '../experience.js'
import { CONFIG } from '../config.js'
import { party } from '../lib/confetti.js'

function sleepsUntil(iso) {
  const diff = new Date(iso).getTime() - Date.now()
  return Math.max(0, Math.ceil(diff / 86400000))
}

function Pin({ x, y, color, drop, label }) {
  return (
    <motion.g
      initial={drop ? { opacity: 0, y: -50 } : { opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={drop ? { delay: 2.2, type: 'spring', stiffness: 260, damping: 12 } : {}}
    >
      <g transform={`translate(${x} ${y})`}>
        <path d="M0 0 C-10 -16 -8 -30 0 -30 C8 -30 10 -16 0 0 Z" fill={color} />
        <circle cx="0" cy="-21" r="5" fill="#fff" />
        <ellipse cx="0" cy="2" rx="7" ry="2.5" fill="rgba(0,0,0,0.12)" />
        <text x="0" y="18" textAnchor="middle" className="fred" fontSize="13" fill="#4a2f5e" fontWeight="600">
          {label}
        </text>
      </g>
    </motion.g>
  )
}

export default function MapReveal() {
  const { next } = useExperience()
  const [landed, setLanded] = useState(false)
  const [sleeps] = useState(() => sleepsUntil(CONFIG.tripStartISO))

  useEffect(() => {
    const t = setTimeout(() => { setLanded(true); party() }, 2400)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="w-full max-w-[560px] mx-auto text-center flex flex-col items-center gap-4">
      <motion.p className="fred text-[19px]" style={{ color: '#1b6ca8' }} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        {landed ? 'We’re going to…' : 'Plotting the course…'}
      </motion.p>

      <div className="card-paper w-full p-3">
        <svg viewBox="0 0 360 200" className="w-full" aria-hidden="true" style={{ borderRadius: 18 }}>
          <rect x="0" y="0" width="360" height="200" rx="14" fill="#DCEFFB" />
          <path d="M0 40 Q70 10 140 50 T300 40 L360 70 L360 0 L0 0 Z" fill="#CFEAC2" />
          <path d="M0 160 Q90 130 180 165 T360 150 L360 200 L0 200 Z" fill="#CFEAC2" />
          <path d="M250 120 q40 -10 70 10 q20 30 -10 50 q-50 10 -70 -20 z" fill="#D8EFC8" />

          <motion.path
            id="route2"
            d="M300 60 Q180 20 90 140"
            fill="none"
            stroke="#ff5d8f"
            strokeWidth="2.5"
            strokeDasharray="7 7"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.2, ease: 'linear' }}
          />

          {/* plane flies in sync with the line drawing (same 2.2s, linear), then stops at the pin */}
          <g>
            <path d="M0 -7 L17 0 L0 7 L5 0 Z" fill="#4a2f5e" />
            <animateMotion dur="2.2s" repeatCount="1" fill="freeze" calcMode="linear" rotate="auto">
              <mpath href="#route2" />
            </animateMotion>
          </g>

          <Pin x={300} y={60} color="#8a5cf6" label="Home" />
          <Pin x={90} y={140} color="#ff5d8f" drop label={CONFIG.destination} />
        </svg>
      </div>

      {landed && (
        <motion.div className="flex flex-col items-center gap-3" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 180, damping: 15 }}>
          <h1 className="display" style={{ fontSize: 'clamp(40px, 12vw, 76px)', color: 'var(--ink)' }}>
            {CONFIG.destination}!
          </h1>
          <motion.div
            className="rounded-full px-5 py-2 fred text-[15px]"
            style={{ background: 'rgba(255,255,255,0.7)', color: '#1b6ca8' }}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            🌞 Croatia · {sleeps} sleeps to go!
          </motion.div>
          <button className="btn btn-sun" onClick={next}>See the ticket →</button>
        </motion.div>
      )}
    </div>
  )
}

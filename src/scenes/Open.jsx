import { motion } from 'framer-motion'
import { useExperience } from '../experience.js'
import { CONFIG } from '../config.js'
import { popper } from '../lib/confetti.js'

function Gift() {
  return (
    <svg width="150" height="150" viewBox="0 0 120 120" aria-hidden="true">
      {/* box */}
      <rect x="20" y="50" width="80" height="58" rx="10" fill="#FF5D8F" />
      <rect x="20" y="50" width="80" height="16" rx="6" fill="#ff7fa6" />
      {/* ribbon */}
      <rect x="52" y="50" width="16" height="58" fill="#FFD23F" />
      {/* lid */}
      <rect x="14" y="38" width="92" height="20" rx="8" fill="#8a5cf6" />
      <rect x="52" y="38" width="16" height="20" fill="#FFD23F" />
      {/* bow */}
      <circle cx="60" cy="34" r="7" fill="#FFD23F" />
      <path d="M60 34 C46 18 30 22 38 36 C42 42 54 40 60 34Z" fill="#FFE06B" />
      <path d="M60 34 C74 18 90 22 82 36 C78 42 66 40 60 34Z" fill="#FFE06B" />
    </svg>
  )
}

export default function Open() {
  const { next } = useExperience()
  const go = () => { popper({ x: 0.5, y: 0.45 }); next() }

  return (
    <div className="w-full max-w-[560px] mx-auto text-center flex flex-col items-center gap-5">
      <motion.p className="overline" style={{ color: '#d63e6e' }} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        Psst… this one’s for
      </motion.p>

      <motion.h1
        className="display"
        style={{ fontSize: 'clamp(64px, 19vw, 130px)', color: 'var(--ink)' }}
        initial={{ scale: 0.4, opacity: 0, rotate: -8 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 12, delay: 0.2 }}
      >
        {CONFIG.name}!
      </motion.h1>

      <motion.button
        onClick={go}
        aria-label="Open the gift"
        className="anim-bobble bg-transparent border-0 p-0 cursor-pointer"
        whileTap={{ scale: 0.85, rotate: -6 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 11, delay: 0.45 }}
      >
        <Gift />
      </motion.button>

      <motion.p className="text-[17px] max-w-[24em] leading-relaxed" style={{ color: 'var(--ink)', opacity: 0.85 }} initial={{ opacity: 0 }} animate={{ opacity: 0.85 }} transition={{ delay: 0.7 }}>
        I made you a little something. It’s silly, it’s a tiny bit extra, and there’s a surprise hiding at the end. 🎈
      </motion.p>

      <motion.button className="btn" onClick={go} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, type: 'spring', stiffness: 200, damping: 14 }}>
        Open it!
      </motion.button>
    </div>
  )
}

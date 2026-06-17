import { useState } from 'react'
import { motion } from 'framer-motion'
import { useExperience } from '../experience.js'
import { CONFIG } from '../config.js'
import { popper } from '../lib/confetti.js'

const fade = {
  hidden: { opacity: 0, y: 14 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.2 + i * 0.18, ease: [0.22, 1, 0.36, 1] } }),
}

function Gift() {
  return (
    <svg width="150" height="150" viewBox="0 0 120 120" aria-hidden="true">
      <rect x="20" y="50" width="80" height="58" rx="10" fill="#FF5D8F" />
      <rect x="20" y="50" width="80" height="16" rx="6" fill="#ff7fa6" />
      <rect x="52" y="50" width="16" height="58" fill="#FFD23F" />
      <rect x="14" y="38" width="92" height="20" rx="8" fill="#8a5cf6" />
      <rect x="52" y="38" width="16" height="20" fill="#FFD23F" />
      <circle cx="60" cy="34" r="7" fill="#FFD23F" />
      <path d="M60 34 C46 18 30 22 38 36 C42 42 54 40 60 34Z" fill="#FFE06B" />
      <path d="M60 34 C74 18 90 22 82 36 C78 42 66 40 60 34Z" fill="#FFE06B" />
    </svg>
  )
}

export default function Open() {
  const { next } = useExperience()
  const [revealed, setRevealed] = useState(false)

  const open = () => {
    if (!revealed) {
      setRevealed(true)
      popper({ x: 0.5, y: 0.4 })
    } else {
      next()
    }
  }

  return (
    <div className="w-full max-w-[560px] mx-auto text-center flex flex-col items-center gap-5">
      <motion.p variants={fade} initial="hidden" animate="show" custom={0} className="overline" style={{ color: '#d63e6e' }}>
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

      {/* tap the gift → it opens into… him 👑 */}
      <motion.button
        onClick={open}
        aria-label={revealed ? 'Continue' : 'Open the gift'}
        className="relative bg-transparent border-0 p-0 cursor-pointer grid place-items-center"
        style={{ height: 250 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 11, delay: 0.45 }}
        whileTap={{ scale: 0.94 }}
      >
        {!revealed ? (
          <div className="anim-bobble">
            <Gift />
          </div>
        ) : (
          <motion.img
            src={import.meta.env.BASE_URL + 'alex.png'}
            alt={CONFIG.name}
            draggable={false}
            style={{ height: 250, filter: 'drop-shadow(0 8px 12px rgba(0,0,0,0.18))' }}
            initial={{ scale: 0, rotate: -14, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          />
        )}
      </motion.button>

      <motion.p
        key={revealed ? 'r' : 'i'}
        className="text-[17px] max-w-[24em] leading-relaxed"
        style={{ color: 'var(--ink)', opacity: 0.85 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85 }}
        transition={{ delay: revealed ? 0.2 : 0.7 }}
      >
        {revealed
          ? 'There he is. 👑 Birthday royalty. Okay — let’s actually begin.'
          : 'I made you a little something. It’s silly, it’s a tiny bit extra, and there’s a surprise hiding at the end. 🎈'}
      </motion.p>

      {!revealed ? (
        <motion.button className="btn" onClick={open} variants={fade} initial="hidden" animate="show" custom={4}>
          Open it!
        </motion.button>
      ) : (
        <motion.button className="btn" onClick={next} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          Let’s go! →
        </motion.button>
      )}
    </div>
  )
}

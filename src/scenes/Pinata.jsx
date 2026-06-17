import { useState } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { useExperience } from '../experience.js'
import { party, popper } from '../lib/confetti.js'

const MAX = 5
const SPILL = ['❤️', '⭐', '🍬', '🎈', '💛', '🎊', '🍭', '✨']

export default function Pinata() {
  const { next } = useExperience()
  const [hits, setHits] = useState(0)
  const [burst, setBurst] = useState(false)
  const controls = useAnimationControls()

  const whack = () => {
    if (burst) return
    controls.start({ rotate: [0, -20, 15, -9, 5, 0], transition: { duration: 0.5 } })
    popper({ x: 0.5, y: 0.4 })
    setHits((h) => {
      const n = h + 1
      if (n >= MAX) {
        setBurst(true)
        party()
      }
      return n
    })
  }

  return (
    <div className="w-full max-w-[520px] mx-auto text-center flex flex-col items-center gap-6">
      {!burst ? (
        <>
          <motion.h2 className="display" style={{ fontSize: 'clamp(26px, 7vw, 38px)', color: 'var(--ink)' }} initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 13 }}>
            Whack the piñata! 🪅
          </motion.h2>

          {/* string */}
          <div style={{ width: 3, height: 40, background: 'rgba(74,47,94,0.35)', borderRadius: 2 }} />

          <motion.button
            onClick={whack}
            animate={controls}
            whileTap={{ scale: 0.9 }}
            className="bg-transparent border-0 p-0 cursor-pointer leading-none"
            style={{ fontSize: 'clamp(90px, 28vw, 150px)', transformOrigin: 'top center', marginTop: -10 }}
            aria-label="Whack the piñata"
          >
            🪅
          </motion.button>

          {/* damage bar */}
          <div style={{ width: 200, height: 10, borderRadius: 999, background: 'rgba(74,47,94,0.12)', overflow: 'hidden' }}>
            <motion.div animate={{ width: `${(hits / MAX) * 100}%` }} style={{ height: '100%', background: '#ff5d8f', borderRadius: 999 }} />
          </div>
          <p className="fred text-[15px]" style={{ color: 'var(--ink)', opacity: 0.6 }}>
            {hits === 0 ? 'tap it. harder. 😤' : hits < MAX - 1 ? 'keep going!' : 'one more!'}
          </p>
        </>
      ) : (
        <motion.div className="flex flex-col items-center gap-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {/* spilling goodies */}
          <div className="relative" style={{ width: 1, height: 80 }}>
            {SPILL.map((e, i) => {
              const angle = (i / SPILL.length) * Math.PI * 2
              return (
                <motion.span
                  key={i}
                  className="absolute text-[30px]"
                  style={{ left: 0, top: 0 }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0.4 }}
                  animate={{ x: Math.cos(angle) * 120, y: Math.sin(angle) * 80 + 30, opacity: [1, 1, 0], scale: 1, rotate: i * 60 }}
                  transition={{ duration: 1.1, ease: 'easeOut' }}
                >
                  {e}
                </motion.span>
              )
            })}
          </div>
          <motion.h2 className="display" style={{ fontSize: 'clamp(30px, 8vw, 46px)', color: '#d63e6e' }} initial={{ scale: 0, rotate: -10 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 200, damping: 11 }}>
            💥 BOOM!
          </motion.h2>
          <p className="fred text-[18px] max-w-[20em]" style={{ color: 'var(--ink)' }}>
            Out tumbles your next clue. Nice arm. 💪
          </p>
          <motion.button className="btn btn-mint" onClick={next} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            grab it →
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}

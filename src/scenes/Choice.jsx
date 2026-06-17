import { useState } from 'react'
import { motion } from 'framer-motion'
import { useExperience } from '../experience.js'
import { DESTINATIONS } from '../config.js'
import { popper } from '../lib/confetti.js'
import PostcardArt from '../components/art/Postcards.jsx'

export default function Choice() {
  const { next } = useExperience()
  const [wrong, setWrong] = useState([])
  const [won, setWon] = useState(false)
  const [message, setMessage] = useState('')
  const bothTried = wrong.length >= 2

  const pick = (d) => {
    if (won) return
    if (d.correct) {
      setWon(true)
      setMessage(d.win)
      popper({ x: 0.5, y: 0.5 })
      setTimeout(next, 3000)
    } else {
      if (!wrong.includes(d.id)) setWrong((w) => [...w, d.id])
      setMessage(d.bounce)
    }
  }

  return (
    <div className="w-full max-w-[820px] mx-auto text-center flex flex-col items-center gap-4">
      <motion.h2 className="display" style={{ fontSize: 'clamp(26px, 7vw, 42px)', color: 'var(--ink)' }} initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 13 }}>
        Pick where we’re off to!
      </motion.h2>
      <p className="fred text-[15px]" style={{ color: 'var(--ink)', opacity: 0.7 }}>
        Choose wisely — it’s legally binding. <span style={{ opacity: 0.7 }}>(It’s not.)</span>
      </p>

      <div className="flex flex-col md:flex-row gap-3 md:gap-5 w-full justify-center items-stretch">
        {DESTINATIONS.map((d, idx) => {
          const isWrong = wrong.includes(d.id)
          const isRight = won && d.correct
          const pulse = bothTried && d.correct && !won
          return (
            <motion.button
              key={d.id}
              onClick={() => pick(d)}
              disabled={isWrong}
              className="relative w-full md:flex-1 shrink-0 bg-white p-2.5 text-left flex flex-row md:flex-col items-center md:items-stretch gap-3 md:gap-0"
              style={{ borderRadius: 18, boxShadow: '0 10px 24px rgba(74,47,94,0.14)', transformOrigin: 'center', rotate: `${idx % 2 ? 1 : -1}deg` }}
              initial={{ opacity: 0, y: 24, scale: 0.92 }}
              animate={
                isWrong
                  ? { opacity: 0.5, scale: 0.95, y: 0, rotate: 0, filter: 'grayscale(1)', x: [0, -9, 8, -5, 0] }
                  : isRight
                  ? { opacity: 1, y: -4, scale: 1.05, rotate: 0, filter: 'grayscale(0)' }
                  : pulse
                  ? { opacity: 1, y: [0, -7, 0], scale: 1 }
                  : { opacity: 1, y: 0, scale: 1 }
              }
              transition={pulse ? { duration: 1, repeat: Infinity } : { type: 'spring', stiffness: 200, damping: 16, delay: idx * 0.08 }}
              whileHover={!isWrong && !won ? { y: -6, rotate: 0, scale: 1.02 } : {}}
              whileTap={!isWrong && !won ? { scale: 0.98 } : {}}
            >
              {/* illustration (thumbnail on mobile, full postcard on desktop) */}
              <div className="overflow-hidden shrink-0 w-[120px] md:w-full" style={{ borderRadius: 14, aspectRatio: '10 / 7' }}>
                <PostcardArt id={d.id} />
              </div>

              {/* little postage stamp (desktop only) */}
              <div
                className="absolute hidden md:flex items-center justify-center"
                style={{ top: 14, right: 14, width: 30, height: 34, background: 'rgba(255,255,255,0.92)', borderRadius: 4, border: '1.5px dashed #d98aa6' }}
              >
                <span style={{ fontSize: 14 }}>{isRight ? '🎉' : '♡'}</span>
              </div>

              {/* label */}
              <div className="flex-1 min-w-0 md:px-2 md:pt-2.5">
                <div className="overline" style={{ fontSize: 11, color: '#c2497a', letterSpacing: '0.1em' }}>{d.place}</div>
                <div className="display" style={{ fontSize: 23, color: 'var(--ink)', lineHeight: 1.1 }}>{d.name}</div>
                <div className="text-[13px] mt-0.5" style={{ color: 'var(--ink)', opacity: 0.65 }}>{d.tag}</div>
              </div>
            </motion.button>
          )
        })}
      </div>

      <motion.p key={message} initial={{ opacity: 0, y: 8, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="fred min-h-[2.6em] max-w-[30em]" style={{ fontSize: 16, color: 'var(--ink)' }}>
        {message}
      </motion.p>

      {bothTried && !won && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[14px]" style={{ color: 'var(--ink)', opacity: 0.6 }}>
          I’ve quietly hidden the other two. Funny how that works. 👀
        </motion.p>
      )}
    </div>
  )
}

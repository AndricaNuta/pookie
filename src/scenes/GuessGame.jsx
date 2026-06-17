import { useState } from 'react'
import { motion } from 'framer-motion'
import { useExperience } from '../experience.js'
import { popper } from '../lib/confetti.js'

const NUDGES = ['nope 😄', 'ha — no.', 'warmer? …no. colder.', 'bless you, but no.']

export default function GuessGame() {
  const { next } = useExperience()
  const [guess, setGuess] = useState('')
  const [left, setLeft] = useState(3)
  const [msg, setMsg] = useState('')
  const [revealed, setRevealed] = useState(false)
  const [won, setWon] = useState(false)

  const reveal = (didWin) => {
    setWon(didWin)
    setRevealed(true)
    popper({ x: 0.5, y: 0.45 })
  }

  const submit = () => {
    const g = guess.trim().toLowerCase()
    if (!g || revealed) return
    setGuess('')

    if (g.includes('nothing')) {
      reveal(true)
      return
    }
    // cheeky easter egg
    if (g.includes('sex') || g.includes('sext')) {
      setMsg('😏 …I mean. Also yes. But that’s not the word, you menace.')
    } else {
      setMsg(NUDGES[(3 - left) % NUDGES.length])
    }
    const remaining = left - 1
    setLeft(remaining)
    if (remaining <= 0) setTimeout(() => reveal(false), 500)
  }

  return (
    <div className="w-full max-w-[520px] mx-auto text-center flex flex-col items-center gap-6">
      {!revealed ? (
        <>
          <motion.h2 className="display" style={{ fontSize: 'clamp(24px, 6.5vw, 34px)', color: 'var(--ink)' }} initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 13 }}>
            Guess the surprise…
          </motion.h2>

          <div className="card-paper px-6 py-7 w-full max-w-[400px]">
            <p className="fred text-[20px] mb-4" style={{ color: 'var(--ink)' }}>
              It involves doing a <b style={{ color: '#d63e6e' }}>whole lot of</b> ______
            </p>
            <input
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
              placeholder="your guess…"
              autoComplete="off"
              className="fred text-center text-[18px] w-full outline-none"
              style={{ padding: '10px 14px', borderRadius: 14, background: '#f4eef8', color: 'var(--ink)', border: 'none' }}
            />
            <button className="btn btn-grape mt-4" onClick={submit} style={{ fontSize: 16, padding: '12px 26px' }}>
              Guess!
            </button>
            <p className="fred text-[14px] mt-3" style={{ color: 'var(--ink)', opacity: 0.55 }}>
              {left} {left === 1 ? 'guess' : 'guesses'} left
            </p>
          </div>

          {msg && (
            <motion.p key={msg} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="fred text-[17px]" style={{ color: '#d63e6e' }}>
              {msg}
            </motion.p>
          )}
        </>
      ) : (
        <motion.div className="flex flex-col items-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p className="fred text-[18px]" style={{ color: 'var(--ink)' }}>
            {won ? 'YES. Exactly. A whole lot of…' : 'Out of guesses! The answer was…'}
          </p>
          <motion.h1
            className="display"
            style={{ fontSize: 'clamp(54px, 17vw, 120px)', color: '#d63e6e' }}
            initial={{ scale: 0, rotate: -12, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          >
            NOTHING.
          </motion.h1>
          <motion.button className="btn btn-mint" onClick={next} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            …go on then →
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}

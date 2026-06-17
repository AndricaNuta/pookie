import { useRef, useState } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { useExperience } from '../experience.js'
import { CONFIG } from '../config.js'
import { popper } from '../lib/confetti.js'

export default function Lock() {
  const { next } = useExperience()
  const [digits, setDigits] = useState(['', '', '', ''])
  const [solved, setSolved] = useState(false)
  const [hint, setHint] = useState(false)
  const [nope, setNope] = useState(false)
  const refs = [useRef(null), useRef(null), useRef(null), useRef(null)]
  const shake = useAnimationControls()

  const check = (arr) => {
    if (arr.join('') !== CONFIG.lockCode) {
      setNope(true)
      shake.start({ x: [0, -12, 10, -7, 0], transition: { duration: 0.4 } })
      setTimeout(() => { setDigits(['', '', '', '']); refs[0].current?.focus() }, 420)
      return
    }
    setSolved(true)
    popper({ x: 0.5, y: 0.4 })
    setTimeout(next, 1300)
  }

  const onChange = (i, v) => {
    setNope(false)
    const d = v.replace(/\D/g, '').slice(-1)
    const arr = [...digits]
    arr[i] = d
    setDigits(arr)
    if (d && i < 3) refs[i + 1].current?.focus()
    if (arr.every((x) => x !== '')) check(arr)
  }
  const onKey = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) refs[i - 1].current?.focus()
  }

  return (
    <div className="w-full max-w-[520px] mx-auto text-center flex flex-col items-center gap-6">
      <motion.div
        className="text-[56px]"
        animate={solved ? { rotate: 0, scale: [1, 1.4, 1] } : { rotate: [-6, 6, -6] }}
        transition={solved ? { duration: 0.5 } : { repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
      >
        {solved ? '🔓' : '🔒'}
      </motion.div>

      <p className="fred text-[19px] max-w-[22em]" style={{ color: 'var(--ink)', fontWeight: 500 }}>
        First, prove it’s really you. The code is <b>a date that matters to us</b>.
      </p>

      <motion.div className="flex gap-3" animate={shake}>
        {digits.map((d, i) => (
          <input
            key={i}
            ref={refs[i]}
            value={d}
            disabled={solved}
            inputMode="numeric"
            maxLength={1}
            onChange={(e) => onChange(i, e.target.value)}
            onKeyDown={(e) => onKey(i, e)}
            className="text-center fred outline-none"
            style={{
              width: 58,
              height: 70,
              fontSize: 34,
              fontWeight: 600,
              borderRadius: 18,
              color: solved ? '#fff' : 'var(--ink)',
              background: solved ? '#2bc4a8' : '#fffdf8',
              boxShadow: solved ? '0 6px 0 #1a9d86' : '0 6px 0 rgba(74,47,94,0.15)',
              border: 'none',
            }}
          />
        ))}
      </motion.div>

      {nope && !solved && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fred text-[16px]" style={{ color: '#d63e6e' }}>
          nope 😏 think harder…
        </motion.p>
      )}

      {!solved && (
        <>
          <button className="link" onClick={() => setHint(true)}>I genuinely forgot 🙈</button>
          {hint && (
            <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="text-[15px] max-w-[24em]" style={{ color: '#8a5cf6' }}>
              {CONFIG.lockHint}
            </motion.p>
          )}
        </>
      )}
    </div>
  )
}

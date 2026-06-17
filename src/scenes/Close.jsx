import { useState } from 'react'
import { motion } from 'framer-motion'
import { useExperience } from '../experience.js'
import { CONFIG } from '../config.js'
import { party } from '../lib/confetti.js'

export default function Close() {
  const { go } = useExperience()
  const [dodges, setDodges] = useState(0)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [caught, setCaught] = useState(false)

  const dodge = () => {
    if (caught) return
    setDodges((d) => d + 1)
    setPos({ x: (Math.random() * 2 - 1) * 110, y: (Math.random() * 2 - 1) * 70 })
  }

  const tryCatch = () => {
    if (caught) return
    if (dodges < 2) {
      dodge()
    } else {
      setCaught(true)
      setPos({ x: 0, y: 0 })
      party()
    }
  }

  return (
    <div className="w-full max-w-[460px] mx-auto flex flex-col items-center text-center gap-6">
      <motion.div className="text-[52px]" animate={{ scale: [1, 1.2, 1], rotate: [0, -8, 8, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}>
        🩷
      </motion.div>

      {!caught ? (
        <>
          <h2 className="display" style={{ fontSize: 'clamp(30px, 8vw, 46px)', color: 'var(--ink)' }}>
            That’s the surprise! 🥳
          </h2>
          <p className="fred text-[18px] max-w-[20em]" style={{ color: 'var(--ink)' }}>
            Now the fun bit… <b style={{ color: '#d63e6e' }}>come find me</b> so we can plan the whole thing.
          </p>

          <div className="relative w-full flex justify-center" style={{ height: 200 }}>
            <motion.button
              className="btn absolute"
              onMouseEnter={dodge}
              onClick={tryCatch}
              animate={{ x: pos.x, y: pos.y }}
              transition={{ type: 'spring', stiffness: 500, damping: 22 }}
              style={{ top: 70 }}
            >
              {dodges === 0 ? 'Come find me! 🩷' : dodges === 1 ? 'too slow! 😝' : 'okay okay, catch me →'}
            </motion.button>
          </div>
        </>
      ) : (
        <motion.div className="flex flex-col items-center gap-4" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 180, damping: 14 }}>
          <h2 className="display" style={{ fontSize: 'clamp(30px, 8vw, 46px)', color: 'var(--ink)' }}>
            Found me! 🩷
          </h2>
          <p className="fred text-[18px] max-w-[20em]" style={{ color: 'var(--ink)' }}>
            Now come find me for real — let’s go plan it together.
          </p>
          <p className="fred text-[24px]" style={{ color: '#d63e6e' }}>— {CONFIG.yourName}</p>
          <button className="link" onClick={() => go(0)}>↺ play it again</button>
        </motion.div>
      )}
    </div>
  )
}

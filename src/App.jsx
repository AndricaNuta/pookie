import { useCallback, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ExperienceContext, bgFor } from './experience.js'
import Decor from './components/Decor.jsx'

import Open from './scenes/Open.jsx'
import Lock from './scenes/Lock.jsx'
import Pinata from './scenes/Pinata.jsx'
import Captcha from './scenes/Captcha.jsx'
import DogRun from './scenes/DogRun.jsx'
import GuessGame from './scenes/GuessGame.jsx'
import Texts from './scenes/Texts.jsx'
import Choice from './scenes/Choice.jsx'
import MapReveal from './scenes/MapReveal.jsx'
import BoardingPass from './scenes/BoardingPass.jsx'
import Close from './scenes/Close.jsx'

const SCENES = [Open, Lock, Pinata, Captcha, DogRun, GuessGame, Texts, Choice, MapReveal, BoardingPass, Close]

export default function App() {
  // Dev-only: jump straight to a scene with ?s=N (stripped from production builds).
  const [current, setCurrent] = useState(() => {
    if (import.meta.env.DEV) {
      const s = Number(new URLSearchParams(window.location.search).get('s'))
      if (s > 0) return Math.min(SCENES.length - 1, s)
    }
    return 0
  })

  const next = useCallback(() => setCurrent((p) => Math.min(SCENES.length - 1, p + 1)), [])
  const go = useCallback((n) => setCurrent(Math.max(0, Math.min(SCENES.length - 1, n))), [])
  const ctx = useMemo(() => ({ current, total: SCENES.length, next, go }), [current, next, go])

  const Active = SCENES[current]

  return (
    <ExperienceContext.Provider value={ctx}>
      <div className="fixed inset-0 overflow-hidden">
        {/* gradient background — crossfades between scenes */}
        <AnimatePresence>
          <motion.div
            key={current}
            className="absolute inset-0"
            style={{ background: bgFor(current) }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />
        </AnimatePresence>

        <Decor />

        {/* chunky progress beads */}
        {current > 0 && (
          <div className="fixed top-0 left-0 right-0 z-50 flex justify-center" style={{ paddingTop: 'max(14px, env(safe-area-inset-top))' }}>
            <div className="flex gap-2 items-center rounded-full px-3 py-1.5" style={{ background: 'rgba(255,255,255,0.45)', backdropFilter: 'blur(4px)' }}>
              {SCENES.map((_, i) => (
                <span
                  key={i}
                  className="rounded-full transition-all duration-500"
                  style={{
                    width: i === current ? 18 : 8,
                    height: 8,
                    background: i <= current ? '#ff5d8f' : 'rgba(74,47,94,0.2)',
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* one scene at a time, springy entrance */}
        <AnimatePresence mode="wait">
          <motion.section
            key={current}
            className="absolute inset-0 z-10 flex items-center justify-center overflow-y-auto overflow-x-hidden no-scrollbar"
            style={{ padding: '74px 24px max(40px, env(safe-area-inset-bottom))' }}
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -16 }}
            transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <Active />
          </motion.section>
        </AnimatePresence>
      </div>
    </ExperienceContext.Provider>
  )
}

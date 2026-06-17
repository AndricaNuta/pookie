import { useEffect, useReducer, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useExperience } from '../experience.js'
import { CONFIG } from '../config.js'
import { party } from '../lib/confetti.js'

const TARGET = 6
const FOODS = ['🍖', '🦴', '🍕', '🧀', '🍗', '🥓', '🍔'] // ground — jump OVER
const FLYERS = ['🐦', '🦋', '🐝', '🥏'] // air — do NOT jump (Olly leaps up and grabs them)
const DOG_X = 54
const DOG = 56
const GROUND = 46 // height of the grass strip
const GRAV = 1700
const JUMP = 660

export default function DogRun() {
  const { next } = useExperience()
  const boxRef = useRef(null)
  const [w, setW] = useState(360)
  const H = 250
  const [status, setStatus] = useState('ready') // ready | play | dead | won
  const [score, setScore] = useState(0)
  const [, force] = useReducer((x) => x + 1, 0)

  const dog = useRef({ y: 0, vy: 0 })
  const obs = useRef([])
  const idc = useRef(0)
  const lastSpawn = useRef(0)
  const him = CONFIG.dogName || 'he'

  useEffect(() => {
    if (boxRef.current) setW(boxRef.current.clientWidth)
  }, [])

  const reset = () => {
    dog.current = { y: 0, vy: 0 }
    obs.current = []
    lastSpawn.current = 0
    setScore(0)
  }

  const start = () => {
    reset()
    setStatus('play')
  }

  const jump = () => {
    if (status === 'ready') return start()
    if (status === 'dead') return start()
    if (status === 'play' && dog.current.y <= 1) dog.current.vy = JUMP
  }

  // physics loop
  useEffect(() => {
    if (status !== 'play') return
    let raf = 0
    let last = performance.now()
    let dead = false
    let won = false
    let sc = score

    const step = (t) => {
      const dt = Math.min(0.045, (t - last) / 1000)
      last = t
      const speed = 270 + sc * 20

      // dog physics
      const d = dog.current
      d.vy -= GRAV * dt
      d.y += d.vy * dt
      if (d.y <= 0) { d.y = 0; d.vy = 0 }

      // spawn (first two are ground, to teach the jump; then mix in fliers)
      if (t - lastSpawn.current > 1050 - Math.min(440, sc * 60)) {
        lastSpawn.current = t
        const isAir = idc.current >= 2 && Math.random() < 0.34
        const e = isAir
          ? FLYERS[Math.floor(Math.random() * FLYERS.length)]
          : FOODS[Math.floor(Math.random() * FOODS.length)]
        obs.current.push({ id: idc.current++, x: w + 20, e, type: isAir ? 'air' : 'ground', scored: false })
      }

      // move + collide + score
      for (const o of obs.current) {
        o.x -= speed * dt
        if (!o.scored && o.x + 26 < DOG_X) {
          o.scored = true
          sc += 1
          setScore(sc)
          if (sc >= TARGET) won = true
        }
        const overlap = o.x < DOG_X + DOG * 0.5 && o.x + 30 > DOG_X - DOG * 0.4
        if (overlap) {
          // ground: must jump (be high). air: must stay down (not jumping).
          if (o.type === 'air' ? d.y > 36 : d.y < 26) dead = true
        }
      }
      obs.current = obs.current.filter((o) => o.x > -50)

      force()

      if (dead) { setStatus('dead'); return }
      if (won) { setStatus('won'); party(); return }
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [status]) // eslint-disable-line react-hooks/exhaustive-deps

  // keyboard
  useEffect(() => {
    const k = (e) => { if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); jump() } }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="w-full max-w-[440px] mx-auto flex flex-col items-center gap-4 text-center">
      <h2 className="display" style={{ fontSize: 'clamp(24px, 6.5vw, 34px)', color: 'var(--ink)' }}>Jump the snacks! 🦴</h2>
      <p className="fred text-[15px] max-w-[26em]" style={{ color: 'var(--ink)', opacity: 0.7 }}>
        {CONFIG.dogName ? `${CONFIG.dogName}'s` : 'He’s'} not allowed table scraps. {him === 'he' ? 'He' : him} does NOT care. Hop the food 🦴 — but don’t jump at the birds! 🐦
      </p>

      <div
        ref={boxRef}
        onPointerDown={jump}
        className="relative w-full overflow-hidden select-none cursor-pointer"
        style={{ height: H, borderRadius: 22, background: 'linear-gradient(#fff3df,#ffe8cf)', boxShadow: '0 12px 28px rgba(74,47,94,0.16)' }}
      >
        {/* score */}
        <div className="absolute top-2.5 right-3 fred text-[15px] z-10" style={{ color: '#4a2f5e' }}>
          {Math.min(score, TARGET)} / {TARGET}
        </div>

        {/* ground */}
        <div className="absolute left-0 right-0 bottom-0" style={{ height: GROUND, background: '#bfe39a', borderTop: '3px solid #a6d07f' }} />

        {/* dog ground shadow (shrinks as he jumps) */}
        <div
          className="absolute rounded-full"
          style={{
            left: DOG_X - 22,
            bottom: GROUND - 4,
            width: 44,
            height: 9,
            background: 'rgba(0,0,0,0.16)',
            filter: 'blur(2px)',
            transform: `scaleX(${1 - Math.min(0.55, dog.current.y / 240)})`,
            opacity: 1 - Math.min(0.6, dog.current.y / 200),
          }}
        />

        {/* dog (transparent cut-out sprite) */}
        <img
          src={import.meta.env.BASE_URL + 'tuti/dog-cut.png'}
          alt="dog"
          draggable={false}
          className="absolute object-contain"
          style={{
            height: 82,
            left: DOG_X - 26,
            bottom: GROUND - 6 + dog.current.y,
            filter: 'drop-shadow(0 5px 4px rgba(0,0,0,0.15))',
          }}
        />

        {/* food obstacles */}
        {obs.current.map((o) => (
          <div key={o.id} className="absolute text-[30px]" style={{ left: o.x, bottom: o.type === 'air' ? GROUND + 92 : GROUND - 10 }}>
            {o.e}
          </div>
        ))}

        {/* overlays */}
        {status === 'ready' && (
          <div className="absolute inset-0 grid place-items-center" style={{ background: 'rgba(255,255,255,0.35)' }}>
            <div className="fred text-[20px]" style={{ color: '#4a2f5e' }}>tap to start 🐾</div>
          </div>
        )}
        {status === 'dead' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 grid place-items-center px-6" style={{ background: 'rgba(255,255,255,0.78)' }}>
            <div>
              <div className="fred text-[22px] mb-1" style={{ color: '#d63e6e' }}>{CONFIG.dogName || 'He'} ate it AGAIN 🙄</div>
              <div className="fred text-[15px]" style={{ color: '#4a2f5e', opacity: 0.7 }}>tap to try again</div>
            </div>
          </motion.div>
        )}
        {status === 'won' && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="absolute inset-0 grid place-items-center" style={{ background: 'rgba(255,255,255,0.82)' }}>
            <div className="fred text-[26px]" style={{ color: '#2bc4a8' }}>GOOD BOY! 🎉</div>
          </motion.div>
        )}
      </div>

      {status === 'won' ? (
        <motion.button className="btn btn-mint" onClick={next} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          treat earned →
        </motion.button>
      ) : (
        <p className="fred text-[14px]" style={{ color: 'var(--ink)', opacity: 0.5 }}>get past {TARGET} to win</p>
      )}
    </div>
  )
}

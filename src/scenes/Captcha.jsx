import { useState } from 'react'
import { motion } from 'framer-motion'
import { useExperience } from '../experience.js'
import { CAPTCHA } from '../config.js'
import { popper } from '../lib/confetti.js'

// Build a shuffled 3x3 tile set: Tuti photos (correct) + decoys (wrong).
function buildTiles() {
  const tiles = [
    ...CAPTCHA.tuti.map((src, i) => ({ key: `t${i}`, isTuti: true, src })),
    ...CAPTCHA.decoys.map((d, i) => ({ key: `d${i}`, isTuti: false, src: d.src, emoji: d.emoji, isDog: !!(d.src && d.src.includes('dog')) })),
  ]
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[tiles[i], tiles[j]] = [tiles[j], tiles[i]]
  }
  return tiles
}

export default function Captcha() {
  const { next } = useExperience()
  const [tiles] = useState(buildTiles)
  const [sel, setSel] = useState({})
  const [verified, setVerified] = useState(false)
  const [msg, setMsg] = useState('')

  const toggle = (key) => {
    if (verified) return
    setMsg('')
    setSel((s) => ({ ...s, [key]: !s[key] }))
  }

  const verify = () => {
    const ok = tiles.every((t) => Boolean(sel[t.key]) === t.isTuti)
    const noneSelected = !Object.values(sel).some(Boolean)
    const dogSelected = tiles.some((t) => t.isDog && sel[t.key])
    if (ok) {
      setVerified(true)
      popper({ x: 0.5, y: 0.35 })
      setTimeout(next, 1500)
    } else if (dogSelected) {
      setMsg('Hmmm… I think there’s an intruder. 🕵️ That’s the dog in a cat costume — nice try.')
    } else {
      setMsg(noneSelected ? 'Bold strategy. Select the cat. 🐱' : 'Hmm. A robot would’ve nailed that. Try again 🤨')
    }
  }

  return (
    <div className="w-full max-w-[400px] mx-auto flex flex-col items-center gap-4 text-center">
      {/* captcha header bar */}
      <div className="w-full rounded-2xl overflow-hidden" style={{ boxShadow: '0 10px 24px rgba(74,47,94,0.16)' }}>
        <div className="flex items-center justify-between px-4 py-3 text-left" style={{ background: '#4a8cff' }}>
          <div className="text-white">
            <div className="fred text-[13px] opacity-90">select all squares with</div>
            <div className="fred text-[22px] font-semibold leading-none">{CAPTCHA.catName} 🐱</div>
          </div>
          <div className="text-[26px]">🤖</div>
        </div>

        {/* grid */}
        <div className="grid grid-cols-3 gap-1 bg-white p-1">
          {tiles.map((t) => {
            const on = !!sel[t.key]
            return (
              <button
                key={t.key}
                onClick={() => toggle(t.key)}
                className="relative aspect-square overflow-hidden"
                style={{ outline: on ? '4px solid #4a8cff' : 'none', outlineOffset: -4 }}
              >
                {t.src ? (
                  <img src={import.meta.env.BASE_URL + t.src} alt="" className="w-full h-full object-cover" draggable={false} />
                ) : (
                  <div className="w-full h-full grid place-items-center text-[40px]" style={{ background: '#f0e9f7' }}>
                    {t.emoji}
                  </div>
                )}
                {on && (
                  <div className="absolute top-1 left-1 w-6 h-6 rounded-full grid place-items-center text-white text-[14px]" style={{ background: '#4a8cff' }}>
                    ✓
                  </div>
                )}
                {on && t.isDog && (
                  <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none">
                    {/* cat ears */}
                    <path d="M16 34 L24 4 L42 28 Z" fill="#f7c8d6" stroke="#4a2f5e" strokeWidth="2.5" strokeLinejoin="round" />
                    <path d="M84 34 L76 4 L58 28 Z" fill="#f7c8d6" stroke="#4a2f5e" strokeWidth="2.5" strokeLinejoin="round" />
                    {/* whiskers */}
                    <g stroke="#fff" strokeWidth="2.4" strokeLinecap="round" style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.4))' }}>
                      <line x1="47" y1="60" x2="14" y2="52" />
                      <line x1="47" y1="65" x2="12" y2="65" />
                      <line x1="47" y1="70" x2="14" y2="78" />
                      <line x1="53" y1="60" x2="86" y2="52" />
                      <line x1="53" y1="65" x2="88" y2="65" />
                      <line x1="53" y1="70" x2="86" y2="78" />
                    </g>
                    {/* lil pink nose */}
                    <path d="M44 60 L56 60 L50 67 Z" fill="#e87a98" stroke="#4a2f5e" strokeWidth="1.6" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            )
          })}
        </div>

        {/* footer */}
        <div className="flex items-center justify-between px-3 py-2.5 bg-white border-t" style={{ borderColor: '#eee' }}>
          <span className="text-[20px]">♾️</span>
          {verified ? (
            <span className="fred text-[15px]" style={{ color: '#2bc4a8' }}>✓ Verified</span>
          ) : (
            <button onClick={verify} className="fred text-white text-[15px] px-5 py-2 rounded-lg" style={{ background: '#4a8cff' }}>
              Verify
            </button>
          )}
        </div>
      </div>

      <motion.p key={msg + String(verified)} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="fred text-[17px] min-h-[1.6em]" style={{ color: verified ? '#2bc4a8' : '#d63e6e' }}>
        {verified ? 'Verified ✅ (Obviously. You’d know that face anywhere.)' : msg}
      </motion.p>
    </div>
  )
}

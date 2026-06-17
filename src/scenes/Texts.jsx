import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useExperience } from '../experience.js'

const MSGS = [
  { from: 'him', text: 'i just want to lie in the sun and do absolutely nothing. that’s the whole dream.' },
  { from: 'you', text: 'i know 😌' },
  { from: 'you', text: 'and i’m always like “i’d love to, but i have to work” 🙄' },
  { from: 'him', text: 'every. single. time.' },
  { from: 'you', text: 'ok. so. i made an executive decision 😏' },
  { from: 'you', text: 'you’re getting exactly that — days of doing nothing in the sun ☀️' },
  { from: 'you', text: '(i’ll still sneak in laptop time from the lounger next to you. obviously. but i’ll be right there 💛)' },
]

function Dots() {
  return (
    <div className="flex gap-1 px-3 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="rounded-full"
          style={{ width: 7, height: 7, background: '#b9b0c4' }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  )
}

export default function Texts() {
  const { next } = useExperience()
  const [shown, setShown] = useState(0)
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)
  const done = shown >= MSGS.length

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [shown, typing])

  // Auto-reveal the first text so the thread isn't empty on arrival.
  useEffect(() => {
    const t = setTimeout(() => {
      setTyping(true)
      setTimeout(() => { setShown(1); setTyping(false) }, 600)
    }, 500)
    return () => clearTimeout(t)
  }, [])

  const advance = () => {
    if (typing || done) return
    setTyping(true)
    setTimeout(() => {
      setShown((s) => s + 1)
      setTyping(false)
    }, 600)
  }

  const nextFrom = !done ? MSGS[shown].from : null

  return (
    <div className="w-full max-w-[420px] mx-auto flex flex-col items-center gap-4">
      <p className="overline" style={{ color: '#d63e6e' }}>us 💬</p>

      <div
        onClick={advance}
        className="w-full card-paper px-3 py-4 cursor-pointer"
        style={{ minHeight: 260 }}
      >
        <div className="flex flex-col gap-2.5">
          {MSGS.slice(0, shown).map((m, i) => (
            <motion.div
              key={i}
              className={`flex ${m.from === 'you' ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 280, damping: 18 }}
            >
              <span
                className="text-[15px] leading-snug"
                style={{
                  maxWidth: '82%',
                  padding: '9px 14px',
                  borderRadius: 18,
                  background: m.from === 'you' ? '#ff5d8f' : '#efeaf2',
                  color: m.from === 'you' ? '#fff' : 'var(--ink)',
                  borderBottomRightRadius: m.from === 'you' ? 5 : 18,
                  borderBottomLeftRadius: m.from === 'you' ? 18 : 5,
                }}
              >
                {m.text}
              </span>
            </motion.div>
          ))}

          {typing && (
            <div className={`flex ${nextFrom === 'you' ? 'justify-end' : 'justify-start'}`}>
              <span style={{ background: nextFrom === 'you' ? '#ffd0de' : '#efeaf2', borderRadius: 18 }}>
                <Dots />
              </span>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {!done ? (
        <p className="fred text-[15px]" style={{ color: 'var(--ink)', opacity: 0.6 }}>tap to read on 👆</p>
      ) : (
        <motion.button className="btn btn-sun" onClick={next} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          ok WHERE?! →
        </motion.button>
      )}
    </div>
  )
}

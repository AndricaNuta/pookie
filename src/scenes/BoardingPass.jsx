import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useExperience } from '../experience.js'
import { CONFIG } from '../config.js'
import DubrovnikScene from '../components/art/DubrovnikScene.jsx'

function Field({ k, children }) {
  return (
    <div className="flex flex-col">
      <span className="overline" style={{ fontSize: 10, color: '#9a8', letterSpacing: '0.12em' }}>{k}</span>
      <span className="fred text-[15px]" style={{ color: 'var(--ink)' }}>{children}</span>
    </div>
  )
}

export default function BoardingPass() {
  const { next } = useExperience()
  const [scanning, setScanning] = useState(false)
  const [scanned, setScanned] = useState(false)

  const scan = () => {
    if (scanned || scanning) return
    setScanning(true)
    setTimeout(() => { setScanning(false); setScanned(true) }, 1000)
  }

  return (
    <div className="w-full max-w-[460px] mx-auto flex flex-col items-center gap-5 relative">
      {/* plane crossing the sky behind */}
      <div className="absolute inset-x-0 -z-[1] overflow-hidden pointer-events-none" style={{ top: 0, height: 60 }}>
        <motion.div className="text-[26px] absolute" style={{ top: 6 }} initial={{ x: '-15%' }} animate={{ x: '110vw' }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}>
          ✈️
        </motion.div>
      </div>

      <motion.div
        className="w-full overflow-hidden card-paper"
        style={{ borderRadius: 26 }}
        initial={{ y: 30, opacity: 0, rotate: -2 }}
        animate={{ y: 0, opacity: 1, rotate: scanned ? -1 : 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 16 }}
      >
        {/* skyline banner */}
        <div style={{ background: 'linear-gradient(180deg,#9ED8F5,#CFefff)' }}>
          <DubrovnikScene height={96} />
        </div>

        <div className="px-5 pt-4 pb-3 text-left">
          <div className="flex justify-between items-center mb-3">
            <span className="display text-[17px]" style={{ color: '#1b6ca8' }}>Boarding Pass</span>
            <span className="text-[16px]">🎟️</span>
          </div>

          {/* route */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-center">
              <div className="display text-[30px]" style={{ color: 'var(--ink)' }}>{CONFIG.fromCode}</div>
              <div className="text-[12px]" style={{ color: 'var(--ink)', opacity: 0.6 }}>{CONFIG.fromCity}</div>
            </div>
            <div className="flex-1 mx-2 border-t-2 border-dashed relative" style={{ borderColor: '#cdd' }}>
              <span className="absolute left-1/2 -translate-x-1/2 -top-3 text-[18px]">✈️</span>
            </div>
            <div className="text-center">
              <div className="display text-[30px]" style={{ color: 'var(--ink)' }}>{CONFIG.toCode}</div>
              <div className="text-[12px]" style={{ color: 'var(--ink)', opacity: 0.6 }}>{CONFIG.destination}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-2">
            <Field k="Passenger">{CONFIG.passenger}</Field>
            <Field k="Seat">Right next to me</Field>
            <Field k="Outbound">{CONFIG.outboundLabel}</Field>
            <Field k="Return">{CONFIG.returnLabel}</Field>
            <Field k="Class">DINK</Field>
            <Field k="Baggage">Light + sunscreen</Field>
          </div>
        </div>

        {/* perforated stub */}
        <div className="relative border-t-2 border-dashed px-5 py-3 flex items-center justify-between" style={{ borderColor: '#cdd', background: '#fbf7ef' }}>
          <button onClick={scan} className="relative flex items-end gap-[2px] h-9 overflow-hidden" aria-label="Scan boarding pass">
            {Array.from({ length: 22 }).map((_, i) => (
              <span key={i} style={{ width: i % 3 === 0 ? 4 : 2, height: '100%', background: '#4a2f5e' }} />
            ))}
            <AnimatePresence>
              {scanning && (
                <motion.span
                  className="absolute left-0 right-0 h-[3px]"
                  style={{ background: '#2bc4a8', boxShadow: '0 0 10px #2bc4a8' }}
                  initial={{ top: 0 }}
                  animate={{ top: '100%' }}
                  transition={{ duration: 1, ease: 'easeInOut' }}
                />
              )}
            </AnimatePresence>
          </button>
          {scanned ? (
            <motion.span className="fred text-[14px]" style={{ color: '#2bc4a8' }} initial={{ scale: 1.8, opacity: 0, rotate: -12 }} animate={{ scale: 1, opacity: 1, rotate: -8 }} transition={{ type: 'spring', stiffness: 200, damping: 11 }}>
              ✓ Boarding confirmed
            </motion.span>
          ) : (
            <span className="fred text-[13px]" style={{ color: 'var(--ink)', opacity: 0.55 }}>tap to scan →</span>
          )}
        </div>
      </motion.div>

      {scanned && (
        <motion.button className="btn" onClick={next} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          Aww, come here →
        </motion.button>
      )}
    </div>
  )
}

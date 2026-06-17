import confetti from 'canvas-confetti'

const PARTY = ['#FF5D8F', '#FFD23F', '#7C8CFF', '#2BC4A8', '#FF9A3D', '#ffffff']

// Big celebratory burst from the bottom corners + center — the reveal moment.
export function party() {
  const end = Date.now() + 700
  ;(function frame() {
    confetti({ particleCount: 6, angle: 60, spread: 70, origin: { x: 0, y: 0.9 }, colors: PARTY, zIndex: 80, scalar: 1.1 })
    confetti({ particleCount: 6, angle: 120, spread: 70, origin: { x: 1, y: 0.9 }, colors: PARTY, zIndex: 80, scalar: 1.1 })
    if (Date.now() < end) requestAnimationFrame(frame)
  })()
  confetti({ particleCount: 120, spread: 100, startVelocity: 45, origin: { y: 0.5 }, colors: PARTY, zIndex: 80, scalar: 1.1 })
}

// A quick popper — used on smaller wins (unlocking, tapping the gift).
export function popper(origin = { x: 0.5, y: 0.5 }) {
  confetti({ particleCount: 70, spread: 80, startVelocity: 35, origin, colors: PARTY, zIndex: 80, scalar: 1 })
}

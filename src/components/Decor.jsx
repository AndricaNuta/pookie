// A persistent background layer of floating balloons + drifting confetti dots.
// It never re-mounts between scenes, so the party motion runs continuously.

const BALLOONS = [
  { left: '8%', color: '#FF6B9D', dur: 17, delay: 0, size: 52 },
  { left: '24%', color: '#FFD23F', dur: 22, delay: 6, size: 40 },
  { left: '52%', color: '#7C8CFF', dur: 19, delay: 11, size: 46 },
  { left: '70%', color: '#2BC4A8', dur: 24, delay: 3, size: 42 },
  { left: '88%', color: '#FF9A3D', dur: 20, delay: 9, size: 50 },
]

const CONFETTI = Array.from({ length: 18 }).map((_, i) => ({
  left: `${(i * 5.5 + 4) % 98}%`,
  top: `${(i * 37) % 92}%`,
  color: ['#FF6B9D', '#FFD23F', '#7C8CFF', '#2BC4A8', '#FF9A3D', '#FF5D8F'][i % 6],
  dur: 3 + (i % 5),
  delay: (i % 7) * 0.4,
  rot: (i * 23) % 360,
  round: i % 3 === 0,
}))

function Balloon({ color, size }) {
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 40 60" aria-hidden="true">
      <ellipse cx="20" cy="22" rx="17" ry="21" fill={color} />
      <ellipse cx="14" cy="15" rx="5" ry="7" fill="rgba(255,255,255,0.45)" />
      <path d="M20 43 l-3 4 h6 z" fill={color} />
      <path d="M20 47 q4 8 -1 13" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" fill="none" />
    </svg>
  )
}

export default function Decor() {
  return (
    <div className="fixed inset-0 z-[1] overflow-hidden pointer-events-none">
      {BALLOONS.map((b, i) => (
        <div
          key={`b${i}`}
          className="absolute opacity-70"
          style={{ left: b.left, bottom: 0, animation: `floatUp ${b.dur}s linear ${b.delay}s infinite` }}
        >
          <Balloon color={b.color} size={b.size} />
        </div>
      ))}
      {CONFETTI.map((c, i) => (
        <span
          key={`c${i}`}
          className="absolute"
          style={{
            left: c.left,
            top: c.top,
            width: 10,
            height: c.round ? 10 : 14,
            background: c.color,
            borderRadius: c.round ? '50%' : 3,
            transform: `rotate(${c.rot}deg)`,
            opacity: 0.55,
            animation: `confettiDrift ${c.dur}s ease-in-out ${c.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

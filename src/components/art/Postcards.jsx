// Cute flat illustrated mini-scenes for the three destination cards.
// All SVG, so they always load. viewBox 0 0 200 140, designed to be 'slice'-filled.

function Sun({ x = 168, y = 26 }) {
  return <circle cx={x} cy={y} r="15" fill="#FFD23F" />
}

function Pine({ x, h = 34 }) {
  const top = 112 - h
  return (
    <g>
      <rect x={x - 2.5} y={108} width="5" height="12" rx="1" fill="#7a4a24" />
      <path d={`M${x} ${top} L${x + 13} ${102} L${x - 13} ${102} Z`} fill="#2f8f4e" />
      <path d={`M${x} ${top + 12} L${x + 16} ${112} L${x - 16} ${112} Z`} fill="#3aa75c" />
    </g>
  )
}

export function SkiathosArt() {
  return (
    <svg viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice" className="w-full h-full" aria-hidden="true">
      <rect width="200" height="140" fill="#BFE8F5" />
      <Sun x={32} y={28} />
      {/* sea */}
      <rect y="92" width="200" height="48" fill="#46B6DE" />
      <path d="M0 92 q25 -6 50 0 t50 0 t50 0 t50 0 V140 H0 Z" fill="#46B6DE" />
      {/* sand */}
      <path d="M0 116 q50 -10 100 0 t100 0 V140 H0 Z" fill="#F2DFB0" />
      {/* pines down to the sand */}
      <Pine x={120} h={40} />
      <Pine x={145} h={30} />
      <Pine x={165} h={36} />
      {/* little sailboat */}
      <g>
        <path d="M60 96 l10 0 l-2 7 l-6 0 z" fill="#fff" />
        <path d="M65 80 l0 15 l9 0 z" fill="#FF6B9D" />
      </g>
    </svg>
  )
}

export function DubrovnikArt() {
  return (
    <svg viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice" className="w-full h-full" aria-hidden="true">
      <rect width="200" height="140" fill="#BFE8F5" />
      <Sun />
      {/* sea */}
      <rect y="104" width="200" height="36" fill="#2E96D4" />
      {/* city wall */}
      <rect x="0" y="86" width="200" height="20" fill="#EFE4CC" />
      {Array.from({ length: 12 }).map((_, i) => (
        <rect key={i} x={i * 18} y="82" width="9" height="6" fill="#EFE4CC" />
      ))}
      {/* terracotta rooftops */}
      {Array.from({ length: 13 }).map((_, i) => (
        <path key={i} d={`M${-4 + i * 17} 86 l8.5 -10 l8.5 10 Z`} fill={i % 2 ? '#D8643A' : '#E8794A'} />
      ))}
      {/* tower */}
      <rect x="92" y="56" width="18" height="30" fill="#EAD9B0" />
      <path d="M92 56 l9 -11 l9 11 Z" fill="#C85A32" />
      <circle cx="101" cy="70" r="3" fill="#9c7440" />
    </svg>
  )
}

export function AlgheroArt() {
  const houses = [
    { x: 14, c: '#F2A29A' },
    { x: 54, c: '#F6C988' },
    { x: 94, c: '#E59ABF' },
    { x: 134, c: '#F2B27A' },
    { x: 170, c: '#EBA0A0' },
  ]
  return (
    <svg viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice" className="w-full h-full" aria-hidden="true">
      <rect width="200" height="140" fill="#CDEAF2" />
      <Sun x={30} y={26} />
      {/* sea */}
      <rect y="108" width="200" height="32" fill="#2E96D4" />
      {/* pastel old-town houses */}
      {houses.map((h, i) => (
        <g key={i}>
          <rect x={h.x} y="62" width="34" height="46" fill={h.c} />
          <path d={`M${h.x} 62 l17 -12 l17 12 Z`} fill="#C85A32" />
          <rect x={h.x + 7} y="74" width="8" height="10" rx="1" fill="#bfe3ef" />
          <rect x={h.x + 19} y="74" width="8" height="10" rx="1" fill="#bfe3ef" />
        </g>
      ))}
      {/* coral hint in the water */}
      <path d="M0 124 q12 -7 24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0 V140 H0 Z" fill="#E06b7a" opacity="0.45" />
    </svg>
  )
}

export default function PostcardArt({ id }) {
  if (id === 'skiathos') return <SkiathosArt />
  if (id === 'dubrovnik') return <DubrovnikArt />
  if (id === 'alghero') return <AlgheroArt />
  return null
}

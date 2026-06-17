import { motion } from 'framer-motion'

// A flat, playful Dubrovnik strip: old-town walls + terracotta rooftops on the Adriatic,
// with a little boat sailing across. Fills the width of whatever wraps it.
export default function DubrovnikScene({ height = 150 }) {
  return (
    <div className="relative w-full overflow-hidden" style={{ height }}>
      <svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMax slice" className="w-full h-full" aria-hidden="true">
        {/* sea */}
        <rect x="0" y="86" width="400" height="64" fill="#2E96D4" />
        <rect x="0" y="86" width="400" height="64" fill="url(#ripple)" opacity="0.3" />
        {/* city wall */}
        <rect x="-2" y="66" width="404" height="24" fill="#EFE4CC" />
        {Array.from({ length: 14 }).map((_, i) => (
          <rect key={`m${i}`} x={-2 + i * 30} y="60" width="14" height="10" fill="#EFE4CC" />
        ))}
        {/* terracotta rooftops */}
        {Array.from({ length: 17 }).map((_, i) => (
          <path key={`r${i}`} d={`M${-4 + i * 25} 66 l12 -13 l12 13 Z`} fill={i % 2 ? '#D8643A' : '#E8794A'} />
        ))}
        {/* bell tower */}
        <rect x="186" y="36" width="26" height="30" fill="#EAD9B0" />
        <path d="M186 36 l13 -15 l13 15 Z" fill="#C85A32" />
        <circle cx="199" cy="52" r="3.5" fill="#9c7440" />
        <defs>
          <pattern id="ripple" width="34" height="12" patternUnits="userSpaceOnUse">
            <path d="M0 6 Q8 1 17 6 T34 6" fill="none" stroke="#fff" strokeWidth="1.5" />
          </pattern>
        </defs>
      </svg>

      {/* sailing boat */}
      <motion.div
        className="absolute text-[26px]"
        style={{ bottom: height * 0.12 }}
        initial={{ x: '-12%' }}
        animate={{ x: '108vw' }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
      >
        ⛵
      </motion.div>
    </div>
  )
}

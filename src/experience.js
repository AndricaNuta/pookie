import { createContext, useContext } from 'react'

export const ExperienceContext = createContext({ current: 0, total: 8, next: () => {}, go: () => {} })
export const useExperience = () => useContext(ExperienceContext)

// Bright, playful gradients — one per scene. Early scenes stay pink/purple/mint/peach
// (no sky-blue, nothing 'beachy') so the destination never leaks. The map-reveal is the
// first time the sky-blue + sunshine arrives — that colour pop IS part of the surprise.
// Index map: 0 open · 1 lock · 2 piñata · 3 captcha · 4 dog-run · 5 guess · 6 texts · 7 choice · 8 map-reveal · 9 ticket · 10 close
const BG = [
  'linear-gradient(160deg, #FFE3B3 0%, #FFC2D1 100%)', // open — peach → pink
  'linear-gradient(160deg, #E7D6FF 0%, #C9D6FF 100%)', // lock — lilac → periwinkle
  'linear-gradient(160deg, #FFE3A8 0%, #FFC7B0 100%)', // piñata — sunny peach
  'linear-gradient(160deg, #FFD9E0 0%, #FFE9D0 100%)', // captcha — soft coral
  'linear-gradient(160deg, #E6F3CE 0%, #CFEAD6 100%)', // dog-run — meadow green
  'linear-gradient(160deg, #DFF6E2 0%, #CDEFE2 100%)', // guess — fresh mint
  'linear-gradient(160deg, #FFE2AE 0%, #FFB888 100%)', // texts — warm gold → apricot
  'linear-gradient(160deg, #EAD7FF 0%, #FFD3E6 100%)', // choice — lavender → blush
  'linear-gradient(180deg, #8FD6FF 0%, #BFE9FF 48%, #FFE9A8 100%)', // map-reveal — SKY + sun
  'linear-gradient(160deg, #7CC6F2 0%, #BFE9FF 100%)', // ticket — clear sky
  'linear-gradient(160deg, #FFC36B 0%, #FF8FB0 100%)', // close — sunset coral
]

export function bgFor(i) {
  return BG[Math.max(0, Math.min(BG.length - 1, i))]
}

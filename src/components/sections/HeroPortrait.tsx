import { motion, useSpring, useTransform, type MotionValue } from 'framer-motion'
import heroPortrait from '@/assets/hero-profile.webp'

interface HeroPortraitProps {
  /** Normalised pointer position over the hero, -0.5 → 0.5 on each axis. */
  pointerX: MotionValue<number>
  pointerY: MotionValue<number>
  reducedMotion: boolean
  /** Optional scroll-driven opacity for the orbit/network decor (desktop handoff). */
  decorOpacity?: MotionValue<number>
}

const SPRING = { stiffness: 80, damping: 20, mass: 0.6 }

/**
 * Transparent portrait cutout layered into the hero scene:
 *   network decor → atmospheric glow (::before) → cutout → palette rim-light → ground shadow (::after)
 * Pointer parallax moves each layer by a different amount for a subtle sense of depth.
 */
export function HeroPortrait({ pointerX, pointerY, reducedMotion, decorOpacity }: HeroPortraitProps) {
  const sx = useSpring(pointerX, SPRING)
  const sy = useSpring(pointerY, SPRING)

  const rotateY = useTransform(sx, (v) => (reducedMotion ? 0 : v * 7))
  const rotateX = useTransform(sy, (v) => (reducedMotion ? 0 : v * -5))
  const decorX = useTransform(sx, (v) => (reducedMotion ? 0 : v * -18))
  const decorY = useTransform(sy, (v) => (reducedMotion ? 0 : v * -12))

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="hero-portrait"
      style={{ perspective: 1200 }}
    >
      {/* Subtle network / orbit decor, furthest back */}
      <motion.svg
        aria-hidden
        viewBox="0 0 400 400"
        className="hero-portrait__decor"
        style={{ x: decorX, y: decorY, opacity: decorOpacity }}
      >
        <defs>
          <linearGradient id="hp-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00ffa6" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#3ec5ff" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#8b6bff" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="190" fill="none" stroke="rgba(255,255,255,0.06)" />
        <g className="hero-portrait__orbit">
          <circle cx="200" cy="200" r="160" fill="none" stroke="url(#hp-ring)" strokeDasharray="2 7" />
          <circle cx="360" cy="200" r="3" fill="#00ffa6" />
          <circle cx="87" cy="87" r="2.5" fill="#8b6bff" />
        </g>
        <circle cx="200" cy="200" r="120" fill="none" stroke="rgba(255,255,255,0.05)" />
        {/* Sparse constellation */}
        <g stroke="rgba(62,197,255,0.22)" strokeWidth="0.8">
          <line x1="40" y1="250" x2="78" y2="300" />
          <line x1="78" y1="300" x2="58" y2="345" />
          <line x1="330" y1="70" x2="365" y2="120" />
          <line x1="365" y1="120" x2="350" y2="160" />
        </g>
        <g fill="#3ec5ff" fillOpacity="0.55">
          <circle cx="40" cy="250" r="2" />
          <circle cx="78" cy="300" r="2.5" />
          <circle cx="58" cy="345" r="1.8" />
          <circle cx="330" cy="70" r="1.8" />
          <circle cx="365" cy="120" r="2.4" />
          <circle cx="350" cy="160" r="1.6" />
        </g>
      </motion.svg>

      {/* Cutout + rim light share one tilting, bottom-faded layer */}
      <motion.div
        className="hero-portrait__figure"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        <img
          src={heroPortrait}
          alt="Portrait of Dilutha Weerasinghe, AI engineer and data scientist, wearing a dark suit"
          width={1024}
          height={1536}
          decoding="async"
          fetchPriority="high"
          className="hero-portrait__img"
        />
        {/* Palette-tinted rim light, clipped to the person's silhouette */}
        <div
          aria-hidden
          className="hero-portrait__rim"
          style={{
            WebkitMaskImage: `url(${heroPortrait})`,
            maskImage: `url(${heroPortrait})`,
          }}
        />
      </motion.div>
    </motion.div>
  )
}

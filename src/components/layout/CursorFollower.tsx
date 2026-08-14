import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function CursorFollower() {
  const reducedMotion = useReducedMotion()
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [label, setLabel] = useState<string | null>(null)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  // Ring: soft trailing lag, reads as "atmosphere" following the pointer.
  const ringX = useSpring(x, { stiffness: 400, damping: 40, mass: 0.4 })
  const ringY = useSpring(y, { stiffness: 400, damping: 40, mass: 0.4 })
  // Dot: near-instant, keeps precise pointer feedback.
  const dotX = useSpring(x, { stiffness: 1000, damping: 50, mass: 0.15 })
  const dotY = useSpring(y, { stiffness: 1000, damping: 50, mass: 0.15 })

  useEffect(() => {
    if (reducedMotion) return
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    if (!isFinePointer) return

    function handleMove(e: PointerEvent) {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)

      const target = e.target as HTMLElement
      const hoverEl = target.closest('a, button, [data-cursor-hover]')
      setHovering((prev) => (prev === Boolean(hoverEl) ? prev : Boolean(hoverEl)))

      const labelEl = target.closest('[data-cursor-label]') as HTMLElement | null
      const nextLabel = labelEl?.getAttribute('data-cursor-label') ?? null
      setLabel((prev) => (prev === nextLabel ? prev : nextLabel))
    }
    window.addEventListener('pointermove', handleMove)
    return () => window.removeEventListener('pointermove', handleMove)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion])

  if (reducedMotion) return null

  const ringSize = label ? 64 : hovering ? 46 : 18

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden items-center justify-center rounded-full border border-accent/60 mix-blend-difference sm:flex"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          backgroundColor: label ? 'rgba(0, 255, 166, 0.12)' : 'rgba(0, 255, 166, 0)',
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        {label && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05 }}
            className="whitespace-nowrap font-mono text-[10px] tracking-wide text-ink"
          >
            {label}
          </motion.span>
        )}
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-1.5 w-1.5 rounded-full bg-accent mix-blend-difference sm:block"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible && !label ? 1 : 0,
        }}
      />
    </>
  )
}

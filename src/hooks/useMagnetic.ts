import { useRef } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

interface MagneticOptions {
  strength?: number
  disabled?: boolean
}

export function useMagnetic<T extends HTMLElement = HTMLElement>({
  strength = 0.35,
  disabled = false,
}: MagneticOptions = {}) {
  const ref = useRef<T>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.2 })
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.2 })

  function handleMouseMove(e: React.MouseEvent) {
    if (disabled || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set(relX * strength)
    y.set(relY * strength)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return { ref, x: springX, y: springY, handleMouseMove, handleMouseLeave }
}

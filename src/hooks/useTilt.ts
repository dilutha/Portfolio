import { useRef, type MouseEvent } from 'react'

interface TiltOptions {
  /** Max rotation in degrees. */
  strength?: number
  disabled?: boolean
}

/**
 * Pointer-driven 3D tilt via direct style mutation (no React re-renders per
 * mousemove). Returns a ref plus handlers to spread onto the tilted element.
 */
export function useTilt<T extends HTMLElement = HTMLDivElement>({
  strength = 7,
  disabled = false,
}: TiltOptions = {}) {
  const ref = useRef<T>(null)

  function handleMouseMove(e: MouseEvent<T>) {
    const el = ref.current
    if (!el || disabled) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(700px) rotateX(${-py * strength}deg) rotateY(${px * strength}deg) translateZ(0)`
    el.style.setProperty('--pointer-x', `${(px + 0.5) * 100}%`)
    el.style.setProperty('--pointer-y', `${(py + 0.5) * 100}%`)
  }

  function handleMouseLeave() {
    if (ref.current) ref.current.style.transform = ''
  }

  return { ref, handleMouseMove, handleMouseLeave }
}

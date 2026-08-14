import { useMemo } from 'react'

type NavigatorWithHints = Navigator & {
  deviceMemory?: number
  hardwareConcurrency?: number
}

/**
 * Heuristic-only: used to decide whether to render the full R3F hero
 * background or fall back to a static gradient. Never gates functionality.
 */
export function useLowPowerDevice(): boolean {
  return useMemo(() => {
    if (typeof window === 'undefined') return false
    const nav = navigator as NavigatorWithHints
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
    const smallViewport = window.matchMedia('(max-width: 640px)').matches
    const lowMemory = (nav.deviceMemory ?? 8) < 4
    const lowCores = (nav.hardwareConcurrency ?? 8) < 4
    return (isCoarsePointer && smallViewport) || lowMemory || lowCores
  }, [])
}

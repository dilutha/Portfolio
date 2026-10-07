import { useRef, type PointerEvent } from 'react'
import { motion, useMotionValue, useScroll, useTransform } from 'framer-motion'
import { Hero } from './Hero'
import { About } from './About'
import { HeroPortrait } from './HeroPortrait'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Hero + "Who I am" share a single portrait.
 *
 * Desktop (lg+): the one portrait lives in a sticky layer spanning both
 * sections. Hero and About each reserve an empty, identically sized slot
 * (`.hero-portrait-slot`) so text layout is unaffected; scroll progress
 * drives a gentle scale/lift between the two compositions, and the portrait
 * fades out as the About section ends.
 *
 * Below lg: the same single portrait is rendered in the hero flow and
 * simply fades/translates as the hero scrolls away — no sticky behaviour.
 */
export function PortraitStage() {
  const stageRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const reducedMotion = useReducedMotion()

  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)

  // 0 → 1 while the hero scrolls out of view (the Hero → About handoff).
  const { scrollYProgress: handoff } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  // 0 → 1 while the end of the About section scrolls out of view (the exit).
  const { scrollYProgress: exit } = useScroll({
    target: stageRef,
    offset: ['end end', 'end 35%'],
  })

  const still = reducedMotion
  const scale = useTransform(handoff, [0, 1], [1, still ? 1 : 0.88])
  const lift = useTransform(handoff, [0, 1], [0, still ? 0 : -28])
  const decorOpacity = useTransform(handoff, [0, 1], [1, still ? 1 : 0.5])
  const opacity = useTransform(exit, [0, 1], [1, 0])

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (reducedMotion || e.pointerType !== 'mouse') return
    pointerX.set(e.clientX / window.innerWidth - 0.5)
    pointerY.set(e.clientY / window.innerHeight - 0.5)
  }

  const portrait = (
    <HeroPortrait
      pointerX={pointerX}
      pointerY={pointerY}
      reducedMotion={reducedMotion}
      decorOpacity={isDesktop ? decorOpacity : undefined}
    />
  )

  return (
    <div ref={stageRef} className="relative" onPointerMove={handlePointerMove}>
      {isDesktop && (
        <div className="pointer-events-none absolute inset-0 z-[5] overflow-x-clip">
          <div className="sticky top-0 h-[100svh]">
            <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-end px-6 pt-24">
              <motion.div style={{ scale, y: lift, opacity, transformOrigin: '50% 35%' }}>
                {portrait}
              </motion.div>
            </div>
          </div>
        </div>
      )}

      <div ref={heroRef}>
        <Hero portrait={isDesktop ? undefined : portrait} />
      </div>
      <About />
    </div>
  )
}

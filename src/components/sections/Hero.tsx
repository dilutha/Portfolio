import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ArrowRight, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/icons/BrandIcons'
import { NeuralBackground } from '@/components/three/NeuralBackground'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { profile } from '@/data/profile'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { scrollToId } from '@/lib/scroll'

const LONGEST_ROLE = profile.roles.reduce((a, b) => (b.length > a.length ? b : a), '')

function RoleRotator() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % profile.roles.length)
    }, 2600)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="relative inline-block h-[1.4em] max-w-full items-center overflow-hidden align-bottom">
      {/* Invisible sizer: reserves width for the longest role so the rotator
          never clips a shorter box while a longer label is swapped in. */}
      <span aria-hidden className="invisible block whitespace-nowrap">
        {LONGEST_ROLE}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={profile.roles[index]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-gradient-animate absolute left-0 top-0 whitespace-nowrap"
        >
          {profile.roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!headlineRef.current) return
    const lines = headlineRef.current.querySelectorAll('[data-line]')

    if (reducedMotion) {
      gsap.set(lines, { clearProps: 'all' })
      return
    }

    gsap.set(lines, { yPercent: 110 })
    gsap.to(lines, {
      yPercent: 0,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.1,
      delay: 0.3,
    })
  }, [reducedMotion])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const fieldOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.15])
  const fieldScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const fieldY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  function handlePointerMove(e: PointerEvent<HTMLElement>) {
    if (reducedMotion) return
    const el = sectionRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-void"
    >
      <motion.div
        className="absolute inset-0"
        style={{ opacity: fieldOpacity, scale: fieldScale, y: fieldY }}
      >
        <NeuralBackground />
      </motion.div>

      {/* Cursor-tracking ambient glow — a lightweight complement to the
          particle field's structural reaction, purely CSS/GPU-composited. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden sm:block"
        style={{
          background:
            'radial-gradient(560px circle at var(--mx, 50%) var(--my, 20%), rgba(0,255,166,0.09), transparent 70%)',
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-void" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-24">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 font-mono text-sm tracking-widest text-ink-muted"
        >
          <RoleRotator />
        </motion.p>

        <h1
          ref={headlineRef}
          className="max-w-4xl text-5xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-6xl lg:text-7xl"
        >
          <span className="block overflow-hidden">
            <span data-line className="block">
              Building intelligent
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-line className="block">
              systems that drive
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-line className="text-gradient-animate block">
              real-world impact.
            </span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-ink-muted"
        >
          {profile.heroSubtext}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton variant="primary" onClick={() => scrollToId('projects')}>
            View Projects <ArrowRight size={16} />
          </MagneticButton>
          <MagneticButton variant="secondary" onClick={() => scrollToId('contact')}>
            Get in Touch
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 flex items-center gap-5"
        >
          <a
            href={profile.social.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            data-cursor-hover
            className="text-ink-muted transition-colors hover:text-accent"
          >
            <GithubIcon size={20} />
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            data-cursor-hover
            className="text-ink-muted transition-colors hover:text-accent"
          >
            <LinkedinIcon size={20} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            data-cursor-hover
            className="text-ink-muted transition-colors hover:text-accent"
          >
            <Mail size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

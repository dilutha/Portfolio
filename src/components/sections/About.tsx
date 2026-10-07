import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { AmbientGlow } from '@/components/ui/AmbientGlow'
import { SectionConnector } from '@/components/ui/SectionConnector'
import { profile } from '@/data/profile'

/**
 * "Who I am". On desktop the portrait is not rendered here — the single hero
 * portrait (PortraitStage's sticky layer) carries over into the reserved
 * right-hand slot, so the two sections read as one composition.
 */
export function About() {
  return (
    <section id="about" className="relative bg-void py-28 sm:py-36">
      <SectionConnector />
      <AmbientGlow tone="accent" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-6 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div className="min-w-0">
          <SectionHeading index="01 — About" title="Who I am" />

          <div className="flex max-w-2xl flex-col gap-6">
            {profile.bio.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-15% 0px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg leading-relaxed text-ink-muted"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <motion.dl
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-line pt-8"
          >
            {profile.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-xs text-ink-muted">{stat.label}</dt>
                <dd className="font-mono text-2xl font-bold text-accent sm:text-3xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <div aria-hidden className="hero-portrait-slot hidden lg:block" />
      </div>
    </section>
  )
}

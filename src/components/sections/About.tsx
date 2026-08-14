import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { AmbientGlow } from '@/components/ui/AmbientGlow'
import { SectionConnector } from '@/components/ui/SectionConnector'
import { profile } from '@/data/profile'
import { projectImages } from '@/assets/projectImages'

export function About() {
  return (
    <section id="about" className="relative bg-void py-28 sm:py-36">
      <SectionConnector />
      <AmbientGlow tone="accent" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading index="01 — About" title="Who I am" />

        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="group relative mx-auto w-full max-w-sm"
          >
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-accent/20 via-cyan/10 to-violet/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative overflow-hidden rounded-3xl border border-line">
              <img
                src={projectImages.profile}
                alt="Dilutha Weerasinghe"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 will-change-transform group-hover:scale-105"
                loading="lazy"
                width={666}
                height={833}
              />
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              {profile.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-mono text-2xl font-bold text-accent sm:text-3xl">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1 text-xs text-ink-faint">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="flex flex-col justify-center gap-6">
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
        </div>
      </div>
    </section>
  )
}

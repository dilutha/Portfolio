import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { AmbientGlow } from '@/components/ui/AmbientGlow'
import { SectionConnector } from '@/components/ui/SectionConnector'
import { skillCategories } from '@/data/skills'
import { useTilt } from '@/hooks/useTilt'

function SkillCard({
  category,
  index,
}: {
  category: (typeof skillCategories)[number]
  index: number
}) {
  const tilt = useTilt<HTMLDivElement>({ strength: 6 })

  return (
    <motion.div
      ref={tilt.ref}
      onMouseMove={tilt.handleMouseMove}
      onMouseLeave={tilt.handleMouseLeave}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group rounded-2xl border border-line bg-surface-2/60 p-6 transition-[border-color,box-shadow] duration-300 will-change-transform hover:border-accent/40 hover:shadow-[0_0_40px_-12px_rgba(0,255,166,0.25)]"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <h3 className="text-lg font-semibold text-ink">{category.title}</h3>
      <p className="mt-1 text-sm text-ink-faint">{category.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-line-strong bg-white/5 px-3 py-1 font-mono text-xs text-ink-muted transition-colors group-hover:border-line-strong"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export function Skills() {
  return (
    <section id="skills" className="relative bg-void py-28 sm:py-36">
      <SectionConnector />
      <AmbientGlow tone="violet" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          index="03 — Toolbox"
          title="Skills & technologies"
          description="Categorized by where they show up across the case studies below."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, i) => (
            <SkillCard key={category.id} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

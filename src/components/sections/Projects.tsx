import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { clsx } from 'clsx'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { AmbientGlow } from '@/components/ui/AmbientGlow'
import { SectionConnector } from '@/components/ui/SectionConnector'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { projects, projectFilters, type ProjectTag } from '@/data/projects'

export function Projects() {
  const [filter, setFilter] = useState<'all' | ProjectTag>('all')

  const filtered = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.tags.includes(filter))),
    [filter],
  )

  return (
    <section id="projects" className="relative bg-surface py-28 sm:py-36">
      <SectionConnector />
      <AmbientGlow tone="accent" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          index="04 — Work"
          title="Selected case studies"
          description="Six projects spanning agentic AI, explainable ML, and full-stack platforms — built from real repositories, not slideware."
        />

        <div className="mb-10 flex flex-wrap gap-2">
          {projectFilters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              data-cursor-hover
              className={clsx(
                'rounded-full border px-4 py-2 font-mono text-sm transition-colors duration-300',
                filter === f.id
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-line-strong text-ink-muted hover:border-accent/40 hover:text-accent',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

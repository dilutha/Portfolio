import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { Award, Compass, ExternalLink } from 'lucide-react'
import type { ReactNode } from 'react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Timeline, TimelineItem } from '@/components/ui/Timeline'
import { Badge } from '@/components/ui/Badge'
import { AmbientGlow } from '@/components/ui/AmbientGlow'
import { SectionConnector } from '@/components/ui/SectionConnector'
import {
  educationTimeline,
  certifications,
  selfDirectedLearning,
  type TimelineEntry,
} from '@/data/profile'

function CredentialCard({ item, index }: { item: TimelineEntry; index: number }) {
  const formal = item.kind === 'certification'

  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className={clsx(
        'flex flex-col gap-3 rounded-2xl border p-5 transition-colors duration-300',
        formal
          ? 'border-line bg-surface-2/60 hover:border-accent/40'
          : 'border-dashed border-line-strong bg-transparent hover:border-violet/50',
      )}
    >
      <Badge tone={formal ? 'accent' : 'violet'} className="w-fit">
        {formal ? 'Certification' : 'Self-directed'}
      </Badge>
      <div className="min-w-0">
        <h4 className="text-base font-semibold text-ink">{item.title}</h4>
        <p className="mt-0.5 text-sm text-ink-muted">{item.place}</p>
      </div>
      {item.focus && <p className="font-mono text-xs leading-relaxed text-ink-muted">{item.focus}</p>}
      {(item.link || item.extraLinks) && (
        <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2">
          {[
            ...(item.link ? [{ label: 'View Credential', href: item.link }] : []),
            ...(item.extraLinks ?? []),
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              className="inline-flex w-fit items-center gap-1 font-mono text-xs text-accent transition-colors hover:text-accent-dim"
            >
              {l.label} <ExternalLink size={12} aria-hidden />
              <span className="sr-only"> for {item.title} (opens in a new tab)</span>
            </a>
          ))}
        </div>
      )}
    </motion.li>
  )
}

function CredentialGroup({
  icon,
  label,
  caption,
  items,
  columns,
}: {
  icon: ReactNode
  label: string
  caption: string
  items: TimelineEntry[]
  columns: 3 | 4
}) {
  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line-strong text-accent">
          {icon}
        </span>
        <div>
          <h3 className="font-mono text-sm uppercase tracking-widest text-ink">{label}</h3>
          <p className="text-sm text-ink-muted">{caption}</p>
        </div>
      </div>
      <ul className={clsx('grid gap-4 sm:grid-cols-2', columns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3')}>
        {items.map((item, i) => (
          <CredentialCard key={item.id} item={item} index={i} />
        ))}
      </ul>
    </div>
  )
}

export function EducationSection() {
  return (
    <section id="education" className="relative bg-surface py-28 sm:py-36">
      <SectionConnector />
      <AmbientGlow tone="mixed" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          index="02 — Journey"
          title="Education & Certifications"
          description="Academic foundation and self-directed learning behind the engineering work."
        />

        <Timeline>
          {educationTimeline.map((item, i) => (
            <TimelineItem
              key={item.id}
              title={item.title}
              subtitle={item.place}
              period={item.period}
              index={i}
            >
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <Badge tone="accent">Education</Badge>
              </div>
              {item.detail && <p className="mt-3 max-w-xl text-ink-muted">{item.detail}</p>}
              {item.focus && (
                <p className="mt-2 font-mono text-xs text-ink-muted">
                  <span className="text-ink">Skills:</span> {item.focus}
                </p>
              )}
            </TimelineItem>
          ))}
        </Timeline>

        <div className="mt-20 flex flex-col gap-14">
          <CredentialGroup
            icon={<Award size={16} aria-hidden />}
            label="Certifications"
            caption="Formal external credentials"
            items={certifications}
            columns={4}
          />
          <CredentialGroup
            icon={<Compass size={16} aria-hidden />}
            label="Self-directed Learning"
            caption="Skills developed through independent engineering and project work"
            items={selfDirectedLearning}
            columns={3}
          />
        </div>
      </div>
    </section>
  )
}

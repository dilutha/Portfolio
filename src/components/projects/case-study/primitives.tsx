import { clsx } from 'clsx'
import type { MouseEvent, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight, ChevronDown } from 'lucide-react'
import { scrollToId } from '@/lib/scroll'
import type { BuildStatus, StatusItem } from '@/data/caseStudy'

export type StatusView = 'all' | 'built' | 'planned'

export const STATUS_META: Record<BuildStatus, { label: string; dot: string; pill: string }> = {
  live: {
    label: 'Live',
    dot: 'bg-accent',
    pill: 'border-accent/40 bg-accent/10 text-accent',
  },
  partial: {
    label: 'Partial',
    dot: 'bg-cyan',
    pill: 'border-cyan/40 bg-cyan/10 text-cyan',
  },
  planned: {
    label: 'Planned',
    dot: 'border border-violet bg-transparent',
    pill: 'border-dashed border-violet/60 bg-transparent text-[#b9a6ff]',
  },
}

/** Whether an item is emphasised under the current "Built today / Planned" view filter. */
export function matchesView(status: BuildStatus, view: StatusView) {
  if (view === 'all') return true
  if (view === 'built') return status !== 'planned'
  return status !== 'live'
}

export function StatusPill({ status, className }: { status: BuildStatus; className?: string }) {
  const meta = STATUS_META[status]
  return (
    <span
      className={clsx(
        'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest',
        meta.pill,
        className,
      )}
    >
      <span aria-hidden className={clsx('h-1.5 w-1.5 rounded-full', meta.dot)} />
      {meta.label}
    </span>
  )
}

export function StatusChip({ item, view = 'all' }: { item: StatusItem; view?: StatusView }) {
  const active = matchesView(item.status, view)
  return (
    <li
      className={clsx(
        'inline-flex max-w-full items-center gap-2 rounded-lg border px-2.5 py-1.5 font-mono text-xs transition-opacity duration-300',
        item.status === 'live' && 'border-line-strong bg-white/5 text-ink',
        item.status === 'partial' && 'border-cyan/35 bg-cyan/5 text-ink',
        item.status === 'planned' && 'border-dashed border-violet/45 text-ink-muted',
        !active && 'opacity-25',
      )}
    >
      <span aria-hidden className={clsx('h-1.5 w-1.5 shrink-0 rounded-full', STATUS_META[item.status].dot)} />
      <span className="min-w-0">
        {item.label}
        {item.note && <span className="text-ink-muted"> · {item.note}</span>}
        <span className="sr-only"> ({STATUS_META[item.status].label})</span>
      </span>
    </li>
  )
}

export function StatusLegend({ className }: { className?: string }) {
  return (
    <ul
      aria-label="Implementation status legend"
      className={clsx('flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-ink-muted', className)}
    >
      <li className="inline-flex items-center gap-2">
        <StatusPill status="live" /> Implemented & deployed
      </li>
      <li className="inline-flex items-center gap-2">
        <StatusPill status="partial" /> Exists today, not yet in target form
      </li>
      <li className="inline-flex items-center gap-2">
        <StatusPill status="planned" /> Planned / target architecture
      </li>
    </ul>
  )
}

export function CaseSection({
  id,
  index,
  title,
  intro,
  children,
}: {
  id: string
  index: string
  title: string
  intro?: ReactNode
  children?: ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mt-20 scroll-mt-24">
      <p className="font-mono text-sm tracking-widest text-accent">{index}</p>
      <h2 id={`${id}-title`} className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
        {title}
      </h2>
      {intro && <div className="mt-4 max-w-2xl leading-relaxed text-ink-muted">{intro}</div>}
      {children && <div className="mt-8">{children}</div>}
    </section>
  )
}

/** "On this page" chip navigation for long case studies. */
export function CaseStudyNav({
  sections,
  children,
}: {
  sections: { id: string; label: string }[]
  children?: ReactNode
}) {
  function jumpTo(e: MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault()
    scrollToId(id)
  }

  return (
    <nav aria-label="Case study sections" className="rounded-2xl border border-line bg-surface-2/50 p-4">
      <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-ink-muted">On this page</p>
      <ul className="flex flex-wrap gap-2">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              onClick={(e) => jumpTo(e, s.id)}
              data-cursor-hover
              className="inline-block rounded-full border border-line-strong px-3 py-1 font-mono text-xs text-ink-muted transition-colors hover:border-accent/50 hover:text-accent"
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
      {children}
    </nav>
  )
}

/**
 * Numbered, ordered process. Stacks vertically with down-arrows on mobile;
 * wraps into a grid with right-arrows from `sm` up (arrows hidden at row ends).
 */
export function StepFlow({
  steps,
  columns = 4,
  label,
  highlight,
}: {
  steps: string[]
  columns?: 3 | 4
  label: string
  /** Index of a step to emphasise (e.g. the model output). */
  highlight?: number
}) {
  return (
    <ol
      aria-label={label}
      className={clsx('grid gap-x-6 gap-y-3 sm:grid-cols-2', columns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3')}
    >
      {steps.map((step, i) => {
        const last = i === steps.length - 1
        const rowEndLg = (i + 1) % columns === 0
        const rowEndSm = (i + 1) % 2 === 0
        return (
          <motion.li
            key={step}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 0.4, delay: (i % columns) * 0.05 }}
            className="relative flex flex-col items-stretch"
          >
            <div
              className={clsx(
                'flex flex-1 items-center gap-3 rounded-xl border px-3.5 py-3',
                i === highlight ? 'border-accent/50 bg-accent/10' : 'border-line bg-surface-2/70',
              )}
            >
              <span className="font-mono text-[11px] text-accent">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-sm text-ink">{step}</span>
            </div>
            {!last && (
              <>
                <ArrowDown aria-hidden size={14} className="mx-auto mt-2 text-accent/60 sm:hidden" />
                <ArrowRight
                  aria-hidden
                  size={14}
                  className={clsx(
                    'absolute -right-[19px] top-1/2 hidden -translate-y-1/2 text-accent/60',
                    rowEndSm ? 'sm:hidden' : 'sm:block',
                    rowEndLg ? 'lg:hidden' : 'lg:block',
                  )}
                />
              </>
            )}
          </motion.li>
        )
      })}
    </ol>
  )
}

/** Vertical arrow between stacked diagram nodes, with an optional protocol/label chip. */
export function FlowConnector({ label }: { label?: string }) {
  return (
    <div aria-hidden className="flex flex-col items-center py-1.5">
      <span className="h-5 w-px bg-gradient-to-b from-line-strong to-accent/50" />
      {label && (
        <span className="my-1 rounded-full border border-line bg-void px-2.5 py-0.5 font-mono text-[10px] tracking-widest text-ink-muted">
          {label}
        </span>
      )}
      <ChevronDown size={14} className="-mt-0.5 text-accent/70" />
    </div>
  )
}

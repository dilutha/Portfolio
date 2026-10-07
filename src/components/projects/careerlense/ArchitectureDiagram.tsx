import { useState } from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { ChevronDown, Users } from 'lucide-react'
import { systemArchitecture, type ArchLayer } from '@/data/careerlense'
import {
  FlowConnector as Connector,
  StatusChip,
  StatusPill,
  matchesView,
  type StatusView,
} from '@/components/projects/case-study/primitives'

const VIEWS: { id: StatusView; label: string }[] = [
  { id: 'all', label: 'Full target' },
  { id: 'built', label: 'Built today' },
  { id: 'planned', label: 'Planned' },
]

function LayerCard({
  layer,
  view,
  sequence = false,
  className,
}: {
  layer: ArchLayer
  view: StatusView
  /** Render items as an ordered pipeline (e.g. Docker → CI → AWS). */
  sequence?: boolean
  className?: string
}) {
  const active = matchesView(layer.status, view)

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={clsx(
        'relative rounded-2xl border p-5 transition-[opacity,border-color] duration-300',
        layer.status === 'planned'
          ? 'border-dashed border-violet/35 bg-surface/40'
          : 'border-line bg-surface-2/70',
        !active && 'opacity-40',
        className,
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-mono text-xs uppercase tracking-widest text-ink">{layer.title}</h3>
          <p className="mt-1 text-sm text-ink-muted">{layer.subtitle}</p>
        </div>
        <StatusPill status={layer.status} />
      </div>
      {layer.today && <p className="mt-3 text-xs leading-relaxed text-ink-muted">{layer.today}</p>}

      {sequence ? (
        <ol className="mt-4 flex flex-col items-start gap-1">
          {layer.items.map((item, i) => (
            <li key={item.label} className="flex flex-col items-start">
              <ul>
                <StatusChip item={item} view={view} />
              </ul>
              {i < layer.items.length - 1 && (
                <ChevronDown aria-hidden size={14} className="ml-3 mt-1 text-ink-faint" />
              )}
            </li>
          ))}
        </ol>
      ) : (
        <ul className="mt-4 flex flex-wrap gap-2">
          {layer.items.map((item) => (
            <StatusChip key={item.label} item={item} view={view} />
          ))}
        </ul>
      )}
    </motion.div>
  )
}

/** Branching connector: one line splitting into / merging from `count` columns (md+); a plain arrow on mobile. */
function Branch({ count, direction = 'split' }: { count: 2 | 3; direction?: 'split' | 'merge' }) {
  const inset = count === 3 ? '16.666%' : '25%'
  const drops = count === 3 ? ['16.666%', '50%', '83.333%'] : ['25%', '75%']
  return (
    <>
      {direction === 'split' && (
        <div className="md:hidden">
          <Connector />
        </div>
      )}
      <div aria-hidden className="relative hidden h-8 md:block">
        <span
          className={clsx(
            'absolute left-1/2 w-px bg-line-strong',
            direction === 'split' ? 'top-0 h-4' : 'bottom-0 h-4',
          )}
        />
        <span
          className="absolute top-4 h-px bg-line-strong"
          style={{ left: inset, right: inset }}
        />
        {drops.map((left) => (
          <span
            key={left}
            className={clsx(
              'absolute w-px',
              direction === 'split' ? 'top-4 h-4 bg-accent/50' : 'top-0 h-4 bg-line-strong',
            )}
            style={{ left }}
          />
        ))}
      </div>
    </>
  )
}

export function ArchitectureDiagram() {
  const [view, setView] = useState<StatusView>('all')
  const a = systemArchitecture

  return (
    <div>
      <div
        role="radiogroup"
        aria-label="Filter architecture by implementation status"
        className="mb-8 inline-flex flex-wrap gap-1 rounded-full border border-line bg-surface-2/60 p-1"
      >
        {VIEWS.map((v) => (
          <button
            key={v.id}
            type="button"
            role="radio"
            aria-checked={view === v.id}
            onClick={() => setView(v.id)}
            data-cursor-hover
            className={clsx(
              'rounded-full px-4 py-1.5 font-mono text-xs transition-colors duration-300',
              view === v.id ? 'bg-accent text-void' : 'text-ink-muted hover:text-accent',
            )}
          >
            {v.label}
          </button>
        ))}
      </div>

      <div
        role="figure"
        aria-label="CareerLense AI system architecture, from users through presentation, API, engines, orchestration, data, and analytics layers"
        className="relative rounded-3xl border border-line bg-void/60 p-4 sm:p-6"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.05) 1px, transparent 0)',
          backgroundSize: '22px 22px',
        }}
      >
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 font-mono text-xs tracking-widest text-accent">
            <Users size={14} aria-hidden /> USERS
          </span>
        </div>
        <Connector />
        <LayerCard layer={a.presentation} view={view} />
        <Connector label="HTTPS / REST" />
        <LayerCard layer={a.api} view={view} />
        <Branch count={3} />
        <div className="grid gap-3 md:grid-cols-3">
          {a.engines.map((layer) => (
            <LayerCard key={layer.id} layer={layer} view={view} />
          ))}
        </div>
        <Branch count={3} direction="merge" />
        <Branch count={2} />
        <div className="grid gap-3 md:grid-cols-2">
          {a.orchestration.map((layer) => (
            <LayerCard key={layer.id} layer={layer} view={view} />
          ))}
        </div>
        <Branch count={2} direction="merge" />
        <Connector />
        <LayerCard layer={a.data} view={view} />
        <Connector />
        <LayerCard layer={a.analytics} view={view} />

        <div className="mt-8 border-t border-line pt-6">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-ink-muted">
            Cross-cutting
          </p>
          <div className="grid gap-3 md:grid-cols-3">
            <LayerCard layer={a.providers} view={view} />
            <LayerCard layer={a.observability} view={view} />
            <LayerCard layer={a.infrastructure} view={view} sequence />
          </div>
        </div>
      </div>
    </div>
  )
}

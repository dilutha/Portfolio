import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { clsx } from 'clsx'
import { requestFlow, type FlowStep } from '@/data/careerlense'
import { StatusPill } from '@/components/projects/case-study/primitives'

function StepDetail({ step }: { step: FlowStep }) {
  return (
    <motion.div
      key={step.id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
    >
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
        <StatusPill status={step.status} />
      </div>
      <p className="mt-3 leading-relaxed text-ink-muted">{step.body}</p>
      {step.today && (
        <p className="mt-4 rounded-xl border border-cyan/25 bg-cyan/5 px-4 py-3 text-sm leading-relaxed text-ink-muted">
          {step.today}
        </p>
      )}
    </motion.div>
  )
}

/**
 * Interactive request flow. Desktop: step list + sticky detail panel.
 * Mobile/tablet: the same list expands the active step inline (accordion).
 */
export function RequestFlow() {
  const [activeId, setActiveId] = useState(requestFlow[0].id)
  const active = requestFlow.find((s) => s.id === activeId) ?? requestFlow[0]

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
      <ol className="relative flex flex-col" aria-label="CareerLense AI request flow">
        <span aria-hidden className="absolute bottom-4 left-[15px] top-4 w-px bg-line" />
        {requestFlow.map((step, i) => {
          const isActive = step.id === activeId
          return (
            <li key={step.id} className="relative">
              <button
                type="button"
                onClick={() => setActiveId(step.id)}
                aria-expanded={isActive}
                aria-controls={`flow-detail-${step.id}`}
                data-cursor-hover
                className={clsx(
                  'group flex w-full items-center gap-4 rounded-xl py-2 pr-3 text-left transition-colors',
                  isActive ? 'text-ink' : 'text-ink-muted hover:text-ink',
                )}
              >
                <span
                  className={clsx(
                    'relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-mono text-[11px] transition-colors',
                    isActive
                      ? 'border-accent bg-accent text-void'
                      : step.status === 'planned'
                        ? 'border-dashed border-violet/60 bg-void text-[#b9a6ff]'
                        : 'border-line-strong bg-void text-ink-muted group-hover:border-accent/50',
                  )}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="min-w-0 flex-1 font-medium">{step.title}</span>
                <StatusPill status={step.status} className="hidden sm:inline-flex" />
              </button>

              {/* Inline detail below lg */}
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    id={`flow-detail-${step.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden pl-12 lg:hidden"
                  >
                    <div className="mb-3 rounded-xl border border-line bg-surface-2/60 p-4">
                      <StepDetail step={step} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          )
        })}
      </ol>

      <div className="hidden lg:block">
        <div className="sticky top-28 rounded-2xl border border-line bg-surface-2/60 p-6" aria-live="polite">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-ink-muted">
            Step {requestFlow.indexOf(active) + 1} of {requestFlow.length}
          </p>
          <AnimatePresence mode="wait">
            <StepDetail step={active} />
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

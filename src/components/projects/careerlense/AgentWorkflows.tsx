import { useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { clsx } from 'clsx'
import { RotateCcw } from 'lucide-react'
import { agentWorkflows } from '@/data/careerlense'
import { StatusPill } from '@/components/projects/case-study/primitives'

function Terminal({ label }: { label: 'START' | 'END' }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line-strong bg-void px-3 py-1 font-mono text-[10px] tracking-widest text-ink-muted">
      {label}
    </span>
  )
}

export function AgentWorkflows() {
  const [activeIndex, setActiveIndex] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const agent = agentWorkflows[activeIndex]

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const last = agentWorkflows.length - 1
    let next: number | null = null
    if (e.key === 'ArrowRight') next = activeIndex === last ? 0 : activeIndex + 1
    if (e.key === 'ArrowLeft') next = activeIndex === 0 ? last : activeIndex - 1
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = last
    if (next === null) return
    e.preventDefault()
    setActiveIndex(next)
    tabRefs.current[next]?.focus()
  }

  const loopSteps = agent.loop
    ? new Set(
        Array.from(
          { length: Math.abs(agent.loop.from - agent.loop.to) + 1 },
          (_, i) => Math.min(agent.loop!.from, agent.loop!.to) + i,
        ),
      )
    : new Set<number>()

  return (
    <div>
      <div
        role="tablist"
        aria-label="Planned AI agents"
        onKeyDown={handleKeyDown}
        className="grid gap-2 sm:grid-cols-3"
      >
        {agentWorkflows.map((a, i) => {
          const selected = i === activeIndex
          return (
            <button
              key={a.id}
              ref={(el) => {
                tabRefs.current[i] = el
              }}
              type="button"
              role="tab"
              id={`agent-tab-${a.id}`}
              aria-selected={selected}
              aria-controls={`agent-panel-${a.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveIndex(i)}
              data-cursor-hover
              className={clsx(
                'rounded-xl border px-4 py-3 text-left transition-colors duration-300',
                selected
                  ? 'border-accent/50 bg-accent/10'
                  : 'border-line bg-surface-2/60 hover:border-accent/30',
              )}
            >
              <span className="block font-mono text-[10px] tracking-widest text-ink-muted">
                AGENT {String.fromCharCode(65 + i)}
              </span>
              <span className={clsx('mt-1 block font-medium', selected ? 'text-accent' : 'text-ink')}>
                {a.name}
              </span>
            </button>
          )
        })}
      </div>

      <div
        role="tabpanel"
        id={`agent-panel-${agent.id}`}
        aria-labelledby={`agent-tab-${agent.id}`}
        className="mt-5 rounded-2xl border border-dashed border-violet/35 bg-surface/40 p-5 sm:p-6"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={agent.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <p className="max-w-xl text-ink">{agent.purpose}</p>
              <StatusPill status="planned" />
            </div>

            <div className="mt-6 flex flex-col items-start gap-3">
              <Terminal label="START" />
              <ol className="grid w-full gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {agent.steps.map((step, i) => (
                  <motion.li
                    key={step}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className={clsx(
                      'flex items-center gap-3 rounded-xl border px-3 py-2.5',
                      loopSteps.has(i)
                        ? 'border-violet/50 bg-violet/10'
                        : 'border-line bg-surface-2/70',
                    )}
                  >
                    <span className="font-mono text-[11px] text-accent">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-sm text-ink">{step}</span>
                  </motion.li>
                ))}
              </ol>
              {agent.loop && (
                <p className="inline-flex items-center gap-2 font-mono text-xs text-[#b9a6ff]">
                  <RotateCcw size={13} aria-hidden />
                  Loop: {agent.steps[agent.loop.from]} → {agent.steps[agent.loop.to]} · {agent.loop.label}
                </p>
              )}
              <Terminal label="END" />
            </div>

            <p className="mt-6 rounded-xl border border-cyan/25 bg-cyan/5 px-4 py-3 text-sm leading-relaxed text-ink-muted">
              {agent.today}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

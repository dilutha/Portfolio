import { motion } from 'framer-motion'
import { Lightbulb } from 'lucide-react'
import { dhack } from '@/data/leadershipExperience'

/** DHACK'26 workshop series — drawn as a branching series from one trunk. */
export function WorkshopSeries() {
  return (
    <section id="workshop-series" aria-labelledby="workshop-series-title" className="scroll-mt-24">
      <p className="font-mono text-sm tracking-widest text-[#b9a6ff]">03 — {dhack.title}</p>
      <h2 id="workshop-series-title" className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        Workshop Series
      </h2>
      <p className="mt-4 max-w-2xl leading-relaxed text-ink-muted">
        Four workshops spanning the path from framing a real-world problem to validating a user-centered solution.
      </p>

      <div className="relative mt-10">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet/40 bg-violet/10 px-4 py-1.5 font-mono text-xs text-[#c9baff]">
          <Lightbulb aria-hidden size={13} /> Workshop Series
        </div>
        <ol className="relative flex flex-col gap-4 pl-8 sm:pl-10">
          <span aria-hidden className="absolute bottom-10 left-3 top-0 w-px bg-gradient-to-b from-violet/60 to-violet/10 sm:left-4" />
          {dhack.workshops.map((w, i) => (
            <motion.li
              key={w.title}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <span aria-hidden className="absolute -left-5 top-1/2 h-px w-5 bg-violet/50 sm:-left-6 sm:w-6" />
              <div className="group flex items-start gap-4 rounded-2xl border border-line bg-surface-2/60 p-5 transition-colors hover:border-violet/50 sm:items-center sm:p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet/40 bg-violet/10 font-mono text-sm font-bold text-[#c9baff]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">Workshop {i + 1}</p>
                  <h3 className="mt-0.5 text-lg font-semibold text-ink">{w.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">“{w.body}”</p>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

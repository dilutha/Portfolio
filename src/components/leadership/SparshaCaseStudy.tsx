import { CircleCheck, HeartHandshake, Mic, Quote, Sparkles, Users } from 'lucide-react'
import { sparsha } from '@/data/leadershipExperience'
import { EventImage, EventSection } from './EventParts'

const HIGHLIGHT_ICONS = [Sparkles, Mic, Users]

/** Sparsha 2026 — image, event experience, then leadership & teamwork reflection. */
export function SparshaCaseStudy() {
  return (
    <section id={sparsha.id} aria-labelledby="sparsha-title" className="scroll-mt-24">
      <p className="font-mono text-sm tracking-widest text-[#b9a6ff]">01 — Sparsha 2026</p>
      <h2 id="sparsha-title" className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        <span aria-hidden className="mr-2">
          {sparsha.emoji}
        </span>
        {sparsha.title}
      </h2>

      <EventImage {...sparsha.image} className="mt-8" />

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-[11px] text-accent">
          <CircleCheck aria-hidden size={12} /> Completed
        </span>
        <span className="rounded-xl border border-violet/40 bg-violet/10 px-3 py-1 font-mono text-[11px] text-[#c9baff]">
          Role · {sparsha.role}
        </span>
      </div>

      <EventSection kicker="Event experience" title="A talent show and a live concert">
        <p className="max-w-3xl leading-relaxed text-ink-muted">{sparsha.summary}</p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-3">
          {sparsha.highlights.map((h, i) => {
            const Icon = HIGHLIGHT_ICONS[i % HIGHLIGHT_ICONS.length]
            return (
              <li key={h.title} className="rounded-2xl border border-line bg-surface-2/60 p-5">
                <Icon aria-hidden size={18} className="text-[#b9a6ff]" />
                <h4 className="mt-3 font-semibold text-ink">{h.title}</h4>
                <p className="mt-1 text-sm text-ink-muted">{h.body}</p>
              </li>
            )
          })}
        </ul>
      </EventSection>

      <EventSection kicker="Leadership & teamwork" title="Leading under pressure, together">
        <ul className="grid gap-3 sm:grid-cols-2">
          {sparsha.responsibilities.map((r) => (
            <li key={r} className="flex items-start gap-3 rounded-xl border border-line bg-surface/40 p-4 text-sm text-ink">
              <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b9a6ff]" />
              {r}
            </li>
          ))}
        </ul>

        <figure className="relative mt-5 rounded-2xl border border-line bg-surface-2/60 p-6 sm:p-8">
          <Quote aria-hidden size={28} className="absolute right-5 top-5 text-violet/40" />
          <figcaption className="mb-4 font-mono text-[11px] uppercase tracking-widest text-[#b9a6ff]">
            Reflection
          </figcaption>
          <blockquote className="flex flex-col gap-4 text-[15px] leading-relaxed text-ink-muted sm:text-base">
            {sparsha.reflection.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </blockquote>
        </figure>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-surface/40 p-5">
            <HeartHandshake aria-hidden size={18} className="text-[#b9a6ff]" />
            <h4 className="mt-3 font-semibold text-ink">Teamwork</h4>
            <p className="mt-1 text-sm leading-relaxed text-ink-muted">{sparsha.teamwork}</p>
          </div>
          <div className="rounded-2xl border border-accent/30 bg-accent/5 p-5">
            <CircleCheck aria-hidden size={18} className="text-accent" />
            <h4 className="mt-3 font-semibold text-ink">Outcome</h4>
            <p className="mt-1 text-sm leading-relaxed text-ink-muted">{sparsha.outcome}</p>
          </div>
        </div>
      </EventSection>
    </section>
  )
}

import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, CircleCheck, Crown, GraduationCap, Palette, School, Target } from 'lucide-react'
import { dhack } from '@/data/leadershipExperience'
import { FacebookIcon } from '@/components/icons/BrandIcons'
import { EventImage, EventSection } from './EventParts'

const TRACK_ICON = { university: GraduationCap, school: School, rebrand: Palette }

function ExternalPill({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${label} (opens in a new tab)`}
      data-cursor-hover
      className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 font-mono text-xs text-ink transition-colors hover:border-accent hover:text-accent"
    >
      {children}
    </a>
  )
}

/** DHACK'26 — image, overview, competition tracks, and my contribution as President. */
export function DhackCaseStudy() {
  return (
    <section id={dhack.id} aria-labelledby="dhack-title" className="scroll-mt-24">
      <p className="font-mono text-sm tracking-widest text-[#b9a6ff]">02 — {dhack.title}</p>
      <h2 id="dhack-title" className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {dhack.subtitle} {dhack.title}
      </h2>

      <div className="mt-8 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-center">
        <EventImage {...dhack.image} className="mx-auto w-full max-w-md" />
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-[11px] text-accent">
            <CircleCheck aria-hidden size={12} /> Successfully concluded
          </span>
          <dl className="mt-5 flex flex-col gap-3">
            <div className="rounded-xl border border-violet/40 bg-violet/10 p-4">
              <dt className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-[#b9a6ff]">
                <Crown aria-hidden size={12} /> My role
              </dt>
              <dd className="mt-1 font-semibold text-ink">{dhack.role}</dd>
              <dd className="mt-1 text-sm text-ink-muted">{dhack.roleDetail}</dd>
            </div>
            <div className="rounded-xl border border-line bg-surface-2/60 p-4">
              <dt className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">Organized by</dt>
              <dd className="mt-1 text-sm text-ink">{dhack.organizer.join(', ')}</dd>
            </div>
          </dl>
          <div className="mt-5 flex flex-wrap gap-2">
            <ExternalPill href={dhack.links.facebook} label="DHACK on Facebook">
              <FacebookIcon size={14} /> DHACK on Facebook
            </ExternalPill>
            <ExternalPill href={dhack.links.website} label="DHACK website">
              dhack.lk <ArrowUpRight aria-hidden size={13} />
            </ExternalPill>
          </div>
        </div>
      </div>

      <EventSection kicker="Overview" title="A multi-category AI innovation challenge">
        <p className="max-w-3xl leading-relaxed text-ink-muted">{dhack.overview}</p>
        <figure className="mt-5 rounded-2xl border border-violet/30 bg-violet/10 p-5">
          <figcaption className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#b9a6ff]">
            <Target aria-hidden size={13} /> Mission
          </figcaption>
          <blockquote className="mt-2 leading-relaxed text-ink">“{dhack.mission}”</blockquote>
        </figure>
        <p className="mb-2 mt-5 font-mono text-[11px] uppercase tracking-widest text-ink-muted">Core focus</p>
        <ul className="flex flex-wrap gap-2">
          {dhack.focus.map((f) => (
            <li key={f} className="rounded-full border border-line-strong bg-white/5 px-3 py-1 font-mono text-xs text-ink-muted">
              {f}
            </li>
          ))}
        </ul>
      </EventSection>

      <EventSection kicker="Competition tracks" title="Three tracks, three audiences">
        <ul className="grid gap-3 md:grid-cols-3">
          {dhack.tracks.map((t) => {
            const Icon = TRACK_ICON[t.icon]
            return (
              <li key={t.id} className="flex flex-col rounded-2xl border border-line bg-surface-2/60 p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-violet/40 bg-violet/10 text-[#b9a6ff]">
                  <Icon aria-hidden size={16} />
                </span>
                <h4 className="mt-3 font-semibold text-ink">{t.name}</h4>
                <p className="mt-1 text-sm text-ink-muted">{t.audience}</p>
                <ul className="mt-4 flex flex-col gap-1.5 border-t border-line pt-4">
                  {t.requirements.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-sm text-ink">
                      <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#b9a6ff]" />
                      {r}
                    </li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ul>
      </EventSection>

      <EventSection kicker="My contribution" title="Leading DHACK'26 as President">
        <div className="relative overflow-hidden rounded-2xl border border-violet/40 bg-surface-2/70 p-6">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(70% 100% at 0% 0%, rgb(139 107 255 / 0.16), transparent 70%)' }}
          />
          <div className="relative">
            <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#b9a6ff]">
              <Crown aria-hidden size={13} /> President
            </p>
            <p className="mt-2 text-lg font-semibold text-ink">{dhack.role}</p>
            <p className="mt-1 text-ink-muted">{dhack.roleDetail}</p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Leadership areas">
              {dhack.leadershipThemes.map((t) => (
                <li key={t} className="rounded-full border border-violet/40 bg-violet/10 px-3 py-1 font-mono text-xs text-[#c9baff]">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mb-3 mt-6 font-mono text-[11px] uppercase tracking-widest text-ink-muted">Also built for DHACK</p>
        <ul className="grid gap-3 md:grid-cols-2">
          {dhack.contributions.map((c) => (
            <li key={c.title} className="flex flex-col rounded-2xl border border-line bg-surface-2/60 p-5">
              <h4 className="font-semibold text-ink">{c.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{c.body}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {c.skills.map((s) => (
                  <li key={s} className="rounded-full border border-line-strong px-2.5 py-0.5 font-mono text-[11px] text-ink-muted">
                    {s}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap items-center gap-4 pt-4">
                <Link
                  to={c.detailPath}
                  data-cursor-hover
                  className="inline-flex items-center gap-1 font-mono text-xs text-accent hover:text-accent-dim"
                >
                  View details <ArrowUpRight aria-hidden size={13} />
                </Link>
                <a
                  href={c.link.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-hover
                  className="inline-flex items-center gap-1 font-mono text-xs text-ink-muted hover:text-accent"
                >
                  {c.link.label} <ArrowUpRight aria-hidden size={13} />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </EventSection>
    </section>
  )
}

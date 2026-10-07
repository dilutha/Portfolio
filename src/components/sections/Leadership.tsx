import { Link } from 'react-router-dom'
import { ArrowUpRight, Crown, Feather, PenLine } from 'lucide-react'
import type { ReactNode } from 'react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Timeline, TimelineItem } from '@/components/ui/Timeline'
import { AmbientGlow } from '@/components/ui/AmbientGlow'
import { SectionConnector } from '@/components/ui/SectionConnector'
import { leadershipEntries, type LeadershipEntry } from '@/data/leadership'

function GroupLabel({ icon, children }: { icon: ReactNode; children: string }) {
  return (
    <h3 className="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#b9a6ff]">
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-violet/40 bg-violet/10">
        {icon}
      </span>
      {children}
    </h3>
  )
}

function EntryBody({ entry }: { entry: LeadershipEntry }) {
  if (entry.work) {
    const { work } = entry
    return (
      <div className="mt-4 max-w-2xl rounded-2xl border border-line bg-surface-2/60 p-5 sm:p-6">
        <p lang={work.lang} className="text-2xl font-semibold leading-snug text-ink sm:text-3xl">
          {work.title}
        </p>
        <p className="mt-1 font-mono text-sm text-ink-muted">{work.englishTitle}</p>
        <p className="mt-3 text-ink-muted">{entry.description}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="rounded-full border border-violet/40 bg-violet/10 px-3 py-1 font-mono text-[11px] text-[#c9baff]">
            {work.genre}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ffb547]/40 bg-[#ffb547]/10 px-3 py-1 font-mono text-[11px] text-[#ffc670]">
            <PenLine aria-hidden size={11} /> Status: {work.status.label}
          </span>
          <span className="text-sm text-ink-muted">{work.status.detail}</span>
        </div>
      </div>
    )
  }

  return (
    <>
      {entry.description && <p className="mt-3 max-w-2xl text-ink-muted">{entry.description}</p>}
      {entry.experiencePath && (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Link
            to={entry.experiencePath}
            data-cursor-hover
            className="inline-flex items-center gap-2 rounded-full border border-violet/50 bg-violet/10 px-4 py-2 font-mono text-xs text-[#c9baff] transition-colors hover:border-violet hover:bg-violet/20"
          >
            <Crown aria-hidden size={13} /> View Leadership Experience <ArrowUpRight aria-hidden size={13} />
          </Link>
          <span className="font-mono text-[11px] text-ink-muted">Sparsha 2026 · DHACK&apos;26</span>
        </div>
      )}
    </>
  )
}

const GROUPS = [
  { category: 'leadership' as const, label: 'Leadership', icon: <Crown aria-hidden size={14} /> },
  { category: 'extra-curricular' as const, label: 'Extra-Curricular', icon: <Feather aria-hidden size={14} /> },
]

export function Leadership() {
  return (
    <section id="leadership" className="relative bg-surface py-28 sm:py-36">
      <SectionConnector />
      <AmbientGlow tone="violet" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          index="06 — Beyond Code"
          title="Leadership & Extra-Curricular"
          description="Academic and community leadership alongside creative pursuits."
        />

        <div className="flex flex-col gap-16">
          {GROUPS.map((group) => (
            <div key={group.category}>
              <GroupLabel icon={group.icon}>{group.label}</GroupLabel>
              <Timeline>
                {leadershipEntries
                  .filter((e) => e.category === group.category)
                  .map((entry, i) => (
                    <TimelineItem
                      key={entry.id}
                      title={entry.role}
                      subtitle={entry.organization}
                      period={entry.period}
                      index={i}
                    >
                      <EntryBody entry={entry} />
                    </TimelineItem>
                  ))}
              </Timeline>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

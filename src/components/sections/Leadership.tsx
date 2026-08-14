import { SectionHeading } from '@/components/ui/SectionHeading'
import { Timeline, TimelineItem } from '@/components/ui/Timeline'
import { AmbientGlow } from '@/components/ui/AmbientGlow'
import { SectionConnector } from '@/components/ui/SectionConnector'
import { leadershipEntries } from '@/data/leadership'

export function Leadership() {
  return (
    <section id="leadership" className="relative bg-surface py-28 sm:py-36">
      <SectionConnector />
      <AmbientGlow tone="violet" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          index="06 — Beyond Code"
          title="Leadership & extra curricular"
          description="Responsibility and representation outside the codebase."
        />

        <Timeline>
          {leadershipEntries.map((entry, i) => (
            <TimelineItem
              key={entry.id}
              title={entry.role}
              subtitle={entry.organization}
              period={entry.period}
              index={i}
            >
              <p className="mt-3 max-w-2xl text-ink-muted">{entry.description}</p>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </section>
  )
}

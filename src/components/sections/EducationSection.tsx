import { ExternalLink } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Timeline, TimelineItem } from '@/components/ui/Timeline'
import { Badge } from '@/components/ui/Badge'
import { AmbientGlow } from '@/components/ui/AmbientGlow'
import { SectionConnector } from '@/components/ui/SectionConnector'
import { educationTimeline, certifications } from '@/data/profile'

export function EducationSection() {
  const items = [...educationTimeline, ...certifications]

  return (
    <section id="education" className="relative bg-surface py-28 sm:py-36">
      <SectionConnector />
      <AmbientGlow tone="mixed" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          index="02 — Journey"
          title="Education & certifications"
          description="Academic foundation and self-directed learning behind the engineering work."
        />

        <Timeline>
          {items.map((item, i) => (
            <TimelineItem
              key={item.id}
              title={item.title}
              subtitle={item.place}
              period={item.period}
              index={i}
            >
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <Badge tone={item.kind === 'education' ? 'accent' : 'default'}>
                  {item.kind === 'education' ? 'Education' : 'Certification'}
                </Badge>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor-hover
                    className="inline-flex items-center gap-1 font-mono text-xs text-ink-muted transition-colors hover:text-accent"
                  >
                    View credential <ExternalLink size={12} />
                  </a>
                )}
              </div>
              {item.detail && <p className="mt-3 max-w-xl text-ink-muted">{item.detail}</p>}
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </section>
  )
}

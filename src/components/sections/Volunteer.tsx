import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { GithubIcon } from '@/components/icons/BrandIcons'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Timeline, TimelineItem } from '@/components/ui/Timeline'
import { Badge } from '@/components/ui/Badge'
import { AmbientGlow } from '@/components/ui/AmbientGlow'
import { SectionConnector } from '@/components/ui/SectionConnector'
import { volunteerEntries } from '@/data/volunteer'

export function Volunteer() {
  return (
    <section id="volunteer" className="relative bg-void py-28 sm:py-36">
      <SectionConnector />
      <AmbientGlow tone="mixed" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          index="05 — Community"
          title="Volunteer projects"
          description="Building and running the platforms behind DHACK, Sri Lanka's AI innovation hackathon."
        />

        <Timeline>
          {volunteerEntries.map((entry, i) => (
            <TimelineItem
              key={entry.id}
              title={entry.organization}
              subtitle={entry.role}
              period={entry.period}
              index={i}
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="mt-4 max-w-2xl"
              >
                <p className="text-ink-muted">{entry.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {entry.techStack.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-5">
                  <Link
                    to={`/volunteer/${entry.id}`}
                    data-cursor-hover
                    className="inline-flex items-center gap-1 font-mono text-xs text-accent"
                  >
                    View Details <ArrowUpRight size={13} />
                  </Link>
                  {entry.links.live && (
                    <a
                      href={entry.links.live}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor-hover
                      className="inline-flex items-center gap-1 font-mono text-xs text-ink-muted hover:text-accent"
                    >
                      Visit Site <ArrowUpRight size={13} />
                    </a>
                  )}
                  {entry.links.github && (
                    <a
                      href={entry.links.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub"
                      data-cursor-hover
                      className="text-ink-muted transition-colors hover:text-accent"
                    >
                      <GithubIcon size={16} />
                    </a>
                  )}
                </div>
              </motion.div>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </section>
  )
}

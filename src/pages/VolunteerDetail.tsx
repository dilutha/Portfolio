import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { GithubIcon } from '@/components/icons/BrandIcons'
import { PageTransition } from '@/components/layout/PageTransition'
import { Badge } from '@/components/ui/Badge'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { volunteerEntries } from '@/data/volunteer'

export default function VolunteerDetail() {
  const { id } = useParams()
  const entry = volunteerEntries.find((e) => e.id === id)

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [id])

  if (!entry) {
    return <Navigate to="/" replace />
  }

  return (
    <PageTransition>
      <article className="bg-void pb-28 pt-28">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            to="/#volunteer"
            data-cursor-hover
            className="inline-flex items-center gap-2 font-mono text-sm text-ink-muted transition-colors hover:text-accent"
          >
            <ArrowLeft size={15} /> Back to Volunteer & Leadership
          </Link>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 font-mono text-sm tracking-widest text-accent"
          >
            {entry.role} · {entry.period}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 }}
            className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
          >
            {entry.organization}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mt-6 text-lg leading-relaxed text-ink-muted"
          >
            {entry.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            {entry.links.github && (
              <MagneticButton variant="secondary" href={entry.links.github} target="_blank" rel="noreferrer">
                <GithubIcon size={16} /> View Code
              </MagneticButton>
            )}
            {entry.links.live && (
              <MagneticButton variant="primary" href={entry.links.live} target="_blank" rel="noreferrer">
                Visit Site <ArrowUpRight size={16} />
              </MagneticButton>
            )}
          </motion.div>

          <section className="mt-16">
            <h2 className="font-mono text-sm tracking-widest text-accent">Responsibilities</h2>
            <ul className="mt-5 flex flex-col gap-4">
              {entry.responsibilities.map((r, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ delay: i * 0.06 }}
                  className="border-l-2 border-accent/40 pl-4 text-ink-muted"
                >
                  {r}
                </motion.li>
              ))}
            </ul>
          </section>

          <section className="mt-16">
            <h2 className="font-mono text-sm tracking-widest text-accent">Tech Stack</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {entry.techStack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </section>
        </div>
      </article>
    </PageTransition>
  )
}

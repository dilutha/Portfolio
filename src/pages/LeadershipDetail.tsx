import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Crown } from 'lucide-react'
import { PageTransition } from '@/components/layout/PageTransition'
import { CaseStudyNav } from '@/components/projects/case-study/primitives'
import { SparshaCaseStudy } from '@/components/leadership/SparshaCaseStudy'
import { DhackCaseStudy } from '@/components/leadership/DhackCaseStudy'
import { WorkshopSeries } from '@/components/leadership/WorkshopSeries'
import { leadershipEntries } from '@/data/leadership'
import { leadershipRole } from '@/data/leadershipExperience'
import { usePageMeta } from '@/hooks/usePageMeta'

const SECTIONS = [
  { id: 'sparsha-2026', label: 'Sparsha 2026' },
  { id: 'dhack-26', label: "DHACK'26" },
  { id: 'workshop-series', label: 'Workshop Series' },
]

function BackToLeadership() {
  return (
    <Link
      to="/#leadership"
      data-cursor-hover
      className="inline-flex items-center gap-2 font-mono text-sm text-ink-muted transition-colors hover:text-accent"
    >
      <ArrowLeft size={15} aria-hidden /> Back to Leadership
    </Link>
  )
}

/** Leadership experience — route-based, mirroring the project case-study pages. */
export default function LeadershipDetail() {
  const { id } = useParams()
  const entry = leadershipEntries.find((e) => e.id === id && e.experiencePath)

  usePageMeta({
    title: `President, Student Association of IT — Leadership | Dilutha Weerasinghe`,
    description:
      "Leadership experience as President of the Student Association of Information Technology, University of Sri Jayewardenepura — Sparsha 2026 and DHACK'26.",
    path: `/leadership/${id}`,
    type: 'article',
  })

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [id])

  if (!entry) return <Navigate to="/" replace />

  return (
    <PageTransition>
      <article className="bg-void pb-28 pt-28">
        <div className="mx-auto max-w-4xl px-6">
          <BackToLeadership />

          <header className="relative mt-8 overflow-hidden rounded-3xl border border-violet/30 bg-surface-2/60 p-6 sm:p-8">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ background: 'radial-gradient(60% 120% at 0% 0%, rgb(139 107 255 / 0.18), transparent 70%)' }}
            />
            <div className="relative flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-violet/40 bg-violet/15 text-[#c9baff]">
                <Crown aria-hidden size={22} />
              </span>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-[#b9a6ff]">
                  Leadership Experience · {leadershipRole.period}
                </p>
                <motion.h1
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-1 text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
                >
                  {leadershipRole.role}
                </motion.h1>
                <p className="mt-2 text-lg text-ink">{leadershipRole.organization}</p>
                <p className="text-ink-muted">{leadershipRole.institution}</p>
              </div>
            </div>
          </header>

          <div className="mt-8">
            <CaseStudyNav sections={SECTIONS} />
          </div>

          <div className="mt-16 flex flex-col gap-24">
            <SparshaCaseStudy />
            <DhackCaseStudy />
            <WorkshopSeries />
          </div>

          <div className="mt-20 border-t border-line pt-8">
            <BackToLeadership />
          </div>
        </div>
      </article>
    </PageTransition>
  )
}

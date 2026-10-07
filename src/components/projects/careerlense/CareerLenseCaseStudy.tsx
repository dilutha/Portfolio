import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { ArrowRight, ArrowUpRight, Database, Snowflake } from 'lucide-react'
import type { Project } from '@/data/projects'
import {
  dataArchitecture,
  engineeringChallenges,
  keyFeatures,
  knowledgeSources,
  overview,
  ragPipeline,
  roadmap,
} from '@/data/careerlense'
import { GithubIcon } from '@/components/icons/BrandIcons'
import { Badge } from '@/components/ui/Badge'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { ArchitectureDiagram } from './ArchitectureDiagram'
import { RequestFlow } from './RequestFlow'
import { AgentWorkflows } from './AgentWorkflows'
import {
  CaseSection,
  CaseStudyNav,
  StatusLegend,
  StatusPill,
} from '@/components/projects/case-study/primitives'

const SECTIONS = [
  { id: 'cl-overview', label: 'Overview' },
  { id: 'cl-features', label: 'Features' },
  { id: 'cl-architecture', label: 'Architecture' },
  { id: 'cl-how-it-works', label: 'How it works' },
  { id: 'cl-rag', label: 'RAG' },
  { id: 'cl-agents', label: 'AI Agents' },
  { id: 'cl-data', label: 'Data' },
  { id: 'cl-stack', label: 'Stack' },
  { id: 'cl-roadmap', label: 'Roadmap' },
  { id: 'cl-challenges', label: 'Challenges' },
]

const reveal = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-8% 0px' },
} as const

export function CareerLenseCaseStudy({ project }: { project: Project }) {
  return (
    <div className="mt-14">
      <CaseStudyNav sections={SECTIONS}>
        <StatusLegend className="mt-4 border-t border-line pt-4" />
      </CaseStudyNav>

      {/* 1–3 · Overview, problem, solution */}
      <CaseSection id="cl-overview" index="01 — Overview" title="From “looking for a job” to “ready for this job”">
        <div className="grid gap-4 md:grid-cols-2">
          <motion.div {...reveal} className="rounded-2xl border border-line bg-surface-2/60 p-6">
            <h3 className="font-mono text-xs uppercase tracking-widest text-accent">Problem</h3>
            <p className="mt-3 leading-relaxed text-ink-muted">{overview.problem}</p>
          </motion.div>
          <motion.div {...reveal} className="rounded-2xl border border-line bg-surface-2/60 p-6">
            <h3 className="font-mono text-xs uppercase tracking-widest text-accent">Solution</h3>
            <p className="mt-3 leading-relaxed text-ink-muted">{overview.solution}</p>
          </motion.div>
        </div>
        <motion.p
          {...reveal}
          className="mt-4 rounded-2xl border border-cyan/25 bg-cyan/5 p-5 text-sm leading-relaxed text-ink-muted"
        >
          <span className="font-semibold text-ink">Built progressively. </span>
          {overview.progressive}
        </motion.p>
      </CaseSection>

      {/* 4 · Key features */}
      <CaseSection id="cl-features" index="02 — Key Features" title="What candidates can do today">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {keyFeatures.map((f, i) => (
            <motion.li
              key={f.title}
              {...reveal}
              transition={{ delay: (i % 3) * 0.06 }}
              className="flex flex-col gap-3 rounded-2xl border border-line bg-surface-2/60 p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold text-ink">{f.title}</h3>
                <StatusPill status={f.status} />
              </div>
              <p className="text-sm leading-relaxed text-ink-muted">{f.body}</p>
            </motion.li>
          ))}
        </ul>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="font-mono text-sm tracking-widest text-accent">Engineering highlights</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {project.achievements.map((a) => (
                <li key={a} className="border-l-2 border-accent/40 pl-4 text-sm leading-relaxed text-ink-muted">
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-sm tracking-widest text-accent">Product capabilities</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {project.features.map((f) => (
                <li key={f} className="border-l-2 border-line-strong pl-4 text-sm leading-relaxed text-ink-muted">
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CaseSection>

      {/* 5 · System architecture */}
      <CaseSection
        id="cl-architecture"
        index="03 — System Architecture"
        title="Target architecture, layer by layer"
        intro="The full target system, with every component marked by what exists today. Use the filter to see only what is built, or only what is planned."
      >
        <ArchitectureDiagram />
      </CaseSection>

      {/* 6 · AI architecture */}
      <CaseSection
        id="cl-how-it-works"
        index="04 — AI Architecture"
        title="How CareerLense AI works"
        intro="What happens when a candidate asks a career question. Select a step to see what it does — and how it is implemented today where that differs from the target design."
      >
        <RequestFlow />
        <motion.div {...reveal} className="mt-10">
          <h3 className="font-semibold text-ink">What the system is designed to combine</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {knowledgeSources.map((group) => (
              <div key={group.group} className="rounded-2xl border border-line bg-surface-2/60 p-5">
                <p className="font-mono text-[11px] uppercase tracking-widest text-accent">{group.group}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line-strong bg-white/5 px-3 py-1 font-mono text-xs text-ink-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </CaseSection>

      {/* 7 · RAG pipeline */}
      <CaseSection
        id="cl-rag"
        index="05 — RAG Pipeline"
        title="Retrieval-augmented generation"
        intro="The planned retrieval pipeline that will ground every answer in the most relevant jobs, skills, and career knowledge. Today, context is assembled with deterministic SQL queries over structured tables and passed to Gemini — no vector search yet."
      >
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="RAG pipeline stages">
          {ragPipeline.map((step, i) => (
            <motion.li
              key={step.id}
              {...reveal}
              transition={{ delay: (i % 4) * 0.06 }}
              className={clsx(
                'relative flex flex-col gap-2 rounded-2xl border p-4',
                step.status === 'planned'
                  ? 'border-dashed border-violet/40 bg-surface/40'
                  : 'border-line bg-surface-2/70',
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] text-accent">{String(i + 1).padStart(2, '0')}</span>
                <StatusPill status={step.status} />
              </div>
              <h3 className="font-semibold text-ink">{step.title}</h3>
              <p className="text-sm leading-relaxed text-ink-muted">{step.body}</p>
              {i < ragPipeline.length - 1 && (i + 1) % 4 !== 0 && (
                <ArrowRight
                  aria-hidden
                  size={14}
                  className="absolute -right-2.5 top-1/2 hidden -translate-y-1/2 rounded-full bg-void text-accent/70 lg:block"
                />
              )}
            </motion.li>
          ))}
        </ol>
      </CaseSection>

      {/* 8 · Agent architecture */}
      <CaseSection
        id="cl-agents"
        index="06 — AI Agents"
        title="Planned agent workflows"
        intro="Three LangGraph agents are planned to replace today’s single-pass pipelines with explicit, inspectable state graphs — including critique and validation loops. Each tab notes what already exists in the codebase."
      >
        <AgentWorkflows />
      </CaseSection>

      {/* 9 · Data architecture */}
      <CaseSection
        id="cl-data"
        index="07 — Data Architecture"
        title="Structured data first"
        intro="A normalised PostgreSQL schema on Supabase — 12 migrations with Row Level Security on every user-owned table — is the foundation the AI layer reasons over."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {dataArchitecture.map((g) => (
            <motion.div key={g.group} {...reveal} className="rounded-2xl border border-line bg-surface-2/60 p-5">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold text-ink">{g.group}</h3>
                <StatusPill status="live" />
              </div>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {g.tables.map((t) => (
                  <li key={t} className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-[11px] text-ink-muted">
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <motion.div {...reveal} className="rounded-2xl border border-dashed border-violet/40 bg-surface/40 p-5">
            <div className="flex items-center justify-between gap-2">
              <h3 className="inline-flex items-center gap-2 font-semibold text-ink">
                <Database size={16} aria-hidden className="text-[#b9a6ff]" /> pgvector
              </h3>
              <StatusPill status="planned" />
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Vector embeddings for jobs, skills, and knowledge documents, stored alongside the relational data
              they describe.
            </p>
          </motion.div>
          <motion.div {...reveal} className="rounded-2xl border border-dashed border-violet/40 bg-surface/40 p-5">
            <div className="flex items-center justify-between gap-2">
              <h3 className="inline-flex items-center gap-2 font-semibold text-ink">
                <Snowflake size={16} aria-hidden className="text-[#b9a6ff]" /> Snowflake
              </h3>
              <StatusPill status="planned" />
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Analytical warehouse for job-market analytics and skill-trend reporting, fed by an ETL/ELT pipeline.
            </p>
          </motion.div>
        </div>
      </CaseSection>

      {/* 10 · Technology stack */}
      <CaseSection id="cl-stack" index="08 — Technology Stack" title="Implemented vs. planned">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-line bg-surface-2/60 p-6">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold text-ink">Implemented in the repository</h3>
              <StatusPill status="live" />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.techStack.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          </div>
          {project.plannedStack && (
            <div className="rounded-2xl border border-dashed border-violet/40 bg-surface/40 p-6">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold text-ink">Planned / target architecture</h3>
                <StatusPill status="planned" />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.plannedStack.map((t) => (
                  <Badge key={t} tone="planned">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CaseSection>

      {/* 11 · Roadmap */}
      <CaseSection id="cl-roadmap" index="09 — Development Roadmap" title="Where it is, and where it’s going">
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {roadmap.map((r, i) => (
            <motion.li
              key={r.phase}
              {...reveal}
              transition={{ delay: (i % 3) * 0.06 }}
              className={clsx(
                'rounded-2xl border p-5',
                r.status === 'planned'
                  ? 'border-dashed border-violet/40 bg-surface/40'
                  : 'border-line bg-surface-2/60',
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs text-accent">Phase {r.phase}</span>
                <StatusPill status={r.status} />
              </div>
              <h3 className="mt-2 font-semibold text-ink">{r.title}</h3>
              <ul className="mt-3 flex flex-col gap-1.5">
                {r.items.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-ink-muted">
                    — {item}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>
      </CaseSection>

      {/* 12 · Engineering challenges */}
      <CaseSection id="cl-challenges" index="10 — Engineering Challenges" title="Hard parts, and how they were handled">
        <ul className="grid gap-4 md:grid-cols-2">
          {engineeringChallenges.map((c) => (
            <motion.li key={c.title} {...reveal} className="rounded-2xl border border-line bg-surface-2/60 p-5">
              <h3 className="font-semibold text-ink">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{c.body}</p>
            </motion.li>
          ))}
        </ul>
        {project.honestTradeoffs && (
          <div className="mt-4 rounded-2xl border border-line bg-surface-2/60 p-6">
            <h3 className="font-mono text-sm tracking-widest text-ink-muted">
              Engineering Honesty — Current Limitations
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {project.honestTradeoffs.map((t) => (
                <li key={t} className="text-sm leading-relaxed text-ink-muted">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CaseSection>

      {/* 13–14 · Live demo + repository */}
      <motion.section
        {...reveal}
        aria-label="Try CareerLense AI"
        className="relative mt-20 overflow-hidden rounded-3xl border border-accent/30 bg-surface-2/60 p-8 text-center sm:p-10"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 80% at 50% 0%, rgb(0 255 166 / 0.12), transparent 70%)',
          }}
        />
        <div className="relative">
          <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">See it running</h2>
          <p className="mx-auto mt-3 max-w-xl text-ink-muted">
            The product layer is live. Explore the app, or read the code, migrations, and architecture docs.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            {project.links.live && (
              <MagneticButton
                variant="primary"
                href={project.links.live}
                target="_blank"
                rel="noreferrer"
                ariaLabel="Open the CareerLense AI live demo (opens in a new tab)"
              >
                Live Demo <ArrowUpRight size={16} aria-hidden />
              </MagneticButton>
            )}
            {project.links.github && (
              <MagneticButton
                variant="secondary"
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                ariaLabel="View the CareerLense AI repository on GitHub (opens in a new tab)"
              >
                <GithubIcon size={16} /> GitHub Repository
              </MagneticButton>
            )}
          </div>
        </div>
      </motion.section>
    </div>
  )
}

import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import {
  ArrowRight,
  ArrowUpRight,
  Cloud,
  Database,
  HelpCircle,
  Flame,
  FolderTree,
  HardDrive,
  History,
  LayoutDashboard,
  ScanLine,
  ShieldAlert,
} from 'lucide-react'
import type { Project } from '@/data/projects'
import {
  dataset,
  deployment,
  evolution,
  featureCards,
  futureImprovements,
  gradCamPipeline,
  pneumoOverview,
  problem,
  repoStructure,
  stackGroups,
  systemFlow,
  trainingConfig,
  trainingPhases,
  whyDenseNet,
  type RepoNode,
} from '@/data/pneumoscan'
import { GithubIcon } from '@/components/icons/BrandIcons'
import { Badge } from '@/components/ui/Badge'
import { MagneticButton } from '@/components/ui/MagneticButton'
import {
  CaseSection,
  CaseStudyNav,
  FlowConnector,
  StatusPill,
  StepFlow,
} from '@/components/projects/case-study/primitives'
import { ModelArchitectureDiagram } from './ModelArchitectureDiagram'

const SECTIONS = [
  { id: 'ps-overview', label: 'Overview' },
  { id: 'ps-problem', label: 'Problem' },
  { id: 'ps-evolution', label: 'Evolution' },
  { id: 'ps-model', label: 'Model' },
  { id: 'ps-training', label: 'Training' },
  { id: 'ps-performance', label: 'Performance' },
  { id: 'ps-gradcam', label: 'Grad-CAM' },
  { id: 'ps-system', label: 'System' },
  { id: 'ps-features', label: 'Features' },
  { id: 'ps-dataset', label: 'Dataset' },
  { id: 'ps-stack', label: 'Tech Stack' },
  { id: 'ps-deployment', label: 'Deployment' },
  { id: 'ps-repo', label: 'Repository' },
  { id: 'ps-future', label: 'Future' },
]

const FEATURE_ICON = { scan: ScanLine, heat: Flame, history: History, ui: LayoutDashboard }

const reveal = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-8% 0px' },
} as const

function Disclaimer({ children }: { children: string }) {
  return (
    <p className="flex gap-3 rounded-2xl border border-[#ffb547]/30 bg-[#ffb547]/5 p-4 text-sm leading-relaxed text-ink-muted">
      <ShieldAlert aria-hidden size={18} className="mt-0.5 shrink-0 text-[#ffc670]" />
      <span>{children}</span>
    </p>
  )
}

function RepoTree({ nodes }: { nodes: RepoNode[] }) {
  return (
    <ul className="mt-3 flex flex-col gap-2 border-l border-line pl-4">
      {nodes.map((n) => (
        <li key={n.name} className="relative">
          <span aria-hidden className="absolute -left-4 top-2.5 h-px w-3 bg-line" />
          <code className="break-all font-mono text-xs text-ink">{n.name}</code>
          {n.note && <span className="block text-xs text-ink-muted">{n.note}</span>}
        </li>
      ))}
    </ul>
  )
}

export function PneumoScanCaseStudy({ project }: { project: Project }) {
  return (
    <div className="mt-14">
      <CaseStudyNav sections={SECTIONS} />

      {/* 5.1 Overview */}
      <CaseSection
        id="ps-overview"
        index="01 — Project Overview"
        title="A clinical AI prototype, designed for interpretable AI"
        intro={pneumoOverview.goal}
      >
        <ul className="flex flex-wrap gap-2" aria-label="Platform capabilities">
          {pneumoOverview.capabilities.map((c) => (
            <li key={c} className="rounded-full border border-line-strong bg-white/5 px-3 py-1 font-mono text-xs text-ink-muted">
              {c}
            </li>
          ))}
        </ul>
        <h3 className="mb-4 mt-10 font-semibold text-ink">Inference workflow</h3>
        <StepFlow steps={pneumoOverview.workflow} label="PneumoScan AI inference workflow" highlight={3} />
      </CaseSection>

      {/* Problem */}
      <CaseSection id="ps-problem" index="02 — Problem" title="A label alone isn’t enough" intro={problem.statement}>
        <ul className="grid gap-3 md:grid-cols-3">
          {problem.questions.map((q) => (
            <motion.li key={q} {...reveal} className="flex gap-3 rounded-2xl border border-line bg-surface-2/60 p-5">
              <HelpCircle aria-hidden size={18} className="mt-0.5 shrink-0 text-accent" />
              <span className="text-sm leading-relaxed text-ink">{q}</span>
            </motion.li>
          ))}
        </ul>
      </CaseSection>

      {/* 5.2 Evolution */}
      <CaseSection
        id="ps-evolution"
        index="03 — Project Evolution"
        title="From prototype to production-style platform"
        intro="The project was rebuilt rather than patched: the legacy Streamlit prototype proved the idea, and Version 2 re-engineered the model, added explainability, and separated the system into an API, a frontend, and persistent storage."
      >
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-stretch">
          {evolution.versions.map((v, i) => (
            <motion.div
              key={v.id}
              {...reveal}
              className={clsx(
                'rounded-2xl border p-6',
                i === 0 ? 'border-line bg-surface/40 md:col-start-1' : 'border-accent/30 bg-surface-2/70 md:col-start-3',
              )}
            >
              <p className={clsx('font-mono text-xs tracking-widest', i === 0 ? 'text-ink-muted' : 'text-accent')}>
                {v.label}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-ink">{v.name}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {v.points.map((pt) => (
                  <li
                    key={pt}
                    className={clsx(
                      'rounded-lg border px-2.5 py-1 font-mono text-xs',
                      i === 0 ? 'border-line text-ink-muted' : 'border-accent/25 bg-accent/5 text-ink',
                    )}
                  >
                    {pt}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
          <div aria-hidden className="hidden items-center justify-center md:col-start-2 md:row-start-1 md:flex">
            <ArrowRight size={18} className="text-accent/70" />
          </div>
        </div>
        <div className="mt-6">
          <StepFlow steps={evolution.path} columns={3} label="Engineering evolution path" />
        </div>
      </CaseSection>

      {/* 5.3 + 5.4 Model */}
      <CaseSection
        id="ps-model"
        index="04 — AI Model Architecture"
        title="DenseNet121, fine-tuned for binary classification"
        intro="PneumoScan AI uses DenseNet121 pretrained on ImageNet and fine-tuned to classify 224×224×3 chest X-ray images as NORMAL or PNEUMONIA."
      >
        <ModelArchitectureDiagram />
        <h3 className="mb-4 mt-12 font-semibold text-ink">Why DenseNet121</h3>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {whyDenseNet.map((w, i) => (
            <motion.li
              key={w.title}
              {...reveal}
              transition={{ delay: (i % 3) * 0.05 }}
              className="rounded-2xl border border-line bg-surface-2/60 p-5"
            >
              <h4 className="font-semibold text-ink">{w.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{w.body}</p>
            </motion.li>
          ))}
        </ul>
      </CaseSection>

      {/* 5.5 Training */}
      <CaseSection
        id="ps-training"
        index="05 — Training Strategy"
        title="Two-phase transfer learning"
        intro="The classification head is trained first on a frozen backbone, then deeper layers are unfrozen at a much lower learning rate so pretrained features adapt to X-rays without being destroyed."
      >
        <ol className="grid gap-4 md:grid-cols-2">
          {trainingPhases.map((p) => (
            <motion.li key={p.phase} {...reveal} className="rounded-2xl border border-line bg-surface-2/60 p-6">
              <p className="font-mono text-xs tracking-widest text-accent">{p.phase}</p>
              <h3 className="mt-1 text-lg font-semibold text-ink">{p.title}</h3>
              <dl className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/5 p-3">
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">Epochs</dt>
                  <dd className="mt-1 font-mono text-xl text-ink">{p.epochs}</dd>
                </div>
                <div className="rounded-xl bg-white/5 p-3">
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">Learning rate</dt>
                  <dd className="mt-1 font-mono text-xl text-ink">{p.lr}</dd>
                </div>
              </dl>
              <p className="mt-4 text-sm text-ink">{p.backbone}</p>
              <p className="mt-1 text-sm text-ink-muted">Goal: {p.goal}</p>
            </motion.li>
          ))}
        </ol>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {trainingConfig.map((c) => (
            <div key={c.label} className="rounded-2xl border border-line bg-surface/40 p-5">
              <dt className="font-mono text-[11px] uppercase tracking-widest text-accent">{c.label}</dt>
              <dd className="mt-3 flex flex-wrap gap-1.5">
                {c.values.map((v) => (
                  <span key={v} className="rounded-md bg-white/5 px-2 py-1 text-xs text-ink-muted">
                    {v}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </CaseSection>

      {/* 5.6 Performance */}
      <CaseSection id="ps-performance" index="06 — Model Performance" title="Reported evaluation">
        <div className="grid gap-4 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <motion.div {...reveal} className="relative overflow-hidden rounded-2xl border border-accent/30 bg-surface-2/70 p-6">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ background: 'radial-gradient(70% 90% at 0% 0%, rgb(0 255 166 / 0.12), transparent 70%)' }}
            />
            <p className="relative font-mono text-[11px] uppercase tracking-widest text-ink-muted">
              DenseNet121 · AUC-ROC
            </p>
            <p className="relative mt-2 font-mono text-5xl font-bold text-accent">~0.97+</p>
            <p className="relative mt-2 text-sm text-ink-muted">Reported project evaluation</p>
          </motion.div>
          <motion.div {...reveal} className="rounded-2xl border border-line bg-surface/40 p-6">
            <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">Legacy CNN · AUC-ROC</p>
            <p className="mt-2 font-mono text-4xl font-bold text-ink-muted">~0.88</p>
            <p className="mt-2 text-sm text-ink-muted">Reported for the Version 1 prototype</p>
          </motion.div>
        </div>
        <div className="mt-4">
          <Disclaimer>
            These figures are the project’s own reported evaluation on the public Kaggle dataset. PneumoScan AI is an
            academic engineering project — it is not clinically validated and is not a diagnostic tool.
          </Disclaimer>
        </div>
      </CaseSection>

      {/* 5.7 Grad-CAM */}
      <CaseSection
        id="ps-gradcam"
        index="07 — Grad-CAM Explainability"
        title="Making AI decisions visible"
        intro="Grad-CAM (Gradient-weighted Class Activation Mapping) uses the gradients of the prediction with respect to the last convolutional feature maps to estimate which image regions most influenced the model’s output, then overlays that estimate on the original X-ray."
      >
        <StepFlow steps={gradCamPipeline} label="Grad-CAM computation pipeline" highlight={gradCamPipeline.length - 1} />

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <motion.div {...reveal} className="rounded-2xl border border-line bg-surface-2/60 p-6">
            <h3 className="font-semibold text-ink">Reading the heatmap</h3>
            <div
              aria-hidden
              className="mt-5 h-3 rounded-full"
              style={{ background: 'linear-gradient(90deg, #1d3cff, #19c3ff 30%, #ffe14a 62%, #ff3b2f)' }}
            />
            <dl className="mt-3 grid grid-cols-3 gap-2 text-xs">
              <div>
                <dt className="font-mono text-[#5fa8ff]">Blue</dt>
                <dd className="mt-0.5 text-ink-muted">Lower attention</dd>
              </div>
              <div className="text-center">
                <dt className="font-mono text-[#ffe14a]">Yellow</dt>
                <dd className="mt-0.5 text-ink-muted">Moderate attention</dd>
              </div>
              <div className="text-right">
                <dt className="font-mono text-[#ff6b5e]">Hot / red</dt>
                <dd className="mt-0.5 text-ink-muted">Stronger attention</dd>
              </div>
            </dl>
            <p className="mt-5 text-sm text-ink-muted">
              Anchored on <code className="font-mono text-xs text-ink">conv5_block16_concat</code>, the final dense
              concatenation before pooling.
            </p>
          </motion.div>
          <motion.div {...reveal} className="rounded-2xl border border-line bg-surface-2/60 p-6">
            <h3 className="font-semibold text-ink">Where attention tends to appear</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              For pneumonia cases, the project documentation notes that model attention may appear around:
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {['Consolidation areas', 'Perihilar infiltrates', 'Opacity regions'].map((r) => (
                <li key={r} className="rounded-full border border-[#ff6b4a]/30 bg-[#ff6b4a]/10 px-3 py-1 font-mono text-xs text-[#ff9b85]">
                  {r}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
        <div className="mt-4">
          <Disclaimer>
            A Grad-CAM heatmap shows where the model focused — it is an explanation of model behaviour, not a
            clinical finding or a definitive diagnosis.
          </Disclaimer>
        </div>
      </CaseSection>

      {/* 5.8 System */}
      <CaseSection
        id="ps-system"
        index="08 — System Architecture"
        title="Decoupled frontend, API, model, and storage"
      >
        <StepFlow steps={systemFlow} label="PneumoScan AI request path" />
        <FlowConnector label="SUPABASE" />
        <div className="mx-auto grid max-w-2xl gap-3 sm:grid-cols-2">
          <div className="flex items-start gap-3 rounded-2xl border border-line bg-surface-2/60 p-5">
            <Database aria-hidden size={18} className="mt-0.5 text-accent" />
            <div>
              <h3 className="font-semibold text-ink">PostgreSQL</h3>
              <p className="mt-1 text-sm text-ink-muted">Prediction records and history</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border border-line bg-surface-2/60 p-5">
            <HardDrive aria-hidden size={18} className="mt-0.5 text-accent" />
            <div>
              <h3 className="font-semibold text-ink">Storage</h3>
              <p className="mt-1 text-sm text-ink-muted">Uploaded X-rays and generated heatmaps</p>
            </div>
          </div>
        </div>
      </CaseSection>

      {/* 5.9 Features */}
      <CaseSection id="ps-features" index="09 — Features" title="What the platform does">
        <ul className="grid gap-4 sm:grid-cols-2">
          {featureCards.map((f, i) => {
            const Icon = FEATURE_ICON[f.icon]
            return (
              <motion.li
                key={f.title}
                {...reveal}
                transition={{ delay: (i % 2) * 0.06 }}
                className="group rounded-2xl border border-line bg-surface-2/60 p-6 transition-colors hover:border-accent/40"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                  <Icon aria-hidden size={18} />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink">{f.title}</h3>
                <ul className="mt-3 flex flex-col gap-1.5">
                  {f.items.map((it) => (
                    <li key={it} className="flex items-center gap-2 text-sm text-ink-muted">
                      <span aria-hidden className="h-1 w-1 rounded-full bg-accent/70" />
                      {it}
                    </li>
                  ))}
                </ul>
              </motion.li>
            )
          })}
        </ul>
      </CaseSection>

      {/* 5.10 Dataset */}
      <CaseSection id="ps-dataset" index="10 — Dataset" title={dataset.name}>
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div className="rounded-2xl border border-line bg-surface-2/60 p-6">
            <dl className="flex flex-col gap-4 text-sm">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">Source</dt>
                <dd className="mt-1">
                  <a
                    href={dataset.url}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor-hover
                    className="inline-flex items-center gap-1 text-accent hover:text-accent-dim"
                  >
                    {dataset.source} <ArrowUpRight aria-hidden size={14} />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">Classes</dt>
                <dd className="mt-1 text-ink">{dataset.classes.join(' · ')}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">Format</dt>
                <dd className="mt-1 text-ink">{dataset.format}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">Imbalance</dt>
                <dd className="mt-1 text-ink-muted">Handled with automatically balanced class weights</dd>
              </div>
            </dl>
          </div>
          <dl className="grid grid-cols-3 gap-3">
            {dataset.splits.map((s) => (
              <div key={s.label} className="flex flex-col justify-end rounded-2xl border border-line bg-surface/40 p-4">
                <dd className="font-mono text-2xl font-bold text-ink sm:text-3xl">{s.value}</dd>
                <dt className="mt-1 font-mono text-[11px] uppercase tracking-widest text-ink-muted">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </CaseSection>

      {/* Technology stack */}
      <CaseSection id="ps-stack" index="11 — Technology Stack" title="What it’s built with">
        <div className="grid gap-3 md:grid-cols-3">
          {stackGroups.map((g) => (
            <div key={g.title} className="rounded-2xl border border-line bg-surface-2/60 p-5">
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-accent">{g.title}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <Badge key={it}>{it}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CaseSection>

      {/* Deployment */}
      <CaseSection
        id="ps-deployment"
        index="12 — Deployment"
        title="Deployment architecture"
        intro="Frontend, API, and data are deployed independently, as documented in the project README. The backend also ships with a Dockerfile."
      >
        <ul className="grid gap-3 md:grid-cols-3">
          {deployment.map((d) => (
            <li key={d.name} className="flex items-start gap-3 rounded-2xl border border-line bg-surface-2/60 p-5">
              <Cloud aria-hidden size={18} className="mt-0.5 shrink-0 text-accent" />
              <div>
                <h3 className="font-semibold text-ink">{d.name}</h3>
                <p className="mt-1 text-sm text-ink-muted">{d.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </CaseSection>

      {/* 5.11 Repository */}
      <CaseSection
        id="ps-repo"
        index="13 — Repository Structure"
        title="Engineering layout"
        intro="Both versions live in one repository, so the evolution from prototype to platform is visible in the code itself."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {repoStructure.map((root) => (
            <div key={root.name} className="rounded-2xl border border-line bg-surface-2/60 p-5">
              <div className="flex items-center gap-2">
                <FolderTree aria-hidden size={16} className="text-accent" />
                <code className="break-all font-mono text-sm text-ink">{root.name}</code>
              </div>
              {root.note && <p className="mt-1 text-xs text-ink-muted">{root.note}</p>}
              {root.children && <RepoTree nodes={root.children} />}
            </div>
          ))}
        </div>
      </CaseSection>

      {/* 5.12 Future */}
      <CaseSection
        id="ps-future"
        index="14 — Future Improvements"
        title="Future improvements"
        intro="Not yet implemented — the planned next steps for the platform."
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {futureImprovements.map((f) => (
            <li
              key={f}
              className="flex items-center justify-between gap-3 rounded-xl border border-dashed border-violet/40 bg-surface/40 px-4 py-3"
            >
              <span className="text-sm text-ink">{f}</span>
              <StatusPill status="planned" />
            </li>
          ))}
        </ul>
      </CaseSection>

      {project.links.github && (
        <motion.section
          {...reveal}
          aria-label="PneumoScan AI source code"
          className="relative mt-20 overflow-hidden rounded-3xl border border-accent/30 bg-surface-2/60 p-8 text-center sm:p-10"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(60% 80% at 50% 0%, rgb(0 255 166 / 0.12), transparent 70%)' }}
          />
          <div className="relative">
            <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">Explore the code</h2>
            <p className="mx-auto mt-3 max-w-xl text-ink-muted">
              Both the legacy prototype and PneumoScan AI — model, API, Grad-CAM service, and frontend.
            </p>
            <div className="mt-7 flex justify-center">
              <MagneticButton
                variant="primary"
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                ariaLabel="View the PneumoScan AI repository on GitHub (opens in a new tab)"
              >
                <GithubIcon size={16} /> GitHub Repository
              </MagneticButton>
            </div>
          </div>
        </motion.section>
      )}
    </div>
  )
}

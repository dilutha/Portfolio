import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { GithubIcon } from '@/components/icons/BrandIcons'
import { PageTransition } from '@/components/layout/PageTransition'
import { Badge } from '@/components/ui/Badge'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { ProjectVisual } from '@/components/projects/ProjectVisual'
import { LangGraphDiagram } from '@/components/projects/diagrams/LangGraphDiagram'
import { FusionDiagram } from '@/components/projects/diagrams/FusionDiagram'
import { projects } from '@/data/projects'
import { projectImages } from '@/assets/projectImages'
import { usePageMeta } from '@/hooks/usePageMeta'
import { absoluteUrl, SITE_URL } from '@/lib/seo'

const TAG_LABEL: Record<string, string> = {
  'ai-ml': 'AI & ML',
  web: 'Web',
  data: 'Data',
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)

  usePageMeta({
    title: project ? `${project.title} | Dilutha Weerasinghe` : 'Project | Dilutha Weerasinghe',
    description: project?.summary ?? 'A data science and AI/ML project by Dilutha Weerasinghe.',
    path: `/projects/${slug}`,
    image: project && project.visual.type === 'image' ? absoluteUrl(projectImages[project.visual.imageKey]) : undefined,
    type: 'article',
    structuredData: project
      ? {
          '@context': 'https://schema.org',
          '@type': project.links.github ? 'SoftwareSourceCode' : 'CreativeWork',
          name: project.title,
          description: project.summary,
          url: absoluteUrl(`/projects/${project.slug}`),
          ...(project.links.github ? { codeRepository: project.links.github } : {}),
          keywords: project.techStack.join(', '),
          author: { '@type': 'Person', name: 'Dilutha Weerasinghe', url: SITE_URL },
        }
      : undefined,
  })

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [slug])

  if (!project) {
    return <Navigate to="/" replace />
  }

  return (
    <PageTransition>
      <article className="bg-void pb-28 pt-28">
        <div className="mx-auto max-w-4xl px-6">
          <Link
            to="/#projects"
            data-cursor-hover
            className="inline-flex items-center gap-2 font-mono text-sm text-ink-muted transition-colors hover:text-accent"
          >
            <ArrowLeft size={15} /> Back to Projects
          </Link>

          <div className="mt-8 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} tone="accent">
                {TAG_LABEL[tag]}
              </Badge>
            ))}
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted"
          >
            {project.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.14 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            {project.links.github && (
              <MagneticButton variant="secondary" href={project.links.github} target="_blank" rel="noreferrer">
                <GithubIcon size={16} /> View Code
              </MagneticButton>
            )}
            {project.links.live && (
              <MagneticButton variant="primary" href={project.links.live} target="_blank" rel="noreferrer">
                Live Demo <ArrowUpRight size={16} />
              </MagneticButton>
            )}
            {project.links.external && (
              <MagneticButton
                variant="primary"
                href={project.links.external.href}
                target="_blank"
                rel="noreferrer"
              >
                {project.links.external.label} <ArrowUpRight size={16} />
              </MagneticButton>
            )}
          </motion.div>

          <motion.div
            layoutId={`project-visual-${project.slug}`}
            className="mt-14 overflow-hidden rounded-2xl border border-line"
            style={{
              aspectRatio:
                project.visual.type === 'image' && project.visual.aspectRatio
                  ? project.visual.aspectRatio
                  : '16 / 9',
            }}
          >
            <ProjectVisual project={project} />
          </motion.div>

          {project.architectureDiagram && (
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.6 }}
              className="mt-8"
            >
              <h2 className="font-mono text-sm tracking-widest text-accent">
                Architecture Overview
              </h2>
              <div className="mt-5 aspect-[16/9] overflow-hidden rounded-2xl border border-line">
                {project.architectureDiagram === 'langgraph' ? (
                  <LangGraphDiagram />
                ) : (
                  <FusionDiagram />
                )}
              </div>
            </motion.section>
          )}

          <div className="mt-16 grid gap-14 sm:grid-cols-2">
            <section>
              <h2 className="font-mono text-sm tracking-widest text-accent">Key Achievements</h2>
              <ul className="mt-5 flex flex-col gap-3">
                {project.achievements.map((a, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ delay: i * 0.06 }}
                    className="border-l-2 border-accent/40 pl-4 text-ink-muted"
                  >
                    {a}
                  </motion.li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-mono text-sm tracking-widest text-accent">Features</h2>
              <ul className="mt-5 flex flex-col gap-3">
                {project.features.map((f, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ delay: i * 0.06 }}
                    className="border-l-2 border-line-strong pl-4 text-ink-muted"
                  >
                    {f}
                  </motion.li>
                ))}
              </ul>
            </section>
          </div>

          {project.honestTradeoffs && (
            <section className="mt-16 rounded-2xl border border-line bg-surface-2/60 p-7">
              <h2 className="font-mono text-sm tracking-widest text-ink-muted">
                Engineering Honesty — Known Trade-offs
              </h2>
              <ul className="mt-5 flex flex-col gap-4">
                {project.honestTradeoffs.map((t, i) => (
                  <li key={i} className="text-ink-muted">
                    {t}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="mt-16">
            <h2 className="font-mono text-sm tracking-widest text-accent">Tech Stack</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </section>
        </div>
      </article>
    </PageTransition>
  )
}

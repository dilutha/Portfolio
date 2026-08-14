import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import type { Project } from '@/data/projects'
import { Badge } from '@/components/ui/Badge'
import { GithubIcon } from '@/components/icons/BrandIcons'
import { useTilt } from '@/hooks/useTilt'
import { ProjectVisual } from './ProjectVisual'

const TAG_LABEL: Record<string, string> = {
  'ai-ml': 'AI & ML',
  web: 'Web',
  data: 'Data',
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const tilt = useTilt<HTMLDivElement>({ strength: 5 })

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <div
        ref={tilt.ref}
        onMouseMove={tilt.handleMouseMove}
        onMouseLeave={tilt.handleMouseLeave}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface-2/60 transition-[transform,border-color] duration-300 ease-out will-change-transform hover:border-accent/40"
      >
        {/* Pointer-tracked spotlight, positioned via --pointer-x/--pointer-y set by useTilt */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(360px circle at var(--pointer-x, 50%) var(--pointer-y, 50%), rgba(0,255,166,0.10), transparent 70%)',
          }}
        />

        <Link
          to={`/projects/${project.slug}`}
          aria-label={`View case study: ${project.title}`}
          data-cursor-hover
          data-cursor-label="View"
          className="relative block"
          onClick={tilt.handleMouseLeave}
        >
          <motion.div
            layoutId={`project-visual-${project.slug}`}
            className="overflow-hidden"
            style={{
              aspectRatio:
                project.visual.type === 'image' && project.visual.aspectRatio
                  ? project.visual.aspectRatio
                  : '16 / 10',
            }}
          >
            <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.06]">
              <ProjectVisual project={project} compact />
            </div>
          </motion.div>

          {project.featured && (
            <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-accent/40 bg-void/70 px-2.5 py-1 font-mono text-[10px] tracking-wide text-accent backdrop-blur-md">
              <Sparkles size={11} /> Featured
            </span>
          )}
        </Link>

        <div className="relative flex flex-1 flex-col gap-4 p-6">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} tone="accent">
                {TAG_LABEL[tag]}
              </Badge>
            ))}
          </div>

          <div>
            <Link to={`/projects/${project.slug}`} data-cursor-hover>
              <h3 className="text-xl font-semibold text-ink transition-colors group-hover:text-accent">
                {project.title}
              </h3>
            </Link>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{project.summary}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 4).map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
            {project.techStack.length > 4 && <Badge>+{project.techStack.length - 4}</Badge>}
          </div>

          <div className="mt-auto flex items-center justify-between pt-2">
            <div className="flex items-center gap-4">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.title} on GitHub`}
                  data-cursor-hover
                  className="text-ink-muted transition-colors hover:text-accent"
                >
                  <GithubIcon size={18} />
                </a>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-hover
                  className="inline-flex items-center gap-1 font-mono text-xs text-ink-muted transition-colors hover:text-accent"
                >
                  Live Demo <ArrowUpRight size={13} />
                </a>
              )}
              {project.links.external && (
                <a
                  href={project.links.external.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-hover
                  className="inline-flex items-center gap-1 font-mono text-xs text-ink-muted transition-colors hover:text-accent"
                >
                  {project.links.external.label} <ArrowUpRight size={13} />
                </a>
              )}
            </div>

            <Link
              to={`/projects/${project.slug}`}
              data-cursor-hover
              className="inline-flex items-center gap-1 font-mono text-xs text-accent"
            >
              Case Study <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

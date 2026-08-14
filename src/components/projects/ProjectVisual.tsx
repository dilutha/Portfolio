import type { Project } from '@/data/projects'
import { projectImages } from '@/assets/projectImages'
import { LangGraphDiagram } from './diagrams/LangGraphDiagram'
import { FusionDiagram } from './diagrams/FusionDiagram'

export function ProjectVisual({ project, compact = false }: { project: Project; compact?: boolean }) {
  const { visual } = project

  if (visual.type === 'image') {
    return (
      <img
        src={projectImages[visual.imageKey]}
        alt={project.title}
        className="h-full w-full object-cover"
        loading="lazy"
      />
    )
  }

  return (
    <div className="h-full w-full bg-surface">
      {visual.kind === 'langgraph' ? (
        <LangGraphDiagram compact={compact} />
      ) : (
        <FusionDiagram compact={compact} />
      )}
    </div>
  )
}

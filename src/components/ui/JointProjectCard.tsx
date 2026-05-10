import { Link } from 'react-router-dom'
import type { Project } from '../../content/projects'
import StatusBadge from './StatusBadge'
import TechTag from './TechTag'
import CodePreviewCard from './CodePreviewCard'

interface JointProjectCardProps {
  projectA: Project
  projectB: Project
}

function HalfCard({ project, borderRight }: { project: Project; borderRight?: boolean }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className={`group relative flex flex-col flex-1 min-w-0 hover:bg-parchment-dark/60 transition-colors duration-200 ${
        borderRight ? 'border-r border-rule' : ''
      }`}
    >
      {/* Image area — same aspect-video as regular cards */}
      <div className="aspect-video bg-parchment-dark relative overflow-hidden border-b border-rule">
        {project.cardImage ? (
          <img
            src={project.cardImage}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        ) : project.cardPreview ? (
          <CodePreviewCard snippet={project.cardPreview.snippet} language={project.cardPreview.language} />
        ) : (
          <>
            <div className="absolute inset-0 card-hatch opacity-30" aria-hidden="true" />
            <div className="absolute bottom-0 right-0 pr-3 pb-1 select-none" aria-hidden="true">
              <span className="font-display text-[72px] font-light leading-none text-terracotta/10">
                {project.title.charAt(0)}
              </span>
            </div>
          </>
        )}
        <div className="absolute top-3 left-3">
          <StatusBadge status={project.status} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <p className="font-body text-2xs tracking-widest uppercase text-ink-faint mb-1.5">
          {project.timeframe}
        </p>
        <h3 className="font-display text-lg font-light text-ink group-hover:text-terracotta transition-colors duration-200 mb-2 leading-snug">
          {project.title}
        </h3>
        <p className="font-body text-sm text-ink-muted leading-relaxed mb-3 line-clamp-2 flex-1">
          {project.oneLiner}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 3).map((tech) => (
            <TechTag key={tech} label={tech} />
          ))}
        </div>
      </div>
    </Link>
  )
}

export default function JointProjectCard({ projectA, projectB }: JointProjectCardProps) {
  return (
    <div className="group/joint relative bg-parchment border border-rule rounded-lg overflow-hidden hover:border-terracotta/25 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full" style={{ transitionTimingFunction: 'var(--ease-craft)' }}>
      {/* Header label */}
      <div className="flex items-center gap-2 px-5 py-2.5 border-b border-rule bg-parchment-dark/30">
        <span className="font-body text-2xs tracking-widest uppercase text-terracotta">
          Waste Audit
        </span>
        <span className="font-body text-2xs text-ink-faint/60">·</span>
        <span className="font-body text-2xs text-ink-faint">Two versions of the same project</span>
      </div>

      {/* Split halves */}
      <div className="flex flex-col sm:flex-row flex-1">
        <HalfCard project={projectA} borderRight />
        <HalfCard project={projectB} />
      </div>

      {/* Single bottom accent bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-terracotta/60 via-terracotta to-terracotta/60 scale-x-0 group-hover/joint:scale-x-100 transition-transform duration-400 origin-left"
        style={{ transitionTimingFunction: 'var(--ease-craft)' }}
        aria-hidden="true"
      />
    </div>
  )
}

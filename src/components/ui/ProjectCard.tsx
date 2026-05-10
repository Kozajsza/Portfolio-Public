import { Link } from 'react-router-dom'
import type { Project } from '../../content/projects'
import StatusBadge from './StatusBadge'
import TechTag from './TechTag'
import CodePreviewCard from './CodePreviewCard'

interface ProjectCardProps {
  project: Project
  wide?: boolean
}

export default function ProjectCard({ project, wide = false }: ProjectCardProps) {
  if (wide) {
    return (
      <Link
        to={`/projects/${project.slug}`}
        className="group relative flex flex-col sm:flex-row bg-parchment border border-rule rounded-lg overflow-hidden hover:border-terracotta/25 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full"
        style={{ transitionTimingFunction: 'var(--ease-craft)' }}
      >
        {/* Image — aspect-video on mobile, fixed width + fill height on desktop */}
        <div className="sm:w-56 lg:w-64 flex-shrink-0 bg-parchment-dark relative overflow-hidden border-b sm:border-b-0 sm:border-r border-rule">
          {project.cardImage ? (
            <img
              src={project.cardImage}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          ) : project.cardPreview ? (
            <CodePreviewCard snippet={project.cardPreview.snippet} language={project.cardPreview.language} />
          ) : project.cardAccent === 'jade' ? (
            <>
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, #1e4a46 0%, #2f6b65 35%, #3E7A74 65%, #2a5a55 100%)' }}
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 opacity-[0.07]"
                style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '18px 18px' }}
                aria-hidden="true"
              />
            </>
          ) : (
            <>
              <div className="absolute inset-0 card-hatch opacity-40" aria-hidden="true" />
              <div className="absolute bottom-0 right-0 pr-4 pb-2 select-none" aria-hidden="true">
                <span className="font-display text-[96px] font-light leading-none text-terracotta/12">
                  {project.title.charAt(0)}
                </span>
              </div>
            </>
          )}
          <div className="absolute top-3 left-3">
            <StatusBadge status={project.status} />
          </div>
          <div className="aspect-video sm:hidden" />
          <div className="hidden sm:block sm:h-full" />
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col justify-center flex-1">
          <p className="font-body text-2xs tracking-widest uppercase text-ink-faint mb-2">
            {project.timeframe}
          </p>
          <h3 className="font-display text-2xl md:text-3xl font-light text-ink group-hover:text-terracotta transition-colors duration-200 mb-3 leading-snug">
            {project.title}
          </h3>
          <p className="font-body text-sm text-ink-muted leading-relaxed mb-4 max-w-prose">
            {project.oneLiner}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 5).map((tech) => (
              <TechTag key={tech} label={tech} />
            ))}
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-terracotta/60 via-terracotta to-terracotta/60 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"
          style={{ transitionTimingFunction: 'var(--ease-craft)' }}
          aria-hidden="true"
        />
      </Link>
    )
  }

  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group relative block bg-parchment border border-rule rounded-lg overflow-hidden hover:border-terracotta/25 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full"
      style={{ transitionTimingFunction: 'var(--ease-craft)' }}
    >
      <div className="aspect-video bg-parchment-dark relative overflow-hidden border-b border-rule">
        {project.cardImage ? (
          <img
            src={project.cardImage}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : project.cardPreview ? (
          <CodePreviewCard snippet={project.cardPreview.snippet} language={project.cardPreview.language} />
        ) : (
          <>
            <div className="absolute inset-0 card-hatch opacity-40" aria-hidden="true" />
            <div className="absolute bottom-0 right-0 pr-4 pb-2 select-none" aria-hidden="true">
              <span className="font-display text-[96px] font-light leading-none text-terracotta/12">
                {project.title.charAt(0)}
              </span>
            </div>
          </>
        )}
        <div className="absolute top-3 left-3">
          <StatusBadge status={project.status} />
        </div>
      </div>

      <div className="p-5">
        <p className="font-body text-2xs tracking-widest uppercase text-ink-faint mb-2">
          {project.timeframe}
        </p>
        <h3 className="font-display text-xl font-light text-ink group-hover:text-terracotta transition-colors duration-200 mb-2 leading-snug">
          {project.title}
        </h3>
        <p className="font-body text-sm text-ink-muted leading-relaxed mb-4 line-clamp-2">
          {project.oneLiner}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <TechTag key={tech} label={tech} />
          ))}
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-terracotta/60 via-terracotta to-terracotta/60 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"
        style={{ transitionTimingFunction: 'var(--ease-craft)' }}
        aria-hidden="true"
      />
    </Link>
  )
}

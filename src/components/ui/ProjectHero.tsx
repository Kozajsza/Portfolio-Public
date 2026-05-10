import type { Project } from '../../content/projects'
import StatusBadge from './StatusBadge'
import TechTag from './TechTag'
import ChatPrompt from '../chatbot/ChatPrompt'

function GitHubIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="flex-shrink-0"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

interface ProjectHeroProps {
  project: Project
}

export default function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <section aria-label={`${project.title} overview`}>
      {/* Subtle background wash — matches homepage hero tint */}
      <div
        className="relative overflow-hidden"
        style={{
          background: [
            'radial-gradient(ellipse 70% 60% at 90% 10%, rgba(62,122,116,0.14) 0%, transparent 65%)',
            'radial-gradient(ellipse 50% 50% at 10% 90%, rgba(62,122,116,0.08) 0%, transparent 65%)',
          ].join(', '),
        }}
      >
        <div className="container-content pt-16 md:pt-24 pb-12 md:pb-16">
          {/* Back to projects */}
          <div className="mb-8">
            <a
              href="/projects"
              className="group inline-flex items-center gap-2 font-body text-sm font-medium text-ink-muted border border-rule rounded-full px-4 py-2 hover:text-ink hover:border-ink-muted transition-colors duration-150"
            >
              <span
                className="inline-block transition-transform duration-150 group-hover:-translate-x-0.5"
                aria-hidden="true"
              >
                ←
              </span>
              All Projects
            </a>
          </div>

          {/* Status + timeframe */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <StatusBadge status={project.status} />
            <span className="font-body text-2xs text-ink-faint">{project.timeframe}</span>
          </div>

          {/* Title */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-light text-ink leading-[0.95] tracking-tight mb-6">
            {project.title}
          </h1>

          {/* One-liner */}
          <p className="font-body text-lg md:text-xl text-ink-muted italic leading-relaxed mb-8 max-w-2xl">
            {project.oneLiner}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-8" aria-label="Tech stack">
            {project.techStack.map((tech) => (
              <TechTag key={tech} label={tech} />
            ))}
          </div>

          {/* Links */}
          {(project.githubUrl || project.liveUrl) && (
            <div className="flex flex-wrap gap-3 mb-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 font-body text-sm font-medium text-parchment bg-ink rounded-xl px-5 py-2.5 hover:bg-ink/80 transition-colors duration-150 min-h-[44px]"
                >
                  <GitHubIcon />
                  View on GitHub
                  <span
                    className="inline-block transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 font-body text-sm font-medium text-parchment bg-terracotta rounded-xl px-5 py-2.5 hover:bg-terracotta-hover transition-colors duration-150 min-h-[44px]"
                >
                  Live demo
                  <span
                    className="inline-block transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </a>
              )}
            </div>
          )}
          {/* Chat prompt */}
          <ChatPrompt placeholder={`Ask me about ${project.title}...`} />
        </div>

        {/* Bottom rule */}
        <div className="border-b border-rule" />
      </div>
    </section>
  )
}

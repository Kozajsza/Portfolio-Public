import { useState } from 'react'
import type { Project } from '../../content/projects'
import { getProject } from '../../content/projects'
import ProjectHero from './ProjectHero'
import CodeSnippet from './CodeSnippet'
import ScreenshotGallery from './ScreenshotGallery'
import { Link } from 'react-router-dom'

interface ProjectPageLayoutProps {
  project: Project
}

export default function ProjectPageLayout({ project }: ProjectPageLayoutProps) {
  const relatedProject = project.relatedSlug ? getProject(project.relatedSlug) : undefined
  const [activeSnippet, setActiveSnippet] = useState(0)
  const highlight = project.highlights[activeSnippet]

  return (
    <>
      <ProjectHero project={project} />

      {/* ── Related project banner ───────────────────────────── */}
      {relatedProject && (
        <div className="border-b border-rule bg-terracotta/[0.04]">
          <div className="container-content py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="font-body text-sm text-ink-muted">
                <span className="text-terracotta font-medium">Part of the Waste Audit Suite</span>
                {' '}— this project has a companion version.
              </p>
              <Link
                to={`/projects/${relatedProject.slug}`}
                className="group inline-flex items-center gap-1.5 font-body text-sm font-medium text-terracotta hover:text-terracotta-hover transition-colors duration-150 flex-shrink-0"
              >
                {relatedProject.slug.includes('ai') ? 'See the AI version' : 'See the original version'}
                <span
                  className="inline-block transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="container-content py-16 md:py-24">
        <div className="max-w-prose space-y-14 md:space-y-20">

          {/* ── Problem ──────────────────────────────────────── */}
          <section aria-label="The problem">
            <p className="font-body text-2xs tracking-widest uppercase text-terracotta mb-5 flex items-center gap-2">
              <span className="inline-block w-5 h-px bg-terracotta/40" aria-hidden="true" />
              The Problem
            </p>
            <div className="space-y-4">
              {project.problem.split('\n\n').map((para, i) => (
                <p key={i} className="font-body text-base text-ink-muted leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </section>

          {/* ── Solution ─────────────────────────────────────── */}
          <section aria-label="The solution">
            <p className="font-body text-2xs tracking-widest uppercase text-terracotta mb-5 flex items-center gap-2">
              <span className="inline-block w-5 h-px bg-terracotta/40" aria-hidden="true" />
              The Solution
            </p>
            <div className="space-y-4">
              {project.solution.split('\n\n').map((para, i) => (
                <p key={i} className="font-body text-base text-ink-muted leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </section>

          {/* ── Screenshots ──────────────────────────────────── */}
          {project.screenshots.length > 0 && (
            <section aria-label="Screenshots">
              <p className="font-body text-2xs tracking-widest uppercase text-terracotta mb-5 flex items-center gap-2">
                <span className="inline-block w-5 h-px bg-terracotta/40" aria-hidden="true" />
                Screenshots
              </p>
              <ScreenshotGallery
                screenshots={project.screenshots}
                projectTitle={project.title}
              />
            </section>
          )}

          {/* ── Code highlight ───────────────────────────────── */}
          <section aria-label="Code highlight">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
              <p className="font-body text-2xs tracking-widest uppercase text-terracotta flex items-center gap-2">
                <span className="inline-block w-5 h-px bg-terracotta/40" aria-hidden="true" />
                Code
              </p>
              {project.highlights.length > 1 && (
                <div className="flex items-center gap-1.5 flex-wrap" role="group" aria-label="Select code snippet">
                  {project.highlights.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveSnippet(i)}
                      className={`font-body text-xs px-3 py-1.5 rounded-full border transition-colors duration-150 ${
                        activeSnippet === i
                          ? 'bg-ink text-parchment border-ink'
                          : 'bg-transparent text-ink-muted border-rule hover:border-ink-muted hover:text-ink'
                      }`}
                      aria-pressed={activeSnippet === i}
                    >
                      Snippet {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <CodeSnippet
              code={highlight.codeSnippet}
              language={highlight.language}
              description={highlight.description}
            />
          </section>

          {/* ── Back to top ──────────────────────────────────── */}
          <div className="pt-4">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group inline-flex items-center gap-2 font-body text-sm text-ink-muted hover:text-ink transition-colors duration-150"
              aria-label="Back to top"
            >
              <span
                className="inline-block transition-transform duration-150 group-hover:-translate-y-0.5"
                aria-hidden="true"
              >
                ↑
              </span>
              Back to top
            </button>
          </div>

        </div>
      </div>

    </>
  )
}

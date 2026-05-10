import { useRef, useState } from 'react'
import TimelineCard from './TimelineCard'
import TimelineSpine from './TimelineSpine'
import { useScrollProgress } from './useScrollProgress'
import type { TimelineChapter } from '../../content/about'

interface Props {
  chapters: TimelineChapter[]
  prefersReducedMotion: boolean
}

export default function TimelineDesktop({ chapters, prefersReducedMotion }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(containerRef)
  const [revealedSet, setRevealedSet] = useState<Set<number>>(new Set())

  const handleReveal = (index: number) => {
    setRevealedSet(prev => new Set([...prev, index]))
  }

  return (
    <div ref={containerRef} className="relative" role="list" aria-label="Career timeline">
      <TimelineSpine progress={progress} prefersReducedMotion={prefersReducedMotion} />

      {chapters.map((chapter, i) => {
        const nodeRevealed = revealedSet.has(i) || prefersReducedMotion
        const isLast = i === chapters.length - 1

        return (
          <div
            key={chapter.id}
            role="listitem"
            className={['grid grid-cols-[1fr_48px_1fr] items-start', isLast ? '' : 'mb-20'].join(' ')}
          >
            {/* Left column */}
            <div className="relative pr-6 flex justify-end">
              {chapter.side === 'left' && (
                <TimelineCard
                  chapter={chapter}
                  prefersReducedMotion={prefersReducedMotion}
                  onReveal={() => handleReveal(i)}
                />
              )}
              {/* Connector stub toward spine */}
              {chapter.side === 'left' && (
                <div
                  className="absolute right-0 h-px bg-rule/50 pointer-events-none"
                  style={{ top: '13px', width: '30px' }}
                  aria-hidden="true"
                />
              )}
            </div>

            {/* Spine column: dot + connector */}
            <div className="relative flex flex-col items-center" aria-hidden="true">
              {/* Connector line to left card */}
              {chapter.side === 'left' && (
                <div className="absolute h-px bg-rule/50" style={{ top: '13px', left: 0, right: '50%' }} />
              )}
              {/* Connector line to right card */}
              {chapter.side === 'right' && (
                <div className="absolute h-px bg-rule/50" style={{ top: '13px', left: '50%', right: 0 }} />
              )}
              {/* Node dot */}
              <div
                className={[
                  'w-3 h-3 mt-[7px] rounded-full border-2 z-10 flex-none',
                  'transition-all duration-500',
                  nodeRevealed
                    ? 'bg-terracotta border-terracotta shadow-[0_0_0_4px_rgba(62,122,116,0.14)]'
                    : 'bg-parchment border-rule',
                ].join(' ')}
              />
            </div>

            {/* Right column */}
            <div className="relative pl-6 flex justify-start">
              {/* Connector stub toward spine */}
              {chapter.side === 'right' && (
                <div
                  className="absolute left-0 h-px bg-rule/50 pointer-events-none"
                  style={{ top: '13px', width: '30px' }}
                  aria-hidden="true"
                />
              )}
              {chapter.side === 'right' && (
                <TimelineCard
                  chapter={chapter}
                  prefersReducedMotion={prefersReducedMotion}
                  onReveal={() => handleReveal(i)}
                />
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

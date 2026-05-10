import { useRef } from 'react'
import type { TimelineEntry } from '../../content/timeline'

interface TimelineProps {
  entries: TimelineEntry[]
}

export default function Timeline({ entries }: TimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'right' ? 320 : -320, behavior: 'smooth' })
  }

  return (
    <div>
      {/* Desktop: horizontal scroll with arrow navigation */}
      <div className="hidden md:flex items-center gap-4">
        {/* Left arrow */}
        <button
          onClick={() => scroll('left')}
          className="flex-none shrink-0 w-9 h-9 flex items-center justify-center rounded-full border border-rule text-ink-muted hover:text-terracotta hover:border-terracotta transition-colors"
          aria-label="Scroll timeline left"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Scrollable track */}
        <div
          ref={scrollRef}
          className="flex-1 min-w-0 overflow-x-auto [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none' }}
        >
          <div className="relative flex gap-8">
            {/* Connecting line across full content width */}
            <div
              className="absolute top-[5px] left-0 right-0 h-px bg-rule"
              aria-hidden="true"
            />
            {entries.map((entry, i) => (
              <DesktopEntry key={entry.year} entry={entry} index={i} />
            ))}
          </div>
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll('right')}
          className="flex-none shrink-0 w-9 h-9 flex items-center justify-center rounded-full border border-rule text-ink-muted hover:text-terracotta hover:border-terracotta transition-colors"
          aria-label="Scroll timeline right"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Mobile: vertical list */}
      <div className="md:hidden">
        {entries.map((entry, i) => (
          <MobileEntry
            key={entry.year}
            entry={entry}
            isLast={i === entries.length - 1}
          />
        ))}
      </div>
    </div>
  )
}

function DesktopEntry({
  entry,
  index,
}: {
  entry: TimelineEntry
  index: number
}) {
  return (
    <div
      className="w-52 flex-none fade-up"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Dot sitting on the connecting line */}
      <div
        className="w-2.5 h-2.5 rounded-full bg-terracotta ring-4 ring-parchment mb-6"
        aria-hidden="true"
      />
      <p className="font-display text-2xl font-light text-terracotta mb-2">
        {entry.year}
      </p>
      <p className="font-body text-2xs uppercase tracking-caps font-semibold text-ink mb-2">
        {entry.title}
      </p>
      <p className="font-body text-sm text-ink-muted leading-relaxed">
        {entry.description}
      </p>
    </div>
  )
}

function MobileEntry({
  entry,
  isLast,
}: {
  entry: TimelineEntry
  isLast: boolean
}) {
  return (
    <div className="relative pl-9 pb-8 fade-up">
      {/* Vertical connecting line */}
      {!isLast && (
        <div
          className="absolute left-[9px] top-2 bottom-0 w-px bg-rule"
          aria-hidden="true"
        />
      )}
      {/* Dot */}
      <div
        className="absolute left-0 top-0.5 w-5 h-5 rounded-full bg-terracotta ring-4 ring-parchment"
        aria-hidden="true"
      />
      <p className="font-display text-xl font-light text-terracotta mb-1">
        {entry.year}
      </p>
      <p className="font-body text-2xs uppercase tracking-caps font-semibold text-ink mb-1.5">
        {entry.title}
      </p>
      <p className="font-body text-sm text-ink-muted leading-relaxed">
        {entry.description}
      </p>
    </div>
  )
}

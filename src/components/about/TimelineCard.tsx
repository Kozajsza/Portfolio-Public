import { useEffect, useRef, useState } from 'react'
import type { TimelineChapter } from '../../content/about'

interface Props {
  chapter: TimelineChapter
  prefersReducedMotion: boolean
  mobileMode?: boolean
  onReveal?: () => void
}

export default function TimelineCard({ chapter, prefersReducedMotion, mobileMode = false, onReveal }: Props) {
  const [revealed, setRevealed] = useState(prefersReducedMotion || mobileMode)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion || mobileMode) {
      setRevealed(true)
      return
    }
    const el = cardRef.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          onReveal?.()
          obs.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [prefersReducedMotion, mobileMode, onReveal])

  const hiddenTranslate = chapter.side === 'left' ? '-translate-x-5' : 'translate-x-5'

  return (
    <div
      ref={cardRef}
      tabIndex={0}
      style={{
        transition: prefersReducedMotion || mobileMode
          ? 'none'
          : 'opacity 500ms cubic-bezier(0.16,1,0.3,1), transform 500ms cubic-bezier(0.16,1,0.3,1), box-shadow 200ms ease, border-color 200ms ease',
      }}
      className={[
        'rounded border bg-parchment-dark/60 px-6 py-5 cursor-default',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-1',
        mobileMode
          ? 'border-rule opacity-100'
          : revealed
            ? [
                'border-rule opacity-90 translate-x-0',
                'hover:opacity-100 hover:border-terracotta/40 hover:shadow-[0_2px_16px_rgba(0,0,0,0.07)]',
              ].join(' ')
            : `border-rule opacity-0 ${hiddenTranslate}`,
      ].join(' ')}
    >
      <p className="font-body text-2xs uppercase tracking-caps font-semibold text-terracotta mb-1.5">
        {chapter.yearRange}
      </p>
      <h3 className="font-display text-xl font-light text-ink mb-3 tracking-tight">
        {chapter.title}
      </h3>
      {chapter.paragraphs.map((para, i) => (
        <p key={i} className="font-body text-sm text-ink-muted leading-relaxed mb-3 last:mb-0">
          {para}
        </p>
      ))}
      {chapter.pullQuote && (
        <blockquote className="mt-4 pl-4 border-l-2 border-terracotta font-body text-sm italic text-ink leading-relaxed">
          {chapter.pullQuote}
        </blockquote>
      )}
    </div>
  )
}

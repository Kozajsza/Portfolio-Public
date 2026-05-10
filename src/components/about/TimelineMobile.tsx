import { useEffect, useRef, useState } from 'react'
import TimelineCard from './TimelineCard'
import type { TimelineChapter } from '../../content/about'

interface Props {
  chapters: TimelineChapter[]
  prefersReducedMotion: boolean
}

export default function TimelineMobile({ chapters, prefersReducedMotion }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const observers = cardRefs.current.map((card, i) => {
      if (!card) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i)
        },
        { root: container, threshold: 0.55 }
      )
      obs.observe(card)
      return obs
    })

    return () => {
      observers.forEach(obs => obs?.disconnect())
    }
  }, [])

  const scrollToCard = (index: number) => {
    const card = cardRefs.current[index]
    card?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'nearest', inline: 'center' })
  }

  return (
    <div>
      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden gap-4 px-[7.5vw]"
        style={{ scrollbarWidth: 'none' }}
        role="list"
        aria-label="Career timeline"
      >
        {chapters.map((chapter, i) => (
          <div
            key={chapter.id}
            ref={el => { cardRefs.current[i] = el }}
            className="snap-center flex-none w-[85vw]"
            role="listitem"
          >
            <TimelineCard
              chapter={chapter}
              prefersReducedMotion={prefersReducedMotion}
              mobileMode
            />
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center items-center gap-2 mt-5" role="tablist" aria-label="Timeline navigation">
        {chapters.map((chapter, i) => (
          <button
            key={chapter.id}
            role="tab"
            aria-label={`Chapter ${i + 1} of ${chapters.length}: ${chapter.title}`}
            aria-selected={i === activeIndex}
            onClick={() => scrollToCard(i)}
            className={[
              'h-1.5 rounded-full transition-all duration-300',
              i === activeIndex ? 'w-5 bg-terracotta' : 'w-1.5 bg-rule hover:bg-ink-faint',
            ].join(' ')}
          />
        ))}
      </div>
    </div>
  )
}

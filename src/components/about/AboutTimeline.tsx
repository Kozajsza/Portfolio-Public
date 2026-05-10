import { useState, useEffect } from 'react'
import TimelineDesktop from './TimelineDesktop'
import TimelineMobile from './TimelineMobile'
import { aboutTimeline } from '../../content/about'

export default function AboutTimeline() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <>
      <div className="hidden md:block">
        <TimelineDesktop chapters={aboutTimeline} prefersReducedMotion={prefersReducedMotion} />
      </div>
      <div className="md:hidden">
        <TimelineMobile chapters={aboutTimeline} prefersReducedMotion={prefersReducedMotion} />
      </div>
    </>
  )
}

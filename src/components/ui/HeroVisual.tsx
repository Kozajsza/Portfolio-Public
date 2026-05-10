import { useEffect, useRef } from 'react'

/**
 * Hero section visual layer — light jade gradient wash.
 * Adds soft ambient depth orbs on top of the hero's base gradient.
 * Parallax scroll moves the orbs upward slightly (independent of the content
 * parallax in HomePage). Global CursorSpotlight handles the cursor effect.
 * prefers-reduced-motion disables the parallax.
 */
export default function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    let rafId: number

    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY
        // Background orbs move slower than content for layered depth
        el.style.transform = `translateY(${-(y * 0.18)}px)`
        el.style.opacity = String(Math.max(0, 1 - y / 600))
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="absolute inset-0 pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* Soft ambient depth orbs — add luminosity variation to the flat gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            'radial-gradient(ellipse 60% 50% at 85% 15%, rgba(62,122,116,0.18) 0%, transparent 65%)',
            'radial-gradient(ellipse 45% 55% at 12% 80%, rgba(62,122,116,0.12) 0%, transparent 65%)',
            'radial-gradient(ellipse 35% 40% at 50% 40%, rgba(216,237,236,0.40) 0%, transparent 70%)',
          ].join(', '),
        }}
      />
    </div>
  )
}

import { useEffect, useRef } from 'react'

export default function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const el = ref.current
    if (!el) return

    let rafId: number

    const onMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId)
      // Coords relative to this element's own origin (absolute inset-0 within hero)
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      rafId = requestAnimationFrame(() => {
        if (el) {
          el.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(62, 122, 116, 0.09), transparent 80%)`
        }
      })
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="absolute inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}

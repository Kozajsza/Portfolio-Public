import { useEffect, useRef, useState } from 'react'

export function useScrollProgress(containerRef: { current: HTMLElement | null }) {
  const [progress, setProgress] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(1)
      return
    }

    const update = () => {
      if (!containerRef.current) return
      const { top, height } = containerRef.current.getBoundingClientRect()
      const vh = window.innerHeight
      setProgress(Math.max(0, Math.min(1, (vh - top) / (height + vh))))
    }

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [containerRef])

  return progress
}

import { useState, useEffect, useCallback } from 'react'
import type { ProjectScreenshot } from '../../content/projects'

interface ScreenshotGalleryProps {
  screenshots: ProjectScreenshot[]
  projectTitle: string
}

export default function ScreenshotGallery({ screenshots, projectTitle }: ScreenshotGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const close = useCallback(() => setActiveIndex(null), [])

  const prev = useCallback(() => {
    setActiveIndex(i => (i === null ? null : (i - 1 + screenshots.length) % screenshots.length))
  }, [screenshots.length])

  const next = useCallback(() => {
    setActiveIndex(i => (i === null ? null : (i + 1) % screenshots.length))
  }, [screenshots.length])

  useEffect(() => {
    if (activeIndex === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [activeIndex, close, prev, next])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = activeIndex !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [activeIndex])

  if (screenshots.length === 0) {
    return (
      <div className="rounded-lg border border-rule border-dashed p-10 text-center">
        <p className="font-body text-sm text-ink-faint">
          Screenshots will be added once available.
        </p>
      </div>
    )
  }

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {screenshots.map((shot, i) => (
          <figure key={i} className="group">
            <button
              type="button"
              onClick={() => setActiveIndex(i)}
              className="block w-full rounded-lg overflow-hidden border border-rule bg-parchment-dark aspect-video relative focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta cursor-zoom-in"
              aria-label={`Enlarge screenshot: ${shot.alt}`}
            >
              <img
                src={shot.src}
                alt={shot.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                loading="lazy"
                onError={(e) => {
                  const target = e.currentTarget
                  target.style.display = 'none'
                  const placeholder = target.nextElementSibling as HTMLElement
                  if (placeholder) placeholder.style.display = 'flex'
                }}
              />
              <div
                className="absolute inset-0 items-center justify-center bg-parchment-dark"
                style={{ display: 'none' }}
                aria-hidden="true"
              >
                <div className="text-center px-6">
                  <div className="card-hatch absolute inset-0 opacity-30" />
                  <span className="relative font-display text-5xl font-light text-terracotta/20">
                    {projectTitle.charAt(0)}
                  </span>
                  <p className="relative font-body text-2xs text-ink-faint mt-2">Screenshot coming soon</p>
                </div>
              </div>
              {/* Zoom hint overlay */}
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-200 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-body text-xs text-white bg-ink/60 rounded-full px-3 py-1.5">
                  Click to enlarge
                </span>
              </div>
            </button>
            {shot.caption && (
              <figcaption className="mt-2.5 font-body text-xs text-ink-faint">
                {shot.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {/* Lightbox */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Screenshot viewer"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-ink/70 backdrop-blur-md"
            onClick={close}
            aria-hidden="true"
          />

          {/* Panel */}
          <div className="relative z-10 flex flex-col items-center max-w-5xl w-full max-h-[90vh]">

            {/* Close */}
            <button
              type="button"
              onClick={close}
              className="absolute -top-10 right-0 font-body text-xs text-white/60 hover:text-white transition-colors duration-150 flex items-center gap-1.5"
              aria-label="Close"
            >
              Close
              <span className="font-body text-base leading-none" aria-hidden="true">✕</span>
            </button>

            {/* Image */}
            <div className="relative w-full rounded-lg overflow-hidden border border-white/10 bg-ink shadow-2xl">
              <img
                key={activeIndex}
                src={screenshots[activeIndex].src}
                alt={screenshots[activeIndex].alt}
                className="w-full max-h-[70vh] object-contain"
              />

              {/* Prev arrow */}
              {screenshots.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); prev() }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-ink/60 text-white hover:bg-ink/90 transition-colors duration-150 backdrop-blur-sm"
                  aria-label="Previous screenshot"
                >
                  ←
                </button>
              )}

              {/* Next arrow */}
              {screenshots.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); next() }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-ink/60 text-white hover:bg-ink/90 transition-colors duration-150 backdrop-blur-sm"
                  aria-label="Next screenshot"
                >
                  →
                </button>
              )}
            </div>

            {/* Caption + counter */}
            <div className="mt-4 flex items-center justify-between w-full gap-4">
              <p className="font-body text-sm text-white/70">
                {screenshots[activeIndex].caption ?? screenshots[activeIndex].alt}
              </p>
              {screenshots.length > 1 && (
                <span className="font-body text-xs text-white/40 flex-shrink-0 tabular-nums">
                  {activeIndex + 1} / {screenshots.length}
                </span>
              )}
            </div>

            {/* Dot indicators */}
            {screenshots.length > 1 && (
              <div className="mt-4 flex items-center gap-2" role="tablist" aria-label="Screenshots">
                {screenshots.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={i === activeIndex}
                    onClick={() => setActiveIndex(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                      i === activeIndex ? 'bg-white w-4' : 'bg-white/30 hover:bg-white/60'
                    }`}
                    aria-label={`Screenshot ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

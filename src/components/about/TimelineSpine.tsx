interface Props {
  progress: number
  prefersReducedMotion: boolean
}

export default function TimelineSpine({ progress, prefersReducedMotion }: Props) {
  return (
    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px pointer-events-none" aria-hidden="true">
      {/* Track */}
      <div className="absolute inset-0 bg-rule/50" />
      {/* Animated fill */}
      <div
        className="absolute top-0 left-0 right-0 bg-terracotta/60"
        style={{
          height: prefersReducedMotion ? '100%' : `${progress * 100}%`,
          transition: prefersReducedMotion ? 'none' : 'height 80ms linear',
        }}
      />
    </div>
  )
}

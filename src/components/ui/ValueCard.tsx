interface ValueCardProps {
  heading: string
  body: string
  index: number
}

export default function ValueCard({ heading, body, index }: ValueCardProps) {
  return (
    <div className="fade-up">
      <p
        className="font-display text-6xl font-light text-terracotta/10 mb-4 leading-none select-none"
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, '0')}
      </p>
      <h3 className="font-display text-lg font-light text-ink mb-3 leading-snug">
        {heading}
      </h3>
      <p className="font-body text-sm text-ink-muted leading-relaxed">{body}</p>
    </div>
  )
}

interface SectionHeadingProps {
  label?: string
  heading: string
  subheading?: string
  align?: 'left' | 'center'
  className?: string
}

export default function SectionHeading({
  label,
  heading,
  subheading,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`${align === 'center' ? 'text-center' : ''} ${className}`}>
      {label && (
        <p className="font-body text-2xs tracking-widest uppercase text-terracotta mb-3 flex items-center gap-2">
          <span className="inline-block w-5 h-px bg-terracotta/40" aria-hidden="true" />
          {label}
        </p>
      )}
      <h2 className="font-display text-4xl md:text-5xl font-light text-ink">{heading}</h2>
      {subheading && (
        <p className="font-body text-base text-ink-muted mt-4 max-w-prose">{subheading}</p>
      )}
    </div>
  )
}

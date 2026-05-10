import { techIcons } from '../../utils/techIcons'

interface TechTagProps {
  label: string
  className?: string
}

export default function TechTag({ label, className = '' }: TechTagProps) {
  const Icon = techIcons[label]

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-body text-2xs font-medium px-3 py-1 bg-terracotta/10 text-terracotta rounded-full ${className}`}
    >
      {Icon && <Icon className="w-3 h-3 flex-shrink-0" aria-hidden="true" />}
      {label}
    </span>
  )
}

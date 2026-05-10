import type { ProjectStatus } from '../../content/projects'

interface StatusBadgeProps {
  status: ProjectStatus
  className?: string
}

const config: Record<ProjectStatus, { label: string; classes: string }> = {
  production: {
    label: 'Production',
    classes: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
  archived: {
    label: 'Archived',
    classes: 'bg-parchment-dark text-ink-muted border-rule',
  },
  'coming-soon': {
    label: 'Coming Soon',
    classes: 'bg-terracotta-light text-terracotta border-terracotta/20',
  },
  flagship: {
    label: 'Flagship',
    classes: 'bg-ink text-parchment border-ink',
  },
  beta: {
    label: 'Beta',
    classes: 'bg-blue-50 text-blue-700 border-blue-200',
  },
}

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const { label, classes } = config[status]
  return (
    <span
      className={`inline-flex items-center font-body text-2xs tracking-caps uppercase px-2.5 py-1 border rounded-sm ${classes} ${className}`}
    >
      {label}
    </span>
  )
}

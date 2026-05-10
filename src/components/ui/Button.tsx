import { Link } from 'react-router-dom'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'inverted' | 'inverted-outline'

interface BaseProps {
  variant?: ButtonVariant
  className?: string
  children: React.ReactNode
}

interface ButtonAsButton extends BaseProps {
  as?: 'button'
  type?: 'button' | 'submit' | 'reset'
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  href?: never
  to?: never
}

interface ButtonAsAnchor extends BaseProps {
  as: 'a'
  href: string
  target?: string
  rel?: string
  onClick?: never
  to?: never
}

interface ButtonAsLink extends BaseProps {
  as: 'link'
  to: string
  onClick?: never
  href?: never
}

type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsLink

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-terracotta text-parchment hover:bg-terracotta-hover border border-terracotta hover:border-terracotta-hover',
  secondary:
    'bg-transparent text-ink border border-ink/30 hover:border-ink',
  ghost:
    'bg-transparent text-ink-muted hover:text-ink border border-transparent',
  // For use on dark hero background
  inverted:
    'bg-parchment text-ink hover:bg-parchment/90 border border-parchment hover:border-parchment/90',
  'inverted-outline':
    'bg-transparent text-parchment border border-parchment/40 hover:border-parchment hover:bg-parchment/10',
}

const baseClasses =
  'inline-flex items-center gap-2 font-body text-sm tracking-wide px-5 py-2.5 rounded-xl transition-all duration-150 min-h-[44px] cursor-pointer'

export default function Button(props: ButtonProps) {
  const { variant = 'primary', className = '', children } = props
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`

  if (props.as === 'a') {
    return (
      <a href={props.href} target={props.target} rel={props.rel} className={classes}>
        {children}
      </a>
    )
  }

  if (props.as === 'link') {
    return (
      <Link to={props.to} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={props.type ?? 'button'} onClick={props.onClick} className={classes}>
      {children}
    </button>
  )
}

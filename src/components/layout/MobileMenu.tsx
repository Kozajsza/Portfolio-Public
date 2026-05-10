import { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

interface MobileMenuProps {
  id: string
  isOpen: boolean
  onClose: () => void
  links: { to: string; label: string }[]
}

export default function MobileMenu({ id, isOpen, onClose, links }: MobileMenuProps) {
  const location = useLocation()

  // Close on route change
  useEffect(() => {
    onClose()
  }, [location.pathname, onClose])

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-ink/30 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer */}
      <nav
        id={id}
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
        className={`fixed top-0 right-0 bottom-0 z-50 w-72 bg-parchment flex flex-col pt-16 pb-8 px-8 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ transitionTimingFunction: 'var(--ease-craft)' }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center text-ink-muted hover:text-ink transition-colors"
          aria-label="Close navigation menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Nav links */}
        <ul className="flex flex-col gap-1 mt-4" role="list">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `block py-3 font-display text-2xl font-light transition-colors duration-150 ${
                    isActive ? 'text-terracotta' : 'text-ink hover:text-terracotta'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Divider */}
        <hr className="section-rule mt-auto mb-4" />

        {/* Bottom links */}
        <div className="flex gap-4 text-sm font-body text-ink-muted">
          <a
            href="https://github.com/Kozajsza"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink transition-colors"
          >
            GitHub
          </a>
          <a
            href="/contact"
            className="hover:text-ink transition-colors"
          >
            Get in touch
          </a>
        </div>
      </nav>
    </>
  )
}

import { useState, useEffect, useCallback } from 'react'
import { NavLink, Link } from 'react-router-dom'
import MobileMenu from './MobileMenu'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

function LogoMark() {
  return (
    <Link
      to="/"
      aria-label="Home"
      className="group flex items-center justify-center w-9 h-9 rounded-xl bg-terracotta hover:bg-terracotta-hover transition-colors duration-150 flex-shrink-0"
    >
      {/* Placeholder logo — replace with real logo asset */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 3 L20 8 L20 16 L12 21 L4 16 L4 8 Z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="12" cy="12" r="2" fill="white" />
      </svg>
    </Link>
  )
}

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const handleClose = useCallback(() => setMenuOpen(false), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-250 ${
          scrolled
            ? 'bg-parchment/95 backdrop-blur-sm border-b border-rule'
            : 'bg-transparent'
        }`}
        style={{ transitionTimingFunction: 'var(--ease-craft)' }}
      >
        <div className="container-content">
          <div className="flex items-center justify-between h-16 md:h-18">
            <LogoMark />

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `font-body text-sm tracking-wide transition-colors duration-150 link-underline ${
                      isActive ? 'text-terracotta' : 'text-ink-muted hover:text-ink'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden flex flex-col justify-center items-center w-11 h-11 gap-1.5 text-ink"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span className="block w-5 h-px bg-current transition-all duration-200" />
              <span className="block w-5 h-px bg-current transition-all duration-200" />
              <span className="block w-3 h-px bg-current transition-all duration-200" />
            </button>
          </div>
        </div>
      </header>

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-terracotta focus:text-parchment focus:rounded focus:text-sm focus:font-body"
      >
        Skip to content
      </a>

      <MobileMenu
        id="mobile-menu"
        isOpen={menuOpen}
        onClose={handleClose}
        links={navLinks}
      />
    </>
  )
}

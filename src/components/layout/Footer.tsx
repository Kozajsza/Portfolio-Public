import { Link } from 'react-router-dom'
import { contact } from '../../content/contact'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-rule bg-parchment-dark">
      <div className="container-content py-10 md:py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Left — tagline */}
          <div>
            <p className="font-display text-base text-ink font-light">
              {contact.name} — AI implementation specialist.
            </p>
            <p className="font-body text-sm text-ink-muted mt-1">{contact.location}</p>
          </div>

          {/* Right — links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-2" role="list">
              <li>
                <Link
                  to="/projects"
                  className="font-body text-sm text-ink-muted hover:text-ink transition-colors duration-150 link-underline"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="font-body text-sm text-ink-muted hover:text-ink transition-colors duration-150 link-underline"
                >
                  About
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="font-body text-sm text-ink-muted hover:text-ink transition-colors duration-150 link-underline"
                >
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={contact.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-ink-muted hover:text-ink transition-colors duration-150 link-underline"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={contact.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-ink-muted hover:text-ink transition-colors duration-150 link-underline"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-rule flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="font-body text-2xs text-ink-faint tracking-wide">
            &copy; {year} {contact.name}. Built with care.
          </p>
          <p className="font-body text-2xs text-ink-faint">
            Phase 2: Claude-powered assistant coming soon.
          </p>
        </div>
      </div>
    </footer>
  )
}

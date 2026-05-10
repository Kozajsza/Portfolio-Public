import { useState } from 'react'
import { contact } from '../../content/contact'

// ── Icons ─────────────────────────────────────────────────────

function EmailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

// ── Email card with copy-to-clipboard ────────────────────────

export function EmailCard() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${contact.email}`
    }
  }

  return (
    <div className="group relative rounded-xl border border-rule bg-parchment-dark/40 p-6 hover:border-terracotta/30 hover:bg-parchment-dark/70 transition-all duration-200">
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-lg bg-terracotta/10 text-terracotta flex items-center justify-center">
            <EmailIcon />
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 font-body text-xs px-3 py-1.5 rounded-lg border transition-all duration-150 min-h-[36px] ${
              copied
                ? 'border-terracotta/40 bg-terracotta/10 text-terracotta'
                : 'border-rule bg-parchment text-ink-muted hover:text-ink hover:border-ink/20'
            }`}
            aria-label={copied ? 'Email copied' : 'Copy email address'}
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <p className="font-body text-2xs tracking-widest uppercase text-ink-faint mb-1">Email</p>
        <a
          href={`mailto:${contact.email}`}
          className="font-display text-lg font-light text-ink hover:text-terracotta transition-colors duration-150 break-all"
        >
          {contact.email}
        </a>
      </div>
    </div>
  )
}

// ── External link card ────────────────────────────────────────

interface LinkCardProps {
  label: string
  displayText: string
  href: string
  icon: React.ReactNode
}

export function LinkCard({ label, displayText, href, icon }: LinkCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative rounded-xl border border-rule bg-parchment-dark/40 p-6 hover:border-terracotta/30 hover:bg-parchment-dark/70 transition-all duration-200 block"
    >
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-lg bg-terracotta/10 text-terracotta flex items-center justify-center">
            {icon}
          </div>
          <span
            className="font-body text-lg text-ink-faint group-hover:text-terracotta transition-all duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 inline-block"
            aria-hidden="true"
          >
            ↗
          </span>
        </div>
        <p className="font-body text-2xs tracking-widest uppercase text-ink-faint mb-1">{label}</p>
        <p className="font-display text-lg font-light text-ink group-hover:text-terracotta transition-colors duration-150">
          {displayText}
        </p>
      </div>
    </a>
  )
}

function PSNIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8.985 2.596v17.548l3.915 1.261V6.688c0-.69.304-1.151.794-.994.636.181.76.814.76 1.505v5.515l3.915 1.258V7.01c0-3.287-2.059-4.674-5.088-5.588C11.145 1.05 9.842.446 8.985 2.596zM0 16.704l4.92 1.496v-1.551l-2.83-.826.003-.003L0 14.89v1.814zm6.315 1.875L0 16.704v1.776l6.315 1.874v-1.479zm11.97-4.553l-3.915-1.258v2.488c0 .69-.304 1.081-.794.923-.636-.181-.76-.814-.76-1.505V8.162l-3.915-1.28v5.8c0 3.286 2.059 4.673 5.088 5.586 1.146.321 2.449.924 3.305-1.258l.001-.002V14.026h-.01z" />
    </svg>
  )
}

function SteamIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.607 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.252 0-2.265-1.014-2.265-2.265z" />
    </svg>
  )
}

// ── Convenience exports ───────────────────────────────────────

export function LinkedInCard() {
  return (
    <LinkCard
      label="LinkedIn"
      displayText="Mateusz Kozinski"
      href={contact.linkedinUrl}
      icon={<LinkedInIcon />}
    />
  )
}

export function GitHubCard() {
  return (
    <LinkCard
      label="GitHub"
      displayText="Kozajsza"
      href={contact.githubUrl}
      icon={<GitHubIcon />}
    />
  )
}

export function PSNCard() {
  return (
    <LinkCard
      label="PSN"
      displayText="Kozajsza"
      href="https://psnprofiles.com/Kozajsza"
      icon={<PSNIcon />}
    />
  )
}

export function SteamCard() {
  return (
    <LinkCard
      label="Steam"
      displayText="Kozajsza"
      href="https://steamcommunity.com/profiles/76561198054846144/"
      icon={<SteamIcon />}
    />
  )
}

import { useEffect, useRef } from 'react'
import { contact } from '../../content/contact'
import CursorSpotlight from '../layout/CursorSpotlight'
import HeroVisual from './HeroVisual'
import Button from './Button'
import ChatPrompt from '../chatbot/ChatPrompt'

const HERO_BG = [
  'radial-gradient(ellipse 80% 65% at 80% 20%, rgba(62,122,116,0.32) 0%, transparent 70%)',
  'radial-gradient(ellipse 55% 55% at 15% 75%, rgba(62,122,116,0.18) 0%, transparent 68%)',
  'linear-gradient(145deg, rgba(62,122,116,0.10) 0%, rgba(62,122,116,0.22) 55%, rgba(62,122,116,0.06) 100%)',
].join(', ')

interface HeroButton {
  label: string
  variant: 'primary' | 'secondary'
  href?: string
  to?: string
}

interface PageHeroProps {
  ariaLabel: string
  topLabel: string
  tagline: string
  paragraph?: string
  buttons?: HeroButton[]
  chatPlaceholder?: string
  parallax?: boolean
}

export default function PageHero({
  ariaLabel,
  topLabel,
  tagline,
  paragraph,
  buttons,
  chatPlaceholder,
  parallax = false,
}: PageHeroProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!parallax) return
    const el = contentRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    let rafId: number
    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        el.style.transform = `translateY(${-(window.scrollY * 0.48)}px)`
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [parallax])

  return (
    <section
      data-hero
      className="relative overflow-hidden min-h-[50vh]"
      aria-label={ariaLabel}
      style={{ background: HERO_BG }}
    >
      <CursorSpotlight />
      <HeroVisual />

      <div ref={contentRef} className="relative z-10">
        <div className="container-content pt-12 md:pt-20 pb-14 md:pb-24">
          <div className="max-w-3xl">

            <div className="w-fit max-w-full fade-up mb-8">
              <p className="font-body text-base md:text-lg text-ink-muted mb-0.5">
                {topLabel}
              </p>
              <h1 className="font-display text-7xl sm:text-8xl md:text-9xl font-light text-ink leading-[0.92] tracking-tight">
                {contact.fullName}.
              </h1>
              <p className="font-body text-base md:text-lg text-ink-muted italic text-right mt-0.5">
                {tagline}
              </p>
            </div>

            {paragraph && (
              <p className="font-body text-base text-ink-muted leading-relaxed mb-10 max-w-2xl fade-up">
                {paragraph}
              </p>
            )}

            {buttons && buttons.length > 0 && (
              <div className="flex flex-wrap gap-3 fade-up">
                {buttons.map((btn) =>
                  btn.href ? (
                    <Button key={btn.label} as="a" href={btn.href} variant={btn.variant}>
                      {btn.label}
                    </Button>
                  ) : (
                    <Button key={btn.label} as="link" to={btn.to!} variant={btn.variant}>
                      {btn.label}
                    </Button>
                  )
                )}
              </div>
            )}

            <ChatPrompt placeholder={chatPlaceholder} />
          </div>
        </div>
      </div>
    </section>
  )
}

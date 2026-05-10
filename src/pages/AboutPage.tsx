import { useMeta } from '../utils/useMeta'
import { about } from '../content/about'
import { contact } from '../content/contact'
import { skillGroups } from '../content/skills'
import { values } from '../content/values'
import SectionHeading from '../components/ui/SectionHeading'
import ValueCard from '../components/ui/ValueCard'
import Button from '../components/ui/Button'
import AboutTimeline from '../components/about/AboutTimeline'
import PageHero from '../components/ui/PageHero'
import { EmailCard, LinkedInCard, GitHubCard, PSNCard, SteamCard } from '../components/ui/ContactCards'

export default function AboutPage() {
  useMeta({
    title: 'About — Mateusz Kozinski',
    description: 'Decade in ITAD and waste management operations, three years building production AI tools. Career changer turned AI engineer based in London.',
  })

  return (
    <>
      <PageHero
        ariaLabel="About introduction"
        topLabel="Decade of operations."
        tagline="Three years of building."
        paragraph="I spent ten years in ITAD and waste management — running facilities, managing compliance, and watching good people lose hours to bad systems. In 2023 I started building the tools to fix that."
        buttons={[
          { label: 'See my work', variant: 'primary', to: '/projects' },
          { label: 'Get in touch', variant: 'secondary', to: '/contact' },
        ]}
        chatPlaceholder="Ask me about Mateusz..."
      />

      <div className="container-content py-16 md:py-24 space-y-20 md:space-y-28">

        {/* ── How I got here ──────────────────────────────────── */}
        <section aria-label="Career narrative">
          <div
            className="sticky top-16 z-20 -mx-6 px-6 py-3 backdrop-blur-sm bg-parchment/80 border-b border-rule mb-8 lg:hidden"
            aria-hidden="true"
          >
            <p className="font-body text-2xs uppercase tracking-widest text-terracotta">
              How I got here
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div className="hidden lg:block">
              <p className="font-body text-2xs tracking-widest uppercase text-terracotta flex items-center gap-2 sticky top-24">
                <span className="inline-block w-5 h-px bg-terracotta/40" aria-hidden="true" />
                How I got here
              </p>
            </div>
            <div>
              <AboutTimeline />
            </div>
          </div>
        </section>

        {/* ── What I'm looking for ────────────────────────────── */}
        <section aria-label="What I am looking for">
          <div
            className="sticky top-16 z-20 -mx-6 px-6 py-3 backdrop-blur-sm bg-parchment/80 border-b border-rule mb-8 lg:hidden"
            aria-hidden="true"
          >
            <p className="font-body text-2xs uppercase tracking-widest text-terracotta">
              What I'm looking for
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div className="hidden lg:block">
              <p className="font-body text-2xs tracking-widest uppercase text-terracotta flex items-center gap-2 sticky top-24">
                <span className="inline-block w-5 h-px bg-terracotta/40" aria-hidden="true" />
                What I'm looking for
              </p>
            </div>
            <div className="max-w-prose">
              <div className="rounded-xl border border-rule bg-parchment-dark/60 px-7 py-6">
                <p className="font-display text-2xl md:text-3xl font-light text-ink leading-snug">
                  {about.lookingFor}
                </p>
              </div>
              <div className="mt-6">
                <Button as="link" to="/contact" variant="primary" className="group">
                  Get in touch
                  <span
                    className="inline-block transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Skills ──────────────────────────────────────────── */}
        <section aria-label="Skills">
          <div
            className="sticky top-16 z-20 -mx-6 px-6 py-3 backdrop-blur-sm bg-parchment/80 border-b border-rule mb-8 lg:hidden"
            aria-hidden="true"
          >
            <p className="font-body text-2xs uppercase tracking-widest text-terracotta">Skills</p>
          </div>

          <SectionHeading label="Skills" heading="What I work with" className="mb-10 hidden lg:block" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
            {skillGroups.map((group) => (
              <div key={group.category}>
                <h3 className="font-body text-2xs tracking-widest uppercase text-terracotta mb-4">
                  {group.category}
                </h3>
                <ul className="space-y-2">
                  {group.skills.map((skill) => (
                    <li key={skill} className="font-body text-sm text-ink-muted flex items-center gap-2">
                      <span
                        className="inline-block w-1 h-1 rounded-full bg-terracotta/40 flex-shrink-0"
                        aria-hidden="true"
                      />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Values ──────────────────────────────────────────── */}
        <section aria-label="Values and work style">
          <div
            className="sticky top-16 z-20 -mx-6 px-6 py-3 backdrop-blur-sm bg-parchment/80 border-b border-rule mb-8 lg:hidden"
            aria-hidden="true"
          >
            <p className="font-body text-2xs uppercase tracking-widest text-terracotta">
              How I work
            </p>
          </div>

          <SectionHeading label="Values" heading="How I work" className="mb-10" />

          <ul className="group/list grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <li
                key={i}
                className="group-hover/list:opacity-60 hover:!opacity-100 transition-opacity duration-200 relative"
              >
                <div className="absolute -inset-x-2 -inset-y-2 rounded-md transition lg:group-hover:bg-ink/[0.03] lg:group-hover:shadow-sm pointer-events-none z-0" />
                <div className="relative z-10">
                  <ValueCard heading={v.heading} body={v.body} index={i} />
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Contact CTA ─────────────────────────────────────── */}
        <section aria-label="Contact call to action" className="border-t border-rule pt-12">
          <div className="mb-8">
            <h2 className="font-display text-3xl md:text-4xl font-light text-ink">
              Want to work together?
            </h2>
            <p className="font-body text-sm text-ink-muted mt-2">
              Always happy to talk.
            </p>
          </div>
          <div className="max-w-2xl space-y-4">
            <EmailCard />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <LinkedInCard />
              <GitHubCard />
            </div>
            <p className="font-body text-sm text-ink-muted pt-2">
              Based in{' '}
              <strong className="font-medium text-ink">{contact.location}</strong>.{' '}
              {contact.availability}
            </p>
          </div>
        </section>

        {/* ── Gaming profiles ──────────────────────────────────── */}
        <section aria-label="Gaming profiles" className="border-t border-rule pt-12">
          <div className="mb-8">
            <h2 className="font-display text-3xl md:text-4xl font-light text-ink">
              When I'm not building
            </h2>
            <p className="font-body text-sm text-ink-muted mt-2">
              Find me on PSN or Steam.
            </p>
          </div>
          <div className="max-w-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <PSNCard />
              <SteamCard />
            </div>
          </div>
        </section>

      </div>

    </>
  )
}

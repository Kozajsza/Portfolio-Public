import { useMeta } from '../utils/useMeta'
import { contact } from '../content/contact'
import { timeline } from '../content/timeline'
import { values } from '../content/values'
import SectionHeading from '../components/ui/SectionHeading'
import ProjectsGrid from '../components/ui/ProjectsGrid'
import ValueCard from '../components/ui/ValueCard'
import Timeline from '../components/ui/Timeline'
import PageHero from '../components/ui/PageHero'
import { EmailCard, LinkedInCard, GitHubCard } from '../components/ui/ContactCards'

export default function HomePage() {
  useMeta({
    title: 'Mateusz Kozinski — AI Engineer',
    description: 'AI implementation specialist based in London. Building production AI-enhanced tools with a background in ITAD and waste management.',
  })

  return (
    <>
      <PageHero
        ariaLabel="Introduction"
        topLabel="Hi, my name is"
        tagline="I build AI-powered tools that solve real problems"
        paragraph={contact.heroParagraph}
        buttons={[
          { label: 'See my work', variant: 'primary', href: '#projects' },
          { label: 'Get in touch', variant: 'secondary', href: '#contact' },
        ]}
        parallax
      />

      {/* ── Projects ─────────────────────────────────────────── */}
      <section
        id="projects"
        className="container-content py-20 md:py-32 scroll-mt-20"
        aria-label="Projects"
      >
        <div
          className="sticky top-16 z-20 -mx-5 sm:-mx-8 px-5 sm:px-8 py-3 backdrop-blur-sm bg-parchment/80 border-b border-rule mb-10 lg:hidden"
          aria-hidden="true"
        >
          <p className="font-body text-2xs uppercase tracking-widest text-terracotta">Projects</p>
        </div>

        <SectionHeading
          label="Work"
          heading="Projects"
          subheading="Six projects spanning simple utilities to production applications. Each one solved a specific problem."
          className="mb-14 md:mb-20 fade-up"
        />

        <ProjectsGrid />
      </section>

      <hr className="section-rule" />

      {/* ── Timeline ─────────────────────────────────────────── */}
      <section
        className="container-content py-20 md:py-32"
        aria-label="Career timeline"
      >
        <div
          className="sticky top-16 z-20 -mx-5 sm:-mx-8 px-5 sm:px-8 py-3 backdrop-blur-sm bg-parchment/80 border-b border-rule mb-10 lg:hidden"
          aria-hidden="true"
        >
          <p className="font-body text-2xs uppercase tracking-widest text-terracotta">Background</p>
        </div>

        <SectionHeading
          label="Background"
          heading="The Journey"
          className="mb-14 md:mb-20 fade-up"
        />
        <Timeline entries={timeline} />
      </section>

      <hr className="section-rule" />

      {/* ── Values ───────────────────────────────────────────── */}
      <section
        className="container-content py-20 md:py-32"
        aria-label="How I work"
      >
        <div
          className="sticky top-16 z-20 -mx-5 sm:-mx-8 px-5 sm:px-8 py-3 backdrop-blur-sm bg-parchment/80 border-b border-rule mb-10 lg:hidden"
          aria-hidden="true"
        >
          <p className="font-body text-2xs uppercase tracking-widest text-terracotta">Principles</p>
        </div>

        <SectionHeading
          label="Principles"
          heading="How I work"
          className="mb-14 md:mb-20 fade-up"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 group/values">
          {values.map((value, i) => (
            <div
              key={value.heading}
              className="group-hover/values:opacity-60 hover:!opacity-100 transition-opacity duration-200"
            >
              <ValueCard heading={value.heading} body={value.body} index={i} />
            </div>
          ))}
        </div>
      </section>

      <hr className="section-rule" />

      {/* ── Get in touch ─────────────────────────────────────── */}
      <section
        id="contact"
        className="container-content py-20 md:py-32 scroll-mt-20"
        aria-label="Contact"
      >
        <div className="mb-12 fade-up">
          <p className="font-body text-2xs tracking-widest uppercase text-terracotta mb-4 flex items-center gap-2">
            <span className="inline-block w-5 h-px bg-terracotta/40" aria-hidden="true" />
            Get in touch
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-ink leading-[1.1]">
            Let's build something useful.
          </h2>
          <p className="font-body text-base text-ink-muted mt-4 max-w-prose leading-relaxed">
            {contact.ctaBody}
          </p>
        </div>

        <div className="max-w-2xl space-y-4 fade-up">
          <div className="sm:col-span-2">
            <EmailCard />
          </div>
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

    </>
  )
}

import { useMeta } from '../utils/useMeta'
import { contact } from '../content/contact'
import { EmailCard, LinkedInCard, GitHubCard } from '../components/ui/ContactCards'
import PageHero from '../components/ui/PageHero'

export default function ContactPage() {
  useMeta({
    title: 'Contact — Mateusz Kozinski',
    description: 'Get in touch with Mateusz Kozinski — AI implementation specialist based in London. Open to roles and conversations about AI in production.',
  })

  return (
    <>
      <PageHero
        ariaLabel="Contact introduction"
        topLabel="Hi."
        tagline="I'm always happy to talk."
        paragraph={contact.intro}
        buttons={[
          { label: 'See my work', variant: 'primary', to: '/projects' },
          { label: 'About me', variant: 'secondary', to: '/about' },
        ]}
      />

      <div className="container-content py-16 md:py-24">
        <div className="max-w-2xl space-y-12">

          {/* ── Contact cards ─────────────────────────────────── */}
          <section aria-label="Contact methods">
            <div className="space-y-4">
              <EmailCard />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <LinkedInCard />
                <GitHubCard />
              </div>
            </div>
          </section>

          {/* ── Location note ─────────────────────────────────── */}
          <section aria-label="Location and availability">
            <div className="flex items-start gap-3">
              <span
                className="inline-block w-5 h-px bg-terracotta/40 mt-2.5 flex-shrink-0"
                aria-hidden="true"
              />
              <p className="font-body text-sm text-ink-muted leading-relaxed">
                Based in <strong className="font-medium text-ink">{contact.location}</strong>.{' '}
                {contact.availability}
              </p>
            </div>
          </section>

        </div>
      </div>

    </>
  )
}

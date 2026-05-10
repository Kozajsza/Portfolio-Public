import { useMeta } from '../../utils/useMeta'
import { getProject } from '../../content/projects'
import ProjectPageLayout from '../../components/ui/ProjectPageLayout'

export default function PortfolioPage() {
  useMeta({
    title: 'Portfolio & AI Chatbot — Mateusz Kozinski',
    description: 'Custom React/TypeScript portfolio with a bespoke design system and a GPT-4o chatbot running on Cloudflare Workers, streaming responses via Server-Sent Events.',
  })
  const project = getProject('portfolio')!
  return <ProjectPageLayout project={project} />
}

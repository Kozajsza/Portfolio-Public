import { useMeta } from '../../utils/useMeta'
import { getProject } from '../../content/projects'
import ProjectPageLayout from '../../components/ui/ProjectPageLayout'

export default function DiscordBotPage() {
  useMeta({
    title: 'GPT Knowledge Base Discord Bot — Mateusz Kozinski',
    description: 'Document-grounded Discord assistant built in early 2023 — retrieval-augmented generation from scratch before the term existed.',
  })
  const project = getProject('discord-bot')!
  return <ProjectPageLayout project={project} />
}

import { useMeta } from '../../utils/useMeta'
import { getProject } from '../../content/projects'
import ProjectPageLayout from '../../components/ui/ProjectPageLayout'

export default function WasteAuditAiPage() {
  useMeta({
    title: 'Waste Audit Tool — AI Enhanced — Mateusz Kozinski',
    description: 'GPT-4o Vision classification, LLM-generated reporting, and scikit-learn anomaly detection retrofitted into a production waste audit tool.',
  })
  const project = getProject('waste-audit-ai')!
  return <ProjectPageLayout project={project} />
}

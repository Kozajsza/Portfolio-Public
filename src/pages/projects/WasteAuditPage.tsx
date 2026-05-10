import { useMeta } from '../../utils/useMeta'
import { getProject } from '../../content/projects'
import ProjectPageLayout from '../../components/ui/ProjectPageLayout'

export default function WasteAuditPage() {
  useMeta({
    title: 'Waste Audit Tool — Mateusz Kozinski',
    description: 'Production Django app guiding field auditors through structured waste assessments and generating contamination reports. Deployed on a NAS server.',
  })
  const project = getProject('waste-audit')!
  return <ProjectPageLayout project={project} />
}

import { useMeta } from '../../utils/useMeta'
import { getProject } from '../../content/projects'
import ProjectPageLayout from '../../components/ui/ProjectPageLayout'

export default function RebootPage() {
  useMeta({
    title: 'Reboot Project — Mateusz Kozinski',
    description: 'Full-stack ITAD platform with instant quote engine, self-service booking, Blancco XML import pipeline, and eBay price scraping. Live in production.',
  })
  const project = getProject('reboot')!
  return <ProjectPageLayout project={project} />
}

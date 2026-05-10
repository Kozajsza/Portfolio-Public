import { useMeta } from '../../utils/useMeta'
import { getProject } from '../../content/projects'
import ProjectPageLayout from '../../components/ui/ProjectPageLayout'

export default function HddScannerPage() {
  useMeta({
    title: 'HDD/SSD Label Scanner — Mateusz Kozinski',
    description: 'AI vision tool using GPT-4o to extract structured inventory data from hardware labels — automating data capture for drives that cannot be scanned by Blancco.',
  })
  const project = getProject('hdd-scanner')!
  return <ProjectPageLayout project={project} />
}

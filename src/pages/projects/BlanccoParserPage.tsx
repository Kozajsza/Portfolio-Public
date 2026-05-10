import { useMeta } from '../../utils/useMeta'
import { getProject } from '../../content/projects'
import ProjectPageLayout from '../../components/ui/ProjectPageLayout'

export default function BlanccoParserPage() {
  useMeta({
    title: 'Blancco XML to Pandas Parser — Mateusz Kozinski',
    description: 'Data pipeline utility transforming Blancco Drive Eraser audit reports into structured CSV for inventory integration.',
  })
  const project = getProject('blancco-parser')!
  return <ProjectPageLayout project={project} />
}

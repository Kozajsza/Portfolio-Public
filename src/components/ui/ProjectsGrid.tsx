import { projects } from '../../content/projects'
import ProjectCard from './ProjectCard'
import JointProjectCard from './JointProjectCard'

export default function ProjectsGrid() {
  const wasteAudit = projects.find((p) => p.slug === 'waste-audit')!
  const wasteAuditAi = projects.find((p) => p.slug === 'waste-audit-ai')!
  const reboot = projects.find((p) => p.slug === 'reboot')!
  const hddScanner = projects.find((p) => p.slug === 'hdd-scanner')!
  const discordBot = projects.find((p) => p.slug === 'discord-bot')!
  const blanccoParser = projects.find((p) => p.slug === 'blancco-parser')!
  const portfolio = projects.find((p) => p.slug === 'portfolio')!

  return (
    <ul
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7"
      role="list"
    >
      {/* Row 1: Reboot (2 cols wide) + HDD Scanner */}
      <li className="fade-up sm:col-span-2">
        <ProjectCard project={reboot} wide />
      </li>
      <li className="fade-up">
        <ProjectCard project={hddScanner} />
      </li>

      {/* Row 2: Blancco + Waste Audit joint (2 cols) */}
      <li className="fade-up">
        <ProjectCard project={blanccoParser} />
      </li>
      <li className="fade-up sm:col-span-2">
        <JointProjectCard projectA={wasteAudit} projectB={wasteAuditAi} />
      </li>

      {/* Row 3: Portfolio (jade, 2 cols wide) + Discord Bot */}
      <li className="fade-up sm:col-span-2">
        <ProjectCard project={portfolio} wide />
      </li>
      <li className="fade-up">
        <ProjectCard project={discordBot} />
      </li>
    </ul>
  )
}

import { useMeta } from '../utils/useMeta'
import SectionHeading from '../components/ui/SectionHeading'
import ProjectsGrid from '../components/ui/ProjectsGrid'

export default function ProjectsPage() {
  useMeta({
    title: 'Projects — Mateusz Kozinski',
    description: 'Six projects spanning simple utilities to production applications — Django, Python, AI, and React. Each one solved a specific real-world problem.',
  })

  return (
    <>
      <div className="container-content py-20 md:py-32">
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
      </div>

    </>
  )
}

export interface TimelineEntry {
  year: string
  title: string
  description: string
}

export const timeline: TimelineEntry[] = [
  {
    year: '2013–2019',
    title: 'Operations and business development',
    description:
      'Started in e-waste and WEEE recycling operations. Progressed from ecommerce assistant to business development manager, then ran a WEEE processing facility — managing compliance, logistics, staffing, and day-to-day operations across multiple waste streams. Built a deep understanding of how ITAD and waste management businesses actually work.',
  },
  {
    year: '2019–2023',
    title: 'ITAD specialist',
    description:
      'Moved into IT asset disposition at First Mile, managing the full hardware lifecycle: intake, data wiping (Blancco), grading, resale, and certified destruction. Saw first-hand how much operational time was lost to manual data entry, inconsistent reporting, and disconnected systems.',
  },
  {
    year: '2023',
    title: 'First code, first AI',
    description:
      'Taught myself Python to solve problems I had been watching for years. Built a GPT-powered Discord bot for company knowledge before "RAG" was common terminology. Wrote the Blancco XML parser to automate inventory data entry — still in use today.',
  },
  {
    year: '2024',
    title: 'Production applications',
    description:
      'Built and deployed the Waste Audit Tool — a Django application now used daily by real auditors. Started building Reboot, a full-stack ITAD platform with instant quoting, self-service booking, and automated asset processing.',
  },
  {
    year: '2025',
    title: 'AI integration',
    description:
      'Added three AI layers to the waste audit tool: GPT-4o vision classification, LLM-generated reporting, and scikit-learn anomaly detection. Deployed everything in Docker on a NAS. Began experimenting with vision models for hardware label scanning.',
  },
  {
    year: '2026',
    title: 'Looking for the right team',
    description:
      'Focused on AI implementation — the engineering gap between "we could use AI here" and "this actually works in production." Building this portfolio and ready for the next challenge.',
  },
]

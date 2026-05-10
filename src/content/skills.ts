export interface SkillGroup {
  category: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'AI & Machine Learning',
    skills: [
      'Claude API',
      'OpenAI API (GPT-4o, GPT-4o-mini, Vision)',
      'Prompt engineering',
      'RAG patterns',
      'Vision models',
      'scikit-learn',
      'LLM-powered tooling',
      'AI evaluation methodology',
    ],
  },
  {
    category: 'Backend',
    skills: ['Python', 'Django', 'Django REST Framework', 'FastAPI', 'SQLite', 'PostgreSQL', 'REST API design'],
  },
  {
    category: 'Frontend',
    skills: ['React', 'TypeScript', 'HTML/CSS', 'Tailwind CSS', 'Vite', 'Jinja2', 'Framer Motion'],
  },
  {
    category: 'Data',
    skills: ['Pandas', 'SQL', 'XML/JSON processing', 'lxml', 'BeautifulSoup', 'ApexCharts', 'openpyxl', 'CSV pipelines'],
  },
  {
    category: 'Infrastructure',
    skills: ['Docker', 'Git', 'Linux', 'NAS deployment', 'Cloudflare Pages', 'Cloudflare Workers', 'Render', 'CI/CD'],
  },
  {
    category: 'Domain',
    skills: [
      'ITAD operations',
      'WEEE compliance',
      'Waste management',
      'Hardware lifecycle',
      'Data destruction compliance',
      'Circular economy',
      'E-waste processing',
    ],
  },
]

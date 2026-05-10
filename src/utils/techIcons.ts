import {
  SiDjango,
  SiPython,
  SiSqlite,
  SiPostgresql,
  SiTailwindcss,
  SiDocker,
  SiPandas,
  SiReact,
  SiTypescript,
  SiFramer,
  SiDiscord,
  SiOpenai,
  SiFastapi,
  SiAnthropic,
  SiScikitlearn,
} from 'react-icons/si'
import type { IconType } from 'react-icons'

export const techIcons: Record<string, IconType> = {
  // Django variants
  'Django': SiDjango,
  'Django 4.2': SiDjango,
  'Django 5': SiDjango,
  'Django 5.2': SiDjango,
  'Django REST Framework': SiDjango,
  'django-imagekit': SiDjango,

  // Python ecosystem
  'Python': SiPython,
  'Pandas': SiPandas,
  'scikit-learn': SiScikitlearn,

  // Database / storage
  'SQLite': SiSqlite,
  'PostgreSQL': SiPostgresql,

  // Frontend / styling
  'React': SiReact,
  'React 18': SiReact,
  'TypeScript': SiTypescript,
  'Tailwind CSS': SiTailwindcss,
  'Framer Motion': SiFramer,

  // Infrastructure
  'Docker': SiDocker,
  'FastAPI': SiFastapi,

  // AI / APIs
  'OpenAI API': SiOpenai,
  'GPT-4o API': SiOpenai,
  'GPT-4o Vision': SiOpenai,
  'GPT-4o-mini': SiOpenai,
  'Claude API': SiAnthropic,
  'Vision Models': SiAnthropic,

  // Messaging
  'Discord.py': SiDiscord,
}

// Token-efficient knowledge base for the portfolio chatbot.
// Imported by functions/api/chat.ts at bundle time.
//
// NOTE: projects.ts imports PNG files which cannot be imported in the Worker
// environment, so project summaries are maintained inline here. All other
// sections are assembled dynamically from their source files.

import { about, aboutTimeline } from './about'
import { skillGroups } from './skills'
import { contact } from './contact'
import { values } from './values'

// ── Project summaries (text-only — no code snippets or screenshots) ──────────

interface ProjectSummary {
  slug: string
  title: string
  status: string
  timeframe: string
  techStack: string[]
  oneLiner: string
  problem: string
  solution: string
  liveUrl?: string
  githubUrl?: string
}

const projectSummaries: ProjectSummary[] = [
  {
    slug: 'waste-audit',
    title: 'Waste Audit Tool',
    status: 'production',
    timeframe: '2024–present',
    techStack: ['Django 4.2', 'Python', 'SQLite', 'Tailwind CSS', 'Docker', 'Pandas', 'ApexCharts', 'Pillow', 'openpyxl'],
    oneLiner: 'Production Django web app guiding field auditors through structured waste container assessments — deployed on a NAS server and used in real audits.',
    problem:
      'Waste management auditors were conducting assessments using paper forms and spreadsheets. Each container had to be photographed, weighed, and manually broken down into up to 15 material categories. Photos were stored separately from reports, and generating a contamination summary meant manual calculation across multiple sheets. The process was slow, inconsistent across auditors, and produced data that was almost impossible to aggregate.',
    solution:
      'A Django web application with a three-stage workflow: auditors create an audit, add containers one by one (capturing a photo via the webcam API, selecting the waste stream, logging the weight), then record the material breakdown for each container. A summary view computes contamination percentages per stream, renders ApexCharts visualisations, and generates a printable A4 report. Deployable to Excel via Pandas/openpyxl. Deployed on a NAS server inside the company network, accessed from phones and tablets on-site in Docker.',
    githubUrl: 'https://github.com/Kozajsza/FMAuditPortfolioVersion',
  },
  {
    slug: 'reboot',
    title: 'Reboot Project',
    status: 'flagship — live in production',
    timeframe: '2024–present',
    techStack: ['Django 5', 'Django REST Framework', 'PostgreSQL', 'React 18', 'Tailwind CSS', 'Framer Motion', 'Pandas', 'lxml', 'BeautifulSoup'],
    oneLiner:
      'Full-stack ITAD platform with instant online quote engine, multi-step self-service booking, Blancco XML import pipeline, eBay price scraping, and a separate employee operations dashboard — deployed on Render.',
    problem:
      'The UK ITAD market runs almost entirely on phone calls and "contact us" forms. Every major competitor requires a customer to speak to a salesperson before they can get a quote or book a collection. No UK ITAD company offers genuine self-service online booking with an instant price estimate. Customers disposing of IT equipment have no way to know what their devices are worth before agreeing to hand them over. The operational side is equally fragmented — Blancco wipe reports manually re-entered into inventory, market pricing checked by hand on eBay.',
    solution:
      'A three-service production system: a Django 5 + DRF backend API, a customer-facing React frontend (rebootproject.co.uk), and a separate React employee dashboard. The backend exposes 30+ endpoints covering the full asset lifecycle. The quote engine is a custom bin-packing algorithm that groups items by type and disposal treatment, determines the right collection containers, and calculates per-item disposal costs and rebates server-side. The Blancco import pipeline parses multi-section XML, normalises hardware identifiers, snaps storage capacities to standard sizes, and creates fully-populated asset records from a single file upload. eBay scraping returns median market pricing with closest-to-median comparables. Customer booking is UUID-scoped (no account required) from a 1,500+ item catalogue.',
    liveUrl: 'https://rebootproject.co.uk/',
  },
  {
    slug: 'waste-audit-ai',
    title: 'Waste Audit Tool — AI Enhanced',
    status: 'production',
    timeframe: '2024–present',
    techStack: ['Django 5.2', 'Python', 'OpenAI API', 'GPT-4o Vision', 'GPT-4o-mini', 'scikit-learn', 'SQLite', 'Tailwind CSS', 'Docker'],
    oneLiner:
      'Three independent AI layers retrofitted into the production waste audit tool — GPT-4o Vision photo classification, GPT-4o-mini report narrative generation, and scikit-learn anomaly detection — without breaking existing workflows.',
    problem:
      'The V1 waste audit tool was in active production use. But auditors still categorised every material by eye, managers had no way to compare contamination rates over time, and each audit report ended with a blank page where a written analysis should have been. Adding AI to a production system that real users depend on daily is a different engineering problem from building AI-first — existing workflows could not be broken, internet connectivity could not be required for core features, and every AI call had to be opt-in with a visible cost estimate before triggering.',
    solution:
      'Three independent AI layers built on top of the existing Django backend. (1) GPT-4o Vision photo classification: after capturing the post-open container photo, an auditor can click "Analyse with AI" — the backend base64-encodes the image, sends it to GPT-4o with a structured system prompt, and receives JSON specifying stream suggestion, material suggestions, and confidence. AI suggestions are never auto-submitted. (2) GPT-4o-mini report narrative generation: the audit context dictionary is transformed into a structured prompt, optionally injected with a site-specific knowledge base, sent to GPT-4o-mini, and the returned narrative persists to DB so subsequent views incur no API cost. (3) scikit-learn IsolationForest anomaly detection — no API call required. Models trained per waste stream and persisted with joblib. All AI calls go through a centralised AIService class with token budget checks and usage logging.',
    githubUrl: 'https://github.com/Kozajsza/FMAuditPortfolioVersion',
  },
  {
    slug: 'hdd-scanner',
    title: 'HDD/SSD Label Scanner',
    status: 'beta',
    timeframe: '2025–present',
    techStack: ['Python', 'GPT-4o API', 'FastAPI'],
    oneLiner:
      'AI vision tool using GPT-4o to extract structured inventory data from hardware labels — for drives that cannot be catalogued by Blancco because they will not power on.',
    problem:
      'In ITAD operations, drives that won\'t power on can\'t be catalogued by tools like Blancco — they don\'t enumerate. These drives are common: failed, physically damaged, or simply non-functional. Currently, someone has to manually read and type each label (make, model, serial number, capacity) into inventory. On a large pallet this takes hours. The bottleneck is entirely avoidable.',
    solution:
      'A vision pipeline that photographs hardware labels and extracts structured inventory data using GPT-4o Vision API. Point a phone camera at a drive label; the system returns make, model, serial, capacity, and interface type as structured JSON ready to insert into the inventory system. This is a natural extension of the Blancco Parser — it solves the same data integration problem for the drives that Blancco can\'t reach.',
    githubUrl: 'https://github.com/Kozajsza/HDDScanner',
  },
  {
    slug: 'discord-bot',
    title: 'GPT Knowledge Base Discord Bot',
    status: 'archived (built early 2023)',
    timeframe: 'Early 2023',
    techStack: ['Python', 'Discord.py', 'OpenAI API', 'python-docx'],
    oneLiner:
      'Document-grounded Discord assistant built in early 2023 — implementing retrieval-augmented generation from scratch before the term "RAG" existed.',
    problem:
      'A company needed staff to have quick access to internal knowledge: product specs, process documentation, FAQ material. The documentation lived in Word files and was rarely consulted because it was hard to search. This was early 2023 — before LangChain reached v1.0, before "RAG" was a term most developers knew. There were no off-the-shelf solutions.',
    solution:
      'A Discord bot that reads company Word documents at startup, chunks them into manageable segments, and constructs grounded prompts when users ask questions — injecting the most relevant document sections into the OpenAI context window alongside the user\'s question. Built using text-davinci-003 before ChatGPT\'s API was available. The document-grounding approach — what we\'d now call naive RAG — was figured out empirically through iteration and worked in production for real company knowledge queries.',
    githubUrl: 'https://github.com/Kozajsza/DiscordBot',
  },
  {
    slug: 'blancco-parser',
    title: 'Blancco XML to Pandas Parser',
    status: 'production',
    timeframe: '2023',
    techStack: ['Python', 'Pandas', 'lxml'],
    oneLiner:
      'Data pipeline transforming Blancco Drive Eraser XML audit reports into structured CSV for inventory integration — first production Python script, still in use.',
    problem:
      'Blancco Drive Eraser exports audit reports as XML containing serial numbers, make, model, capacity, erasure method, and pass/fail status — exactly the data needed for inventory and compliance records. Manually copying this data from XML reports into spreadsheets was tedious and error-prone. The company processed dozens of drives per day; the bottleneck was real.',
    solution:
      'A Python utility that parses Blancco XML reports using lxml, extracts the relevant fields, and outputs a clean Pandas DataFrame that can be saved as CSV or fed directly into the inventory system. The XML schema is irregular and inconsistent across Blancco versions, so the parser handles missing fields gracefully. Mateusz\'s first production Python script — still used as a component in larger automation pipelines.',
    githubUrl: 'https://github.com/Kozajsza/Blancco-xml-to-pandas',
  },
  {
    slug: 'portfolio',
    title: 'Portfolio & AI Chatbot',
    status: 'production',
    timeframe: '2026',
    techStack: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'Cloudflare Pages', 'OpenAI API'],
    oneLiner:
      'This portfolio site — custom-designed React/TypeScript app with a GPT-4o chatbot running on Cloudflare Workers, streaming via SSE, with a knowledge base assembled from the same content files that power the site.',
    githubUrl: 'https://github.com/Kozajsza/Portfolio-Public',
    problem:
      'Most developer portfolios are either generic templates or walls of text. The challenge was to build something that felt personally crafted and technically interesting — a portfolio that demonstrates capabilities rather than just listing them, and gives visitors a reason to stay and explore.',
    solution:
      'A fully custom React/TypeScript portfolio with a bespoke design system (warm parchment palette with jade accent, Syne + DM Sans typography, CSS custom properties throughout). The standout feature is the GPT-4o chatbot: a Cloudflare Worker receives POST requests from the frontend, validates input, enforces rate limits, assembles a context-aware system prompt from the portfolio content files (single source of truth), and streams the OpenAI response back as Server-Sent Events. The chatbot is itself a portfolio piece demonstrating prompt engineering, Cloudflare Workers, SSE streaming, and guardrail design.',
  },
]

// ── Assemble context string ───────────────────────────────────────────────────

function buildAboutSection(): string {
  const paras = about.narrative.join('\n\n')
  return `ABOUT MATEUSZ:
${paras}

WHAT HE IS LOOKING FOR:
${about.lookingFor}

LOCATION & AVAILABILITY:
${contact.location}. ${contact.availability}`
}

function buildProjectsSection(): string {
  return projectSummaries
    .map(
      (p) =>
        `PROJECT: ${p.title}
Slug: ${p.slug}
Status: ${p.status}
Timeframe: ${p.timeframe}
Tech: ${p.techStack.join(', ')}
Summary: ${p.oneLiner}
${p.liveUrl ? `Live: ${p.liveUrl}` : ''}${p.githubUrl ? `\nGitHub: ${p.githubUrl}` : ''}

Problem: ${p.problem}

Solution: ${p.solution}`,
    )
    .join('\n\n---\n\n')
}

function buildSkillsSection(): string {
  return skillGroups
    .map((g) => `${g.category}: ${g.skills.join(', ')}`)
    .join('\n')
}

function buildValuesSection(): string {
  return values.map((v) => `• ${v.heading}\n  ${v.body}`).join('\n\n')
}

function buildContactSection(): string {
  return `Name: ${contact.fullName}
Email: ${contact.email}
LinkedIn: ${contact.linkedinUrl}
GitHub: ${contact.githubUrl}
Location: ${contact.location}
Availability: ${contact.availability}`
}

// ── Timeline narrative (additional career detail) ─────────────────────────────

function buildTimelineSection(): string {
  return aboutTimeline
    .map((ch) => `${ch.yearRange} — ${ch.title}:\n${ch.paragraphs.join(' ')}`)
    .join('\n\n')
}

// ── Portfolio meta (about the site itself) ────────────────────────────────────

const portfolioMeta = `ABOUT THIS PORTFOLIO SITE:
This portfolio site was designed and built by Mateusz himself as both a showcase of his work and a demonstration of his capabilities. Visitors can ask questions about the site itself.

Purpose: A personal portfolio targeting AI implementation and AI engineering roles in London (hybrid or remote, £45k+). The site showcases 7 projects and tells Mateusz's career story.

Target audience: UK-based AI startup hiring managers, technical recruiters for AI/ML roles, and potential clients for the Reboot platform.

Tech stack: React 18, TypeScript, Vite, Tailwind CSS, Cloudflare Pages (hosting), Cloudflare Workers (this chatbot backend). Fonts: Syne (headings) + DM Sans (body), self-hosted via @fontsource. Routing: React Router v6. Design: custom design system with CSS variables, warm parchment/ink palette with a jade-teal accent.

Design philosophy: Warm, editorial, quietly confident — intentionally avoiding generic AI-startup aesthetics (no purple gradients, no glassmorphism). Signature micro-interactions: cursor spotlight, arrow link animations, sticky mobile section labels.

THE JADE COLOUR:
The jade-teal accent colour (#3E7A74) has a fun origin story. While building the portfolio in 2025, Mateusz was reading Fonda Lee's Green Bone Saga — a fantasy trilogy set in a world where jade is the source of power and everything revolves around it. He wanted to incorporate some jade into the design, and it turned out the colour worked beautifully with the warm parchment background. It's now the signature colour throughout the site.

THIS CHATBOT:
This chat assistant is powered by GPT-4o (OpenAI), running behind a Cloudflare Worker at /api/chat. It streams responses via Server-Sent Events. The Worker validates requests, enforces rate limits, assembles a context-aware system prompt (injecting which page the visitor is on), and proxies to the OpenAI API — keeping the API key server-side.

The chatbot is itself a portfolio piece demonstrating: prompt engineering, API integration, streaming SSE, Cloudflare Workers, context management, and guardrail design. The knowledge base is assembled at bundle time from the same TypeScript content files that power the rest of the site — single source of truth.

If asked "are you Claude?" or "are you ChatGPT?": answer honestly — this assistant is powered by GPT-4o, deployed by Mateusz as part of his portfolio.`

// ── Personal / misc ───────────────────────────────────────────────────────────

const personalInfo = `PERSONAL INTERESTS & BACKGROUND:
Born: Białogard, Poland, 1991. Moved to the UK.

Gaming: Mateusz is an avid gamer. Favourite games: Red Dead Redemption 2, Bloodborne (which he platinumed), Dark Souls 3, The Witcher 3, and Cyberpunk 2077. His Steam and PSN accounts are linked on the About page.

Cooking: Loves cooking, especially Italian food — pasta dishes are a favourite. He loves Roman pastas - gricia and amatriciana most. 

Cat: Has a Russian Blue cat named Pixel.

Reading: Big fan of fantasy and sci-fi. Recently finished the entire A Song of Ice and Fire series (George R.R. Martin), and is currently working through Joe Abercrombie's books, starting with The Devils. The Green Bone Saga by Fonda Lee is a particular favourite — it inspired the jade accent colour on this site.

Sport: Mateusz is Arsenal F.C fan. Sorry Spurs fans! COYG!

Note on personal questions: Mateusz is happy for the chatbot to share these details — they're on his public About page. Answer warmly and naturally, as if you're telling a friend about him.`

// ── Export ────────────────────────────────────────────────────────────────────

export const chatbotSystemContext: string = `
=== ABOUT MATEUSZ ===
${buildAboutSection()}

=== CAREER TIMELINE ===
${buildTimelineSection()}

=== PROJECTS (${projectSummaries.length} total) ===
${buildProjectsSection()}

=== SKILLS ===
${buildSkillsSection()}

=== VALUES ===
${buildValuesSection()}

=== CONTACT ===
${buildContactSection()}

=== PERSONAL ===
${personalInfo}

=== PORTFOLIO & CHATBOT META ===
${portfolioMeta}
`.trim()

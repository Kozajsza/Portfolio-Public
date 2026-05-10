export interface TimelineChapter {
  id: string
  yearRange: string
  title: string
  paragraphs: string[]
  pullQuote?: string
  side: 'left' | 'right'
}

export const aboutTimeline: TimelineChapter[] = [
  {
    id: 'operations',
    yearRange: '2013–2022',
    title: 'Operations',
    side: 'left',
    paragraphs: [
      'I came to the UK in my early twenties with a degree from Adam Mickiewicz University in Poznań and started at the bottom of the recycling industry — processing e-waste, learning compliance frameworks, figuring out how WEEE regulations actually work on a warehouse floor rather than in a policy document.',
      'Over the next several years I worked my way through the sector: ecommerce operations at a digital reseller, business development at REC (where I helped grow the circular economy proposition), and eventually running a WEEE processing facility — managing staff, maintaining ISO and EA compliance, handling logistics, and reporting directly on facility performance.',
      'In 2019 I moved into ITAD at First Mile, focusing specifically on IT asset disposition — the part of the lifecycle where hardware gets wiped, graded, resold, or destroyed. This is where I saw the real operational pain: Blancco reports copied by hand into spreadsheets, asset data scattered across disconnected systems, manual processes everywhere that clearly could be automated but nobody had the time or skills to do it.',
    ],
  },
  {
    id: 'the-pivot',
    yearRange: '2023',
    title: 'The Pivot',
    side: 'right',
    paragraphs: [
      'In 2023 I decided to be that person. I taught myself Python not through tutorials but through necessity: I needed a Discord bot to make company knowledge searchable, so I built one. I needed Blancco XML reports to flow into inventory automatically, so I wrote the parser. Every project came from a real problem I had personally watched someone struggle with.',
    ],
    pullQuote: 'Every project came from a real problem I had personally watched someone struggle with.',
  },
  {
    id: 'building-with-ai',
    yearRange: '2024–present',
    title: 'Building with AI',
    side: 'left',
    paragraphs: [
      'The Django waste audit tool came from watching auditors fill in paper forms on site. I built a web application they could use on a phone, with structured data capture, photo upload, and contamination reporting. Then I retrofitted three AI layers into it — vision classification, narrative generation, and anomaly detection — without breaking the workflow that real users depended on daily.',
      "Alongside my day job I built Reboot from scratch: a full-stack ITAD platform with a custom bin-packing quote engine, eBay price scraping, Blancco XML import pipeline, and self-service customer booking — the kind of integrated system that doesn't exist elsewhere in the UK ITAD market. Building it taught me more about full-stack development, API design, and shipping production software than any course could.",
    ],
  },
  {
    id: 'what-drives-me',
    yearRange: '2026',
    title: 'What Drives Me',
    side: 'right',
    paragraphs: [
      'I am now focused on the gap between "we could use AI here" and "this actually works in production." That gap is mostly engineering — prompt design, API integration, evaluation methodology, graceful degradation, cost management — and it is what I find most interesting. I bring a perspective most AI engineers don\'t have: I have been the end user. I know what it feels like to be the person stuck with a bad process, and I know what makes a tool actually get adopted versus gathering dust.',
      'I am based in London and ready for the right team — somewhere ambitious enough that the problems are worth solving, and small enough that I can have genuine impact from day one.',
    ],
  },
]

export const about = {
  lookingFor:
    'I combine hands-on AI engineering skills with deep domain knowledge in ITAD and waste management. I have built production tools end-to-end — from identifying the problem through to deployment and daily use. I am strongest in environments where I can own a problem, ship a solution, and iterate based on real feedback.',

  intro:
    'I am a career changer who has been building production tools with Python and AI since 2023. My background is in ITAD and waste management operations — industries where data is messy, workflows are manual, and the opportunity to automate is everywhere.',

  narrative: [
    'I came to the UK in my early twenties with a degree from Adam Mickiewicz University in Poznań and started at the bottom of the recycling industry — processing e-waste, learning compliance frameworks, figuring out how WEEE regulations actually work on a warehouse floor rather than in a policy document.',
    "Over the next several years I worked my way through the sector: ecommerce operations at a digital reseller, business development at REC (where I helped grow the circular economy proposition), and eventually running a WEEE processing facility — managing staff, maintaining ISO and EA compliance, handling logistics, and reporting directly on facility performance. I built KPI frameworks, wrote SWOT analyses, and managed budgets. I also introduced the company's first internal IT support system and reduced external IT costs by bringing support in-house.",
    'In 2019 I moved into ITAD at First Mile, focusing specifically on IT asset disposition — the part of the lifecycle where hardware gets wiped, graded, resold, or destroyed. This is where I saw the real operational pain: Blancco reports copied by hand into spreadsheets, asset data scattered across disconnected systems, manual processes everywhere that clearly could be automated but nobody had the time or skills to do it.',
    'In 2023 I decided to be that person. I taught myself Python not through tutorials but through necessity: I needed a Discord bot to make company knowledge searchable, so I built one. I needed Blancco XML reports to flow into inventory automatically, so I wrote the parser. Every project came from a real problem I had personally watched someone struggle with.',
    'The Django waste audit tool came from watching auditors fill in paper forms on site. I built a web application they could use on a phone, with structured data capture, photo upload, and contamination reporting. Then I retrofitted three AI layers into it — vision classification, narrative generation, and anomaly detection — without breaking the workflow that real users depended on daily.',
    "Alongside my day job I built Reboot from scratch: a full-stack ITAD platform with a custom bin-packing quote engine, eBay price scraping, Blancco XML import pipeline, and self-service customer booking — the kind of integrated system that doesn't exist elsewhere in the UK ITAD market. Building it taught me more about full-stack development, API design, and shipping production software than any course could.",
    'I am now focused on the gap between "we could use AI here" and "this actually works in production." That gap is mostly engineering — prompt design, API integration, evaluation methodology, graceful degradation, cost management — and it is what I find most interesting. I bring a perspective most AI engineers don\'t have: I have been the end user. I know what it feels like to be the person stuck with a bad process, and I know what makes a tool actually get adopted versus gathering dust.',
  ],

  closing:
    'I am based in London and ready for the right team — somewhere ambitious enough that the problems are worth solving, and small enough that I can have genuine impact from day one.',
}

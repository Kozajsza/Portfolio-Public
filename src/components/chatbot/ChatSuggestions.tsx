import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useChatbot } from './useChatbot'

const PAGE_SUGGESTIONS: Record<string, string[]> = {
  '/': [
    "What does Mateusz build?",
    "Which of his projects is in active production?",
    "Is he available for hire right now?",
    "How long has he been coding?",
    "What makes this portfolio different?",
    "What's his tech stack?",
  ],
  '/about': [
    "How did Mateusz go from waste management to AI?",
    "Which book is Mateusz reading right now?",
    "What game did Mateusz platinum?",
    "Why the jade colour on this site?",
    "Where is Mateusz originally from?",
    "What's his go-to pasta dish?",
    "What kind of roles is he looking for?",
  ],
  '/projects': [
    "Which of these is in active production?",
    "What's his most technically complex project?",
    "Which project uses AI the most heavily?",
    "What's the Reboot platform?",
    "Which project started this whole journey?",
  ],
  '/projects/reboot': [
    "How does the quote engine work?",
    "What's the Blancco import pipeline?",
    "Is this live and used in production?",
    "How many services is it deployed as?",
    "What was the hardest part to build?",
  ],
  '/projects/waste-audit': [
    "Where does this actually run?",
    "Is this used in real audits today?",
    "How does the photo capture work?",
    "What does the contamination report look like?",
    "How many waste streams does it track?",
  ],
  '/projects/waste-audit-ai': [
    "What AI was retrofitted into this?",
    "How does the scikit-learn model work here?",
    "What did GPT-4o Vision change about the workflow?",
    "How does this compare to the original version?",
    "What's the three-layer AI stack?",
  ],
  '/projects/hdd-scanner': [
    "How does GPT-4o Vision read the labels?",
    "GPT-4o vs traditional OCR — which won?",
    "What happens after a label is scanned?",
    "How accurate is it in practice?",
    "What does the end-to-end workflow look like?",
  ],
  '/projects/discord-bot': [
    "What documents does the bot learn from?",
    "How was this built before the ChatGPT API existed?",
    "Is this still running in production?",
    "What did RAG look like before LangChain?",
    "How does document grounding work here?",
  ],
  '/projects/blancco-parser': [
    "What's a Blancco XML report?",
    "This is the first script — what came next?",
    "How does it handle inconsistent XML schemas?",
    "Is this still in production use?",
    "What does the output look like?",
  ],
  '/projects/portfolio': [
    "How does the GPT-4o chatbot work?",
    "What's the Cloudflare Worker doing exactly?",
    "How does SSE streaming work in the browser?",
    "Why no component library?",
    "How is the knowledge base kept in sync?",
    "What was the hardest part to build?",
  ],
  '/contact': [
    "Is he open to remote roles?",
    "What kind of company would he thrive at?",
    "What roles is he targeting?",
    "What's his availability timeline?",
    "Can I reach him on LinkedIn?",
  ],
}

const DEFAULT_SUGGESTIONS = [
  "What does Mateusz specialise in?",
  "Is Mateusz available for hire?",
  "What's Mateusz most impressive project?",
  "What's Mateusz tech stack?",
]

export default function ChatSuggestions() {
  const { isOpen, openChat } = useChatbot()
  const { pathname } = useLocation()
  const [current, setCurrent] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setCurrent(null)
    setVisible(false)

    if (isOpen) return

    const suggestions = PAGE_SUGGESTIONS[pathname] ?? DEFAULT_SUGGESTIONS
    let index = 0
    // Storing IDs as let-bindings means cleanup always cancels
    // whatever is currently pending, even across recursive cycles.
    let tShow: ReturnType<typeof setTimeout>
    let tHide: ReturnType<typeof setTimeout>
    let tNext: ReturnType<typeof setTimeout>

    const schedule = (delay: number) => {
      tShow = setTimeout(() => {
        setCurrent(suggestions[index % suggestions.length])
        setVisible(true)

        tHide = setTimeout(() => {
          setVisible(false)

          tNext = setTimeout(() => {
            index++
            schedule(10_000)
          }, 400)           // wait for fade-out before advancing
        }, 14_000)          // show for 14 s
      }, delay)
    }

    schedule(3_000)         // first suggestion after 3 s
    return () => {
      clearTimeout(tShow)
      clearTimeout(tHide)
      clearTimeout(tNext)
    }
  }, [pathname, isOpen])

  if (!current) return null

  return (
    <div
      className={[
        'fixed bottom-10 z-40 transition-all duration-300',
        'right-28',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 pointer-events-none',
      ].join(' ')}
    >
      <button
        type="button"
        onClick={() => {
          setVisible(false)
          openChat(current)
        }}
        className="group flex items-start gap-2 bg-parchment border border-rule rounded-xl shadow-lg px-4 py-3 max-w-[230px] text-left hover:border-terracotta/30 transition-colors duration-150"
        aria-label={`Ask: ${current}`}
      >
        <p className="font-body text-sm text-ink-muted leading-snug group-hover:text-ink transition-colors duration-150">
          {current}
        </p>
        <span className="font-body text-xs text-terracotta/60 group-hover:text-terracotta flex-shrink-0 mt-0.5 transition-colors duration-150">↗</span>
      </button>
    </div>
  )
}

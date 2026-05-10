import { useState, type FormEvent } from 'react'
import { useChatbot } from './useChatbot'

interface ChatPromptProps {
  dark?: boolean
  placeholder?: string
}

export default function ChatPrompt({
  dark = false,
  placeholder = "Ask me about Mateusz's work...",
}: ChatPromptProps) {
  const { openChat, openChatWithPrefill, isOpen } = useChatbot()
  const [value, setValue] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return
    setValue('')
    openChat(trimmed)
  }

  const containerClass = dark
    ? 'w-full flex items-center gap-3 px-4 py-3 bg-parchment/10 border border-parchment/20 rounded-xl min-h-[44px] focus-within:border-parchment/50 transition-colors duration-150'
    : 'w-full flex items-center gap-3 px-4 py-3 bg-parchment-dark border border-rule rounded-xl min-h-[44px] focus-within:border-ink/30 transition-colors duration-150'

  const inputClass = dark
    ? 'flex-1 bg-transparent font-body text-sm text-parchment placeholder:text-parchment/40 outline-none'
    : 'flex-1 bg-transparent font-body text-sm text-ink placeholder:text-ink-faint outline-none'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value
    setValue(newVal)
    if (newVal.length >= 20 && !isOpen) {
      openChatWithPrefill(newVal)
      setValue('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative mt-8 w-full max-w-sm" role="search">
      <div className={containerClass}>
        <ChatIcon dark={dark} />
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={isOpen ? 'Chat is open ↗' : placeholder}
          disabled={isOpen}
          className={inputClass}
          aria-label="Ask the portfolio assistant"
          maxLength={500}
        />
        {value.trim() && (
          <button
            type="submit"
            aria-label="Send"
            className={`flex-shrink-0 font-body text-2xs px-2 py-1 rounded transition-colors duration-150 ${
              dark
                ? 'text-parchment/60 hover:text-parchment border border-parchment/20 hover:border-parchment/40'
                : 'text-terracotta hover:text-terracotta-hover border border-terracotta/30 hover:border-terracotta/60'
            }`}
          >
            Ask
          </button>
        )}
        {!value.trim() && <GPTBadge dark={dark} />}
      </div>
    </form>
  )
}

function GPTBadge({ dark }: { dark: boolean }) {
  return (
    <span
      className={`hidden sm:inline-flex items-center gap-1 font-body text-2xs rounded px-1.5 py-0.5 flex-shrink-0 ${
        dark
          ? 'text-parchment/30 border border-parchment/20'
          : 'text-ink-faint/60 border border-rule'
      }`}
    >
      <SparkleIcon dark={dark} />
      <span>GPT-4o</span>
    </span>
  )
}

function SparkleIcon({ dark }: { dark: boolean }) {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"
      className={dark ? 'text-parchment/40' : 'text-terracotta/60'}
      aria-hidden="true">
      <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z" />
    </svg>
  )
}

function ChatIcon({ dark }: { dark: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={dark ? 'text-parchment/40 flex-shrink-0' : 'text-terracotta flex-shrink-0'}
      aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

import { useState, useRef, useEffect, type KeyboardEvent } from 'react'

interface Props {
  onSend: (text: string) => void
  disabled?: boolean
  autoFocus?: boolean
  prefill?: string
  onPrefillConsumed?: () => void
}

const MAX_CHARS = 500
const WARN_THRESHOLD = 400

export default function ChatInput({ onSend, disabled = false, autoFocus = false, prefill = '', onPrefillConsumed }: Props) {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = `${Math.min(ta.scrollHeight, 120)}px`
  }, [value])

  // Auto-focus when enabled
  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [autoFocus])

  // Consume prefill text from hero input transfer
  useEffect(() => {
    if (!prefill) return
    setValue(prefill)
    onPrefillConsumed?.()
    textareaRef.current?.focus()
  }, [prefill, onPrefillConsumed])

  const submit = () => {
    const trimmed = value.trim()
    if (!trimmed || disabled || trimmed.length > MAX_CHARS) return
    onSend(trimmed)
    setValue('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  const remaining = MAX_CHARS - value.length
  const isOverLimit = value.length > MAX_CHARS
  const showCounter = value.length >= WARN_THRESHOLD

  return (
    <div className="flex items-end gap-2 px-3 py-2.5 border-t border-rule bg-parchment">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Ask about Mateusz..."
        rows={1}
        maxLength={MAX_CHARS + 20}
        aria-label="Chat message"
        className="flex-1 resize-none bg-transparent font-body text-sm text-ink placeholder:text-ink-faint leading-relaxed outline-none min-h-[24px] max-h-[120px] disabled:opacity-40 py-0.5"
      />
      <div className="flex items-center gap-2 flex-shrink-0 pb-0.5">
        {showCounter && (
          <span
            className={`font-body text-2xs tabular-nums ${isOverLimit ? 'text-red-500' : 'text-ink-faint'}`}
            aria-live="polite"
          >
            {remaining}
          </span>
        )}
        <button
          type="button"
          onClick={submit}
          disabled={disabled || !value.trim() || isOverLimit}
          aria-label="Send message"
          className="w-8 h-8 flex items-center justify-center rounded-full bg-terracotta text-parchment transition-all duration-150 hover:bg-terracotta-hover disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
        >
          <SendIcon />
        </button>
      </div>
    </div>
  )
}

function SendIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

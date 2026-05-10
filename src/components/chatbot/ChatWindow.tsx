import { useEffect, useRef } from 'react'
import { useChatbot } from './useChatbot'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'

const WELCOME = "Hi! I'm Mateusz's portfolio assistant, powered by GPT-4o. I can tell you about his projects, career, and skills. What would you like to know?"

const FOCUSABLE = 'button:not([disabled]), textarea:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function ChatWindow() {
  const { messages, isLoading, error, sendMessage, closeChat, dismissError, prefillText, clearPrefill } = useChatbot()
  const bottomRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom on new content
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus trap + focus restoration on unmount
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const previouslyFocused = document.activeElement as HTMLElement | null

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }

    dialog.addEventListener('keydown', handleTab)
    return () => {
      dialog.removeEventListener('keydown', handleTab)
      previouslyFocused?.focus()
    }
  }, [])

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeChat()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeChat])

  const lastMessage = messages[messages.length - 1]
  const isStreamingEmpty = isLoading && lastMessage?.role === 'assistant' && lastMessage.content === ''

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className="fixed inset-0 bg-ink/20 z-40 md:hidden"
        onClick={closeChat}
        aria-hidden="true"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-label="Portfolio chat assistant"
        aria-modal="true"
        className={[
          // Mobile: full-screen, height follows visual viewport (shrinks when keyboard opens)
          'fixed top-0 left-0 right-0 h-[100dvh] z-50 flex flex-col bg-parchment',
          // Desktop: fixed panel above bubble
          'md:top-auto md:left-auto md:h-auto md:bottom-[5.5rem] md:right-5 md:w-[440px] md:h-[560px] md:rounded-xl md:shadow-2xl md:border md:border-rule',
          'chat-window-enter',
        ].join(' ')}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-rule bg-parchment md:rounded-t-xl flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-terracotta" aria-hidden="true" />
            <span className="font-body text-sm font-medium text-ink">Portfolio Assistant</span>
            <span className="font-body text-2xs text-ink-faint border border-rule rounded px-1.5 py-0.5">GPT-4o</span>
          </div>
          <button
            type="button"
            onClick={closeChat}
            aria-label="Close chat"
            className="w-8 h-8 flex items-center justify-center rounded-full text-ink-muted hover:text-ink hover:bg-parchment-dark transition-colors duration-150"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Message list */}
        <div
          ref={listRef}
          className="flex-1 overflow-y-auto px-4 py-4 space-y-3 overscroll-contain"
        >
          {/* Welcome message (static, not sent to API) */}
          <div className="flex justify-start">
            <div className="max-w-[85%] bg-parchment-dark rounded-2xl rounded-bl-sm px-4 py-2.5">
              <p className="font-body text-sm text-ink-muted leading-relaxed">{WELCOME}</p>
            </div>
          </div>

          {messages.map((msg, i) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              isStreaming={isLoading && i === messages.length - 1}
            />
          ))}

          {/* Error banner */}
          {error && (
            <div
              role="alert"
              className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5"
            >
              <p className="font-body text-xs text-red-700 leading-relaxed flex-1">{error}</p>
              <button
                type="button"
                onClick={dismissError}
                aria-label="Dismiss error"
                className="text-red-400 hover:text-red-600 flex-shrink-0 mt-0.5"
              >
                <SmallCloseIcon />
              </button>
            </div>
          )}

          <div ref={bottomRef} aria-hidden="true" />
        </div>

        {/* Input — pb-safe ensures content clears the home-bar on notched devices */}
        <div className="flex-shrink-0 md:rounded-b-xl overflow-hidden pb-[env(safe-area-inset-bottom)] md:pb-0">
          <ChatInput
            onSend={sendMessage}
            disabled={isLoading}
            autoFocus
            prefill={prefillText}
            onPrefillConsumed={clearPrefill}
          />
          {isStreamingEmpty && (
            <p className="font-body text-2xs text-ink-faint text-center pb-2" aria-live="polite">
              Thinking…
            </p>
          )}
        </div>
      </div>
    </>
  )
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function SmallCloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

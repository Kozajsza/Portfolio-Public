import { useEffect, useRef, useState } from 'react'
import { useChatbot } from './useChatbot'

interface ChatToastProps {
  projectSlug: string
  message: string
}

// Module-level set: persists for the full browser session (SPA lifecycle)
const shownSlugs = new Set<string>()

export default function ChatToast({ projectSlug, message }: ChatToastProps) {
  const { openChat, isOpen } = useChatbot()
  const [rendered, setRendered] = useState(false)
  const [exiting, setExiting] = useState(false)
  const isOpenRef = useRef(isOpen)
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  // Keep ref current so the show-timer callback reads the latest value
  useEffect(() => {
    isOpenRef.current = isOpen
  }, [isOpen])

  // Hide the toast if the chat opens while it's visible
  useEffect(() => {
    if (isOpen && rendered && !exiting) {
      startExit()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  useEffect(() => {
    // Already shown this project this session — skip entirely
    if (shownSlugs.has(projectSlug)) return

    const showTimer = setTimeout(() => {
      // Don't interrupt an open chat
      if (isOpenRef.current) return

      shownSlugs.add(projectSlug)
      setRendered(true)

      // Auto-dismiss after 15 s
      hideTimerRef.current = setTimeout(() => startExit(), 15_000)
    }, 8_000)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimerRef.current)
    }
    // projectSlug won't change while mounted on the same page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectSlug])

  const startExit = () => {
    clearTimeout(hideTimerRef.current)
    setExiting(true)
  }

  const handleAnimationEnd = () => {
    if (exiting) setRendered(false)
  }

  const handleClick = () => {
    openChat(message)
    startExit()
  }

  if (!rendered) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className={[
        'fixed bottom-[5.5rem] right-5 z-40 w-72 max-w-[calc(100vw-2.5rem)]',
        'bg-ink text-parchment rounded-xl shadow-xl',
        'overflow-hidden',
        exiting ? 'chat-toast-exit' : 'chat-window-enter',
      ].join(' ')}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="flex items-start gap-3 px-4 pt-3.5 pb-3">
        {/* Chat icon */}
        <div className="flex-shrink-0 mt-0.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            className="text-terracotta-light" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>

        {/* Message + CTA */}
        <button
          type="button"
          onClick={handleClick}
          className="flex-1 text-left group"
          aria-label={`Open chat: ${message}`}
        >
          <p className="font-body text-xs leading-relaxed text-parchment/90 group-hover:text-parchment transition-colors duration-150">
            {message}
          </p>
          <p className="font-body text-2xs text-parchment/40 mt-1 group-hover:text-terracotta-light transition-colors duration-150">
            Tap to chat →
          </p>
        </button>

        {/* Dismiss */}
        <button
          type="button"
          onClick={startExit}
          aria-label="Dismiss"
          className="flex-shrink-0 text-parchment/30 hover:text-parchment/70 transition-colors duration-150 mt-0.5"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Progress bar — drains over 15 s */}
      {!exiting && (
        <div className="h-0.5 bg-parchment/10">
          <div
            className="h-full bg-terracotta/60 origin-left"
            style={{ animation: 'toast-drain 15s linear forwards' }}
          />
        </div>
      )}
    </div>
  )
}

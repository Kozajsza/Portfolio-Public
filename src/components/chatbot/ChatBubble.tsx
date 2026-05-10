import { useChatbot } from './useChatbot'
import ChatWindow from './ChatWindow'
import ChatSuggestions from './ChatSuggestions'

export default function ChatBubble() {
  const { isOpen, openChat, closeChat } = useChatbot()

  return (
    <>
      {isOpen && <ChatWindow />}

      <ChatSuggestions />

      <button
        type="button"
        onClick={() => (isOpen ? closeChat() : openChat())}
        aria-label={isOpen ? 'Close chat assistant' : 'Open chat assistant'}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className={[
          'fixed bottom-5 right-5 z-50',
          'w-14 h-14 sm:w-16 sm:h-16',
          'flex items-center justify-center rounded-full shadow-lg',
          'transition-all duration-200',
          isOpen
            ? 'bg-ink text-parchment hover:bg-ink/80 scale-95'
            : 'bg-terracotta text-parchment hover:bg-terracotta-hover scale-100',
        ].join(' ')}
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </button>
    </>
  )
}

function ChatIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

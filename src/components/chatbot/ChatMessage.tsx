import type { ChatMessage as ChatMessageType } from './useChatbot'

interface Props {
  message: ChatMessageType
  isStreaming?: boolean
}

// Render **bold** and `code` spans in assistant messages
function renderMarkdown(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*\n]+\*|`[^`]+`)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-ink">{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
      return <strong key={i} className="font-semibold text-ink">{part.slice(1, -1)}</strong>
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="font-mono text-xs bg-terracotta/10 text-terracotta px-1 py-0.5 rounded">
          {part.slice(1, -1)}
        </code>
      )
    }
    // Preserve newlines as <br>
    return part.split('\n').map((line, j, arr) => (
      <span key={`${i}-${j}`}>
        {line}
        {j < arr.length - 1 && <br />}
      </span>
    ))
  })
}

export default function ChatMessage({ message, isStreaming = false }: Props) {
  const isUser = message.role === 'user'

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] bg-terracotta text-parchment rounded-2xl rounded-br-sm px-4 py-2.5">
          <p className="font-body text-sm leading-relaxed">{message.content}</p>
        </div>
      </div>
    )
  }

  // Typing indicator while assistant message is empty and streaming
  if (isStreaming && message.content === '') {
    return (
      <div className="flex justify-start">
        <div className="bg-parchment-dark rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
          <span className="chat-dot w-1.5 h-1.5 rounded-full bg-ink-muted inline-block" />
          <span className="chat-dot w-1.5 h-1.5 rounded-full bg-ink-muted inline-block" />
          <span className="chat-dot w-1.5 h-1.5 rounded-full bg-ink-muted inline-block" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] bg-parchment-dark rounded-2xl rounded-bl-sm px-4 py-2.5">
        <p className="font-body text-sm text-ink-muted leading-relaxed">
          {renderMarkdown(message.content)}
        </p>
      </div>
    </div>
  )
}

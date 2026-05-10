import { createContext, useContext, useState, useRef, type ReactNode, createElement } from 'react'
import { useLocation } from 'react-router-dom'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
}

interface ChatbotContextValue {
  messages: ChatMessage[]
  isLoading: boolean
  isOpen: boolean
  error: string | null
  prefillText: string
  sendMessage: (text: string) => Promise<void>
  openChat: (initialMessage?: string) => void
  openChatWithPrefill: (text: string) => void
  clearPrefill: () => void
  closeChat: () => void
  dismissError: () => void
}

const ChatbotContext = createContext<ChatbotContextValue | null>(null)

export function ChatbotProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [prefillText, setPrefillText] = useState('')

  // Refs avoid stale-closure issues in async sendMessage
  const isLoadingRef = useRef(false)
  const messagesRef = useRef<ChatMessage[]>([])

  const syncMessages = (msgs: ChatMessage[]) => {
    messagesRef.current = msgs
    setMessages(msgs)
  }

  const currentPage = location.pathname
  const projectSlug = currentPage.match(/^\/projects\/(.+)$/)?.[1]

  const sendMessage = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isLoadingRef.current) return

    isLoadingRef.current = true
    setIsLoading(true)
    setError(null)

    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: 'user', content: trimmed }
    const assistantMsg: ChatMessage = { id: `a-${Date.now()}`, role: 'assistant', content: '' }
    const history = messagesRef.current
    syncMessages([...history, userMsg, assistantMsg])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...history, { role: 'user', content: trimmed }],
          context: { currentPage, ...(projectSlug ? { projectSlug } : {}) },
        }),
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let buf = ''

      outer: while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buf += decoder.decode(value, { stream: true })
        const lines = buf.split('\n')
        buf = lines.pop() ?? ''

        for (const line of lines) {
          const t = line.trim()
          if (!t.startsWith('data: ')) continue
          const data = t.slice(6)
          if (data === '[DONE]') break outer

          try {
            const parsed = JSON.parse(data)
            if (parsed.error) {
              setError(parsed.error)
              // Drop the empty assistant placeholder
              setMessages(prev => {
                const last = prev[prev.length - 1]
                const updated =
                  last?.role === 'assistant' && last.content === '' ? prev.slice(0, -1) : prev
                messagesRef.current = updated
                return updated
              })
              return
            }
            if (parsed.delta) {
              setMessages(prev => {
                const last = prev[prev.length - 1]
                if (last?.role !== 'assistant') return prev
                const updated = [
                  ...prev.slice(0, -1),
                  { ...last, content: last.content + parsed.delta },
                ]
                messagesRef.current = updated
                return updated
              })
            }
          } catch {
            // skip malformed SSE lines
          }
        }
      }
    } catch {
      setError('Connection interrupted — please try again.')
      setMessages(prev => {
        const last = prev[prev.length - 1]
        const updated =
          last?.role === 'assistant' && last.content === '' ? prev.slice(0, -1) : prev
        messagesRef.current = updated
        return updated
      })
    } finally {
      isLoadingRef.current = false
      setIsLoading(false)
    }
  }

  const openChat = (initialMessage?: string) => {
    setIsOpen(true)
    if (initialMessage?.trim()) {
      sendMessage(initialMessage)
    }
  }

  const openChatWithPrefill = (text: string) => {
    setIsOpen(true)
    setPrefillText(text)
  }

  const clearPrefill = () => setPrefillText('')

  const closeChat = () => {
    setIsOpen(false)
    syncMessages([])
    setError(null)
    setPrefillText('')
    isLoadingRef.current = false
    setIsLoading(false)
  }

  const dismissError = () => setError(null)

  return createElement(
    ChatbotContext.Provider,
    {
      value: {
        messages,
        isLoading,
        isOpen,
        error,
        prefillText,
        sendMessage,
        openChat,
        openChatWithPrefill,
        clearPrefill,
        closeChat,
        dismissError,
      },
    },
    children,
  )
}

export function useChatbot(): ChatbotContextValue {
  const ctx = useContext(ChatbotContext)
  if (!ctx) throw new Error('useChatbot must be used within ChatbotProvider')
  return ctx
}

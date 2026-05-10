import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'
import ChatBubble from '../chatbot/ChatBubble'
import { ChatbotProvider } from '../chatbot/useChatbot'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const mainRef = useRef<HTMLElement>(null)

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  // Fade-up scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    const elements = mainRef.current?.querySelectorAll('.fade-up') ?? []
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [location.pathname])

  return (
    <ChatbotProvider>
      <div className="flex flex-col min-h-screen">
        <Nav />
        <main
          id="main-content"
          ref={mainRef}
          className="flex-1 pt-16 md:pt-18"
          tabIndex={-1}
        >
          {children}
        </main>
        <Footer />
        <ChatBubble />
      </div>
    </ChatbotProvider>
  )
}

import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import WasteAuditPage from './pages/projects/WasteAuditPage'
import WasteAuditAiPage from './pages/projects/WasteAuditAiPage'
import DiscordBotPage from './pages/projects/DiscordBotPage'
import BlanccoParserPage from './pages/projects/BlanccoParserPage'
import HddScannerPage from './pages/projects/HddScannerPage'
import RebootPage from './pages/projects/RebootPage'
import PortfolioPage from './pages/projects/PortfolioPage'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/waste-audit" element={<WasteAuditPage />} />
        <Route path="/projects/waste-audit-ai" element={<WasteAuditAiPage />} />
        <Route path="/projects/discord-bot" element={<DiscordBotPage />} />
        <Route path="/projects/blancco-parser" element={<BlanccoParserPage />} />
        <Route path="/projects/hdd-scanner" element={<HddScannerPage />} />
        <Route path="/projects/reboot" element={<RebootPage />} />
        <Route path="/projects/portfolio" element={<PortfolioPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

function NotFound() {
  return (
    <div className="container-content py-24 text-center">
      <h1 className="font-display text-6xl font-light text-ink">404</h1>
      <p className="font-body text-ink-muted mt-4">Page not found.</p>
      <a href="/" className="font-body text-sm text-terracotta mt-8 inline-block link-underline">
        Back to home
      </a>
    </div>
  )
}

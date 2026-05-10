import { useState } from 'react'
import { Highlight, themes } from 'prism-react-renderer'

interface CodeSnippetProps {
  code: string
  language: string
  description?: string
}

export default function CodeSnippet({ code, language, description }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="rounded-lg overflow-hidden border border-rule">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-ink border-b border-white/10">
        <div className="flex items-center gap-2">
          {/* Traffic light dots */}
          <span className="w-2.5 h-2.5 rounded-full bg-white/20" aria-hidden="true" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/20" aria-hidden="true" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/20" aria-hidden="true" />
        </div>
        <span className="font-body text-2xs text-white/40 tracking-wide">
          {language}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="font-body text-2xs text-white/40 hover:text-white/70 transition-colors duration-150 min-h-[32px] px-2"
          aria-label={copied ? 'Copied' : 'Copy code to clipboard'}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      {/* Code block */}
      <Highlight
        code={code.trim()}
        language={language as 'python' | 'javascript' | 'typescript' | 'jsx' | 'tsx' | 'bash' | 'json'}
        theme={themes.vsDark}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} overflow-x-auto p-5 text-sm leading-relaxed`}
            style={{ ...style, background: '#1E1E1E', margin: 0 }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })} className="table-row">
                <span
                  className="table-cell pr-5 text-right select-none font-body text-xs"
                  style={{ color: 'rgba(255,255,255,0.2)', minWidth: '2.5rem' }}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <span className="table-cell">
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>

      {/* Description footer */}
      {description && (
        <div className="px-4 py-3 bg-parchment-dark border-t border-rule">
          <p className="font-body text-xs text-ink-muted leading-relaxed">{description}</p>
        </div>
      )}
    </div>
  )
}

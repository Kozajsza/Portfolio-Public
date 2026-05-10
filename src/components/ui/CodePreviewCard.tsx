import { Highlight, themes } from 'prism-react-renderer'

interface CodePreviewCardProps {
  snippet: string
  language: string
}

export default function CodePreviewCard({ snippet, language }: CodePreviewCardProps) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: '#1E1E1E' }}>
      {/* Editor chrome */}
      <div
        className="flex items-center gap-1.5 px-3 py-2 border-b border-white/10"
        style={{ background: '#252526' }}
      >
        <span className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.18)' }} />
        <span className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.18)' }} />
        <span className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.18)' }} />
        <span
          className="ml-auto tracking-wide"
          style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.28)' }}
        >
          {language}
        </span>
      </div>

      {/* Code body */}
      <Highlight
        code={snippet.trim()}
        language={language as 'python' | 'javascript' | 'typescript'}
        theme={themes.vsDark}
      >
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre
            style={{
              background: 'transparent',
              margin: 0,
              padding: '10px 12px',
              fontSize: '8.5px',
              lineHeight: '1.65',
              overflow: 'hidden',
            }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span
                  style={{
                    display: 'inline-block',
                    minWidth: '1.8rem',
                    marginRight: '10px',
                    textAlign: 'right',
                    color: 'rgba(255,255,255,0.15)',
                    fontSize: '7.5px',
                    userSelect: 'none',
                  }}
                >
                  {i + 1}
                </span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #1E1E1E)' }}
      />
    </div>
  )
}

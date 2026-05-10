/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Neutral Craftsman palette — jade accent on neutral ground
        parchment: {
          DEFAULT: '#F5F6F5',
          dark: '#EDEEED',
        },
        ink: {
          DEFAULT: '#1A1C1B',
          muted: '#5C6564',
          faint: '#8C9898',
        },
        terracotta: {
          // Token name kept for code stability; colour is now muted jade-teal
          DEFAULT: '#3E7A74',
          light: '#D8EDEC',
          hover: '#2F5E5A',
        },
        rule: '#D6DBDA',
      },
      fontFamily: {
        display: ['Syne', 'system-ui', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        26: '6.5rem',
        30: '7.5rem',
      },
      borderRadius: {
        sm: '2px',
        DEFAULT: '3px',
        md: '4px',
      },
      maxWidth: {
        prose: '68ch',
        content: '72rem',
      },
      letterSpacing: {
        widest: '0.2em',
        caps: '0.08em',
      },
      transitionTimingFunction: {
        craft: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [],
}

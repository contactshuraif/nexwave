/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink:    { DEFAULT: '#0A0B0E', soft: '#14161B', line: '#1E2128' },
        paper:  { DEFAULT: '#F7F4EE', soft: '#EFEAE0', line: '#E2DCCD' },
        cobalt: { DEFAULT: '#1B4DFF', dark: '#0F2DB3', light: '#4F74FF' },
        amber:  { DEFAULT: '#E5A83D' },
        teal:   { DEFAULT: '#22B8B0' },
        violet: { DEFAULT: '#7B5BFF' },
        hair: {
          light: 'rgba(10, 11, 14, 0.10)',
          dark:  'rgba(247, 244, 238, 0.12)',
        },
      },
      fontFamily: {
        sans:    ['Satoshi', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        display: ['Satoshi', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter2: '-0.025em',
        wider:    '0.08em',
        widest2:  '0.22em',
      },
      lineHeight: {
        display: '1.02',
        snug2:   '1.15',
      },
      animation: {
        'marquee':      'marquee 40s linear infinite',
        'pulse-dot':    'pulseDot 2s ease-in-out infinite',
        'mesh-drift':   'meshDrift 22s ease-in-out infinite',
        'mesh-drift-2': 'meshDrift 30s ease-in-out infinite reverse',
        'mesh-drift-3': 'meshDrift 26s ease-in-out infinite 4s',
        'gradient-x':   'gradientX 6s ease infinite',
        'conic-spin':   'conicSpin 4s linear infinite',
        'float-y':      'floatY 8s ease-in-out infinite',
        'float-y-2':    'floatY 11s ease-in-out 1.5s infinite',
        'blob':         'blob 14s ease-in-out infinite',
        'shimmer-sweep':'shimmerSweep 2.6s linear infinite',
      },
      keyframes: {
        marquee:  { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        pulseDot: { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0.35 } },

        meshDrift: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '33%':      { transform: 'translate3d(4%,-3%,0) scale(1.06)' },
          '66%':      { transform: 'translate3d(-3%,2%,0) scale(0.97)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        conicSpin: {
          '0%':   { '--angle': '0deg' },
          '100%': { '--angle': '360deg' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-22px)' },
        },
        blob: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%':      { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
        shimmerSweep: {
          '0%':   { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(120%)' },
        },
      },
      borderRadius: { hair: '2px' },
      transitionTimingFunction: { reveal: 'cubic-bezier(0.2, 0.7, 0.2, 1)' },
    },
  },
  plugins: [],
}
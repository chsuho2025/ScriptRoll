/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: [
          'Pretendard Variable',
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'sans-serif',
        ],
      },
      colors: {
        sky: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
        },
      },
      animation: {
        'blob': 'blob 20s ease-in-out infinite',
        'blob-delay': 'blob 20s ease-in-out -7s infinite',
        'blob-delay2': 'blob 20s ease-in-out -14s infinite',
        'fade-up': 'fadeUp 0.7s ease forwards',
        'fade-up-1': 'fadeUp 0.7s ease 0.1s forwards',
        'fade-up-2': 'fadeUp 0.7s ease 0.2s forwards',
        'fade-up-3': 'fadeUp 0.7s ease 0.3s forwards',
        'fade-up-4': 'fadeUp 0.7s ease 0.4s forwards',
        'pipeline-1': 'pipelineStep 10s 0s infinite',
        'pipeline-2': 'pipelineStep 10s 1.5s infinite',
        'pipeline-3': 'pipelineStep 10s 3s infinite',
        'pipeline-4': 'pipelineStep 10s 4.5s infinite',
        'pipeline-5': 'pipelineStep 10s 6s infinite',
        'slide-in': 'slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'spin-slow': 'spin 8s linear infinite',
        'progress': 'progress 2s ease-in-out forwards',
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(40px, -60px) scale(1.06)' },
          '66%': { transform: 'translate(-30px, 30px) scale(0.94)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pipelineStep: {
          '0%, 8%, 80%, 100%': { opacity: '0.35', transform: 'scale(1)' },
          '14%, 74%': { opacity: '1', transform: 'scale(1.01)' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateX(20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        progress: {
          from: { width: '0%' },
          to: { width: '100%' },
        },
      },
      boxShadow: {
        'sky': '0 4px 20px rgba(56, 189, 248, 0.35)',
        'sky-lg': '0 8px 40px rgba(56, 189, 248, 0.45)',
        'sky-xl': '0 12px 60px rgba(14, 165, 233, 0.5)',
        'glass': '0 8px 32px rgba(125, 211, 252, 0.1), inset 0 1px 0 rgba(255,255,255,0.9)',
        'glass-lg': '0 16px 48px rgba(125, 211, 252, 0.15), inset 0 1px 0 rgba(255,255,255,0.9)',
      },
      backgroundImage: {
        'sky-gradient': 'linear-gradient(135deg, #38BDF8 0%, #0EA5E9 100%)',
        'sky-gradient-light': 'linear-gradient(135deg, #BAE6FD 0%, #7DD3FC 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%)',
      },
    },
  },
  plugins: [],
}

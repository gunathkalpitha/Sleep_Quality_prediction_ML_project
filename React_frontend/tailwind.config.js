
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        midnight: {
          900: '#0f172a', // Main background
          800: '#1e293b', // Secondary background
          700: '#334155',
        },
        charcoal: {
          900: '#111116',
          800: '#1e1e2e', // Card background
          700: '#2a2a3e', // Input background
          600: '#3f3f56',
        },
        accent: {
          teal: '#2dd4bf',
          tealGlow: 'rgba(45, 212, 191, 0.5)',
          violet: '#a78bfa',
          violetGlow: 'rgba(167, 139, 250, 0.5)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-teal': '0 0 20px -5px rgba(45, 212, 191, 0.3)',
        'glow-violet': '0 0 20px -5px rgba(167, 139, 250, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}

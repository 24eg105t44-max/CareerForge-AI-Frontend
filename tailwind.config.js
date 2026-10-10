/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0B0F19',
          card: '#111827',
          border: '#1F2937',
          surface: '#1E293B',
        },
        brand: {
          purple: '#8B5CF6',
          cyan: '#06B6D4',
          accent: '#3B82F6',
        }
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-red': '#D32F2F',
        'brand-red-dark': '#B71C1C',
        'sun-yellow': '#FBC02D',
        'amber-gold': '#F57F17',
        'sky-blue': '#1976D2',
        'meadow-green': '#388E3C',
        'surface-cream': '#FFFDF7',
        'charcoal': '#121826',
        'slate-muted': '#4B5563',
      },
      fontFamily: {
        malayalam: ['Gayathri', 'Manjari', 'sans-serif'],
        'malayalam-body': ['Manjari', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

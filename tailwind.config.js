/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Poster Core Color System
        'poster-red': '#C90000',
        'poster-red-light': '#E21A16',
        'poster-brown': '#241914',
        'charcoal': '#171514',
        'cream': '#F4EBDD',
        'paper': '#E9DDC9',
        'gold': '#B99658',
        'offwhite': '#FFF9EF',

        // Brand Aliases
        'brand-red': '#C90000',
        'brand-red-dark': '#A30000',
        'sun-yellow': '#B99658',
        'amber-gold': '#B99658',
        'sky-blue': '#1976D2',
        'meadow-green': '#388E3C',
        'surface-cream': '#F4EBDD',
        'slate-muted': '#5C544E',
      },
      fontFamily: {
        malayalam: ['Gayathri', 'Manjari', 'sans-serif'],
        'malayalam-body': ['Manjari', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        editorial: ['Plus Jakarta Sans', 'Georgia', 'serif'],
      },
      boxShadow: {
        'warm': '0 4px 20px -2px rgba(36, 25, 20, 0.08), 0 2px 6px -1px rgba(36, 25, 20, 0.04)',
        'warm-lg': '0 12px 32px -4px rgba(36, 25, 20, 0.12), 0 4px 12px -2px rgba(36, 25, 20, 0.06)',
      },
    },
  },
  plugins: [],
};

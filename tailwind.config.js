import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // shadcn standard tokens mapped to CSS vars
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // Balasangham 2026 Festive Palette
        cream: '#FAF7F2',
        'cream-deep': '#F3ECE1',
        ink: '#2B2523',
        berry: '#D41C24',
        'berry-dark': '#B31219',
        'berry-light': '#F87171',
        festival: '#F6C443',
        'festival-deep': '#EAA816',
        sun: '#FDE047',
        mango: '#F97316',
        grape: '#9333EA',
        sky: '#0EA5E9',
        leaf: '#22C55E',

        // Poster Core Color System
        'poster-red': '#D41C24',
        'poster-red-light': '#E21A16',
        'poster-brown': '#2B2523',
        'charcoal': '#2B2523',
        'paper': '#F3ECE1',
        'gold': '#EAA816',
        'offwhite': '#FFFDF9',

        // Festival 2026 Editorial Tokens
        'festival-red': '#D32020',
        'festival-gold': '#F5A623',
        'festival-green': '#257A3E',
        'festival-umber': '#2A1610',
        'parchment-bg': '#FDF7EB',
        'paper-surface': '#F5E9D3',
        'warm-white': '#FFFDF7',

        // Reference 2026 Palette Specification
        'sun-bright': '#FFD84D',
        'sun-primary': '#FFC928',
        'warm-orange': '#FF9F00',
        'deep-orange': '#F57C00',
        'warm-cream': '#FFF4D6',
        'soft-cream': '#FFF9E8',
        'deep-red': '#D71920',
        'kerala-blue': '#168BD4',
        'kerala-purple': '#7B2CBF',
        'kerala-green': '#2E9E5B',
        'dark-brown': '#321A12',
        'near-black': '#181313',

        // Brand Aliases
        'brand-red': '#D41C24',
        'brand-red-dark': '#B31219',
        'sun-yellow': '#F6C443',
        'amber-gold': '#EAA816',
        'sky-blue': '#0EA5E9',
        'meadow-green': '#22C55E',
        'surface-cream': '#FAF7F2',
        'slate-muted': '#6B635D',
      },
      fontFamily: {
        malayalam: ['"Anek Malayalam"', 'Gayathri', 'Manjari', 'sans-serif'],
        'malayalam-body': ['"Anek Malayalam"', 'Manjari', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        editorial: ['Plus Jakarta Sans', 'Georgia', 'serif'],
      },
      keyframes: {
        'float-y': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(6deg)' },
        },
        'sway': {
          '0%, 100%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(4deg)' },
        },
        'drift-x': {
          '0%, 100%': { transform: 'translateX(0px) rotate(-2deg)' },
          '50%': { transform: 'translateX(12px) rotate(2deg)' },
        },
        'spin-slow': {
          '100%': { transform: 'rotate(360deg)' },
        },
        'pop-in': {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'rise-in': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
        },
        'twinkle': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'float-y': 'float-y 5s ease-in-out infinite',
        'float-y-slow': 'float-y 7s ease-in-out infinite',
        'sway': 'sway 5s ease-in-out infinite',
        'drift-x': 'drift-x 10s ease-in-out infinite',
        'spin-slow': 'spin-slow 24s linear infinite',
        'pop-in': 'pop-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        'rise-in': 'rise-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'twinkle': 'twinkle 2.5s ease-in-out infinite',
      },
      boxShadow: {
        'warm': '0 4px 20px -2px rgba(43, 37, 35, 0.08), 0 2px 6px -1px rgba(43, 37, 35, 0.04)',
        'warm-lg': '0 12px 32px -4px rgba(43, 37, 35, 0.12), 0 4px 12px -2px rgba(43, 37, 35, 0.06)',
        'festive': '0 8px 30px -4px rgba(212, 28, 36, 0.18)',
        'gold-glow': '0 0 25px rgba(246, 196, 67, 0.45)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

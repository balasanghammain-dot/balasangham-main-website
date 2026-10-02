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
      padding: "1rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // shadcn semantic tokens (CSS vars)
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

        // ─── Balasangham Design System v2 ───
        // ONE definitive palette. No duplicates.

        // Primary yellows — dominant visual environment
        "sun-primary": "#FFC928",
        "sun-bright": "#FFD94D",
        "gold": "#F7B718",

        // Warm tones
        "warm-orange": "#FF9800",
        "deep-orange": "#F57C00",

        // Cream surfaces — background rhythm
        "warm-cream": "#FFF4D6",
        "soft-cream": "#FFF9E8",
        "paper": "#F6E8C8",

        // Reds — Balasangham accent
        "deep-red": "#D71920",
        "bright-red": "#E52B2F",

        // Greens — Poster inspired & Kerala environment
        "deep-green": "#087A3D",
        "poster-green": "#0A9B4A",
        "kerala-green": "#2E9E5B",

        // Secondary accents — sparingly
        "kerala-blue": "#168BD4",
        "kerala-purple": "#7B2CBF",

        // Neutrals
        "dark-brown": "#321A12",
        "charcoal": "#1C1613",
        "white": "#FFFFFF",
      },
      fontFamily: {
        malayalam: ['"Anek Malayalam"', "Gayathri", "Manjari", "sans-serif"],
        "malayalam-body": ['"Anek Malayalam"', "Manjari", "sans-serif"],
        sans: ['"Plus Jakarta Sans"', "Inter", "system-ui", "sans-serif"],
        editorial: ['"Plus Jakarta Sans"', "Georgia", "serif"],
        mono: ['"JetBrains Mono"', "Menlo", "monospace"],
      },
      fontSize: {
        // Editorial scale
        "display-xl": ["clamp(2.5rem, 8vw, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display": ["clamp(2rem, 6vw, 3.75rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "heading": ["clamp(1.5rem, 4vw, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "subheading": ["clamp(1.125rem, 2.5vw, 1.5rem)", { lineHeight: "1.3" }],
      },
      spacing: {
        "section": "clamp(4rem, 10vw, 8rem)",
        "section-sm": "clamp(3rem, 6vw, 5rem)",
      },
      keyframes: {
        "float-y": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(6deg)" },
        },
        "sway": {
          "0%, 100%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(4deg)" },
        },
        "drift-x": {
          "0%, 100%": { transform: "translateX(0px)" },
          "50%": { transform: "translateX(12px)" },
        },
        "spin-slow": {
          "100%": { transform: "rotate(360deg)" },
        },
        "reveal-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "reveal-scale": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "twinkle": {
          "0%, 100%": { opacity: "0.3", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float-y": "float-y 5s ease-in-out infinite",
        "float-y-slow": "float-y 7s ease-in-out infinite",
        "sway": "sway 5s ease-in-out infinite",
        "drift-x": "drift-x 10s ease-in-out infinite",
        "spin-slow": "spin-slow 24s linear infinite",
        "reveal-up": "reveal-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "reveal-scale": "reveal-scale 0.5s cubic-bezier(0.22, 1, 0.36, 1) both",
        "twinkle": "twinkle 2.5s ease-in-out infinite",
      },
      boxShadow: {
        "warm": "0 4px 20px -2px rgba(50, 26, 18, 0.08), 0 2px 6px -1px rgba(50, 26, 18, 0.04)",
        "warm-lg": "0 12px 32px -4px rgba(50, 26, 18, 0.12), 0 4px 12px -2px rgba(50, 26, 18, 0.06)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

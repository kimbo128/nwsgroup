import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-display)", "Arial Black", "sans-serif"],
      },
      colors: {
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
        // West Coast Customs Colors
        neon: {
          orange: "hsl(20, 100%, 50%)",
          green: "hsl(142, 76%, 50%)",
        },
        metallic: {
          silver: "hsl(0, 0%, 75%)",
          gold: "hsl(45, 100%, 50%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        'neon-orange': '0 0 20px rgba(255, 68, 0, 0.5), 0 0 40px rgba(255, 68, 0, 0.3)',
        'neon-green': '0 0 20px rgba(0, 255, 136, 0.5), 0 0 40px rgba(0, 255, 136, 0.3)',
        'custom': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 68, 0, 0.1)',
        'custom-lg': '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 68, 0, 0.2), 0 0 30px rgba(255, 68, 0, 0.3)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-neon": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255, 68, 0, 0.5)" },
          "50%": { boxShadow: "0 0 40px rgba(255, 68, 0, 0.8), 0 0 60px rgba(255, 68, 0, 0.4)" },
        },
        "float-custom": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(2deg)" },
        },
        "shimmer-custom": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-neon": "pulse-neon 2s ease-in-out infinite",
        "float-custom": "float-custom 6s ease-in-out infinite",
        "shimmer-custom": "shimmer-custom 2s ease-in-out infinite",
      },
      backgroundImage: {
        'gradient-custom': 'linear-gradient(135deg, hsl(20, 100%, 50%) 0%, hsl(142, 76%, 50%) 100%)',
        'gradient-metallic': 'linear-gradient(135deg, hsl(0, 0%, 75%) 0%, hsl(0, 0%, 50%) 50%, hsl(0, 0%, 75%) 100%)',
        'gradient-dark': 'linear-gradient(135deg, hsl(0, 0%, 3%) 0%, hsl(0, 0%, 6%) 100%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

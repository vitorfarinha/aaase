import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1E3A5F",
          light: "#2A4F7C",
          dark: "#152B47",
          50: "#EEF3F9",
          100: "#D4E2F0",
        },
        gold: {
          DEFAULT: "#F5A623",
          light: "#F7BA52",
          dark: "#D4891A",
          50: "#FFF8EC",
          100: "#FEF0CC",
        },
        crimson: {
          DEFAULT: "#C0392B",
          light: "#E74C3C",
        },
        stone: {
          50: "#FAFAF9",
          100: "#F5F5F0",
          150: "#EDEDE5",
          200: "#E8E8E0",
          300: "#D1D1C4",
          400: "#A8A899",
          500: "#787868",
          600: "#5A5A4E",
          700: "#3D3D34",
          800: "#252520",
          900: "#111110",
        },
        trust: "#22C55E",
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(30,58,95,0.06), 0 1px 2px rgba(30,58,95,0.04)",
        "card-md": "0 4px 12px rgba(30,58,95,0.08), 0 2px 4px rgba(30,58,95,0.05)",
        "card-lg": "0 8px 32px rgba(30,58,95,0.12), 0 4px 12px rgba(30,58,95,0.06)",
        "card-xl": "0 20px 60px rgba(30,58,95,0.15), 0 8px 24px rgba(30,58,95,0.08)",
        "gold": "0 4px 20px rgba(245,166,35,0.25)",
        "navy": "0 4px 20px rgba(30,58,95,0.25)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      animation: {
        "slide-up": "slide-up 0.3s ease-out forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
        shimmer: "shimmer 1.5s infinite",
      },
    },
  },
  plugins: [],
};

export default config;

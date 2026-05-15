import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geist", "-apple-system", "system-ui", "sans-serif"],
        mono: ["Geist Mono", "SF Mono", "monospace"],
      },
      colors: {
        brand: {
          blue:    "#2E6DB4",
          "blue-light": "#4A89D4",
          "blue-dark":  "#1A4A80",
          gold:    "#E8A020",
          red:     "#C0392B",
        },
      },
      borderRadius: { "2xl": "16px", "3xl": "20px", "4xl": "24px" },
      boxShadow: {
        xs:  "0 1px 2px rgba(13,20,32,0.06)",
        sm:  "0 2px 8px rgba(13,20,32,0.07), 0 1px 2px rgba(13,20,32,0.05)",
        md:  "0 4px 16px rgba(13,20,32,0.08), 0 2px 4px rgba(13,20,32,0.05)",
        lg:  "0 12px 40px rgba(13,20,32,0.10), 0 4px 8px rgba(13,20,32,0.06)",
        xl:  "0 24px 64px rgba(13,20,32,0.14), 0 8px 16px rgba(13,20,32,0.08)",
        glass: "0 8px 32px rgba(30,50,100,0.08), 0 1px 0 rgba(255,255,255,0.8) inset",
      },
    },
  },
  plugins: [],
};

export default config;

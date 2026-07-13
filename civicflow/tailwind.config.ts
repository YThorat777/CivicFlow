import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./context/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#14213D",
          50: "#EEF0F5",
          100: "#D6DAE6",
          200: "#AEB6CC",
          300: "#8590AF",
          400: "#5C6A93",
          500: "#3A4A73",
          600: "#233457",
          700: "#14213D", // primary
          800: "#0E1830",
          900: "#080F1F",
        },
        paper: {
          DEFAULT: "#F7F5EF",
          dim: "#EFEBE0",
          panel: "#FFFFFF",
        },
        signal: {
          DEFAULT: "#B8862B", // pending / action — official seal gold
          light: "#EFD9AC",
          dark: "#8C6620",
        },
        sage: {
          DEFAULT: "#4C6B52", // approved / success
          light: "#DCE6DD",
          dark: "#354B39",
        },
        rust: {
          DEFAULT: "#9B4436", // denied / error
          light: "#EFDAD6",
          dark: "#6F3026",
        },
        slate: {
          DEFAULT: "#5B6472",
          light: "#9AA1AC",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(20,33,61,0.06), 0 1px 12px rgba(20,33,61,0.05)",
        panel: "0 4px 24px rgba(20,33,61,0.08)",
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      borderRadius: {
        card: "10px",
      },
    },
  },
  plugins: [],
};

export default config;

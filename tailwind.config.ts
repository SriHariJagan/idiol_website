import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#191612",
          soft: "#2A2520",
          mute: "#6F6455",
        },
        ivory: {
          DEFAULT: "#F7F2E9",
          deep: "#EFE6D5",
          card: "#FDFBF6",
        },
        gold: {
          DEFAULT: "#B98A2F",
          light: "#D9B36A",
          pale: "#F1E2BE",
          deep: "#8A6420",
        },
        bronze: {
          DEFAULT: "#8C5A2B",
          deep: "#5E3B1B",
        },
        stone2: {
          DEFAULT: "#E4D8C4",
          dark: "#CBBFA9",
        },
        silver: {
          DEFAULT: "#E9EAEc",
          dark: "#C9CCD1",
        },
      },
      fontFamily: {
        serif: ['"Fraunces"', "Georgia", '"Times New Roman"', "serif"],
        sans: ['"Inter"', "system-ui", "-apple-system", '"Segoe UI"', "sans-serif"],
      },
      maxWidth: {
        shell: "1200px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(25,22,18,.05), 0 12px 32px -16px rgba(25,22,18,.18)",
        lift: "0 2px 4px rgba(25,22,18,.06), 0 24px 48px -20px rgba(25,22,18,.28)",
        gold: "0 0 0 1px rgba(185,138,47,.4), 0 14px 34px -14px rgba(185,138,47,.5)",
      },
      letterSpacing: {
        luxe: "0.22em",
      },
    },
  },
  plugins: [],
} satisfies Config;

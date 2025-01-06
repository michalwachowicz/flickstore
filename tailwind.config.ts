import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        moveBg: {
          "0%": { transform: "translateY(-2rem) scale(1.15)" },
          "100%": { transform: "translateY(2rem) scale(1.15)" },
        },
        popupOpen: {
          "0%": { transform: "scale(0)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        moveBg: "moveBg 5s ease-in-out infinite alternate",
        popupOpen: "popupOpen 0.25s ease-out forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;

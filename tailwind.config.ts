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
      },
      animation: {
        moveBg: "moveBg 5s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
} satisfies Config;

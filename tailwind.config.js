/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#241712",
        "ink-dim": "rgba(36,23,18,0.62)",
        "ink-soft": "rgba(36,23,18,0.35)",
        bg: "#f6ecdc",
        "bg-2": "#ecdfc8",
        flame: "#ff5b2e",
        "flame-2": "#e8421a",
        gold: "#b8741a",
        "gold-2": "#d49230",
        cream: "#fff5e3",
        line: "rgba(36,23,18,0.12)",
        "line-strong": "rgba(36,23,18,0.22)",
      },
      fontFamily: {
        display: ['"Bebas Neue"', "Inter", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
      },
      backgroundImage: {
        "grad-flame":
          "linear-gradient(135deg, #ff5b2e 0%, #e8421a 50%, #b8741a 100%)",
      },
    },
  },
  plugins: [],
};

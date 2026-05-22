/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#f6efe6",
        "ink-dim": "rgba(246,239,230,0.55)",
        "ink-soft": "rgba(246,239,230,0.3)",
        bg: "#0a0608",
        "bg-2": "#120a0a",
        flame: "#ff5b2e",
        "flame-2": "#ff8a3d",
        gold: "#f4b860",
        "gold-2": "#ffd28a",
        cream: "#f8e9cf",
        line: "rgba(246,239,230,0.12)",
        "line-strong": "rgba(246,239,230,0.22)",
      },
      fontFamily: {
        display: ['"Bebas Neue"', "Inter", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
      },
      backgroundImage: {
        "grad-flame":
          "linear-gradient(135deg, #ff5b2e 0%, #ff8a3d 45%, #f4b860 100%)",
      },
    },
  },
  plugins: [],
};

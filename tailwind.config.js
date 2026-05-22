/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#fafafa",
        "ink-dim": "rgba(250,250,250,0.55)",
        "ink-soft": "rgba(250,250,250,0.32)",
        bg: "#070707",
        "bg-2": "#0f0f0f",
        "bg-3": "#161616",
        flame: "#ff5b2e",
        "flame-2": "#ff8a3d",
        line: "rgba(250,250,250,0.08)",
        "line-strong": "rgba(250,250,250,0.18)",
      },
      fontFamily: {
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
        sans: ['"Space Grotesk"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.02em",
      },
    },
  },
  plugins: [],
};

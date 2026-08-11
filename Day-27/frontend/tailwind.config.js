/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ice: {
          50: "#f6faff",
          100: "#ecf5ff",
          200: "#dbeafd",
          300: "#c7def5",
        },
        surge: {
          400: "#3b82f6",
          500: "#2563eb",
          600: "#1d4ed8",
        },
        ink: {
          900: "#0f172a",
          800: "#1e293b",
          700: "#334155",
        },
        bull: "#16a34a",
        bear: "#ef4444",
      },
      fontFamily: {
        display: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        "glow-blue": "0 28px 80px rgba(37, 99, 235, 0.18)",
        "glow-soft": "0 20px 45px rgba(37, 99, 235, 0.1)",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        drawLine: {
          "0%": { "stroke-dashoffset": "1400" },
          "100%": { "stroke-dashoffset": "0" },
        },
        blobSpin: {
          "0%": { transform: "rotate(0deg) scale(1)" },
          "50%": { transform: "rotate(180deg) scale(1.05)" },
          "100%": { transform: "rotate(360deg) scale(1)" },
        },
        floatY: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-10px)" },
        },
        floatSlow: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-8px)" },
        },
        pulseGlow: {
          "0%": { opacity: "0.65", transform: "scale(0.96)" },
          "100%": { opacity: "0.95", transform: "scale(1)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.9s ease-out both",
        fadeIn: "fadeIn 0.8s ease-out both",
        drawLine: "drawLine 1.2s ease-out both",
        blobSpin: "blobSpin 12s linear infinite",
        floatY: "floatY 5s ease-in-out infinite alternate",
        floatSlow: "floatSlow 7s ease-in-out infinite alternate",
        pulseGlow: "pulseGlow 3.2s ease-in-out infinite alternate",
        marquee: "marquee 24s linear infinite",
      },
    },
  },
  plugins: [],
};
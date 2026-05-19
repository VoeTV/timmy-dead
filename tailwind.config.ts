import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "var(--font-inter)", "sans-serif"]
      },
      colors: {
        ink: {
          50: "#f5f7fb",
          100: "#e8edf6",
          200: "#cfd7e6",
          300: "#9eaac4",
          400: "#6b7896",
          500: "#475066",
          600: "#2d3447",
          700: "#1c2233",
          800: "#121726",
          900: "#0a0e1c",
          950: "#05080f"
        },
        ocean: {
          50: "#e8f6ff",
          100: "#c5e8ff",
          200: "#8bd1ff",
          300: "#4fb6ff",
          400: "#1f9bff",
          500: "#0079e6",
          600: "#005db4",
          700: "#01477f",
          800: "#063459",
          900: "#06223a"
        },
        coral: {
          400: "#ff7e7e",
          500: "#ff5470",
          600: "#e63e60"
        },
        kelp: {
          400: "#46d6a8",
          500: "#1ec48c",
          600: "#0aa370"
        },
        amber: {
          400: "#ffc857",
          500: "#f5a623"
        }
      },
      backgroundImage: {
        "deep-gradient":
          "radial-gradient(ellipse at top, rgba(31,155,255,0.18), transparent 55%), radial-gradient(ellipse at bottom right, rgba(30,196,140,0.10), transparent 50%), linear-gradient(180deg, #05080f 0%, #0a0e1c 50%, #06223a 100%)",
        "glass-gradient":
          "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)"
      },
      boxShadow: {
        glass:
          "0 1px 0 rgba(255,255,255,0.06) inset, 0 0 0 1px rgba(255,255,255,0.06), 0 24px 60px -20px rgba(0,0,0,0.55)",
        glow: "0 0 40px -10px rgba(31,155,255,0.55)"
      },
      keyframes: {
        "pulse-slow": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.08)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" }
        }
      },
      animation: {
        "pulse-slow": "pulse-slow 2.6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        float: "float 6s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ... your colors config
      },
      borderRadius: {
        // ... your borderRadius config
      },
      keyframes: {
        "pulse-subtle": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(3px)" }
        },
        "gradient-xy": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "left center"
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center"
          }
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.75" },
          "50%": { opacity: "0.9" }
        }
      },
      animation: {
        "pulse-subtle": "pulse-subtle 1.2s ease-in-out infinite",
        "gradient-xy": "gradient-xy 2s ease infinite",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite"
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;


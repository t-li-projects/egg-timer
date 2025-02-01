import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/egg-timer/",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg_color: "#FBF8EE",
        brown_accent: "#6F5D4F",
        button_outline: "#FFD963",
        button_fill: "#FFFCEC",
        button_fill_hover: "#FFF3C2",
      },
    },
  },
  plugins: [react()],
});

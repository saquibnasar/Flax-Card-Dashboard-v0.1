import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/stories/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "3xl": "1px 4px 8px 0px rgba(0, 0, 0, 0.3)",
      },
    },

    colors: {
      // t -> text, s -> surface, i -> inverted, a -> accent, d -> divider
      primary: "#121212",
      white: "#FFFFFF",
      black: "#111111",
      tSecondary: "#8A8A8D",
      sSecondary: "#F7F7F7",
      blue: "#4353FF",
      lightblue: "#505FFF",
      sPrimary: "#FFFFFF",
      iPrimary: "#121212",
      iSecondary: "#404040",
      aPurple: "#708DF7",
      aRed: "#FF4D4F",
      aGreen: "#25BD3E",
      dPrimary: "#C6C6C8",
      dSecondary: "#E9E9E9",
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  daisyui: {
    themes: [
      {
        "flax-dark": {
          primary: "#121212",
          secondary: "#fff",
          accent: "",
          neutral: "#ffffff",
          "base-100": "#ffffff",
          info: "#ffffff",
          success: "#00ffff",
          warning: "#ffffff",
          error: "#ffffff",
        },
        "flax-light": {
          primary: "#fff",
          secondary: "#333333",
          accent: "#E9E9E9",
          neutral: "#ffffff",
          "base-100": "#ffffff",
          info: "#ffffff",
          success: "#00ffff",
          warning: "#ffffff",
          error: "#ffffff",
        },
      },
    ],
  },
};
export default config;

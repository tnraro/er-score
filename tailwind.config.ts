import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        common: {
          DEFAULT: "#2b2c2d",
          dark: "#5b5d60",
        },
        uncommon: {
          DEFAULT: "#476b49",
          dark: "#242b1e",
        },
        rare: {
          DEFAULT: "#344a6d",
          dark: "#262b37",
        },
        epic: {
          DEFAULT: "#74569c",
          dark: "#2d2b3f",
        },
        legendary: {
          DEFAULT: "#9a7533",
          dark: "#3d3224",
        },
        mythic: {
          DEFAULT: "#903034",
          dark: "#48231d",
        },
      },
    },
  },

  plugins: [],
} satisfies Config;

import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [sveltekit(), tailwindcss()],

  server: {
    watch: {
      ignored: ["**/.jj/**"],
    },
  },

  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
  },
});

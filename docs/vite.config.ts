import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const pagesBase = process.env.GITHUB_PAGES === "true" ? "/devnonla-agent-avatar/" : "/";

export default defineConfig({
  root: import.meta.dirname,
  base: pagesBase,
  plugins: [tailwindcss(), react()],
  resolve: {
    dedupe: ["react", "react-dom"],
    alias: [
      {
        find: /^devnonla-agent-avatar\/styles\.css$/,
        replacement: `${import.meta.dirname}/../src/styles.css`,
      },
      {
        find: /^devnonla-agent-avatar$/,
        replacement: `${import.meta.dirname}/../src/index.ts`,
      },
    ],
  },
  optimizeDeps: {
    exclude: ["devnonla-agent-avatar"],
  },
  server: {
    port: 5177,
    open: false,
    // The live-react sandbox frame has an opaque ("null") origin and loads modules cross-origin.
    cors: { origin: [/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/, "null"] },
    fs: {
      allow: [import.meta.dirname, `${import.meta.dirname}/..`],
    },
  },
});

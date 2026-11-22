import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  publicDir: mode === "places" ? false : "public",
  build: {
    outDir: mode === "places" ? "dist/places-site" : "dist/client",
    ...(mode === "places" && {
      assetsDir: "places-assets",
      rollupOptions: { input: "places.html" },
    }),
  },
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  plugins: [react()],
}));

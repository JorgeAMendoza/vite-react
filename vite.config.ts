import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import { imagetools } from 'vite-imagetools';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [imagetools(), react()],
  server: {
    port: 3000,
    open: true,
  },
  preview: {
    port: 8080,
    strictPort: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

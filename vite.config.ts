/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint(), svgr()],
  resolve: {
    alias: [
      { find: "@/Assets", replacement: "/src/assets" },
      { find: "@/Components", replacement: "/src/components" },
    ],
  },
  assetsInclude: ["**/*.webp", "**/*.jpg"],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",
    include: ["**/*.test.tsx", "**/*.test.ts"],
  },
});

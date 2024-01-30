import path from "node:path";
import { defaultExclude, defineConfig, mergeConfig } from "vitest/config";
import config from "./vite.config";

export default mergeConfig(
  config,
  defineConfig({
    resolve: {
      alias: {
        "@test": path.resolve(__dirname, "./test"),
      },
    },
    test: {
      globals: true,
      setupFiles: path.resolve(__dirname, "./test/setup.ts"),
      exclude: [...defaultExclude],
      environmentMatchGlobs: [
        ["**/*.test.tsx", "jsdom"],
        ["**/*.component.test.tsx", "jsdom"],
      ],
    },
  })
);

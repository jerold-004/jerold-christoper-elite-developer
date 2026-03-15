import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./src/test",
  use: {
    baseURL: "http://localhost:8080",
  },
  webServer: {
    command: "npm run dev -- --host 0.0.0.0 --port 8080",
    port: 8080,
    reuseExistingServer: true,
  },
});

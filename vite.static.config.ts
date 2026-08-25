import { defineConfig } from "@lovable.dev/vite-tanstack-config";
export default defineConfig({
  tanstackStart: { server: { entry: "server" } },
  vite: { base: "/customefirstos/" },
  nitro: { preset: "node-server" },
});

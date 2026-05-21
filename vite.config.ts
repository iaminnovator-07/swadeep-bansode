import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";

import tsconfigPaths from "vite-tsconfig-paths";

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [tanstackStart({
    server: { 
      preset: "vercel",
      entry: "src/server.ts" 
    },
  }), react(), tailwindcss(), tsconfigPaths(), cloudflare({
    viteEnvironment: {
      name: "ssr"
    }
  })],


});
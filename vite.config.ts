import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";

import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tanstackStart({
      preset: "vercel",
      server: {
        preset: "vercel",
        entry: "src/server.ts"
      },
    }),
    TanStackRouterVite(),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],


});

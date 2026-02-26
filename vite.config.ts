import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import monkey from "vite-plugin-monkey";

// https://vite.dev/config/
export default defineConfig(({mode}=>{return {
  build: {
    minify: mode!="dev",
  },
  plugins: [
    svelte(),
    monkey({
      entry: "./src/main.ts",
      userscript: {
        name: "CCW Firewall",
        author: "Meng Fuzi",
        match: "https://*.ccw.site/*",
        grant: [
          "none",
        ],
      },
    }),
  ],
}});

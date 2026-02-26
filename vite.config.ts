import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import monkey from "vite-plugin-monkey";

const VERSION="0.0.0"

// https://vite.dev/config/
export default defineConfig(({mode})=>{return {
  build: {
    minify: mode!="development",
  },
  plugins: [
    svelte(),
    monkey({
      entry: "./src/main.ts",
      userscript: {
        name: "CCW Firewall",
        version: `${VERSION}-${new Date().toGMTString()}`,
        author: "Meng Fuzi",
        match: "https://*.ccw.site/*",
        grant: [
          "none",
        ],
      },
    }),
  ],
}});

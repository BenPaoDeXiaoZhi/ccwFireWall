import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import monkey from "vite-plugin-monkey";
import { createHtmlPlugin } from "vite-plugin-html";

const VERSION = "0.1.0";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    build: {
      outDir: "dist/monkey",
      minify: mode != "development",
      sourcemap: false,
    },
    plugins: [
      monkey({
        entry: "./monkey/index.ts",
        userscript: {
          name: "CCW Firewall",
          version: `${VERSION}-${new Date().toISOString()}`,
          author: "Meng Fuzi",
          match: [
            "https://*.ccw.site/gandi*",
            "https://*.ccw.site/detail/*",
            "https://*.ccw.site/player/*",
          ],
          grant: ["unsafeWindow", "GM_getValue", "GM_setValue"],
          "run-at": "document-start",
        },
        build: {
          fileName: "index.user.js",
        },
      }),
    ],
    envDir: "./",
  };
});

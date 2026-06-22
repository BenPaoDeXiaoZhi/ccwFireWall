import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwind from "@tailwindcss/vite";
import { createHtmlPlugin } from "vite-plugin-html";
import { resolve } from "node:path";

const VERSION = "0.1.0";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    server: {
      port: 5174,
    },
    build: {
      minify: mode != "development",
    },
    plugins: [
      svelte({
        emitCss: true,
      }),
      tailwind(),
      createHtmlPlugin({
        template: "./index.html",
      }),
    ],
    resolve: {
      alias: {
        $lib: resolve(__dirname, "./html/src/lib"),
      },
    },
  };
});

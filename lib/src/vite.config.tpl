
import { basename, resolve, join } from "path";

import { defineConfig } from "vite";

import vuePlugin from "@vitejs/plugin-vue";
import checkerPlugin from "vite-plugin-checker";

import {
  vitePluginApprilApi, vitePluginApprilViews,
  vitePluginDefine,
} from "@appril/dev";

import esbuildConfig from "../esbuild.config";
import { baseurl } from "./config";
import { distDir } from "../package.json";
import { devPort } from "./package.json";

export default defineConfig(() => {

  return {

    base: join(baseurl, "/"),

    build: {
      outDir: resolve(__dirname, join("..", distDir, basename(__dirname))),
      emptyOutDir: true,
      sourcemap: true,
    },

    server: {
      host: true,
      port: devPort,
      strictPort: true,
      fs: {
        strict: false,
      },
    },

    cacheDir: `../var/.cache/vite/${ basename(__dirname) }`,

    plugins: [

      vuePlugin(),

      checkerPlugin({
        vueTsc: true,
      }),

      vitePluginApprilViews(),

      vitePluginApprilApi({
        esbuildConfig,
      }),

      vitePluginDefine([
        {
          keys: [ "NODE_ENV" ],
        },
      ]),

    ],

    resolve: {
      alias: {
        "~": resolve(__dirname, ".."),
        "@": resolve(__dirname),
        {{#aliases}}
        "{{src}}": resolve(__dirname, "{{dst}}"),
        {{/aliases}}
      }
    },

  }

})


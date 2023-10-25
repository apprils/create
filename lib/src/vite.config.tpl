
import { basename, resolve, join } from "path";

import { defineConfig } from "vite";

import vuePlugin from "@vitejs/plugin-vue";
import checkerPlugin from "vite-plugin-checker";

import {
  vitePluginApprilApi, vitePluginApprilViews,
  vitePluginDefine,
} from "@appril/dev";

import { baseurl } from "./config";
import { distDir } from "../package.json";

export default defineConfig(() => {

  return {

    base: join(baseurl, "/"),

    build: {
      outDir: resolve(__dirname, join("..", distDir, basename(__dirname), "client")),
      emptyOutDir: true,
      sourcemap: true,
    },

    cacheDir: `../var/.cache/vite/${ basename(__dirname) }/client`,

    plugins: [

      vuePlugin(),

      checkerPlugin({
        vueTsc: true,
      }),

      vitePluginApprilViews(),

      vitePluginApprilApi(),

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

    server: {
      fs: {
        strict: false,
      },
    },

  }

})



import { basename, resolve, join } from "path";

import { defineConfig } from "vite";

import vuePlugin from "@vitejs/plugin-vue";
import checkerPlugin from "vite-plugin-checker";

import {
  apiGeneratorPlugin,
  apiHandlerPlugin,
  apiAssetsPlugin,
  fetchGeneratorPlugin,
  viewsGeneratorPlugin,
  definePlugin,
} from "@appril/dev";

import esbuildConfig from "../esbuild.config";
import { baseurl } from "./config";
import { distDir } from "../package.json";
import { devPort } from "./package.json";
import { compilerOptions } from "./tsconfig.json";

export default defineConfig({

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

  cacheDir: resolve(__dirname, `../var/.cache/${basename(__dirname)}`),

  plugins: [

    vuePlugin(),

    checkerPlugin({
      vueTsc: true,
    }),

    apiGeneratorPlugin(),

    apiHandlerPlugin({ esbuildConfig }),

    apiAssetsPlugin(),

    fetchGeneratorPlugin(),

    viewsGeneratorPlugin(),

    definePlugin([
      {
        keys: [ "NODE_ENV" ],
      },
    ]),

  ],

  resolve: {
    alias: Object.entries(compilerOptions.paths).reduce(
      (map: Record<string, string>, [k, v]) => {
        map[k.replace("/*", "")] = resolve(__dirname, v[0].replace("/*", ""));
        return map;
      },
      {},
    ),
  },

})

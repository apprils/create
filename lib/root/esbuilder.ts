import nopt from "nopt";
import { build } from "esbuild";

import config from "./esbuild.config";

const { argv, ...opts } = nopt({});

const toCamelCase = (k: string) => {
  return k.replace(/(\w)\-(\w)/g, (_m, a, b) => a + b.toUpperCase());
};

build({
  ...config,
  ...Object.entries(opts).reduce((a: Record<string, string>, [k, v]) => {
    a[toCamelCase(k)] = v;
    return a;
  }, {}),
  bundle: true,
  entryPoints: argv.remain,
});

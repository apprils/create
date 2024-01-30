import nopt from "nopt";
import { build } from "esbuild";

import config from "./esbundler.config";

const { argv, ...opts } = nopt({});

const toCamelCase = (k: string) => {
  return k.replace(/(\w)\-(\w)/g, (_m, a, b) => a + b.toUpperCase());
};

build({
  ...config,
  ...Object.entries(opts).reduce(
    (a, [k, v]) => ({ ...a, [toCamelCase(k)]: v }),
    {},
  ),
  bundle: true,
  entryPoints: argv.remain,
});

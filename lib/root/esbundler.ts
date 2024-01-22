
import nopt from "nopt";
import { build } from "esbuild";

import config from "./esbundler.config";

const { argv, ...opts } = nopt({})

build({ ...config, ...opts, bundle: true, entryPoints: argv.remain })


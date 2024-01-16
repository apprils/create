
import {
  type BuildOptions,
} from "esbuild";

export const config: BuildOptions = {
  bundle: true,
  platform: "node",
  target: "node20",
  packages: "external",
  sourcemap: "inline",
}

export default config;


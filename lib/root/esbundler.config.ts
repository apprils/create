
import { type BuildOptions } from "esbuild";

export default {
  bundle: true,
  platform: "node",
  target: "node20",
  packages: "external",
  sourcemap: "inline",
} satisfies Omit<BuildOptions, "bundle"> & { bundle: true }


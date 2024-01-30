import { resolve } from "path";
import { readFile, appendFile } from "fs/promises";

import { mergePackageJson, copyFiles } from "./helpers";

export default async function (root: string, dst: string): Promise<void> {
  const src = resolve(root, "dbx");

  await copyFiles(src, dst, {
    exclude: [".env", "package.json"],
  });

  const env = await readFile(resolve(src, ".env"), "utf8");

  await appendFile(resolve(dst, ".env"), env);

  await mergePackageJson(src, dst);
}

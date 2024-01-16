#!/usr/bin/env node

import { join } from "path";
import { readFile } from "fs/promises";

import fsx from "fs-extra";
import { run as depsBump } from "npm-check-updates";

import type { PromptObject } from "prompts";
import prompts from "prompts";

import { render } from "./render";
import presets from "./presets";

const onState: PromptObject["onState"] = function(state) {
  if (state.aborted) {
    process.nextTick(() => process.exit(0))
  }
}

async function init() {

  const cwd = process.cwd()
  const srcdir = (...path: string[]) => join(__dirname, ...path)
  const dstdir = (...path: string[]) => join(cwd, project.name, ...path)

  const project = await prompts([

    {
      type: "text",
      name: "name",
      message: "Project Name",
      onState,
      validate(name) {

        if (!name?.length) {
          return "Please insert project name"
        }

        if (/[^\w\-\.]/.test(name)) {
          return "May contain only alphanumerics and hyphens/periods"
        }

        if (/^[\d|\W]+$/.test(name)) {
          return "Should contain at least one alpha char"
        }

        return true

      },
    },

    {
      type: "list",
      name: "sourceFolders",
      message: "Source Folders",
      initial: "@admin @front",
      separator: " ",
      onState,
      async validate(input: string) {

        const dirs = input
          .trim()
          .split(/\s+/)
          .filter((e) => e.length)

        if (!dirs.length) {
          return "Please insert at least one source folder"
        }

        for (const dir of dirs) {

          if (/[^\w-.@]/.test(dir)) {
            return "May contain only alphanumerics and hyphens/periods"
          }

          if (/^[\d|\W]+$/.test(dir)) {
            return "Should contain at least one alpha char"
          }

          if (await fsx.pathExists(srcdir("src", dir))) {
            return `Can not use ${ dir } as a source folder`
          }
        }

        return true

      },
    },

    {
      type: "text",
      name: "distDir",
      message: "Dist Folder",
      initial: ".dist",
      onState,
      validate(path: string) {

        if (/[^\w\-\.\/]/.test(path)) {
          "May contain only alphanumerics and hyphens/periods/slashes"
        }

        if (/^[\d|\W]+$/.test(path)) {
          return "Should contain at least one alpha char"
        }

        if (/\.\.\//.test(path)) {
          return "Should not contain path traversal patterns"
        }

        return true

      },
    },

    {
      type: "number",
      name: "devPort",
      message: "Dev Server Port",
      initial: 4000,
      onState,
    },

    {
      type: "multiselect",
      name: "presets",
      message: "Presets",
      choices: Object.keys(presets).map((title) => ({ title, value: title, selected: true })),
      hint: "- Space to select. Return to submit",
    },

  ])

  await fsx.copy(srcdir("root"), dstdir())

  for (
    const [ a, b ] of [
      [ ".gitignore.tpl", ".gitignore" ],
      [ "tsconfig.tpl", "tsconfig.json" ],
    ]
  ) {
    await fsx.move(dstdir(a), dstdir(b))
  }

  for (const file of [
    ".gitignore",
    "package.json",
    "tsconfig.json",
  ].map((e) => dstdir(e))) {

    const template = await readFile(file, "utf8")

    const context = {
      project,
    }

    await fsx.outputFile(file, render(template, context), "utf8")

  }

  for (const preset of project.presets) {
    await presets[preset as keyof typeof presets](srcdir("presets"), dstdir())
  }

  await depsBump({
    cwd: dstdir(),
    prefix: dstdir(),
    format: [ "group" ],
    upgrade: true,
    silent: false,
    interactive: false,
  }, { cli: true })

  const port = {
    value: project.devPort - 2,
    get next() { return this.value += 2 },
  }

  for (const dir of project.sourceFolders) {

    await fsx.copy(srcdir("src"), dstdir(dir))

    for (
      const [ a, b ] of [
        [ "package.tpl", "package.json" ],
        [ "tsconfig.tpl", "tsconfig.json" ],
        [ "vite.config.tpl", "vite.config.ts" ],
      ]
    ) {
      await fsx.move(dstdir(dir, a), dstdir(dir, b))
    }

    const devPort = port.next
    const apiPort = port.next

    const aliases = project.sourceFolders.map((src: string) => ({
      src,
      dst: src === dir
        ? `.`
        : `../${ src }`
    }))

    for (const file of [
      "vite.config.ts",
      "config/index.ts",
      "package.json",
      "tsconfig.json",
    ].map((e) => dstdir(dir, e))) {

      const template = await readFile(file, "utf8")

      const baseurl = project.sourceFolders.length === 1 || /front|src/.test(dir)
        ? "/"
        : join("/", dir.replace("@", ""))

      const context = {
        project,
        devPort,
        apiPort,
        aliases,
        src: {
          baseurl,
        },
      }

      await fsx.outputFile(file, render(template, context), "utf8")

    }

  }

}

init().catch(console.error)


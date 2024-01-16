
import type { Middleware } from "@appril/core/router";
import { use } from "@appril/core/router";

import type { JsonOptions, FormOptions, RawOptions } from "@appril/core/bodyparser";
import { bodyparser } from "@appril/core/bodyparser";

export * from "@appril/core/router";

export const passthrough: Middleware = (_ctx, next) => next()

export const useJsonBodyparser = (opts: JsonOptions = {}) => {
  return use([ "post", "put", "patch" ], [ { bodyparser: bodyparser.json(opts) } ])
}

export const useFormBodyparser = (opts: FormOptions = {}) => {
  return use([ "post", "put", "patch" ], [ { bodyparser: bodyparser.form(opts) } ])
}

export const useRawBodyparser = (opts: RawOptions = {}) => {
  return use([ "post", "put", "patch" ], [ { bodyparser: bodyparser.raw(opts) } ])
}

declare module "@appril/core/router" {
  interface DefaultContext {
  }
}


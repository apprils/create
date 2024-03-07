import { type Middleware } from "koa";
import { useGlobal, use } from "@appril/core/router";

import {
  type JsonOptions,
  type FormOptions,
  type RawOptions,
  bodyparser,
} from "@appril/core/bodyparser";

import { DEV } from "~/config";

declare module "koa" {
  // interface DefaultState {}
  // interface DefaultContext {}
}

declare module "@appril/core/router" {
  interface UseIdentities {
    bodyparser: string;
    payload: string;
  }
}

useGlobal("bodyparser", bodyparser.json()).before("post", "put", "patch");

useGlobal("payload", (ctx, next) => {
  Object.defineProperty(ctx, "payload", {
    get() {
      return "body" in ctx.request ? ctx.request.body || {} : ctx.query;
    },
    configurable: DEV, // should be swapable for hmr to work
  });
  return next();
});

export * from "@appril/core/router";

export const passthrough: Middleware = (_ctx, next) => next();

export const useJsonBodyparser = (opts: JsonOptions = {}) => {
  return use("bodyparser", bodyparser.json(opts)).before(
    "post",
    "put",
    "patch",
  );
};

export const useFormBodyparser = (opts: FormOptions = {}) => {
  return use("bodyparser", bodyparser.form(opts)).before(
    "post",
    "put",
    "patch",
  );
};

export const useRawBodyparser = (opts: RawOptions = {}) => {
  return use("bodyparser", bodyparser.raw(opts)).before("post", "put", "patch");
};

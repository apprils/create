import { join } from "path";

import Router from "@koa/router";
import { config, routeMapper, debug, warnings } from "@appril/core/router";
import { bodyparser } from "@appril/core/bodyparser";

import { baseurl, apiurl } from "../config";
import routes from "./_routes";

// default bodyparser
config.use(["post", "put", "patch"], [{ bodyparser: bodyparser.json() }]);

config.use((ctx, next) => {
  // prettier-ignore
  ctx.payload = "body" in ctx.request
    ? ctx.request.body || {}
    : ctx.query;
  return next();
});

export const router = new Router({
  prefix: join(baseurl, apiurl),
});

for (const { name, path, method, middleware } of routeMapper(routes)) {
  router.register(path, [method], [...middleware, () => true], { name });
}

if (/api/.test(process.env.DEBUG!)) {
  debug(console.log);
}

warnings(console.warn);

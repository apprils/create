import { join } from "path";

import Router from "@koa/router";
import { debug, warnings } from "@appril/core/router";

import { baseurl, apiurl } from "../config";

const router = new Router({
  prefix: join(baseurl, apiurl),
});

if (/api/.test(String(process.env.DEBUG))) {
  debug(console.log);
}

warnings(console.warn);

export default router;

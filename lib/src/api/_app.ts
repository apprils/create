
import Koa from "koa";
import withQueryparser from "@appril/core/queryparser";

import { errorHandler } from "~/helpers/api";
import { router } from "./_router";

export const app = withQueryparser(new Koa)

app.on("error", console.error)

app.use(errorHandler)

app.use(router.routes())


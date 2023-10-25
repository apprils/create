
import Koa from "koa";

import { errorHandler } from "~/helpers/api";

import { router } from "./_router";

export const app = new Koa

app.on("error", console.error)

app.use(errorHandler)

app.use(router.routes())


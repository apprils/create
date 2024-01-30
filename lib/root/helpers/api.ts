import type { Middleware } from "~/api/base";

export const errorHandler: Middleware = async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (error) {
    const [code, message] = extractCodeWithMessage(error);

    ctx.status = code;
    ctx.body = { error: message };

    // triggering on("error") handler
    ctx.app.emit("error", error, ctx);
  }
};

function extractCodeWithMessage(error: any): [number, string] {
  // allows throwing strings:
  //   throw "some error"
  //   throw "500: some error"
  if (typeof error === "string") {
    // prettier-ignore
    const [
      _ /** ignore */,
      code = 400,
      message = error,
    ] = error.trim().match(/^(\d+):\s*([^\0]+)/) || [];
    return [Number(code), message];
  } else if (error.message) {
    return [400, error.message];
  } else {
    return [500, "Unknown Error Occurred"];
  }
}

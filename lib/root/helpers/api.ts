import type { Middleware } from "koa";

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

function extractCodeWithMessage(error: unknown): [number, string] {
  // allows throwing strings:
  //   throw "some error"
  //   throw "500: some error"
  if (typeof error === "string") {
    // biome-ignore format:
    const [
      _, /** placeholder, ignore */
      code = 400,
      message = error,
    ] = error.trim().match(/^(\d+):\s*([^\0]+)/) || [];
    return [Number(code), message];
  }

  if (error instanceof Error) {
    return [400, error.message];
  }

  return [500, "Unknown Error Occurred"];
}


import type { Env, Next } from "~/api";

export async function errorHandler(env: Env, next: Next) {

  try {
    await next()
  }
  catch(error) {

    const [ code, message ] = extractCodeWithMessage(error)

    env.status = code
    env.body = { error: message }

    // triggering on("error") handler
    env.app.emit("error", error, env)

  }

}

function extractCodeWithMessage(error: any): [ number, string ] {

  // allows throwing strings:
  //   throw "some error"
  //   throw "500: some error"
  if (typeof error === "string") {

    const [
      _, /** ignore */
      code = 400,
      message = error,
    ] = error.trim().match(/^(\d+):\s*([^\0]+)/) || []

    return [ Number(code), message ]
  }
  else if (error.message) {
    return [ 400, error.message ]
  }
  else {
    return [ 500, "Unknown Error Occurred" ]
  }

}



import { unlinkSync, chmodSync } from "fs";

import nopt from "nopt";

import "~/init";

import { app } from "./_app";

const { port, sock } = nopt({
  port: Number,
  sock: String,
}, {
  p: [ "--port" ],
  s: [ "--sock" ],
})

if (!port && !sock) {
  throw new Error("Please provide either --port/-p number or --sock/-s path")
}

process.stdout.write(`\n\tStarting server [ ${ port ? "port" : "socket" }: ${ port || sock } ]... `)

if (sock) {
  try { unlinkSync(sock) } catch(e) {}
}

app.listen(port || sock, function() {

  if (sock) {
    chmodSync(sock, 0o777)
  }

  console.log("✨ Done\n")

})


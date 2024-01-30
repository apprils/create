import { type Server } from "http";

import "~/init";
import { apiPort } from "@/package.json";

export { app } from "./_app";

export function listen(server: Server) {
  server.listen(apiPort);
}

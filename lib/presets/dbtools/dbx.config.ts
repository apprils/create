
import { defineConfig } from "@appril/dbx/cli";

import "./init";
import { connection, client } from "./config/knex";

export default defineConfig({

  connection,
  client,

  base: "db",

  migrationDir: "migrations", // relative to base

})


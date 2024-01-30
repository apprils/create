import { knex } from "knex";

import { DEV } from "~/config";
import { connection as connectionSettings, client } from "~/config/knex";

export function connect(_connectionSettings = {}) {
  const instance = knex({
    client,
    connection: {
      ...connectionSettings,
      ..._connectionSettings,
    },
    asyncStackTraces: DEV,
    pool: {
      async afterCreate(conn: any, done: Function) {
        done(null, conn);
      },
    },
  });

  return instance;
}

export function disconnect(c = connection) {
  return c?.destroy();
}

export const connection = connect();

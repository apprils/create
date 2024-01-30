const {
  DATABASE_SERVER: host,
  DATABASE_PORT: port,
  DATABASE_USER: user,
  DATABASE_NAME: database,
  DATABASE_PASSWORD: password,
  DATABASE_CLIENT: client = "pg",
} = process.env;

export const connection = {
  host,
  port: Number(port || 5432),
  user,
  database,
  password,
};

export { client };

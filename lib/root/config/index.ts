export const {
  HOSTNAME: hostname = "",
  DEBUG = "",
  NODE_ENV = "development",
} = process.env;

export const DEV = NODE_ENV === "development";

export default {
  hostname,
  DEBUG,
  NODE_ENV,
  DEV,
};

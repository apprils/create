import qs from "qs";

export type PathChunk = string | number | Record<string, any>;

export type URLMapperConfig = {
  hostname: string;
  secure?: boolean;
  w3prefix?: boolean;
};

export function urlMapper(
  config: URLMapperConfig,
  options: { base: string },
  setup: { name: string; path: string } & Record<string, any>,
) {
  const { hostname = "", secure = false, w3prefix = false } = { ...config };

  const scheme = secure ? "https://" : "http://";

  const origin = w3prefix ? scheme + "www." + hostname : scheme + hostname;

  const base = join(options.base, setup.path);
  const path = (...args: PathChunk[]) =>
    urlBuilder(options.base, setup.path, ...args);
  const href = (...args: PathChunk[]) => origin + path(...args);

  return {
    get name() {
      return setup.name;
    },
    get origin() {
      return origin;
    },
    get base() {
      return base;
    },
    path,
    href,
  };
}

export function urlBuilder(...args: PathChunk[]): string {
  return typeof args[args.length - 1] === "object"
    ? join(...args.slice(0, args.length - 1)) +
        "?" +
        stringify(args[args.length - 1] as {})
    : join(...args);
}

export function parse(str: string): { [key: string]: any } {
  return qs.parse(str);
}

export function stringify(query: { [key: string]: any }, opts = {}): string {
  return qs.stringify(query, {
    arrayFormat: "brackets",
    indices: false,
    ...opts,
  });
}

export function join(...args: PathChunk[]): string {
  return args
    .map(joinMapper)
    .filter((e) => e)
    .join("/")
    .replace(/\/+/g, "/");
}

function joinMapper(a: PathChunk | PathChunk[]) {
  return Array.isArray(a) ? join(...a) : a;
}

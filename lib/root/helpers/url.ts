import qs from "qs";

export type PathChunk = string | number | Record<string, unknown>;

export type URLMapperConfig = {
  hostname: string;
  secure?: boolean;
  w3prefix?: boolean;
};

export function urlMapper(
  config: URLMapperConfig,
  options: { base: string },
  setup: { name: string; path: string } & Record<string, unknown>,
) {
  const { hostname = "", secure = false, w3prefix = false } = { ...config };

  const scheme = secure ? "https://" : "http://";

  const origin = w3prefix
    ? [scheme, "www.", hostname].join("")
    : [scheme, hostname].join("");

  const base = join(options.base, setup.path);

  const path = (...args: PathChunk[]) => {
    return urlBuilder(options.base, setup.path, ...args);
  };

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
  if (typeof args[args.length - 1] === "object") {
    const path = join(...args.slice(0, args.length - 1));
    const query = stringify(args[args.length - 1] as Record<string, unknown>);
    return [path, query].join("?");
  }

  return join(...args);
}

export function parse(str: string): Record<string, unknown> {
  return qs.parse(str);
}

export function stringify(query: Record<string, unknown>, opts = {}): string {
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

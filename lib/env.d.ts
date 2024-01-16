
declare module "~/init" {
  export {}
}

declare module "~/api/_server_assets" {
  export const port: number;
  export const sock: string;
  export const onStartListen: () => void;
}

declare module "~/api/base" {
  export {}
}

declare module "@/package.json" {
  export const apiPort: number;
}


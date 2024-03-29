declare module "~/init" {
  export {};
}

declare module "~/config" {
  export const DEV: boolean;
}

declare module "~/config/knex" {
  export const connection;
  export const client;
}

declare module "~/api/_server_assets" {
  export const port: number;
  export const sock: string;
  export const onStartListen: () => void;
}

declare module "~/api/base" {
  export {};
}

declare module "~/helpers/api" {
  export const errorHandler = () => {};
}

declare module "@/package.json" {
  export const apiPort: number;
}

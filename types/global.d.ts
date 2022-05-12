declare type Recordable<T = any> = Record<string, T>;
declare interface ViteEnv {
  readonly VITE_GLOB_APP_TITLE?: string;
  readonly VITE_PORT?: number;
  readonly VITE_PUBLIC_PATH?: string;
  readonly VITE_USE_MOCK?: boolean;
}

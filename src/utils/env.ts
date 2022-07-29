import type { GlobEnvConfig } from '/#/config';
import { getConfigFileName } from '../../build/getConfigFileName';

export function getAppEnvConfig() {
  const ENV_NAME = getConfigFileName(import.meta.env);

  const ENV = (import.meta.env.DEV
    ? // Get the global configuration (the configuration will be extracted independently when packaging)
      (import.meta.env as unknown as GlobEnvConfig)
    : window[ENV_NAME as any]) as unknown as GlobEnvConfig;

  const { VITE_GLOB_APP_TITLE, VITE_GLOB_API_URL, VITE_PUBLIC_PATH } = ENV;

  return {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_PUBLIC_PATH,
  };
}

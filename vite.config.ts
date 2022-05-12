import { defineConfig, loadEnv } from 'vite';
import { wrapperEnv } from './build/utils';

import { resolve } from 'path';
import { createVitePlugins } from './build/vite/plugin';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  // Load app-level env vars to node-level env vars.

  const root = process.cwd();

  const env = loadEnv(mode, root);

  const { VITE_PUBLIC_PATH, VITE_PORT } = wrapperEnv(env);

  const isBuild = command === 'build';

  return defineConfig({
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: [
        {
          find: /^~/,
          replacement: '',
        },
        // /@/xxxx => src/xxxx
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/',
        },
        // /#/xxxx => types/xxxx
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/',
        },
      ],
    },
    server: {
      host: true,
      port: Number(VITE_PORT),
    },
    plugins: createVitePlugins(env, isBuild),
  });
};

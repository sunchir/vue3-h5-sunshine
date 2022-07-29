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

  const viteEnv = wrapperEnv(env);

  const { VITE_PUBLIC_PATH, VITE_PORT } = viteEnv;

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
    esbuild: {
      pure: [],
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      outDir: 'dist',
      // minify: 'terser',
      /**
       * 当 minify=“minify:'terser'” 解开注释
       * Uncomment when minify="minify:'terser'"
       */
      // terserOptions: {
      //   compress: {
      //     keep_infinity: true,
      //     drop_console: VITE_DROP_CONSOLE,
      //   },
      // },
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
    plugins: createVitePlugins(viteEnv, isBuild),
  });
};

import type { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createStyleImportPlugin } from 'vite-plugin-style-import';
import { configHtmlPlugin } from './html';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import { configMockPlugin } from './mock';

export function createVitePlugins(viteEnv: ViteEnv, isBuild = false) {
  const { VITE_USE_MOCK } = viteEnv;
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(),
    vueSetupExtend(),
    createStyleImportPlugin({
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: (name) => `vant/es/${name}/style`,
        },
      ],
    }),
  ];

  // vite-plugin-html;
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));
  // vite-plugin-mock
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild));

  return vitePlugins;
}

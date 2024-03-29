import type { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import { configHtmlPlugin } from './html';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import { configMockPlugin } from './mock';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

export function createVitePlugins(viteEnv: ViteEnv, isBuild = false) {
  const { VITE_USE_MOCK } = viteEnv;
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(),
    vueSetupExtend(),
    Components({
      resolvers: [VantResolver()],
    }),
  ];

  // vite-plugin-html;
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));
  // vite-plugin-mock
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild));

  return vitePlugins;
}

/**
 * use the vite-plugin-html to change the html
 */

import type { PluginOption } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
/**
 *
 * @param env environment variables
 * @param isBuild is build command
 * @returns vite plugin configuration
 */
export function configHtmlPlugin(env: ViteEnv, isBuild = false) {
  const { VITE_GLOB_APP_TITLE } = env;
  const htmlPlugin: PluginOption[] = createHtmlPlugin({
    minify: isBuild,
    inject: {
      data: {
        // send title to ejs
        title: VITE_GLOB_APP_TITLE,
      },
    },
  });

  return htmlPlugin;
}

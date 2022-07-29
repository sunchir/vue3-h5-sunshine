/**
 * use the vite-plugin-html to change the html
 */

import type { PluginOption } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import pkg from '../../../package.json';
import { GLOB_CONFIG_FILE_NAME } from '../constant';
/**
 *
 * @param env environment variables
 * @param isBuild is build command
 * @returns vite plugin configuration
 */
export function configHtmlPlugin(env: ViteEnv, isBuild = false) {
  const { VITE_GLOB_APP_TITLE, VITE_PUBLIC_PATH } = env;

  const path = VITE_PUBLIC_PATH.endsWith('/') ? VITE_PUBLIC_PATH : `${VITE_PUBLIC_PATH}/`;

  const getAppConfigSrc = () => {
    return `${path || '/'}${GLOB_CONFIG_FILE_NAME}?v=${pkg.version}-${new Date().getTime()}`;
  };
  const htmlPlugin: PluginOption[] = createHtmlPlugin({
    minify: isBuild,
    inject: {
      data: {
        // send title to ejs
        title: VITE_GLOB_APP_TITLE,
      },
      tags: isBuild
        ? [
            {
              tag: 'script',
              attrs: {
                src: getAppConfigSrc(),
              },
            },
          ]
        : [],
    },
  });

  return htmlPlugin;
}

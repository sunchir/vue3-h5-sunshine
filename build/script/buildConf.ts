import { GLOB_CONFIG_FILE_NAME, OUTPUT_DIR } from '../vite/constant';
import fs, { writeFileSync } from 'fs-extra';
import { getEnvConfig, getRootPath } from '../utils';
import { getConfigFileName } from '../getConfigFileName';
import colors from 'picocolors';

import pkg from '../../package.json';

interface CreateConfigParams {
  configName: string;
  config: any;
  configFileName?: string;
}

function createConfig(params: CreateConfigParams) {
  const { configName, config, configFileName } = params;
  try {
    const windowConf = `window.${configName}`;
    let configStr = `${windowConf}=${JSON.stringify(config)};`;
    configStr += `
      Object.freeze(${windowConf});
      Object.defineProperty(window,"${configName}", {
          configurable: false,
          writeable: false,
      });
      `.replace(/\s/g, ' ');
    fs.mkdirp(getRootPath(OUTPUT_DIR));
    writeFileSync(getRootPath(`${OUTPUT_DIR}/${configFileName}`), configStr);
    console.log(colors.cyan(`✨ [${pkg.name}]`) + ` - configuration file is build successfully:`);
    console.log(colors.gray(OUTPUT_DIR + '/' + colors.green(configFileName)) + '\n');
  } catch (err) {
    console.log(colors.red('configuration file failed to package:\n' + err));
  }
}

export function runBuildConfig() {
  const config = getEnvConfig();
  const configFileName = getConfigFileName(config);
  createConfig({
    config,
    configName: configFileName,
    configFileName: GLOB_CONFIG_FILE_NAME,
  });
}

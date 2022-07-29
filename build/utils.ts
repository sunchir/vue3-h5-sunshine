import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

function getConfFiles() {
  const script = process.env.npm_lifecycle_script;
  const reg = new RegExp('--mode ([a-z_\\d])');
  const result = reg.exec(script as string) as any;
  if (result) {
    const mode = result[1] as string;
    return ['.env', `.env.${mode}`];
  }
  return ['.env', '.env.production'];
}

// Read all environment variable configuration files to process.env
export function wrapperEnv(envConf: Recordable): ViteEnv {
  const ret: any = {};
  for (const envName of Object.keys(envConf)) {
    let envValue = envConf[envName].replace(/\\n/g, '\n');
    envValue = envValue === 'true' ? true : envValue === 'false' ? false : envValue;
    if (envName === 'VITE_PORT') {
      // server port parse to number
      envValue = Number(envValue);
    } else if (envName === 'VITE_PROXY' && envName) {
      try {
        envValue = JSON.parse(envValue.replace(/'/g, '"'));
      } catch (e) {
        envValue = '';
        console.error(e);
      }
    }
    ret[envName] = envValue;
    if (typeof envName === 'string') {
      process.env[envName] = envValue;
    } else if (typeof envName === 'object') {
      process.env[envName] = JSON.stringify(envValue);
    }
  }
  return ret;
}

export function getEnvConfig(match = 'VITE_GLOB_', confFiles = getConfFiles()) {
  let envConfig = {};
  confFiles.forEach((item) => {
    try {
      const env = dotenv.parse(fs.readFileSync(path.resolve(process.cwd(), item)));
      envConfig = { ...envConfig, ...env };
    } catch (e) {
      console.error(`Error in parsing ${item}`, e);
    }
  });
  const reg = new RegExp(`^(${match})`);
  Object.keys(envConfig).forEach((key) => {
    if (!reg.test(key)) {
      Reflect.deleteProperty(envConfig, key);
    }
  });
  return envConfig;
}

/**
 * Get user root directory
 * @param dir file path
 */
export function getRootPath(...dir: string[]): string {
  return path.resolve(process.cwd(), ...dir);
}

// Read all environment variable configuration files to process.env
export function wrapperEnv(envConf: Recordable): ViteEnv {
  const ret = {};
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
      process.env[envName] = envName;
    } else if (typeof envName === 'object') {
      process.env[envName] = JSON.stringify(envName);
    }
  }
  return ret;
}

import { getExistingConfig, writeBuildConfig } from './storeConfig.js';
import { buntstift } from 'buntstift';
const setVersion = async () => {
    const config = await getExistingConfig();
    config.modules.version = await buntstift.ask('Version (major.minor.patch):', {
        default: config.modules.version,
        mask: /^[0-9].+[0-9].+[0-9]/g,
    });
    await writeBuildConfig({ config });
};
const setConfig = (options) => {
    if (options.version)
        return setVersion();
    return Promise.reject(Error('Option not available'));
};
export { setConfig };

import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
import { readJSON, writeJSON } from 'fs-extra/esm';
import { baseConfig } from './basicModuleConfig.js';
import { buntstift } from 'buntstift';
const path = __require("path");
const buildConfigFilePath = path.join(process.cwd(), './buildConfig.json');
/** Read existing config or provide a new default config */
const getExistingOrNewConfig = async () => {
    try {
        const config = await readJSON(buildConfigFilePath);
        return config;
    }
    catch {
        return baseConfig;
    }
};
/** Read existing config or provide a new default config */
const getExistingConfig = async () => {
    try {
        const config = await readJSON(buildConfigFilePath);
        return Promise.resolve(config);
    }
    catch (error) {
        if (error instanceof Error) {
            buntstift.error(`Error: Config file could not be found': ${buildConfigFilePath}`);
            if (error.stack)
                buntstift.error(error.stack);
            buntstift.info('You might need to init the project first with "n4-simple-build init" command');
        }
        return Promise.reject(error);
    }
};
/** Writes the config to the file system */
const writeBuildConfig = async ({ config }) => {
    const twoSpaces = 2;
    try {
        buntstift.list('Save build config file');
        await writeJSON(buildConfigFilePath, config, { spaces: twoSpaces });
    }
    catch (error) {
        if (error instanceof Error) {
            buntstift.error(`Could not save build config file: ${buildConfigFilePath}`);
            if (error.stack)
                buntstift.error(error.stack);
        }
    }
};
export { getExistingConfig, getExistingOrNewConfig, writeBuildConfig };

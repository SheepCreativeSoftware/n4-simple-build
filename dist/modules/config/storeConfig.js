"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeBuildConfig = exports.getExistingOrNewConfig = exports.getExistingConfig = void 0;
const fs_extra_1 = require("fs-extra");
const basicModuleConfig_1 = require("./basicModuleConfig");
const buntstift_1 = require("buntstift");
const path = require("path");
const buildConfigFilePath = path.resolve(process.cwd(), './buildConfig.json');
/** Read existing config or provide a new default config */
const getExistingOrNewConfig = async () => {
    try {
        const config = await (0, fs_extra_1.readJSON)(buildConfigFilePath);
        return config;
    }
    catch {
        return basicModuleConfig_1.baseConfig;
    }
};
exports.getExistingOrNewConfig = getExistingOrNewConfig;
/** Read existing config or provide a new default config */
const getExistingConfig = async () => {
    try {
        const config = await (0, fs_extra_1.readJSON)(buildConfigFilePath);
        return Promise.resolve(config);
    }
    catch (error) {
        if (error instanceof Error) {
            buntstift_1.buntstift.error(`Error: Config file could not be found': ${buildConfigFilePath}`);
            if (error.stack)
                buntstift_1.buntstift.error(error.stack);
            buntstift_1.buntstift.info('You might need to init the project first with "n4-simple-build init" command');
        }
        return Promise.reject(error);
    }
};
exports.getExistingConfig = getExistingConfig;
/** Writes the config to the file system */
const writeBuildConfig = async ({ config }) => {
    const twoSpaces = 2;
    try {
        await (0, fs_extra_1.writeJSON)(buildConfigFilePath, config, { spaces: twoSpaces });
    }
    catch (error) {
        if (error instanceof Error) {
            buntstift_1.buntstift.error(`Could not save config file: ${buildConfigFilePath}`);
            if (error.stack)
                buntstift_1.buntstift.error(error.stack);
        }
    }
};
exports.writeBuildConfig = writeBuildConfig;

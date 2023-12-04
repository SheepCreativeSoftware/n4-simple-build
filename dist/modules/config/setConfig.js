"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setConfig = void 0;
const storeConfig_1 = require("./storeConfig");
const buntstift_1 = require("buntstift");
const setVersion = async () => {
    const config = await (0, storeConfig_1.getExistingConfig)();
    config.modules.version = await buntstift_1.buntstift.ask('Version (major.minor.patch):', {
        default: config.modules.version,
        mask: /^[0-9].+[0-9].+[0-9]/g,
    });
    await (0, storeConfig_1.writeBuildConfig)({ config });
};
const setConfig = (options) => {
    if (options.version)
        return setVersion();
    return Promise.reject(Error('Option not available'));
};
exports.setConfig = setConfig;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initProject = void 0;
const storeConfig_1 = require("../config/storeConfig");
const buntstift_1 = require("buntstift");
const createBasicFolders_1 = require("./createBasicFolders");
const initCliPromt_1 = require("./initCliPromt");
const initProject = async () => {
    try {
        buntstift_1.buntstift.header('Initialize Module');
        const config = await (0, storeConfig_1.getExistingOrNewConfig)();
        const newConfig = await (0, initCliPromt_1.initCliPromt)({ config });
        await (0, storeConfig_1.writeBuildConfig)({ config: newConfig });
        await (0, createBasicFolders_1.createBasicFolders)({ config: newConfig });
    }
    catch (error) {
        buntstift_1.buntstift.error('Init failed!');
        if (error instanceof Error)
            buntstift_1.buntstift.error(JSON.stringify(error));
    }
};
exports.initProject = initProject;

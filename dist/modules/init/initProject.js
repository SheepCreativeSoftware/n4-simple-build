"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initProject = void 0;
const storeConfig_1 = require("../config/storeConfig");
const buntstift_1 = require("buntstift");
const initCliPromt_1 = require("./initCliPromt");
const initProject = async () => {
    buntstift_1.buntstift.header('Initialize Module');
    const config = await (0, storeConfig_1.getExistingOrNewConfig)();
    const newConfig = await (0, initCliPromt_1.initCliPromt)({ config });
    await (0, storeConfig_1.writeBuildConfig)({ config: newConfig });
};
exports.initProject = initProject;

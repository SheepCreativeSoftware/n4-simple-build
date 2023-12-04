"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readWriteConfig = void 0;
const addConfig_1 = require("./addConfig");
const buntstift_1 = require("buntstift");
const listConfig_1 = require("./listConfig");
const removeConfig_1 = require("./removeConfig");
const setConfig_1 = require("./setConfig");
const atLeastOne = 1;
// eslint-disable-next-line complexity
const readWriteConfig = async (mode, options) => {
    try {
        let returnValue = null;
        switch (mode) {
            case 'ADD':
                await (0, addConfig_1.addConfig)(options);
                break;
            case 'LIST':
                returnValue = await (0, listConfig_1.listConfig)(options);
                break;
            case 'RM':
                await (0, removeConfig_1.removeConfig)(options);
                break;
            case 'SET':
                await (0, setConfig_1.setConfig)(options);
                break;
            default:
                throw new Error('Mode does not exist');
        }
        if (typeof returnValue === 'string')
            buntstift_1.buntstift.info(returnValue);
        if (Array.isArray(returnValue) && returnValue.length >= atLeastOne)
            buntstift_1.buntstift.table(returnValue);
        return Promise.resolve(returnValue);
    }
    catch (error) {
        if (error instanceof Error) {
            buntstift_1.buntstift.error('Could not load list');
            if (error.stack)
                buntstift_1.buntstift.error(error.stack);
        }
        return Promise.reject(error);
    }
};
exports.readWriteConfig = readWriteConfig;

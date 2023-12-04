"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listConfig = void 0;
const fse = require("fs-extra");
const buntstift_1 = require("buntstift");
const path = require("path");
const listDependencies = async () => {
    const moduleMetaFile = await fse.readJSON(path.resolve(process.cwd(), 'module', 'META-INF', 'module.json'));
    if (typeof moduleMetaFile.module.dependencies.dependency === 'undefined') {
        buntstift_1.buntstift.verbose('No dependecies defined');
        return Promise.resolve([]);
    }
    const thatDependencies = [];
    for (const dependency of moduleMetaFile.module.dependencies.dependency) {
        thatDependencies.push({
            name: dependency['@'].name,
            vendor: dependency['@'].vendor,
            'vendor-version': dependency['@'].vendorVersion,
        });
    }
    return Promise.resolve(thatDependencies);
};
const listConfig = (options) => {
    if (options.dependency)
        return listDependencies();
    return Promise.reject(Error('Option not available'));
};
exports.listConfig = listConfig;

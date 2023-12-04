"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listConfig = void 0;
const fse = require("fs-extra");
const buntstift_1 = require("buntstift");
const path = require("path");
const listDependencies = async () => {
    try {
        const moduleMetaFile = await fse.readJSON(path.resolve(process.cwd(), 'module', 'META-INF', 'module.json'));
        if (typeof moduleMetaFile.module.dependencies.dependency === 'undefined') {
            buntstift_1.buntstift.verbose('No dependecies defined');
            return Promise.resolve();
        }
        buntstift_1.buntstift.header('Dependencies');
        const thatDependencies = [];
        for (const dependency of moduleMetaFile.module.dependencies.dependency) {
            thatDependencies.push({
                name: dependency['@'].name,
                vendor: dependency['@'].vendor,
                'vendor-version': dependency['@'].vendorVersion,
            });
        }
        buntstift_1.buntstift.table(thatDependencies);
        return Promise.resolve();
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
const listConfig = async ({ dependency }) => {
    if (dependency)
        await listDependencies();
};
exports.listConfig = listConfig;

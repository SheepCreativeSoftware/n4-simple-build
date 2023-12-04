"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addConfig = void 0;
const fse = require("fs-extra");
const buntstift_1 = require("buntstift");
const path = require("path");
const addDependency = async () => {
    const moduleName = await buntstift_1.buntstift.ask('Name for the module:', { default: 'someModule' });
    const vendor = await buntstift_1.buntstift.ask('Vendor of the module:', { default: 'The Company' });
    const version = await buntstift_1.buntstift.ask('Version (major.minor):', {
        default: '4.10',
        mask: /^[0-9].+[0-9]/g,
    });
    const newDependency = {
        '@': {
            name: moduleName,
            vendor,
            vendorVersion: version,
        },
    };
    const moduleMetaFile = await fse.readJSON(path.resolve(process.cwd(), 'module', 'META-INF', 'module.json'));
    if (moduleMetaFile.module.dependencies.dependency)
        moduleMetaFile.module.dependencies.dependency.push(newDependency);
    if (typeof moduleMetaFile.module.dependencies.dependency === 'undefined')
        moduleMetaFile.module.dependencies.dependency = [newDependency];
    await fse.writeJSON(path.resolve(process.cwd(), 'module', 'META-INF', 'module.json'), moduleMetaFile);
};
const addConfig = (options) => {
    if (options.dependency)
        return addDependency();
    return Promise.reject(Error('Option not available'));
};
exports.addConfig = addConfig;

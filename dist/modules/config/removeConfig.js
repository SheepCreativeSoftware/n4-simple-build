"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeConfig = void 0;
const fse = require("fs-extra");
const buntstift_1 = require("buntstift");
const path = require("path");
const oneElement = 1;
const twoSpaces = 2;
const emptyArray = 0;
const removeDependency = async () => {
    const dependencyToRemove = await buntstift_1.buntstift.ask('Name of the module you want to remove?');
    const moduleMetaFile = await fse.readJSON(path.resolve(process.cwd(), 'module', 'META-INF', 'module.json'));
    if (typeof moduleMetaFile.module.dependencies.dependency === 'undefined') {
        buntstift_1.buntstift.verbose('No dependecies defined');
        return Promise.resolve();
    }
    let foundSomething = false;
    for (let index = 0; index < moduleMetaFile.module.dependencies.dependency.length; index++) {
        const dependency = moduleMetaFile.module.dependencies.dependency[index];
        if (dependency['@'].name === dependencyToRemove) {
            // ...
            moduleMetaFile.module.dependencies.dependency.splice(index, oneElement);
            foundSomething = true;
            buntstift_1.buntstift.line();
            buntstift_1.buntstift.info('Removed following module:');
            buntstift_1.buntstift.table([
                {
                    name: dependency['@'].name,
                    vendor: dependency['@'].vendor,
                    'vendor-version': dependency['@'].vendorVersion,
                },
            ]);
            break;
        }
    }
    if (!foundSomething)
        throw Error('Dependency not found!');
    if (moduleMetaFile.module.dependencies.dependency.length === emptyArray)
        delete moduleMetaFile.module.dependencies.dependency;
    fse.writeJSON(path.resolve(process.cwd(), 'module', 'META-INF', 'module.json'), moduleMetaFile, { spaces: twoSpaces });
    return Promise.resolve();
};
const removeConfig = (options) => {
    if (options.dependency)
        return removeDependency();
    return Promise.reject(Error('Option not available'));
};
exports.removeConfig = removeConfig;

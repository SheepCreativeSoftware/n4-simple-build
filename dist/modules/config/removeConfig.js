import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
import * as fse from 'fs-extra/esm';
import { buntstift } from 'buntstift';
const path = __require("path");
const oneElement = 1;
const twoSpaces = 2;
const emptyArray = 0;
const removeDependency = async () => {
    const dependencyToRemove = await buntstift.ask('Name of the module you want to remove?');
    const moduleMetaFile = await fse.readJSON(path.join(process.cwd(), 'module', 'META-INF', 'module.json'));
    if (typeof moduleMetaFile.module.dependencies.dependency === 'undefined') {
        buntstift.verbose('No dependecies defined');
        return Promise.resolve();
    }
    let foundSomething = false;
    for (let index = 0; index < moduleMetaFile.module.dependencies.dependency.length; index++) {
        const dependency = moduleMetaFile.module.dependencies.dependency[index];
        if (dependency['@'].name === dependencyToRemove) {
            // ...
            moduleMetaFile.module.dependencies.dependency.splice(index, oneElement);
            foundSomething = true;
            buntstift.line();
            buntstift.info('Removed following module:');
            buntstift.table([
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
    fse.writeJSON(path.join(process.cwd(), 'module', 'META-INF', 'module.json'), moduleMetaFile, { spaces: twoSpaces });
    return Promise.resolve();
};
const removeConfig = (options) => {
    if (options.dependency)
        return removeDependency();
    return Promise.reject(Error('Option not available'));
};
export { removeConfig };

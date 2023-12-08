import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
import * as fse from 'fs-extra/esm';
import { buntstift } from 'buntstift';
const path = __require("path");
const listDependencies = async () => {
    const moduleMetaFile = await fse.readJSON(path.join(process.cwd(), 'module', 'META-INF', 'module.json'));
    if (typeof moduleMetaFile.module.dependencies.dependency === 'undefined') {
        buntstift.verbose('No dependecies defined');
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
export { listConfig };

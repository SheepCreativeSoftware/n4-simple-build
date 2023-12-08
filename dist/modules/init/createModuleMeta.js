"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModuleMeta = void 0;
const fse = require("fs-extra");
const buntstift_1 = require("buntstift");
const path = require("path");
const twoSpaces = 2;
/** Writes the config to the file system */
const createModuleMeta = async ({ config }) => {
    try {
        buntstift_1.buntstift.info('Create Basic module config');
        let moduleType = config.modules.type;
        if (moduleType === 'Lexicon')
            moduleType = 'rt';
        /* eslint-disable sort-keys */
        const moduleMetaFile = {
            module: {
                '@': {
                    name: `${config.modules.name}-${moduleType}`,
                    runtimeProfile: moduleType,
                    moduleName: config.modules.name,
                    buildHost: '',
                    buildMillis: '',
                    bajaVersion: '0',
                    vendor: config.vendor,
                    vendorVersion: config.modules.version,
                    description: config.modules.description,
                    preferredSymbol: config.modules.preferredSymbol,
                    nre: 'true',
                    installable: 'true',
                    autoload: 'true',
                },
                dependencies: {
                    // eslint-disable-next-line no-undefined
                    dependency: undefined,
                },
                dirs: '',
            },
        };
        /* eslint-enable sort-keys */
        await fse.writeJSON(path.resolve(process.cwd(), 'module', 'META-INF', 'module.json'), moduleMetaFile, { spaces: twoSpaces });
        return Promise.resolve();
    }
    catch (error) {
        return Promise.reject(error);
    }
};
exports.createModuleMeta = createModuleMeta;
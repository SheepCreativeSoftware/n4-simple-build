import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
import * as fse from 'fs-extra/esm';
import { buntstift } from 'buntstift';
const path = __require("path");
const twoSpaces = 2;
/** Writes the config to the file system */
const createModuleMeta = async ({ config }) => {
    try {
        buntstift.info('Create Basic module config');
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
        // Add specific config for Lexicon modules
        /* eslint-enable sort-keys */
        if (config.modules.type === 'Lexicon') {
            moduleMetaFile.module.defs = {
                def: {
                    '@': {
                        name: config.modules.name,
                        value: config.modules.name,
                    },
                },
            };
        }
        await fse.writeJSON(path.join(process.cwd(), 'module', 'META-INF', 'module.json'), moduleMetaFile, { spaces: twoSpaces });
        return Promise.resolve();
    }
    catch (error) {
        return Promise.reject(error);
    }
};
export { createModuleMeta };

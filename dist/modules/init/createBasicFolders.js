import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
import * as fse from 'fs-extra/esm';
import { buntstift } from 'buntstift';
const path = __require("path");
/** Writes the config to the file system */
const createBasicFolders = async ({ config }) => {
    try {
        buntstift.info('Create Basic folder structure');
        // Create this folder before everything else to avoid conflicts
        await fse.ensureDir(path.join(process.cwd(), config.baseFolder));
        await Promise.all([
            fse.ensureDir(path.join(process.cwd(), '.temp')),
            fse.ensureDir(path.join(process.cwd(), config.outputPath)),
            fse.ensureDir(path.join(process.cwd(), 'signed')),
            fse.ensureDir(path.join(process.cwd(), config.buildPath)),
            fse.ensureDir(path.join(process.cwd(), 'module', 'META-INF')),
        ]);
        if (config.modules.type !== 'Lexicon') {
            // ...
            await fse.ensureDir(path.join(process.cwd(), config.buildPath, 'rc'));
        }
        if (config.modules.type === 'Lexicon') {
            await Promise.all([
                fse.ensureDir(path.join(process.cwd(), config.modules.relativeLexiconBasePath)),
                fse.ensureDir(path.join(process.cwd(), config.csv.exportPath)),
                fse.ensureDir(path.join(process.cwd(), config.csv.importPath)),
            ]);
        }
        return Promise.resolve();
    }
    catch (error) {
        return Promise.reject(error);
    }
};
export { createBasicFolders };

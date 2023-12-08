"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBasicFolders = void 0;
const fse = require("fs-extra");
const buntstift_1 = require("buntstift");
const path = require("path");
/** Writes the config to the file system */
const createBasicFolders = async ({ config }) => {
    try {
        buntstift_1.buntstift.info('Create Basic folder structure');
        // Create this folder before everything else to avoid conflicts
        await fse.ensureDir(path.resolve(process.cwd(), config.baseFolder));
        await Promise.all([
            fse.ensureDir(path.resolve(process.cwd(), '.temp')),
            fse.ensureDir(path.resolve(process.cwd(), config.outputPath)),
            fse.ensureDir(path.resolve(process.cwd(), 'signed')),
            fse.ensureDir(path.resolve(process.cwd(), config.buildPath)),
            fse.ensureDir(path.resolve(process.cwd(), 'module', 'META-INF')),
        ]);
        if (config.modules.type !== 'Lexicon') {
            // ...
            await fse.ensureDir(path.resolve(process.cwd(), config.buildPath, 'rc'));
        }
        if (config.modules.type === 'Lexicon') {
            await Promise.all([
                fse.ensureDir(path.resolve(process.cwd(), config.modules.relativeLexiconBasePath)),
                fse.ensureDir(path.resolve(process.cwd(), config.csv.exportPath)),
                fse.ensureDir(path.resolve(process.cwd(), config.csv.importPath)),
            ]);
        }
        return Promise.resolve();
    }
    catch (error) {
        return Promise.reject(error);
    }
};
exports.createBasicFolders = createBasicFolders;

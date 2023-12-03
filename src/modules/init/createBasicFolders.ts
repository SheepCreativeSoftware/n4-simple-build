
import * as fse from 'fs-extra';
import { BuildConfig } from '../../interfaces/BuildConfig/BuildConfig';
import { buntstift } from 'buntstift';
import path = require('path');


/** Writes the config to the file system */
const createBasicFolders = async ({ config }: {
	config: BuildConfig,
}): Promise<void> => {
	try {
		buntstift.info('Create Basic folder structure');

		// Create this folder before everything else to avoid conflicts
		await fse.ensureDir(path.resolve(process.cwd(), config.baseFolder));
		await Promise.all([
			fse.ensureDir(path.resolve(process.cwd(), '.temp')),
			fse.ensureDir(path.resolve(process.cwd(), config.outputPath)),
			fse.ensureDir(path.resolve(process.cwd(), 'signed')),
			fse.ensureDir(path.resolve(process.cwd(), config.buildPath)),
			fse.ensureDir(path.resolve(process.cwd(), config.baseFolder, 'rc')),
			fse.ensureDir(path.resolve(process.cwd(), config.baseFolder, 'META-INF')),
		]);
		if(config.modules.type === 'Lexicon') {
			await Promise.all([
				fse.ensureDir(path.resolve(process.cwd(), config.modules.relativeLexiconBasePath)),
				fse.ensureDir(path.resolve(process.cwd(), config.csv.exportPath)),
				fse.ensureDir(path.resolve(process.cwd(), config.csv.importPath)),
			]);
		}
		return Promise.resolve();
	} catch (error) {
		return Promise.reject(error);
	}
};

export { createBasicFolders };

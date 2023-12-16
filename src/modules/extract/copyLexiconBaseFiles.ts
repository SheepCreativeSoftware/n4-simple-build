import * as fs from 'fs/promises';
import * as fse from 'fs-extra/esm';
import { BuildConfig } from '../../interfaces/BuildConfig/BuildConfig.js';
import { buntstift } from 'buntstift';
import { IndexedFiles } from '../../interfaces/extract/IndexedFiles.js';
import path from 'path';

const copyLexiconBaseFiles = async({ config, indexedFiles }: {
	config: BuildConfig,
	indexedFiles: IndexedFiles,
}) => {
	buntstift.info('Copy and construct Lexicon files');
	if(config.modules.type !== 'Lexicon') return;
	const lexiconExtension = `.${config.lexicon.extension}`;
	const copiedFiles = [];

	for(const moduleName in indexedFiles) {
		const { lexiconFilePaths } = indexedFiles[moduleName];
		const destinationPath = path.resolve(config.modules.relativeLexiconBasePath, moduleName + lexiconExtension);

		try {
			fse.removeSync(destinationPath);
			for(const lexiconFilePath of lexiconFilePaths) {
				const fileData = await fs.readFile(lexiconFilePath);
				await fs.appendFile(destinationPath, fileData);
			}

			copiedFiles.push(moduleName);
		} catch (error) {
			if(error instanceof Error) buntstift.error(error.message);
		}
	}
	buntstift.line();
	buntstift.info(`Copied ${copiedFiles.length} files in Lexicon base path`);
};

export { copyLexiconBaseFiles };

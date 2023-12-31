import * as fs from 'fs/promises';
import * as fse from 'fs-extra/esm';
import { BuildConfig } from '../../interfaces/BuildConfig/BuildConfig.js';
import { buntstift } from 'buntstift';
import { getFileLineEnding } from '../misc/getFileLineEnding.js';
import iconv from 'iconv-lite';
import { IndexedFiles } from '../../interfaces/extract/IndexedFiles.js';
import path from 'path';

const moreThanOne = 1;

/** Copy and combine all lexicons from all indexed modules */
const copyLexiconBaseFiles = async({ config, indexedFiles }: {
	config: BuildConfig,
	indexedFiles: IndexedFiles,
}) => {
	buntstift.info('Copy and combine Lexicon files');

	// Lexicon config is only awailable in lexicon modules (Should never happend but typescript did not now that)
	if(config.modules.type !== 'Lexicon') throw new Error('Not a Lexicon module');
	const lexiconExtension = `.${config.lexicon.extension}`;
	let copiedFiles = 0;
	let combinedFiles = 0;

	// Go trough each module in list
	for(const moduleName in indexedFiles) {
		const { lexiconFilePaths } = indexedFiles[moduleName];
		const destinationPath = path.resolve(config.modules.relativeLexiconBasePath, moduleName + lexiconExtension);

		try {
			// Remove old file first and then simply create and append new data into a single file per module
			fse.removeSync(destinationPath);
			let lineEnding = null as null|string;
			for(const lexiconFilePath of lexiconFilePaths) {
				const fileData = await fs.readFile(lexiconFilePath);

				// Evaluate the line ending once per module
				if(!lineEnding) {
					const fileDataText = iconv.decode(fileData, config.lexicon.encoding);
					lineEnding = getFileLineEnding({ fileData: fileDataText });
				}
				await fs.appendFile(destinationPath, fileData);

				// Add Line a additional Line Ending to the file, to make sure it exists
				if(lineEnding) await fs.appendFile(destinationPath, lineEnding);
			}
			if(lexiconFilePaths.length > moreThanOne) combinedFiles += lexiconFilePaths.length;
			copiedFiles++;
		} catch (error) {
			if(error instanceof Error) buntstift.error(error.message);
		}
	}
	buntstift.line();
	buntstift.success(`Added ${copiedFiles} and combined ${combinedFiles} files into Lexicon base path`);
};

export { copyLexiconBaseFiles };

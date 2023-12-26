import * as fs from 'fs/promises';
import { BuildConfig } from '../../../interfaces/BuildConfig/BuildConfig.js';
import { generateLexiconFileHeader } from './generateLexiconFileHeader.js';
import { getLanguagesFromHeader } from './getLanguagesFromHeader.js';
import { OutputInfo } from '../../../interfaces/Lexicon/OutputInfo.js';
import { writeFile } from '../../misc/copyFiles.js';
import path = require('path');

/** Returns basic information to write the files and prepares the output files */
const getOutputInfo = async ({ config, csvFileName, headerElements }: { config: BuildConfig, csvFileName: string, headerElements: string[] }) => {
	const  { baseFolder, modules, csv, lexicon } = config;
	const languages = getLanguagesFromHeader({ headerElements, lexicon });
	const outputInfo: OutputInfo[] = [];
	if(modules.type !== 'Lexicon') throw new Error('Not a Lexicon module');

	for(const language of languages) {
		const generatedHeader = generateLexiconFileHeader({ modules });

		const lexiconFileName = csvFileName.replace(csv.extension, lexicon.extension);
		const lexiconFilePath = path.join(process.cwd(), baseFolder, language, lexiconFileName);

		// First overwrite or create file with header
		await writeFile(lexiconFilePath, generatedHeader, { encoding: lexicon.encoding });
		const fileHandle = await fs.open(lexiconFilePath, 'a');

		outputInfo.push({
			fileHandle,
			filePath: lexiconFilePath,
			filename: lexiconFileName,
			hasDataAdded: false,
			language,
		});
	}
	return outputInfo;
};

export { getOutputInfo };

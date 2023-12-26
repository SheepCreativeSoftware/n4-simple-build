import * as fs from 'fs/promises';
import { BuildConfig } from '../../../interfaces/BuildConfig/BuildConfig.js';
import { generateLexiconFileHeader } from './generateLexiconFileHeader.js';
import { writeFile } from '../../misc/copyFiles.js';
import path = require('path');

const openAppendFileHandle = async (csvFileName: string, languages: string[], config: BuildConfig): Promise<[fs.FileHandle[], string[]]> => {
	const fileHandler = [];
	const filePaths = [];
	const  { baseFolder, modules, csv, lexicon } = config;
	if(modules.type !== 'Lexicon') throw new Error('Not a Lexicon module');

	for(const language of languages) {
		const generatedHeader = generateLexiconFileHeader({ modules });

		const lexiconFileName = csvFileName.replace(csv.extension, lexicon.extension);
		const lexiconFilePath = path.join(process.cwd(), `./${baseFolder}/${language}/${lexiconFileName}`);

		// First overwrite or create file with header
		await writeFile(lexiconFilePath, generatedHeader, { encoding: lexicon.encoding });
		fileHandler.push(await fs.open(lexiconFilePath, 'a'));
		filePaths.push(lexiconFilePath);
	}
	return [
		fileHandler,
		filePaths,
	];
};

export { openAppendFileHandle };


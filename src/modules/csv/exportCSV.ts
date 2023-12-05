
import * as fse from 'fs-extra';
import { readFile, writeFile } from '../misc/copyFiles';
import { BuildConfig } from '../../interfaces/BuildConfig/BuildConfig';
import { buntstift } from 'buntstift';
import { createCsvOutput } from './createCsvOutput';
import { lexFileToObject } from './lexFileToObject';
import { LexiconObject } from '../../interfaces/Lexicon/LexiconObject';

import path = require('path');

const exportCSV = async function({ config }: {
	config: BuildConfig,
}) {
	buntstift.header('Start export CSV process');

	const  { baseFolder, modules, csv, lexicon } = config;

	const csvExportPath = path.resolve(process.cwd(), csv.exportPath);

	// Skip execution for modules that are not Lexicons
	// eslint-disable-next-line no-continue
	if(modules.type !== 'Lexicon') throw new Error('Not a Lexicon module');

	const { relativeLexiconBasePath } = modules;

	// Search base files and store their name in an array if they are lexicons
	const baseFilePath = path.resolve(process.cwd(), relativeLexiconBasePath);
	const baseFiles = await fse.readdir(baseFilePath);
	const lexFiles = [] as string[];
	baseFiles.forEach((file) => {
		if(file.includes(`.${lexicon.extension}`)) lexFiles.push(file);
	});

	// Process each of the base files
	for(let indexBase = 0; indexBase < lexFiles.length; indexBase++) {
		// Get data from base file and store it as default language
		const lexFile = lexFiles[indexBase];
		buntstift.info('- Load base lexicon file: ' + lexFile);
		const baseLexiconData = await readFile(baseFilePath + '/' + lexFile, { encoding: lexicon.encoding });
		const lexiconObject = {} as LexiconObject;
		lexFileToObject({ language: lexicon.defaultLang, lexFile: baseLexiconData, lexiconObject });

		buntstift.info('- Load lexicon files from module');
		const moduleFolder = path.resolve(process.cwd(), baseFolder);
		const moduleFolders = await fse.readdir(moduleFolder);
		const languages = [lexicon.defaultLang];
		for(let indexLex = 0; indexLex < moduleFolders.length; indexLex++) {
			const languageFolder = moduleFolders[indexLex];
			languages.push(languageFolder);
			const lexiconFilePath = path.resolve(moduleFolder, languageFolder, lexFile);
			buntstift.info(`  - Load file: ${languageFolder}/${lexFile}`);
			try {
				const lexiconData = await readFile(lexiconFilePath, { encoding: lexicon.encoding });
				lexFileToObject({ language: languageFolder, lexFile: lexiconData, lexiconObject });
			} catch (error) {
				if(error instanceof Error) buntstift.error(`- File not found - ${error.message}`);
			}
		}

		buntstift.info('- Create CSV Output');
		const csvFile = createCsvOutput(lexiconObject, languages, csv);

		buntstift.info('- Save CSV file');
		const csvFileName = lexFile.replace(`.${lexicon.extension}`, `.${csv.extension}`);
		await writeFile(path.resolve(csvExportPath, csvFileName), csvFile, { encoding: csv.encoding });
	}

	return false;
};

export { exportCSV };

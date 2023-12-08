
import { readFile, writeFile } from '../misc/copyFiles';
import { BuildConfig } from '../../interfaces/BuildConfig/BuildConfig';
import { buntstift } from 'buntstift';
import { createCsvOutput } from './createCsvOutput';
import { getLanguageFolders } from './getLanguageFolders';
import { lexFileToObject } from './lexFileToObject';
import { LexiconObject } from '../../interfaces/Lexicon/LexiconObject';
import { searchLexiconBaseFiles } from './searchLexiconBaseFiles';
import path = require('path');

const exportCSV = async function({ config }: {
	config: BuildConfig,
}) {
	buntstift.header('Start export CSV process');

	const  { baseFolder, modules, csv, lexicon } = config;

	// Skip execution for modules that are not Lexicons
	if(modules.type !== 'Lexicon') throw new Error('Not a Lexicon module');

	const { relativeLexiconBasePath } = modules;

	// Search base files and store their name in an array if they are lexicons
	const baseFilePath = path.resolve(process.cwd(), relativeLexiconBasePath);
	const lexFiles = await searchLexiconBaseFiles({
		baseFilePath,
		lexiconExtension: lexicon.extension,
	});

	// Process each of the base files
	for(let indexBase = 0; indexBase < lexFiles.length; indexBase++) {
		// Get data from base file and store it as default language
		const lexFile = lexFiles[indexBase];
		buntstift.info('- Load base lexicon file: ' + lexFile);
		const baseLexiconData = await readFile(path.resolve(baseFilePath, lexFile), { encoding: lexicon.encoding });
		const lexiconObject = {} as LexiconObject;
		lexFileToObject({ language: lexicon.defaultLang, lexFile: baseLexiconData, lexiconObject });

		buntstift.info('- Load lexicon files from module');
		const moduleFolder = path.resolve(process.cwd(), baseFolder);
		const languages = await getLanguageFolders({ defaultLang: lexicon.defaultLang, moduleFolder });
		for(const language of languages) {
			if(language === lexicon.defaultLang) continue;
			const lexiconFilePath = path.resolve(moduleFolder, language, lexFile);
			buntstift.info(`  - Load file: ${language}/${lexFile}`);
			try {
				const lexiconData = await readFile(lexiconFilePath, { encoding: lexicon.encoding });
				lexFileToObject({ language, lexFile: lexiconData, lexiconObject });
			} catch (error) {
				if(error instanceof Error) buntstift.error(`- File not found - ${error.message}`);
			}
		}

		const csvFile = createCsvOutput(lexiconObject, languages, csv);

		const csvFileName = lexFile.replace(`.${lexicon.extension}`, `.${csv.extension}`);
		buntstift.info(`- Create CSV file: ${csvFileName}`);
		await writeFile(path.resolve(process.cwd(), csv.exportPath, csvFileName), csvFile, { encoding: csv.encoding });
	}
};

export { exportCSV };

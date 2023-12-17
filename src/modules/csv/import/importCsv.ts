import { readFile, writeFile } from '../../misc/copyFiles.js';
import { BuildConfig } from '../../../interfaces/BuildConfig/BuildConfig.js';
import { buntstift } from 'buntstift';
import { convertCsvData } from './convertCsvData.js';
import { searchForFiles } from '../../misc/searchFiles.js';
import path = require('path');



const importCSV = async ({ config }: {
	config: BuildConfig
}) => {
	buntstift.header('Start import CSV process');

	const  { baseFolder, modules, csv, lexicon } = config;

	// Skip execution for modules that are not Lexicons
	if(modules.type !== 'Lexicon') throw new Error('Not a Lexicon module');

	// Search base files and store their name in an array if they are lexicons
	const importPath = path.join(process.cwd(), `./${csv.importPath}`);
	buntstift.info('- Search for CSV files');
	const csvFiles = await searchForFiles({ extension: csv.extension, filePath: importPath });

	// Read csv file data
	for(const csvFileName of csvFiles) {
		buntstift.info(` - Load file ${csvFileName}`);
		const csvFile = await readFile(`${importPath}/${csvFileName}`, { encoding: csv.encoding });

		buntstift.info(` - Parse CSV File ${csvFileName}`);
		const [languages, fileData] = convertCsvData({ csv, csvFile, lexicon, modules });
		for(let indexOut = 0; indexOut < languages.length; indexOut++) {
			const language = languages[indexOut];
			const lexiconFileName = csvFileName.replace(csv.extension, lexicon.extension);
			buntstift.info(`  - Output lexicon file: ${language}/${lexiconFileName}`);
			buntstift.line();
			const lexiconFilePath = path.join(process.cwd(), `./${baseFolder}/${language}/${lexiconFileName}`);
			await writeFile(lexiconFilePath, fileData[indexOut], { encoding: lexicon.encoding });
		}
	}
	buntstift.success('Import finished');
};

export { importCSV };

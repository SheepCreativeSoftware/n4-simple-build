import { readFile, writeFile } from '../../misc/copyFiles.js';
import { BuildConfig } from '../../../interfaces/BuildConfig/BuildConfig.js';
import { buntstift } from 'buntstift';
import { convertCsvData } from './convertCsvData.js';
import { ProgressBar } from 'progress-bar-capture';
import { ReadLines } from 'readlines-iconv';
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
	buntstift.info('Search for CSV files');
	const csvFiles = await searchForFiles({ extension: csv.extension, filePath: importPath });
	const progressBar = new ProgressBar({ maxNumber: csvFiles.length, prefixText: 'Import CSV' });
	progressBar.start();
	console.time('CSV Parsing took');

	// Read csv file data
	for(const csvFileName of csvFiles) {
		buntstift.verbose(`Load file ${csvFileName}`);

		const lineHandler = new ReadLines(path.join(importPath, csvFileName), { encoding: csv.encoding, minBuffer: 16000 });
		let condition = true;
		let index = 0;

		while(condition) {
			const line = lineHandler.next();
			if(line === null) condition = false;
			//else console.log(index, line);
			index++;
		}


		const csvFile = await readFile(`${importPath}/${csvFileName}`, { encoding: csv.encoding });

		buntstift.info(` - Parse CSV File ${csvFileName}`);
		const [languages, fileData, header] = convertCsvData({ csv, csvFile, lexicon, modules });
		for(let indexOut = 0; indexOut < languages.length; indexOut++) {
			const language = languages[indexOut];

			// Don't generate output if only header is present in file
			if(fileData[indexOut] === header[indexOut]) {
				buntstift.verbose('Nothing to import');
				buntstift.line();
				continue;
			}
			const lexiconFileName = csvFileName.replace(csv.extension, lexicon.extension);
			buntstift.info(`  - Output lexicon file: ${language}/${lexiconFileName}`);
			buntstift.line();
			const lexiconFilePath = path.join(process.cwd(), `./${baseFolder}/${language}/${lexiconFileName}`);
			await writeFile(lexiconFilePath, fileData[indexOut], { encoding: lexicon.encoding });
		}
	}
	buntstift.success('Import finished');
	console.timeEnd('CSV Parsing took');
	progressBar.finish();
};

export { importCSV };

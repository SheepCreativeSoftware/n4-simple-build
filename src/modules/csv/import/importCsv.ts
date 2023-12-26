import { BuildConfig } from '../../../interfaces/BuildConfig/BuildConfig.js';
import { buntstift } from 'buntstift';
import { convertSingleCsv } from './convertSingleCsv.js';
import { ProgressBar } from 'progress-bar-capture';
import { searchForFiles } from '../../misc/searchFiles.js';
import path = require('path');


// eslint-disable-next-line complexity
const importCSV = async ({ config }: {
	config: BuildConfig
}) => {
	buntstift.header('Start import CSV process');

	const  { modules, csv } = config;

	// Skip execution for modules that are not Lexicons
	if(modules.type !== 'Lexicon') throw new Error('Not a Lexicon module');

	// Search base files and store their name in an array if they are lexicons
	const importPath = path.join(process.cwd(), `./${csv.importPath}`);
	buntstift.info('Search for CSV files');
	const csvFiles = await searchForFiles({ extension: csv.extension, filePath: importPath });

	const progressBar = new ProgressBar({ maxNumber: csvFiles.length, prefixText: 'Import CSV' });
	progressBar.start();
	// eslint-disable-next-line no-console
	console.time('CSV Parsing took');

	// Read csv file data
	let index = 0;
	for(const csvFileName of csvFiles) {
		await convertSingleCsv(csvFileName, importPath, config);
		progressBar.update(index);
		index++;
	}

	buntstift.success('Import finished');
	// eslint-disable-next-line no-console
	console.timeEnd('CSV Parsing took');
	progressBar.finish();
};

export { importCSV };

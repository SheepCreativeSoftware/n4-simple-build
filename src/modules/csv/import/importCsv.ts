import * as fs from 'fs/promises';
import { BuildConfig } from '../../../interfaces/BuildConfig/BuildConfig.js';
import { buntstift } from 'buntstift';
import { convertCsvLine } from './convertCsvLine.js';
import { escapeString } from '../../misc/escapeString.js';
import { generateLexiconFileHeader } from './generateLexiconFileHeader.js';
import { getLanguagesFromHeader } from './getLanguagesFromHeader.js';
import iconv from 'iconv-lite';
import { ProgressBar } from 'progress-bar-capture';
import { ReadLinesAsync } from 'readlines-iconv';
import { searchForFiles } from '../../misc/searchFiles.js';
import { writeFile } from '../../misc/copyFiles.js';
import path = require('path');
import { openAppendFileHandle } from './openAppendFileHandle.js';


const startWithThirdRow = 2;
const startAtBegining = 2;
const lexiconFileLineEnding = '\r\n';

// eslint-disable-next-line complexity
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

		const lineHandler = new ReadLinesAsync({ encoding: csv.encoding, minBuffer: 16000 });
		await lineHandler.open(path.join(importPath, csvFileName));

		// First line is Header
		const headerLine = await lineHandler.next();

		// If null then the file must be empty
		if(headerLine === null) continue;
		const headerElements = convertCsvLine({ csv, line: headerLine });
		const languages = getLanguagesFromHeader({ headerElements, lexicon });

		const [fileHandler, filePaths] = await openAppendFileHandle(csvFileName, languages, config);

		let nextLine = null;
		const hasAppended = Array(fileHandler.length);
		do {
			nextLine = await lineHandler.next();
			if(nextLine === '') continue;
			if(nextLine === null) break;
			const rowElements = convertCsvLine({ csv, line: nextLine });

			// First and second row are for key and default langauge
			const key = rowElements[0];

			const fileData = Array(languages.length) as string[];

			// Additional languages are coming after them beginging with third row
			for(let indexRow = startWithThirdRow; indexRow < rowElements.length; indexRow++) {
				// Skip Row Elements if these are empty
				if(rowElements[indexRow] === '') continue;
				const escapedText = escapeString({ text: rowElements[indexRow] });

				// Every row is a item of a single language
				const arrayPosition = indexRow-startAtBegining;
				const text = `${key}=${escapedText}${lexiconFileLineEnding}`;
				fileData[arrayPosition] = text;
			}
			const promiseAppend = [];
			for(let index = 0; index < languages.length; index++) {
				const lexiconData = fileData[index];

				// Don't generate output if only header is present in file
				if(typeof lexiconData === 'undefined' || lexiconData === '') continue;

				const buffer = iconv.encode(lexiconData, lexicon.encoding);
				promiseAppend.push(fileHandler[index].appendFile(buffer));
				hasAppended[index] = true;
			}
			const resultPromiseAppend = await Promise.allSettled(promiseAppend);
			for(const result of resultPromiseAppend) {
				// ..
				if(result.status === 'rejected') buntstift.error(result.reason);
			}
		} while(nextLine !== null);
		for(let index = 0; index < fileHandler.length; index++) {
			const filehandle = fileHandler[index];
			await filehandle.close();
			const filename = languages[index] + '/' + path.basename(filePaths[index]);
			if(hasAppended[index] === true) {
				buntstift.success(`Imported ${filename}`);
			} else {
				buntstift.verbose(`No import for ${filename}`);
				fs.rm(filePaths[index], { force: true });
			}
		}
	}
	buntstift.success('Import finished');
	console.timeEnd('CSV Parsing took');
	progressBar.finish();
};

export { importCSV };

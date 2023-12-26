import * as fs from 'fs/promises';
import { appendNewData } from './appendNewData.js';
import { BuildConfig } from '../../../interfaces/BuildConfig/BuildConfig.js';
import { buntstift } from 'buntstift';
import { constructLexiconLine } from './constructLexiconLine.js';
import { convertCsvLine } from './convertCsvLine.js';
import { getOutputInfo } from './getOutputInfo.js';
import { ReadLinesAsync } from 'readlines-iconv';
import path = require('path');

const zero = 0;

const convertSingleCsv = async (csvFileName: string, importPath: string, config: BuildConfig) => {
	const  { csv, lexicon } = config;
	buntstift.info(`Load file ${csvFileName}`);

	// Open handler to read line by line from csv
	const lineHandler = new ReadLinesAsync({ encoding: csv.encoding, minBuffer: 16000 });
	await lineHandler.open(path.join(importPath, csvFileName));

	// First line is Header
	const headerLine = await lineHandler.next();

	// If null then the file must be empty and can be skipped
	if(headerLine === null) return;
	const headerElements = convertCsvLine({ csv, line: headerLine });
	const outputInfos = await getOutputInfo({ config, csvFileName, headerElements });

	if(outputInfos.length === zero) {
		buntstift.verbose(`No additional language data in ${csvFileName}`);
		await lineHandler.close();
		return;
	}

	// Loop through each line, convert and write the data
	let nextLine = null;
	do {
		nextLine = await lineHandler.next();
		if(nextLine === '') continue;
		if(nextLine === null) break;
		const fileData = constructLexiconLine(nextLine, outputInfos.length, config);

		// Write to all of the resulting files at once
		const promiseAppend = appendNewData(outputInfos, fileData, lexicon.encoding);

		// Check if write was successfull
		const resultPromiseAppend = await Promise.allSettled(promiseAppend);
		for(const result of resultPromiseAppend) {
			// ..
			if(result.status === 'rejected') buntstift.error(result.reason);
		}
	} while(nextLine !== null);

	// End this Csv import by closing handle and notify user
	for(const outputInfo of outputInfos) {
		await outputInfo.fileHandle.close();
		const filename = outputInfo.language + '/' + outputInfo.filename;
		if(outputInfo.hasDataAdded === true) {
			buntstift.success(`Imported ${filename}`);
		} else {
			buntstift.verbose(`No import data for ${filename}`);
			fs.rm(outputInfo.filePath, { force: true });
		}
	}
};

export { convertSingleCsv };

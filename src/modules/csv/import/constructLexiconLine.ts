import { BuildConfig } from '../../../interfaces/BuildConfig/BuildConfig.js';
import { convertCsvLine } from './convertCsvLine.js';
import { escapeString } from '../../misc/escapeString.js';

const startWithThirdRow = 2;
const lexiconFileLineEnding = '\r\n';

const constructLexiconLine = (nextLine: string, outputLength: number, config: BuildConfig ) => {
	const { csv } = config;
	const rowElements = convertCsvLine({ csv, line: nextLine });

	// First and second row are for key and default langauge
	const key = rowElements[0];

	const fileData = [];

	// Additional languages are coming after them beginging with third row
	for(let indexRow = startWithThirdRow; indexRow < rowElements.length; indexRow++) {
		// Skip Row Elements if these are empty
		if(rowElements[indexRow] === '') continue;
		const escapedText = escapeString({ text: rowElements[indexRow] });

		// Every row is a item of a single language
		const text = `${key}=${escapedText}${lexiconFileLineEnding}`;
		fileData.push(text);
	}
	return fileData;
};

export { constructLexiconLine };

import { CsvFileConfig } from '../../../interfaces/BuildConfig/CsvFileConfig.js';
import { escapeCsvChars } from './escapeCsvChars.js';
import { LexiconObject } from '../../../interfaces/Lexicon/LexiconObject.js';

/** Converts a LexiconObject into a CSV output */
const createCsvOutput = function(lexiconObject: LexiconObject, languages: string[], csv: CsvFileConfig) {
	let csvFile = 'key'+csv.delimiter;
	languages.forEach((language) => {
		csvFile += language + csv.delimiter;
	});
	csvFile += '\r\n';
	Object.keys(lexiconObject).forEach((key) => {
		let currentText = '';
		const lexiconKey = lexiconObject[key];
		currentText += key+csv.delimiter;
		languages.forEach((language) => {
			if(typeof lexiconKey[language] === 'undefined') currentText += csv.delimiter;
			if(typeof lexiconKey[language] !== 'undefined') {
				const escapedText = escapeCsvChars({ csv, inputText: lexiconKey[language] });
				currentText += escapedText+csv.delimiter;
			}
		});
		currentText += '\r\n';
		csvFile += currentText;
	});
	return csvFile;
};

export { createCsvOutput };

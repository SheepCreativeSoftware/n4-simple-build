import { CsvFileConfig } from '../../../interfaces/BuildConfig/CsvFileConfig';
import { LexiconObject } from '../../../interfaces/Lexicon/LexiconObject';

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
			if(typeof lexiconKey[language] !== 'undefined') currentText += lexiconKey[language]+csv.delimiter;
		});
		currentText += '\r\n';
		csvFile += currentText;
	});
	return csvFile;
};

export { createCsvOutput };

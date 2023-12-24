import { convertCsvLine } from './convertCsvLine.js';
import { CsvFileConfig } from '../../../interfaces/BuildConfig/CsvFileConfig.js';
import { escapeString } from '../../misc/escapeString.js';
import { getCurrentDateTimeString } from '../../misc/getDate.js';
import { getFileLineEnding } from '../../misc/getFileLineEnding.js';
import { LexiconFileConfig } from '../../../interfaces/BuildConfig/LexiconFileConfig.js';
import { LexiconModuleConfig } from '../../../interfaces/BuildConfig/LexiconModuleConfig.js';

const startWithThirdRow = 2;
const startAfterHeader = 1;
const startAtBegining = 2;
const nextBuild = 1;
const lexiconFileLineEnding = '\r\n';


/** Evaluates Additional languages inside the CSV file */
const getLanguagesFromHeader = ({ headerElements, lexicon }: {
	/** Elements from CSV Header */
	headerElements: string[],

	/** Lexicon file specific config */
	lexicon: LexiconFileConfig,
}): string[] => {
	const languages = [];
	for(const headerElement of headerElements) {
		// Must be a additional language code if not empty, not "key" and not the default langauge
		if(headerElement !== '' && headerElement !== 'key' && headerElement !== lexicon.defaultLang) languages.push(headerElement);
	}
	return languages;
};

const generateLexiconFileHeader = ({ modules }: {
	/** Module specific config */
	modules: LexiconModuleConfig
}) => {
	let fileHeader = `# ${modules.name} ${modules.version}.${modules.buildVersion+nextBuild}${lexiconFileLineEnding}`;
	fileHeader += `# Date: ${getCurrentDateTimeString()}${lexiconFileLineEnding}`;
	return fileHeader;
};

/** Converts the CSV data into separate data sets for each language */
const convertCsvData = function({ csvFile, lexicon, csv, modules }: {
	/** File data from csv file */
	csvFile: string,

	/** Lexicon file specific config */
	lexicon: LexiconFileConfig,

	/** CSV file specific config */
	csv: CsvFileConfig,

	/** Module specific config */
	modules: LexiconModuleConfig
}): [

	/** Found languages */
	languages: string[],

	/** Lexicon converted Data for each language */
	fileData: string[],

	/** Header of the file */
	header: string[],
] {
	const lineEnding = getFileLineEnding({ fileData: csvFile });

	// Split into single lines
	const lines = csvFile.split(lineEnding);

	// First line of CSV are header elements
	const headerElements = convertCsvLine({ csv, line: lines[0] });

	const languages = getLanguagesFromHeader({ headerElements, lexicon });

	// Create header for each language file
	const fileData = [];
	const header = [];
	for(let index = 0; index < languages.length; index++) {
		const generatedHeader = generateLexiconFileHeader({ modules });
		fileData.push(generatedHeader);
		header.push(generatedHeader);
	}

	for(let indexLines = startAfterHeader; indexLines < lines.length; indexLines++) {
		const line = lines[indexLines];
		if(line === '') continue;

		const rowElements = convertCsvLine({ csv, line });

		// First and second row are for key and default langauge
		const key = rowElements[0];

		// Additional languages are coming after them beginging with third row
		for(let indexRow = startWithThirdRow; indexRow < rowElements.length; indexRow++) {
			// Skip Row Elements if these are empty
			if(rowElements[indexRow] === '') continue;
			const escapedText = escapeString({ text: rowElements[indexRow] });

			// Every row is a item of a single language
			const arrayPosition = indexRow-startAtBegining;
			const text = `${key}=${escapedText}${lexiconFileLineEnding}`;
			fileData[arrayPosition] += text;
		}
	}
	return [
		languages,
		fileData,
		header,
	];
};

export { convertCsvData, generateLexiconFileHeader };

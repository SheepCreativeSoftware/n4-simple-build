import { CsvFileConfig } from '../../../interfaces/BuildConfig/CsvFileConfig.js';

const charAfter = 1;
const noIndexFound = -1;

/** Parses a line of CSV */
const parseCsvLine = ({ csv, line }: {
	csv: CsvFileConfig,
	line: string,
}) => {
	const result = [];
	let startPosition = 0;
	let hasEscape = false;
	for(let index = 0; index < line.length; index++) {
		const currentChar = line[index];
		if(startPosition === index && currentChar === csv.escapeCharacter) {
			hasEscape = true;
			continue;
		}

		if(!hasEscape) {
			// If line does not have escape then we can simply search for the next delimiter
			let currentPosition = line.indexOf(csv.delimiter, startPosition);

			// If line does not end with delimiter the position will result with -1, but it is end of line
			if(currentPosition === noIndexFound) currentPosition = line.length;
			const endPosition = currentPosition;
			result.push(line.substring(startPosition, endPosition));
			startPosition = currentPosition + charAfter;
			index = currentPosition;
			continue;
		}

		/*
		 * If we have escape we need to search for escape followed by delimiter, but when escape is used these chars could appear as normal text.
		 * And escape can also be used as normal text and is therfore duplicated
		 * We can simply check that by checking for duplicate escapes.
		 * All escape signs are doubled except for the first and the last sign and after the last there comes the escape
		 */
		const nextChar = line[index+charAfter];
		if(currentChar === csv.escapeCharacter && nextChar === csv.escapeCharacter) {
			// Just text - ignore it by jumping further
			index++;
			continue;
		}

		if(currentChar === csv.escapeCharacter && nextChar === csv.delimiter) {
			// Found the end!
			const endPosition = index;

			// We need to correct the position to cut the escape character
			const substring = line.substring(startPosition+charAfter, endPosition);

			// Remove duplicate quotes/escapes
			const withoutDuplicates = substring.replaceAll(csv.escapeCharacter+csv.escapeCharacter, csv.escapeCharacter);

			result.push(withoutDuplicates);
			startPosition = endPosition + charAfter + charAfter;
			index += charAfter;
			hasEscape = false;
			continue;
		}
	}
	return result;
};

const lastElement = -1;

/**
 * Converts a line of CSV into a usefull array of content
 * CSV can contain it's own delimiters as character but then the whole string will be wrapped in the escape character
 * Same happens if the escape character is included, but then the original escape character is used doubled.
 */
const convertCsvLine = ({ csv, line }: {
	csv: CsvFileConfig,
	line: string,
}) => {
	// Cannot parse if format does not match
	if(!line.includes(csv.delimiter)) throw new Error('Wrong file format: Missing delimiter');

	// Delimiters need to be escaped if you want to use them as plain text - So, if not... Save some performance
	if(!line.includes(csv.escapeCharacter)) {
		const splittedResult = line.split(csv.delimiter);

		// The line ends with delimiter which results in an unnessecary empty string
		if(splittedResult.at(lastElement) === '') splittedResult.pop();
		return splittedResult;
	}

	// Otherwise parse deeply
	return parseCsvLine({ csv, line });
};

export { convertCsvLine };

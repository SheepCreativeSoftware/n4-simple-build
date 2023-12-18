import { CsvFileConfig } from '../../../interfaces/BuildConfig/CsvFileConfig.js';

const firstChar = 1;
const lastChar = -1;
const nextArrayElement = 1;


/**
 * Converts a line of CSV into a usefull array of content
 * CSV can contain it's own delimiters as character but then the whole string will be wrapped in the escape character
 * Same happens if the escape character is included, but then the original escape character is used doubled.
 */
const convertCsvLine = ({ csv, line }: {
	csv: CsvFileConfig,
	line: string,
}) => {
	// Remove double double quotes by single double quotes
	const convertedQuotes = line.replaceAll(csv.escapeCharacter+csv.escapeCharacter, csv.escapeCharacter);
	const splittedLine = convertedQuotes.split(csv.delimiter);

	// Creates a new array which corrects some specific lines
	// eslint-disable-next-line consistent-return
	const reconstructedLines = splittedLine.map((element, index, array): string => {
		// eslint-disable-next-line no-undefined
		if(!element.startsWith(csv.escapeCharacter) && element.endsWith(csv.escapeCharacter)) return '';

		// If element is not special, then do nothing
		if(!element.startsWith(csv.escapeCharacter) && !element.endsWith(csv.escapeCharacter)) return element;

		// If it starts and end with then just remove escape at start and end
		if(element.startsWith(csv.escapeCharacter) && element.endsWith(csv.escapeCharacter)) return element.slice(firstChar, lastChar);

		// If only starts with escape then then the next element or elements are also part of the text
		if(element.startsWith(csv.escapeCharacter)) {
			let newText = element;
			for(let index2 = index+nextArrayElement; index2 < array.length; index2++) {
				const nextElement = array[index2];
				newText += csv.delimiter + nextElement;
				if(nextElement.endsWith(csv.escapeCharacter)) break;
			}
			return newText.slice(firstChar, lastChar);
		}

		// If nothing matches the array value will be empty
		return '';
	});

	// Get rid of undefined holes
	const onlyDefinedContent = reconstructedLines.filter((element) => element !== '') as string[];
	return onlyDefinedContent;
};

export { convertCsvLine };

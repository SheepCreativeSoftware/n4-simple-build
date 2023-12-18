import { CsvFileConfig } from '../../../interfaces/BuildConfig/CsvFileConfig.js';

const escapeCsvChars = ({ inputText, csv }: {
	inputText: string, csv: CsvFileConfig,
}) => {
	const escapeCharacter = csv.escapeCharacter;
	const delimiter = csv.delimiter;

	let outputText = inputText;

	/*
	 * Complete line must be double quoted if it includes an Escape character to be valid text in csv
	 * If it also contains quotes then they must be doubled
	 */
	if(inputText.includes(delimiter) && inputText.includes(escapeCharacter)) {
		outputText = inputText.replaceAll(escapeCharacter, escapeCharacter+escapeCharacter);
		return `"${outputText}"`;
	}

	// If it only includes a delimiter the line just need to be quoted
	if(inputText.includes(delimiter)) return `"${outputText}"`;

	// If escape character is included it must be escaped and the line just need to be quoted
	if(inputText.includes(escapeCharacter)) {
		outputText = inputText.replaceAll(escapeCharacter, escapeCharacter+escapeCharacter);
		return `"${outputText}"`;
	}
	return outputText;
};

export { escapeCsvChars };

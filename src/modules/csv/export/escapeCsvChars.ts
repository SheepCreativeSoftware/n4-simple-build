import { CsvFileConfig } from '../../../interfaces/BuildConfig/CsvFileConfig.js';

const escapeCsvChars = ({ inputText, csv }: {
	inputText: string, csv: CsvFileConfig,
}) => {
	const escapeCharacter = csv.escapeCharacter;
	const delimiter = csv.delimiter;

	// Escape character must be doubled to be valid text in csv
	let outputText = inputText.replaceAll(escapeCharacter, escapeCharacter+escapeCharacter);

	// Delimiter as text must be escaped inside of CSV
	outputText = outputText.replaceAll(delimiter, escapeCharacter+delimiter+escapeCharacter);
	return outputText;
};

export { escapeCsvChars };

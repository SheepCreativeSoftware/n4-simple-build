import { CsvFileConfig } from '../../../interfaces/BuildConfig/CsvFileConfig.js';

const unescapeCsvChars = ({ inputText, csv }: {
	inputText: string, csv: CsvFileConfig,
}) => {
	const escapeCharacter = csv.escapeCharacter;
	const delimiter = csv.delimiter;

	// Delimiter as text must be unescaped from CSV
	let outputText = inputText.replaceAll(escapeCharacter+delimiter+escapeCharacter, delimiter);

	// Escape character is doubled to be valid text in csv
	outputText = outputText.replaceAll(escapeCharacter+escapeCharacter, escapeCharacter);

	return outputText;
};

export { unescapeCsvChars };

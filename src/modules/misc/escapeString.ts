import { charToUnicodePoint } from './characterConversion';

const backSlash = '\\';

/**
 * Escapes a string with '\uXXXX'-Escapes
 * @returns Escaped string
 */
const escapeString = function({ text }: {
	/** Text to be escaped */
	text: string,
}): string {
	let escapedText = text;

	// Get all special characters from the string (That are not ASCII)
	// eslint-disable-next-line no-control-regex
	const allSpecialCharacters = escapedText.replace(/[\u0000-\u007F]/g, '');

	// Remove duplicates in the list by making a Set
	const uniqueChars = new Set(allSpecialCharacters);

	// Eliminate escape character (backslash) first as the convertion will create backslashes
	if(uniqueChars.has(backSlash)) {
		const unicodePointForBackSlash = charToUnicodePoint({ character: backSlash });
		escapedText = escapedText.replaceAll(backSlash, unicodePointForBackSlash);
		uniqueChars.delete(backSlash);
	}

	// Then escape all special characters
	uniqueChars.forEach((character) => {
		const unicodePoint = charToUnicodePoint({ character });
		escapedText = escapedText.replaceAll(character, unicodePoint);
	});
	return escapedText;
};

export { escapeString };

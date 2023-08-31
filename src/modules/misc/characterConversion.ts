
const charOffset = 0;
const toHex = 16;
const firstCharacter = 0;
const lastCharacter = 4;

/** Converts a single character to a unicode point formated string */
const charToUnicodePoint = function({ character }: {
	character: string,
}): string {
	// Get unicode character code in hex
	const hex = character.charCodeAt(charOffset).toString(toHex);

	// Return it in the \uXXXX format
	return '\\u' + '0000'.substring(firstCharacter, lastCharacter - hex.length) + hex;
};

export { charToUnicodePoint };


/**
 * Unescapes a string with '\uXXXX'-Escapes
 * @returns Unescaped string
 */
const unescapeString = function({ text }: {
	/** Text to be unescaped */
	text: string
}): string {
	// Unescape convert %uXXXX strings and therefore \uXXXX must be converted first
	const convertedForUnescape = text.replace(/\\u/g, '%u');
	return unescape(convertedForUnescape);
};

export { unescapeString };

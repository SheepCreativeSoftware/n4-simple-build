/**
 * Unescapes a string with '\uXXXX'-Escapes
 * @returns Unescaped string
 */
const unescapeString = function ({ text }) {
    // Unescape convert %uXXXX strings and therefore \uXXXX must be converted first
    const convertedForUnescape = text.replace(/\\u/g, '%u');
    return unescape(convertedForUnescape);
};
export { unescapeString };

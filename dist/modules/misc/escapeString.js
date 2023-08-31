"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escapeString = void 0;
const characterConversion_1 = require("./characterConversion");
const backSlash = '\\';
/**
 * Escapes a string with '\uXXXX'-Escapes
 * @returns Escaped string
 */
const escapeString = function ({ text }) {
    let escapedText = text;
    // Get all special characters from the string (That are not ASCII)
    // eslint-disable-next-line no-control-regex
    const allSpecialCharacters = escapedText.replace(/[\u0000-\u007F]/g, '');
    // Remove duplicates in the list by making a Set
    const uniqueChars = new Set(allSpecialCharacters);
    // Eliminate escape character (backslash) first as the convertion will create backslashes
    if (uniqueChars.has(backSlash)) {
        const unicodePointForBackSlash = (0, characterConversion_1.charToUnicodePoint)({ character: backSlash });
        escapedText = escapedText.replaceAll(backSlash, unicodePointForBackSlash);
        uniqueChars.delete(backSlash);
    }
    // Then escape all special characters
    uniqueChars.forEach((character) => {
        const unicodePoint = (0, characterConversion_1.charToUnicodePoint)({ character });
        escapedText = escapedText.replaceAll(character, unicodePoint);
    });
    return escapedText;
};
exports.escapeString = escapeString;

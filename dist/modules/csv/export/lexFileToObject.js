"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lexFileToObject = void 0;
const unescapeString_1 = require("../../misc/unescapeString");
const firstCharacter = 0;
const afterDelimiter = 1;
const lexFileToObject = function ({ lexiconObject, lexFile, language }) {
    let lineEnding = '\r\n';
    if (!lexFile.includes('\r\n'))
        lineEnding = '\n';
    const lines = lexFile.split(lineEnding);
    lines.forEach((line) => {
        // Skip line if it is a comment
        if (line.startsWith('#'))
            return;
        // Remove additional spaces on equation (sometimes they exist)
        const correctedLine = line.replace(' = ', '=');
        const delimiterPosition = correctedLine.search('=');
        const key = correctedLine.substring(firstCharacter, delimiterPosition);
        const keyWithoutSpaces = key.replaceAll(' ', '').replaceAll('\t', '');
        const text = correctedLine.substring(delimiterPosition + afterDelimiter, correctedLine.length);
        const decodedText = (0, unescapeString_1.unescapeString)({ text });
        if (keyWithoutSpaces === '')
            return;
        if (typeof lexiconObject[keyWithoutSpaces] === 'undefined')
            lexiconObject[keyWithoutSpaces] = { [language]: '' };
        lexiconObject[keyWithoutSpaces][language] = decodedText;
    });
};
exports.lexFileToObject = lexFileToObject;

import { LexiconObject } from '../../../interfaces/Lexicon/LexiconObject.js';
import { unescapeString } from '../../misc/unescapeString.js';

const firstCharacter = 0;
const afterDelimiter = 1;

/** Converts lexicon file into object or append to an object */
const lexFileToObject = function({ lexiconObject, lexFile, language }: {
	lexiconObject: LexiconObject, lexFile: string, language: string
}) {
	let lineEnding = '\r\n';
	if(!lexFile.includes('\r\n')) lineEnding = '\n';
	const lines = lexFile.split(lineEnding);
	lines.forEach((line) => {
		// Skip line if it is a comment
		if(line.startsWith('#')) return;

		// Remove additional spaces on equation (sometimes they exist)
		const correctedLine = line.replace(' = ', '=');
		const delimiterPosition = correctedLine.search('=');
		const key = correctedLine.substring(firstCharacter, delimiterPosition);
		const keyWithoutSpaces = key.replaceAll(' ', '').replaceAll('\t', '');
		const text = correctedLine.substring(delimiterPosition+afterDelimiter, correctedLine.length);
		const decodedText = unescapeString({ text });
		if(keyWithoutSpaces === '') return;
		if(typeof lexiconObject[keyWithoutSpaces] === 'undefined') lexiconObject[keyWithoutSpaces] = { [language]: '' };
		lexiconObject[keyWithoutSpaces][language] = decodedText;
	});
};

export { lexFileToObject };

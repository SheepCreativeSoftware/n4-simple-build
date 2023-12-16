import { LexiconObject } from '../../../interfaces/Lexicon/LexiconObject.js';
/** Converts lexicon file into object or append to an object */
declare const lexFileToObject: ({ lexiconObject, lexFile, language }: {
    lexiconObject: LexiconObject;
    lexFile: string;
    language: string;
}) => void;
export { lexFileToObject };

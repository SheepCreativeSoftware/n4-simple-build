import { CsvFileConfig } from '../../../interfaces/BuildConfig/CsvFileConfig.js';
import { LexiconObject } from '../../../interfaces/Lexicon/LexiconObject.js';
declare const createCsvOutput: (lexiconObject: LexiconObject, languages: string[], csv: CsvFileConfig) => string;
export { createCsvOutput };

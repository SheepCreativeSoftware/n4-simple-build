import { CsvFileConfig } from '../../interfaces/BuildConfig/CsvFileConfig';
import { LexiconObject } from '../../interfaces/Lexicon/LexiconObject';
declare const createCsvOutput: (lexiconObject: LexiconObject, languages: string[], csv: CsvFileConfig) => string;
export { createCsvOutput };

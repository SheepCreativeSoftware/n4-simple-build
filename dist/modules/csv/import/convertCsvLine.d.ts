import { CsvFileConfig } from '../../../interfaces/BuildConfig/CsvFileConfig.js';
/**
 * Converts a line of CSV into a usefull array of content
 * CSV can contain it's own delimiters as character but then the whole string will be wrapped in the escape character
 * Same happens if the escape character is included, but then the original escape character is used doubled.
 */
declare const convertCsvLine: ({ csv, line }: {
    csv: CsvFileConfig;
    line: string;
}) => string[];
export { convertCsvLine };

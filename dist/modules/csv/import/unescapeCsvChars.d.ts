import { CsvFileConfig } from '../../../interfaces/BuildConfig/CsvFileConfig.js';
declare const unescapeCsvChars: ({ inputText, csv }: {
    inputText: string;
    csv: CsvFileConfig;
}) => string;
export { unescapeCsvChars };

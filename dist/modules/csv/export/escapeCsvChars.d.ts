import { CsvFileConfig } from '../../../interfaces/BuildConfig/CsvFileConfig.js';
declare const escapeCsvChars: ({ inputText, csv }: {
    inputText: string;
    csv: CsvFileConfig;
}) => string;
export { escapeCsvChars };

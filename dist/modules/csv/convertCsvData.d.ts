import { CsvFileConfig } from '../../interfaces/BuildConfig/CsvFileConfig';
import { LexiconFileConfig } from '../../interfaces/BuildConfig/LexiconFileConfig';
import { LexiconModuleConfig } from '../../interfaces/BuildConfig/LexiconModuleConfig';
/** Converts the CSV data into separate data sets for each language */
declare const convertCsvData: ({ csvFile, lexicon, csv, modules }: {
    /** File data from csv file */
    csvFile: string;
    /** Lexicon file specific config */
    lexicon: LexiconFileConfig;
    /** CSV file specific config */
    csv: CsvFileConfig;
    /** Module specific config */
    modules: LexiconModuleConfig;
}) => [languages: string[], fileData: string[]];
export { convertCsvData };

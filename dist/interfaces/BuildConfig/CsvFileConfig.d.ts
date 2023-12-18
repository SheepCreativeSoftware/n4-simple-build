import { FileConfig } from './FileConfig.js';
interface CsvFileConfig extends FileConfig {
    extension: 'csv';
    delimiter: string;
    importPath: string;
    exportPath: string;
    escapeCharacter: string;
}
export { CsvFileConfig };

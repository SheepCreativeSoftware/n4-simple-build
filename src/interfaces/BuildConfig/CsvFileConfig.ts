import { FileConfig } from './FileConfig';

interface CsvFileConfig extends FileConfig {
	extension: 'csv',
	delimiter: string,
	importPath: string,
	exportPath: string,
}

export { CsvFileConfig };

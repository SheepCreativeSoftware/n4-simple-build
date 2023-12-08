/**
 * @author Marina Egner <marinafcegner@sheepcs.de>
 * @copyright Copyright © 2023 Marina Egner
 * @module n4-simple-build
 */

import { buntstift } from 'buntstift';
import { exportCSV } from './modules/csv/export/exportCSV';
import { getExistingConfig } from './modules/config/storeConfig';
import { getHelp } from './modules/cli/getHelp';
import { importCSV } from './modules/csv/import/importCsv';
import { initProject } from './modules/init/initProject';
import { listConfig } from './modules/config/listConfig';
import { readWriteConfig } from './modules/config/readWriteConfig';

const runBuild = ({ minify }: {
	minify: boolean,
}): void => {
	// ...
	buntstift.verbose('Run Build');
	buntstift.verbose(`Option minify ${minify}`);
};

const extractLexiconFiles = ({ searchPath }: {
	searchPath: string,
}): void => {
	// ...
	buntstift.verbose('Extract Lexicon files');
	buntstift.verbose(`searchPath ${searchPath}`);
};

const lexiconCsvExport = async (): Promise<void> => {
	const config = await getExistingConfig();
	await exportCSV({ config });
};

const lexiconCsvImport = async (): Promise<void> => {
	const config = await getExistingConfig();
	await importCSV({ config });
};

export {
	extractLexiconFiles,
	initProject,
	lexiconCsvExport,
	lexiconCsvImport,
	getHelp,
	runBuild,
	listConfig,
	readWriteConfig,
};

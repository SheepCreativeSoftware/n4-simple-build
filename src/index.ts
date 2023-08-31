/**
 * @author Marina Egner <marinafcegner@sheepcs.de>
 * @copyright Copyright © 2023 Marina Egner
 * @module n4-simple-build
 */

import { buntstift } from 'buntstift';
import { getExistingConfig } from './modules/config/storeConfig';
import { getHelp } from './modules/cli/getHelp';
import { importCSV } from './modules/csv/importCsv';
import { initProject } from './modules/init/initProject';

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
	// ...
	const config = await getExistingConfig();
	await importCSV({ config });
};

const lexiconCsvImport = (): void => {
	// ...
	buntstift.verbose('Lexicon CSV Import');
};

export {
	extractLexiconFiles,
	initProject,
	lexiconCsvExport,
	lexiconCsvImport,
	getHelp,
	runBuild,
};

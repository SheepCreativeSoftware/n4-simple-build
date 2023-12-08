/**
 * @author Marina Egner <marinafcegner@sheepcs.de>
 * @copyright Copyright © 2023 Marina Egner
 * @module n4-simple-build
 */

import { getExistingConfig, writeBuildConfig } from './modules/config/storeConfig.js';
import { buntstift } from 'buntstift';
import { execBuild } from './modules/build/execBuild.js';
import { exportCSV } from './modules/csv/export/exportCSV.js';
import { getHelp } from './modules/cli/getHelp.js';
import { importCSV } from './modules/csv/import/importCsv.js';
import { initProject } from './modules/init/initProject.js';
import { listConfig } from './modules/config/listConfig.js';
import { readWriteConfig } from './modules/config/readWriteConfig.js';

const runBuild = async ({ noMinify, noPackage }: {
	noMinify?: boolean,
	noPackage?: boolean,
}): Promise<void> => {
	const config = await getExistingConfig();
	const newConfig = await execBuild({ config, noMinify, noPackage });
	await writeBuildConfig({ config: newConfig });
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

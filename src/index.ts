/**
 * @author Marina Egner <marinafcegner@sheepcs.de>
 * @copyright Copyright © 2023 Marina Egner
 * @module n4-simple-build
 */

import { getExistingConfig, writeBuildConfig } from './modules/config/storeConfig.js';
import { buntstift } from 'buntstift';
import { execBuild } from './modules/build/execBuild.js';
import { exportCSV } from './modules/csv/export/exportCSV.js';
import { extractLexiconFiles } from './modules/extract/extractLexiconFiles.js';
import { getAppVersion } from './modules/misc/getAppVersion.js';
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

const lexiconCsvExport = async (): Promise<void> => {
	const config = await getExistingConfig();
	if(config.modules.type !== 'Lexicon') {
		buntstift.error('Not a Lexicon module');
		return;
	}
	await exportCSV({ config });
};

const lexiconCsvImport = async (): Promise<void> => {
	const config = await getExistingConfig();
	if(config.modules.type !== 'Lexicon') {
		buntstift.error('Not a Lexicon module');
		return;
	}
	await importCSV({ config });
};

export {
	extractLexiconFiles,
	getAppVersion,
	getHelp,
	initProject,
	lexiconCsvExport,
	lexiconCsvImport,
	listConfig,
	readWriteConfig,
	runBuild,
};

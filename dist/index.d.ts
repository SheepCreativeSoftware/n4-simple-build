/**
 * @author Marina Egner <marinafcegner@sheepcs.de>
 * @copyright Copyright © 2023 Marina Egner
 * @module n4-simple-build
 */
import { extractLexiconFiles } from './modules/extract/extractLexiconFiles.js';
import { getAppVersion } from './modules/misc/getAppVersion.js';
import { getHelp } from './modules/cli/getHelp.js';
import { initProject } from './modules/init/initProject.js';
import { listConfig } from './modules/config/listConfig.js';
import { readWriteConfig } from './modules/config/readWriteConfig.js';
declare const runBuild: ({ noMinify, noPackage }: {
    noMinify?: boolean | undefined;
    noPackage?: boolean | undefined;
}) => Promise<void>;
declare const lexiconCsvExport: () => Promise<void>;
declare const lexiconCsvImport: () => Promise<void>;
export { extractLexiconFiles, getAppVersion, getHelp, initProject, lexiconCsvExport, lexiconCsvImport, listConfig, readWriteConfig, runBuild, };

/**
 * @author Marina Egner <marinafcegner@sheepcs.de>
 * @copyright Copyright © 2023 Marina Egner
 * @module n4-simple-build
 */
import { getHelp } from './modules/cli/getHelp';
import { initProject } from './modules/init/initProject';
import { listConfig } from './modules/config/listConfig';
declare const runBuild: ({ minify }: {
    minify: boolean;
}) => void;
declare const extractLexiconFiles: ({ searchPath }: {
    searchPath: string;
}) => void;
declare const lexiconCsvExport: () => Promise<void>;
declare const lexiconCsvImport: () => void;
export { extractLexiconFiles, initProject, lexiconCsvExport, lexiconCsvImport, getHelp, runBuild, listConfig, };

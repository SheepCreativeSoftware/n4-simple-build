/**
 * @author Marina Egner <marinafcegner@sheepcs.de>
 * @copyright Copyright © 2023 Marina Egner
 * @module n4-simple-build
 */
import { getHelp } from './modules/cli/getHelp';
declare const initProject: () => void;
declare const runBuild: ({ minify }: {
    minify: boolean;
}) => void;
declare const extractLexiconFiles: ({ searchPath }: {
    searchPath: string;
}) => void;
declare const lexiconCsvExport: () => void;
declare const lexiconCsvImport: () => void;
export { extractLexiconFiles, initProject, lexiconCsvExport, lexiconCsvImport, getHelp, runBuild, };

/**
 * @author Marina Egner <marinafcegner@sheepcs.de>
 * @copyright Copyright © 2023 Marina Egner
 * @module n4-simple-build
 */
declare const getHelp: () => void;
declare const initProject: () => void;
declare const runBuild: () => void;
declare const extractLexiconFiles: ({ searchPath }: {
    searchPath: string;
}) => void;
declare const lexiconCsvExport: () => void;
declare const lexiconCsvImport: () => void;
export { extractLexiconFiles, initProject, lexiconCsvExport, lexiconCsvImport, getHelp, runBuild, };

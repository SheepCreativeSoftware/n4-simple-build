/**
 * @author Marina Egner <marinafcegner@sheepcs.de>
 * @copyright Copyright © 2023 Marina Egner
 * @module n4-simple-build
 */

import { buntstift } from 'buntstift';

const getHelp = (): void => {
	// ...
	buntstift.verbose('Get Help');
};

const initProject = (): void => {
	// ...
	buntstift.verbose('Init Project');
};

const runBuild = (): void => {
	// ...
	buntstift.verbose('Run Build');
};

const extractLexiconFiles = ({ searchPath }: {
	searchPath: string,
}): void => {
	// ...
	buntstift.verbose('Extract Lexicon files');
	buntstift.verbose(`searchPath ${searchPath}`);
};

const lexiconCsvExport = (): void => {
	// ...
	buntstift.verbose('Lexicon CSV Export');
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

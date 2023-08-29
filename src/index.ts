/**
 * @author Marina Egner <marinafcegner@sheepcs.de>
 * @copyright Copyright © 2023 Marina Egner
 * @module n4-simple-build
 */

import { buntstift } from 'buntstift';
import { getHelp } from './modules/cli/getHelp';
import { initCliPromt } from './modules/init/initCliPromt';

const initProject = (): void => {
	// ...
	buntstift.verbose('Init Project');
	initCliPromt();
};

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

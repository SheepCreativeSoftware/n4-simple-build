#!/usr/bin/env node
/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/no-var-requires */

import {
	extractLexiconFiles, getAppVersion, getHelp, initProject, lexiconCsvExport, lexiconCsvImport, readWriteConfig, runBuild,
} from '../dist/index.js';
import { buntstift } from 'buntstift';
import commandLineArgs from 'command-line-args';

buntstift.configure(buntstift.getConfiguration().
	withVerboseMode(true));

const cli = async ()=> {
	/* First - parse the main command */
	const mainDefinitions = [{ defaultOption: true, name: 'command' }];
	const mainOptions = commandLineArgs(mainDefinitions, { stopAtFirstUnknown: true });

	// Underscore is defined by the lib
	// eslint-disable-next-line no-underscore-dangle
	const argv = mainOptions._unknown || [];

	// eslint-disable-next-line no-underscore-dangle
	if(argv.includes('--help')) return getHelp();

	// eslint-disable-next-line no-underscore-dangle
	if(argv.includes('--version')) return buntstift.info(await getAppVersion());

	if(mainOptions.command === 'init') return initProject();

	if(mainOptions.command === 'config-set') {
		/* Second - parse the command options */
		const setDefinitions = [{ alias: 'v', name: 'version', type: Boolean }];
		const setOptions = commandLineArgs(setDefinitions, { argv });

		const maxSetOptions = 1;
		if(Object.keys(setOptions).length > maxSetOptions) return buntstift.error(`To many options selected: ${JSON.stringify(argv)}`);
		if(setOptions.version) return readWriteConfig('SET', { version: setOptions.version });
		buntstift.error(`Option unknown or missing: ${JSON.stringify(argv)}`);
		return buntstift.info('Use "n4-simple-build --help" for usage information');
	}

	if(mainOptions.command === 'config-add') {
		/* Second - parse the command options */
		const addDefinitions = [{ alias: 'd', name: 'dependency', type: Boolean }];
		const addOptions = commandLineArgs(addDefinitions, { argv });

		const maxAddOptions = 1;
		if(Object.keys(addOptions).length > maxAddOptions) return buntstift.error(`To many options selected: ${JSON.stringify(argv)}`);
		if(addOptions.dependency) return readWriteConfig('ADD', { dependency: addOptions.dependency });
		buntstift.error(`Option unknown or missing: ${JSON.stringify(argv)}`);
		return buntstift.info('Use "n4-simple-build --help" for usage information');
	}

	if(mainOptions.command === 'config-rm') {
		/* Second - parse the command options */
		const rmDefinitions = [{ alias: 'd', name: 'dependency', type: Boolean }];
		const rmOptions = commandLineArgs(rmDefinitions, { argv });

		const maxRmOptions = 1;
		if(Object.keys(rmOptions).length > maxRmOptions) return buntstift.error(`To many options selected: ${JSON.stringify(argv)}`);
		if(rmOptions.dependency) return readWriteConfig('RM', { dependency: rmOptions.dependency });
		buntstift.error(`Option unknown or missing: ${JSON.stringify(argv)}`);
		return buntstift.info('Use "n4-simple-build --help" for usage information');
	}

	if(mainOptions.command === 'config-ls') {
		/* Second - parse the command options */
		const lsDefinitions = [{ alias: 'd', name: 'dependency', type: Boolean }];
		const lsOptions = commandLineArgs(lsDefinitions, { argv });

		const maxLsOptions = 1;
		if(Object.keys(lsOptions).length > maxLsOptions) return buntstift.error(`To many options selected: ${JSON.stringify(argv)}`);
		if(lsOptions.dependency) return readWriteConfig('LIST', { dependency: lsOptions.dependency });
		buntstift.error(`Option unknown or missing: ${JSON.stringify(argv)}`);
		return buntstift.info('Use "n4-simple-build --help" for usage information');
	}

	if(mainOptions.command === 'build') {
		/* Second - parse the command options */
		const buildDefinitions = [
			{ alias: 'm', name: 'no-minify', type: Boolean },
			{ alias: 'p', name: 'no-package', type: Boolean },
		];
		const buildOptions = commandLineArgs(buildDefinitions, { argv });
		return runBuild({ noMinify: buildOptions['no-minify'] === true, noPackage: buildOptions['no-package'] === true });
	}

	if(mainOptions.command === 'lexicon') {
		/* Second - parse the command options */
		const lexiconDefinitions = [
			{ alias: 'b', name: 'extract-base-files', type: String },
			{ alias: 'e', name: 'csv-export', type: Boolean },
			{ alias: 'i', name: 'csv-import', type: Boolean },
		];
		const lexiconOptions = commandLineArgs(lexiconDefinitions, { argv });

		const maxLexiconOptions = 1;
		if(Object.keys(lexiconOptions).length > maxLexiconOptions) return buntstift.error(`To many options selected: ${JSON.stringify(argv)}`);
		if(lexiconOptions['extract-base-files']) return extractLexiconFiles({ searchPath: lexiconOptions['extract-base-files'] });
		if(lexiconOptions['csv-export']) return lexiconCsvExport();
		if(lexiconOptions['csv-import']) return lexiconCsvImport();

		buntstift.error(`Option unknown or missing: ${JSON.stringify(argv)}`);
		return buntstift.info('Use "n4-simple-build --help" for usage information');
	}

	buntstift.error(`Command unknown or missing: ${JSON.stringify(mainOptions)}`);
	return buntstift.info('Use "n4-simple-build --help" for usage information');
};

cli();

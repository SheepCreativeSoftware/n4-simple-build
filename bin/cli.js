/* eslint-disable @typescript-eslint/no-var-requires */

const { buntstift } = require('buntstift');
const n4SimpleBuild = require('../dist/index.js');

buntstift.configure(buntstift.getConfiguration().
	withVerboseMode(true));

const commandLineArgs = require('command-line-args');

/* First - parse the main command */
const mainDefinitions = [{ defaultOption: true, name: 'command' }];
const mainOptions = commandLineArgs(mainDefinitions, { stopAtFirstUnknown: true });

// Underscore is defined by the lib
// eslint-disable-next-line no-underscore-dangle
const argv = mainOptions._unknown || [];

// eslint-disable-next-line no-underscore-dangle
if(argv.includes('--help')) return n4SimpleBuild.getHelp();

if(mainOptions.command === 'init') return n4SimpleBuild.initProject();

if(mainOptions.command === 'build') {
	/* Second - parse the command options */
	const buildDefinitions = [{ alias: 'm', name: 'no-minify', type: Boolean }];
	const buildOptions = commandLineArgs(buildDefinitions, { argv });
	return n4SimpleBuild.runBuild({ minify: buildOptions['no-minify'] === true });
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
	if(lexiconOptions['extract-base-files']) return n4SimpleBuild.extractLexiconFiles({ searchPath: lexiconOptions['extract-base-files'] });
	if(lexiconOptions['csv-export']) return n4SimpleBuild.lexiconCsvExport();
	if(lexiconOptions['csv-import']) return n4SimpleBuild.lexiconCsvImport();

	buntstift.error(`Option unknown or missing: ${JSON.stringify(argv)}`);
	return buntstift.info('Use "n4-simple-build --help" for usage information');
}

buntstift.error(`Command unknown or missing: ${JSON.stringify(mainOptions)}`);
return buntstift.info('Use "n4-simple-build --help" for usage information');

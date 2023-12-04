/**
 * @author Marina Egner <marinafcegner@sheepcs.de>
 * @copyright Copyright © 2023 Marina Egner
 * @description Shows a usage guide for cli commands
 */

import { buntstift } from 'buntstift';
import commandLineUsage = require('command-line-usage');

const configAddOptions = [
	{
		alias: 'd',
		description: 'Add a new dependency to the module',
		name: 'dependency',
		type: Boolean,
	},
];

const configSetOptions = [
	{
		alias: 'v',
		description: 'Change the version of the module',
		name: 'version',
		type: String,
	},
];

const configRmOptions = [
	{
		alias: 'd',
		description: 'Remove a dependency from the module',
		name: 'dependency',
		type: Boolean,
	},
];

const configLsOptions = [
	{
		alias: 'd',
		description: 'List all dependencies from the module',
		name: 'dependency',
		type: Boolean,
	},
];

const buildOptions = [
	{
		alias: 'm',
		description: 'Do not minify Web files',
		name: 'no-minify',
		type: Boolean,
	},
];

const lexiconOptions = [
	{
		alias: 'b',
		description: 'Extracting base Lexicon files from installation directory of a N4-installation',
		name: 'extract-base-files',
		type: String,
		typeLabel: '<file path>',
	},
	{
		alias: 'e',
		description: 'Export CSV-files for every base module lexicon file',
		name: 'csv-export',
		type: Boolean,
	},
	{
		alias: 'i',
		description: 'Import CSV-files into source folder',
		name: 'csv-import',
		type: Boolean,
	},
] as commandLineUsage.OptionDefinition[];


/** Shows a usage guide for cli commands */
const getHelp = () => {
	const usage = commandLineUsage([
		{
			content: 'Simple N4 module build & Lexicon handling tool',
			header: 'N4 Simple build',
		},
		{
			header: 'Synopsis',
			optionList: [
				{
					description: 'Display this usage guide.',
					name: 'help',
					type: Boolean,
				},
			],
		},
		{
			content: [
				{ name: 'init', summary: 'For starting a new project, you can use the init command to initialize current working path.' },
				{ name: 'config-ls', summary: 'Outputs a list of entries from the config' },
				{ name: 'config-add', summary: 'Adds an entry to config' },
				{ name: 'config-rm', summary: 'Removes an entry in config' },
				{ name: 'config-set', summary: 'Set/Change a value in config.' },
				{ name: 'build', summary: 'Build source files to a N4 module.' },
				{ name: 'lexicon', summary: 'Lexicon related operations.' },
			],
			header: 'Command List',
		},
		{
			header: 'Config List Options',
			optionList: configLsOptions,
		},
		{
			header: 'Config Add Options',
			optionList: configAddOptions,
		},
		{
			header: 'Config Remove Options',
			optionList: configRmOptions,
		},
		{
			header: 'Config Set Options',
			optionList: configSetOptions,
		},
		{
			header: 'Build Operation Options',
			optionList: buildOptions,
		},
		{
			header: 'Lexicon Operation Options',
			optionList: lexiconOptions,
		},
		{
			content: [
				'$ n4-simple-build <command> [options]',
				'$ n4-simple-build --help',
				'$ n4-simple-build build',
				'$ n4-simple-build lexicon --extract-base-files "C:/Brand/N4.x.x.x/modules"',
			],
			header: 'Examples',
		},
		{
			content: 'Project home: {underline https://github.com/SheepCreativeSoftware/n4-simple-build}',
			header: 'Reference',
		},
	]);
	buntstift.raw(usage);
};

export { getHelp };

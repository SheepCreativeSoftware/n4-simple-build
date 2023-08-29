/**
 * @author Marina Egner <marinafcegner@sheepcs.de>
 * @copyright Copyright © 2023 Marina Egner
 * @description Shows a usage guide for cli commands
 */

import { buntstift } from 'buntstift';
import commandLineUsage = require('command-line-usage');

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
				{ name: 'build', summary: 'Build source files to a N4 module.' },
				{ name: 'lexicon', summary: 'Lexicon related operations.' },
			],
			header: 'Command List',
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

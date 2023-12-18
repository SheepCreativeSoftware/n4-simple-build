import { BaseModuleConfig } from '../../interfaces/BuildConfig/BaseModuleConfig.js';
import { BuildConfig } from '../../interfaces/BuildConfig/BuildConfig.js';

const baseModuleConfig = {
	buildVersion: 0,
	description: 'Some module',
	filterFiles: [
		'.d.ts',
		'.tsbuildinfo',
	],
	lastBuildVersion: '0.0.0',
	name: 'moduleName',
	preferredSymbol: 'someMod',
	version: '0.0.0',
} as BaseModuleConfig;


const baseConfig = {
	baseFolder: './module/src',
	buildPath: './module/.build',
	csv: {
		delimiter: ';',
		encoding: 'win1252',
		escapeCharacter: '"',
		exportPath: 'lex-export',
		extension: 'csv',
		importPath: 'lex-import',
	},
	lexicon: {
		defaultLang: 'en',
		encoding: 'utf-8',
		extension: 'lexicon',
	},
	modules: {
		...baseModuleConfig,
	},
	outputPath: 'output',
	vendor: 'The Company',
} as BuildConfig;

export { baseConfig };

import { BaseModuleConfig } from './BaseModuleConfig.js';

interface LexiconModuleConfig extends BaseModuleConfig {
	type: 'Lexicon',
	relativeLexiconBasePath: string,
}

export { LexiconModuleConfig };

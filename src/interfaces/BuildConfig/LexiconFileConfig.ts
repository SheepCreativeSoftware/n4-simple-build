import { FileConfig } from './FileConfig.js';

interface LexiconFileConfig extends FileConfig {
	defaultLang: string,
	defaultType: boolean,
	extension: 'lexicon',
}

export { LexiconFileConfig };

import { FileConfig } from './FileConfig';

interface LexiconFileConfig extends FileConfig {
	defaultLang: string,
	extension: 'lexicon',
}

export { LexiconFileConfig };

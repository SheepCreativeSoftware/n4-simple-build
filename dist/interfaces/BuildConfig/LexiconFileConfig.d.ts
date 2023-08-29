import { FileConfig } from './FileConfig';
interface LexiconFileConfig extends FileConfig {
    defaultLang: string;
    defaultType: boolean;
    extension: 'lexicon';
}
export { LexiconFileConfig };

import { BaseModuleConfig } from './BaseModuleConfig';
interface LexiconModuleConfig extends BaseModuleConfig {
    type: 'Lexicon';
    relativLexiconBasePath: string;
}
export { LexiconModuleConfig };

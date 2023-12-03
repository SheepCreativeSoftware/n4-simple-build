import { BaseModuleConfig } from './BaseModuleConfig';
interface LexiconModuleConfig extends BaseModuleConfig {
    type: 'Lexicon';
    relativeLexiconBasePath: string;
}
export { LexiconModuleConfig };

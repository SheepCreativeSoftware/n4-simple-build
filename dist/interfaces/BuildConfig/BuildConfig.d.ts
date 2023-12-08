import { CsvFileConfig } from './CsvFileConfig.js';
import { LexiconFileConfig } from './LexiconFileConfig.js';
import { LexiconModuleConfig } from './LexiconModuleConfig.js';
import { RtModuleConfig } from './RtModuleConfig.js';
import { UxModuleConfig } from './UxModuleConfig.js';
interface BuildConfig {
    modules: LexiconModuleConfig | RtModuleConfig | UxModuleConfig;
    buildPath: string;
    baseFolder: string;
    outputPath: string;
    lexicon: LexiconFileConfig;
    csv: CsvFileConfig;
    vendor: string;
}
export { BuildConfig };

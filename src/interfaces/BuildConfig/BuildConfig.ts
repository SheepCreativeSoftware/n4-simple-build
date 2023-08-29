import { CsvFileConfig } from './CsvFileConfig';
import { LexiconFileConfig } from './LexiconFileConfig';
import { LexiconModuleConfig } from './LexiconModuleConfig';
import { ModuleType } from '../../types/ModuleType';
import { RtModuleConfig } from './RtModuleConfig';
import { UxModuleConfig } from './UxModuleConfig';

interface BuildConfig {
	modules: LexiconModuleConfig | RtModuleConfig | UxModuleConfig,
	buildPath: string,
	baseFolder: string,
	outputPath: string,
	lexicon: LexiconFileConfig,
	csv: CsvFileConfig,
	vendor: string,
	type: ModuleType,
}

export { BuildConfig };

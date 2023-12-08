import { BuildConfig } from '../../../interfaces/BuildConfig/BuildConfig.js';
import { ModuleMetaFile } from '../../../interfaces/moduleMeta/ModuleMetaFile.js';
declare const addLexiconToModuleMeta: ({ config, moduleMetaFile }: {
    config: BuildConfig;
    moduleMetaFile: ModuleMetaFile;
}) => Promise<void>;
export { addLexiconToModuleMeta };

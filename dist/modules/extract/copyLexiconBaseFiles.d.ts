import { BuildConfig } from '../../interfaces/BuildConfig/BuildConfig.js';
import { IndexedFiles } from '../../interfaces/extract/IndexedFiles.js';
declare const copyLexiconBaseFiles: ({ config, indexedFiles }: {
    config: BuildConfig;
    indexedFiles: IndexedFiles;
}) => Promise<void>;
export { copyLexiconBaseFiles };

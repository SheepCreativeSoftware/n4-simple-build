import { BuildConfig } from '../../interfaces/BuildConfig/BuildConfig.js';
import { IndexedFiles } from '../../interfaces/extract/IndexedFiles.js';
/** Copy and combine all lexicons from all indexed modules */
declare const copyLexiconBaseFiles: ({ config, indexedFiles }: {
    config: BuildConfig;
    indexedFiles: IndexedFiles;
}) => Promise<void>;
export { copyLexiconBaseFiles };

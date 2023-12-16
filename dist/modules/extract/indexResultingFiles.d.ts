import { BuildConfig } from '../../interfaces/BuildConfig/BuildConfig.js';
import { IndexedFiles } from '../../interfaces/extract/IndexedFiles.js';
/** Analyse promise from unzip to evaluate which files to copy later */
declare const indexResultingFiles: ({ config, promiseResults }: {
    config: BuildConfig;
    promiseResults: PromiseSettledResult<string[]>[];
}) => Promise<IndexedFiles>;
export { indexResultingFiles };

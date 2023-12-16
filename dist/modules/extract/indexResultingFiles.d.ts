import { BuildConfig } from '../../interfaces/BuildConfig/BuildConfig.js';
import { IndexedFiles } from '../../interfaces/extract/IndexedFiles.js';
declare const indexResultingFiles: ({ config, promiseResults }: {
    config: BuildConfig;
    promiseResults: PromiseSettledResult<string[]>[];
}) => Promise<IndexedFiles>;
export { indexResultingFiles };

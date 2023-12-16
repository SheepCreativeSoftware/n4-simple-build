import { BuildConfig } from '../../interfaces/BuildConfig/BuildConfig.js';
/** Search in path for jar files and unzip metadata and lexicon file */
declare const searchInPath: ({ config, searchPath }: {
    config: BuildConfig;
    searchPath: string;
}) => Promise<PromiseSettledResult<string[]>[]>;
export { searchInPath };

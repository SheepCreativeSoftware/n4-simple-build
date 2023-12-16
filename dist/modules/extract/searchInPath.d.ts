import { BuildConfig } from '../../interfaces/BuildConfig/BuildConfig.js';
declare const searchInPath: ({ config, searchPath }: {
    config: BuildConfig;
    searchPath: string;
}) => Promise<PromiseSettledResult<string[]>[]>;
export { searchInPath };

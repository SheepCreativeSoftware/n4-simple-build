import { BuildConfig } from '../../interfaces/BuildConfig/BuildConfig.js';
/**
 * Builds the files
 * @returns {Boolean} true if successfull
 */
declare const execBuild: ({ config, noMinify, noPackage }: {
    config: BuildConfig;
    noMinify?: boolean | undefined;
    noPackage?: boolean | undefined;
}) => Promise<BuildConfig>;
export { execBuild };

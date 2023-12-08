import { BuildConfig } from '../../interfaces/BuildConfig/BuildConfig.js';
/** Read existing config or provide a new default config */
declare const getExistingOrNewConfig: () => Promise<BuildConfig>;
/** Read existing config or provide a new default config */
declare const getExistingConfig: () => Promise<BuildConfig>;
/** Writes the config to the file system */
declare const writeBuildConfig: ({ config }: {
    config: BuildConfig;
}) => Promise<void>;
export { getExistingConfig, getExistingOrNewConfig, writeBuildConfig };

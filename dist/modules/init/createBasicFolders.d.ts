import { BuildConfig } from '../../interfaces/BuildConfig/BuildConfig.js';
/** Writes the config to the file system */
declare const createBasicFolders: ({ config }: {
    config: BuildConfig;
}) => Promise<void>;
export { createBasicFolders };

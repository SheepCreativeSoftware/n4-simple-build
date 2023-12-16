import { BuildConfig } from '../../interfaces/BuildConfig/BuildConfig.js';
/** Creates the basic folders for later usage */
declare const createBasicFolders: ({ config }: {
    config: BuildConfig;
}) => Promise<void>;
export { createBasicFolders };

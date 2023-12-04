import { BuildConfig } from '../../interfaces/BuildConfig/BuildConfig';
/** Writes the config to the file system */
declare const createModuleMeta: ({ config }: {
    config: BuildConfig;
}) => Promise<void>;
export { createModuleMeta };

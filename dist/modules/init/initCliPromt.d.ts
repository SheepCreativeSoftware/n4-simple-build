import { BuildConfig } from '../../interfaces/BuildConfig/BuildConfig.js';
/** Promts to the user via CLI to configure the project */
declare const initCliPromt: ({ config }: {
    config: BuildConfig;
}) => Promise<BuildConfig>;
export { initCliPromt };

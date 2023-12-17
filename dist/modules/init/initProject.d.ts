import { BuildConfig } from '../../interfaces/BuildConfig/BuildConfig.js';
/** Create a module config and create base folder based on questions to the user */
declare const initProject: (testConfig?: BuildConfig) => Promise<void>;
export { initProject };

import { BuildConfig } from '../../../interfaces/BuildConfig/BuildConfig.js';
/** Export Lexicon Data to a CSV file */
declare const exportCSV: ({ config }: {
    config: BuildConfig;
}) => Promise<void>;
export { exportCSV };

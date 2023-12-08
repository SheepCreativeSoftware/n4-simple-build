import { BuildConfig } from '../../../interfaces/BuildConfig/BuildConfig.js';
declare const exportCSV: ({ config }: {
    config: BuildConfig;
}) => Promise<void>;
export { exportCSV };

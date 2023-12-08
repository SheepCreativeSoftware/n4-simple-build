import { BuildConfig } from '../../../interfaces/BuildConfig/BuildConfig';
declare const exportCSV: ({ config }: {
    config: BuildConfig;
}) => Promise<void>;
export { exportCSV };

import { BuildConfig } from '../../interfaces/BuildConfig/BuildConfig';
declare const exportCSV: ({ config }: {
    config: BuildConfig;
}) => Promise<boolean>;
export { exportCSV };

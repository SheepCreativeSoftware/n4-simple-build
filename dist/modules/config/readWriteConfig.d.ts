/** Evaluate what to do with the config */
declare const readWriteConfig: (mode: 'LIST' | 'SET' | 'ADD' | 'RM', options: {
    dependency?: boolean;
    version?: boolean;
}) => Promise<{
    name: string;
    vendor: string;
    'vendor-version': string;
}[] | null>;
export { readWriteConfig };

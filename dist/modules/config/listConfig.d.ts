declare const listConfig: (options: {
    dependency?: boolean;
}) => Promise<{
    name: string;
    vendor: string;
    'vendor-version': string;
}[]>;
export { listConfig };

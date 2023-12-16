declare const getModuleName: ({ encoding, filePath }: {
    encoding: string;
    filePath: string;
}) => Promise<string>;
export { getModuleName };

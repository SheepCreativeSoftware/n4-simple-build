declare const unzipFile: ({ zipFilePath, outputPath, findFiles }: {
    zipFilePath: string;
    outputPath: string;
    findFiles: string[];
}) => Promise<string[]>;
export { unzipFile };

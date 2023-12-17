declare const unzipFile: ({ zipFilePath, outputPath, findFile }: {
    zipFilePath: string;
    outputPath: string;
    findFile: string;
}) => Promise<string | null>;
declare const unzipFileMultiple: ({ zipFilePath, outputPath, findFiles }: {
    zipFilePath: string;
    outputPath: string;
    findFiles: string[];
}) => Promise<string[]>;
export { unzipFile, unzipFileMultiple };

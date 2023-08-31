/**
 * Search for files with a specific file extension in a specific path
 * @returns Array of files with that type
 */
declare const searchForFiles: ({ filePath, extension }: {
    /** File path to search in */
    filePath: string;
    /** File sextension to search for */
    extension: string;
}) => Promise<string[]>;
export { searchForFiles };

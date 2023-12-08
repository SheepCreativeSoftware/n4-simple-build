/** Copies multiple files on the same path at once */
declare const copyMultipleFilesSync: ({ files, oldPath, newPath }: {
    files: string[];
    oldPath: string;
    newPath: string;
}) => void;
declare const copySrcFiles: ({ oldPath, newPath, filterFiles }: {
    /** Source path */
    oldPath: string;
    /** Destination path */
    newPath: string;
    /** List of files that should not be copied */
    filterFiles: string[];
}) => Promise<void>;
/** Writes a file with almost any encoding */
declare const writeFile: (file: string, fileData: string, { encoding }: {
    encoding: string;
}) => Promise<void>;
/** Reads a file with almost any encoding */
declare const readFile: (file: string, { encoding }: {
    encoding: string;
}) => Promise<string>;
export { copySrcFiles, copyMultipleFilesSync, readFile, writeFile };

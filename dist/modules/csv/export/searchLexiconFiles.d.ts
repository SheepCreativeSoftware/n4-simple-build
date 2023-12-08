/** Search base files and store their name in an array if they are lexicons */
declare const searchLexiconFiles: ({ baseFilePath, lexiconExtension }: {
    baseFilePath: string;
    lexiconExtension: string;
}) => Promise<string[]>;
export { searchLexiconFiles };

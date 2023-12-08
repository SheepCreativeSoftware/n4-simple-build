/** Search base files and store their name in an array if they are lexicons */
declare const getLanguageFolders: ({ moduleFolder, defaultLang }: {
    moduleFolder: string;
    defaultLang: string;
}) => Promise<string[]>;
export { getLanguageFolders };

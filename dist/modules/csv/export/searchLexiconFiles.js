import * as fs from 'fs/promises';
/** Search base files and store their name in an array if they are lexicons */
const searchLexiconFiles = async ({ baseFilePath, lexiconExtension }) => {
    const baseFiles = await fs.readdir(baseFilePath);
    const lexFiles = [];
    for (const file of baseFiles)
        if (file.includes(`.${lexiconExtension}`))
            lexFiles.push(file);
    return lexFiles;
};
export { searchLexiconFiles };

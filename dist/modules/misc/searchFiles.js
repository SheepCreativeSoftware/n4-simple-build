import { readdir } from 'fs/promises';
/**
 * Search for files with a specific file extension in a specific path
 * @returns Array of files with that type
 */
const searchForFiles = async function ({ filePath, extension }) {
    const filesInFolder = await readdir(filePath);
    const files = [];
    filesInFolder.forEach((file) => {
        if (file.includes(`.${extension}`))
            files.push(file);
    });
    return files;
};
export { searchForFiles };

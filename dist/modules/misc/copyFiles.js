import * as fs from 'fs/promises';
import * as fse from 'fs-extra/esm';
import iconv from 'iconv-lite';
/** Copies multiple files on the same path at once */
const copyMultipleFilesSync = function ({ files, oldPath, newPath }) {
    for (const file of files) {
        fse.copySync(oldPath + file, newPath + file, {
            overwrite: true,
            preserveTimestamps: true,
        });
    }
};
const copySrcFiles = async function ({ oldPath, newPath, filterFiles }) {
    const filterFunction = (src) => {
        for (const filterFile of filterFiles) {
            // Ignore these files
            if (src.includes(filterFile))
                return false;
        }
        return true;
    };
    await fse.copy(oldPath, newPath, {
        filter: filterFunction,
        overwrite: true,
        preserveTimestamps: true,
    });
};
/** Writes a file with almost any encoding */
const writeFile = async function (file, fileData, { encoding }) {
    try {
        const buffer = iconv.encode(fileData, encoding);
        await fse.outputFile(file, buffer);
        return Promise.resolve();
    }
    catch (error) {
        return Promise.reject(error);
    }
};
/** Reads a file with almost any encoding */
const readFile = async function (file, { encoding }) {
    try {
        const buffer = await fs.readFile(file);
        const fileData = iconv.decode(buffer, encoding);
        return Promise.resolve(fileData);
    }
    catch (error) {
        return Promise.reject(error);
    }
};
export { copySrcFiles, copyMultipleFilesSync, readFile, writeFile };

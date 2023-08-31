"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFile = exports.readFile = exports.copyMultipleFilesSync = exports.copySrcFiles = void 0;
const fse = require("fs-extra");
const iconv = require("iconv-lite");
/** Copies multiple files on the same path at once */
const copyMultipleFilesSync = function ({ files, oldPath, newPath }) {
    for (const file of files) {
        fse.copySync(oldPath + file, newPath + file, {
            overwrite: true,
            preserveTimestamps: true,
        });
    }
};
exports.copyMultipleFilesSync = copyMultipleFilesSync;
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
exports.copySrcFiles = copySrcFiles;
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
exports.writeFile = writeFile;
/** Reads a file with almost any encoding */
const readFile = async function (file, { encoding }) {
    try {
        const buffer = await fse.readFile(file);
        const fileData = iconv.decode(buffer, encoding);
        return Promise.resolve(fileData);
    }
    catch (error) {
        return Promise.reject(error);
    }
};
exports.readFile = readFile;

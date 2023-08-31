"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchForFiles = void 0;
const fs_extra_1 = require("fs-extra");
/**
 * Search for files with a specific file extension in a specific path
 * @returns Array of files with that type
 */
const searchForFiles = async function ({ filePath, extension }) {
    const filesInFolder = await (0, fs_extra_1.readdir)(filePath);
    const files = [];
    filesInFolder.forEach((file) => {
        if (file.includes(`.${extension}`))
            files.push(file);
    });
    return files;
};
exports.searchForFiles = searchForFiles;

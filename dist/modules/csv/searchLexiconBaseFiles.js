"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchLexiconBaseFiles = void 0;
const fse = require("fs-extra");
/** Search base files and store their name in an array if they are lexicons */
const searchLexiconBaseFiles = async ({ baseFilePath, lexiconExtension }) => {
    const baseFiles = await fse.readdir(baseFilePath);
    const lexFiles = [];
    for (const file of baseFiles)
        if (file.includes(`.${lexiconExtension}`))
            lexFiles.push(file);
    return lexFiles;
};
exports.searchLexiconBaseFiles = searchLexiconBaseFiles;

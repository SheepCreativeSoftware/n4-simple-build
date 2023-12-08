"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLanguageFolders = void 0;
const fse = require("fs-extra");
/** Search base files and store their name in an array if they are lexicons */
const getLanguageFolders = async ({ moduleFolder, defaultLang }) => {
    const moduleFolders = await fse.readdir(moduleFolder, { withFileTypes: true });
    const languages = [defaultLang];
    for (const folder of moduleFolders) {
        if (!folder.isDirectory())
            continue;
        const languageFolder = folder.name;
        languages.push(languageFolder);
    }
    return languages;
};
exports.getLanguageFolders = getLanguageFolders;

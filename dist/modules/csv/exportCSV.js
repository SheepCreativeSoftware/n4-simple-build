"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportCSV = void 0;
const copyFiles_1 = require("../misc/copyFiles");
const buntstift_1 = require("buntstift");
const createCsvOutput_1 = require("./createCsvOutput");
const getLanguageFolders_1 = require("./getLanguageFolders");
const lexFileToObject_1 = require("./lexFileToObject");
const searchLexiconBaseFiles_1 = require("./searchLexiconBaseFiles");
const path = require("path");
const exportCSV = async function ({ config }) {
    buntstift_1.buntstift.header('Start export CSV process');
    const { baseFolder, modules, csv, lexicon } = config;
    // Skip execution for modules that are not Lexicons
    if (modules.type !== 'Lexicon')
        throw new Error('Not a Lexicon module');
    const { relativeLexiconBasePath } = modules;
    // Search base files and store their name in an array if they are lexicons
    const baseFilePath = path.resolve(process.cwd(), relativeLexiconBasePath);
    const lexFiles = await (0, searchLexiconBaseFiles_1.searchLexiconBaseFiles)({
        baseFilePath,
        lexiconExtension: lexicon.extension,
    });
    // Process each of the base files
    for (let indexBase = 0; indexBase < lexFiles.length; indexBase++) {
        // Get data from base file and store it as default language
        const lexFile = lexFiles[indexBase];
        buntstift_1.buntstift.info('- Load base lexicon file: ' + lexFile);
        const baseLexiconData = await (0, copyFiles_1.readFile)(path.resolve(baseFilePath, lexFile), { encoding: lexicon.encoding });
        const lexiconObject = {};
        (0, lexFileToObject_1.lexFileToObject)({ language: lexicon.defaultLang, lexFile: baseLexiconData, lexiconObject });
        buntstift_1.buntstift.info('- Load lexicon files from module');
        const moduleFolder = path.resolve(process.cwd(), baseFolder);
        const languages = await (0, getLanguageFolders_1.getLanguageFolders)({ defaultLang: lexicon.defaultLang, moduleFolder });
        for (const language of languages) {
            if (language === lexicon.defaultLang)
                continue;
            const lexiconFilePath = path.resolve(moduleFolder, language, lexFile);
            buntstift_1.buntstift.info(`  - Load file: ${language}/${lexFile}`);
            try {
                const lexiconData = await (0, copyFiles_1.readFile)(lexiconFilePath, { encoding: lexicon.encoding });
                (0, lexFileToObject_1.lexFileToObject)({ language, lexFile: lexiconData, lexiconObject });
            }
            catch (error) {
                if (error instanceof Error)
                    buntstift_1.buntstift.error(`- File not found - ${error.message}`);
            }
        }
        const csvFile = (0, createCsvOutput_1.createCsvOutput)(lexiconObject, languages, csv);
        const csvFileName = lexFile.replace(`.${lexicon.extension}`, `.${csv.extension}`);
        buntstift_1.buntstift.info(`- Create CSV file: ${csvFileName}`);
        await (0, copyFiles_1.writeFile)(path.resolve(process.cwd(), csv.exportPath, csvFileName), csvFile, { encoding: csv.encoding });
    }
};
exports.exportCSV = exportCSV;

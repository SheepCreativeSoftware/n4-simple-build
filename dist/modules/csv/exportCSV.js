"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportCSV = void 0;
const fse = require("fs-extra");
const copyFiles_1 = require("../misc/copyFiles");
const buntstift_1 = require("buntstift");
const createCsvOutput_1 = require("./createCsvOutput");
const lexFileToObject_1 = require("./lexFileToObject");
const path = require("path");
const exportCSV = async function ({ config }) {
    buntstift_1.buntstift.header('Start export CSV process');
    const { baseFolder, modules, csv, lexicon } = config;
    const csvExportPath = path.resolve(process.cwd(), csv.exportPath);
    // Skip execution for modules that are not Lexicons
    // eslint-disable-next-line no-continue
    if (modules.type !== 'Lexicon')
        throw new Error('Not a Lexicon module');
    const { relativeLexiconBasePath } = modules;
    // Search base files and store their name in an array if they are lexicons
    const baseFilePath = path.resolve(process.cwd(), relativeLexiconBasePath);
    const baseFiles = await fse.readdir(baseFilePath);
    const lexFiles = [];
    baseFiles.forEach((file) => {
        if (file.includes(`.${lexicon.extension}`))
            lexFiles.push(file);
    });
    // Process each of the base files
    for (let indexBase = 0; indexBase < lexFiles.length; indexBase++) {
        // Get data from base file and store it as default language
        const lexFile = lexFiles[indexBase];
        buntstift_1.buntstift.info('- Load base lexicon file: ' + lexFile);
        const baseLexiconData = await (0, copyFiles_1.readFile)(baseFilePath + '/' + lexFile, { encoding: lexicon.encoding });
        const lexiconObject = {};
        (0, lexFileToObject_1.lexFileToObject)({ language: lexicon.defaultLang, lexFile: baseLexiconData, lexiconObject });
        buntstift_1.buntstift.info('- Load lexicon files from module');
        const moduleFolder = path.resolve(process.cwd(), baseFolder);
        const moduleFolders = await fse.readdir(moduleFolder);
        const languages = [lexicon.defaultLang];
        for (let indexLex = 0; indexLex < moduleFolders.length; indexLex++) {
            const languageFolder = moduleFolders[indexLex];
            languages.push(languageFolder);
            const lexiconFilePath = path.resolve(moduleFolder, languageFolder, lexFile);
            buntstift_1.buntstift.info(`  - Load file: ${languageFolder}/${lexFile}`);
            try {
                const lexiconData = await (0, copyFiles_1.readFile)(lexiconFilePath, { encoding: lexicon.encoding });
                (0, lexFileToObject_1.lexFileToObject)({ language: languageFolder, lexFile: lexiconData, lexiconObject });
            }
            catch (error) {
                if (error instanceof Error)
                    buntstift_1.buntstift.error(`- File not found - ${error.message}`);
            }
        }
        buntstift_1.buntstift.info('- Create CSV Output');
        const csvFile = (0, createCsvOutput_1.createCsvOutput)(lexiconObject, languages, csv);
        buntstift_1.buntstift.info('- Save CSV file');
        const csvFileName = lexFile.replace(`.${lexicon.extension}`, `.${csv.extension}`);
        await (0, copyFiles_1.writeFile)(path.resolve(csvExportPath, csvFileName), csvFile, { encoding: csv.encoding });
    }
    return false;
};
exports.exportCSV = exportCSV;

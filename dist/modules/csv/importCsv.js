"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importCSV = void 0;
const copyFiles_1 = require("../misc/copyFiles");
const buntstift_1 = require("buntstift");
const convertCsvData_1 = require("./convertCsvData");
const searchFiles_1 = require("../misc/searchFiles");
const path = require("path");
const importCSV = async ({ config }) => {
    buntstift_1.buntstift.header('Start import CSV process');
    const { baseFolder, modules, csv, lexicon } = config;
    // Skip execution for modules that are not Lexicons
    if (modules.type !== 'Lexicon')
        return;
    // Search base files and store their name in an array if they are lexicons
    const importPath = path.resolve(process.cwd(), `./${csv.importPath}`);
    buntstift_1.buntstift.info('- Search for CSV files');
    const csvFiles = await (0, searchFiles_1.searchForFiles)({ extension: csv.extension, filePath: importPath });
    // Read csv file data
    for (const csvFileName of csvFiles) {
        buntstift_1.buntstift.info(` - Load file ${csvFileName}`);
        const csvFile = await (0, copyFiles_1.readFile)(`${importPath}/${csvFileName}`, { encoding: csv.encoding });
        buntstift_1.buntstift.info(` - Parse CSV File ${csvFileName}`);
        const [languages, fileData] = (0, convertCsvData_1.convertCsvData)({ csv, csvFile, lexicon, modules });
        for (let indexOut = 0; indexOut < languages.length; indexOut++) {
            const language = languages[indexOut];
            const lexiconFileName = csvFileName.replace(csv.extension, lexicon.extension);
            buntstift_1.buntstift.info(`  - Output lexicon file: ${language}/${lexiconFileName}`);
            const lexiconFilePath = path.resolve(process.cwd(), `./${baseFolder}/${language}/${lexiconFileName}`);
            await (0, copyFiles_1.writeFile)(lexiconFilePath, fileData[indexOut], { encoding: lexicon.encoding });
        }
    }
};
exports.importCSV = importCSV;

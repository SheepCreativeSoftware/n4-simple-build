"use strict";
/**
 * @author Marina Egner <marinafcegner@sheepcs.de>
 * @copyright Copyright © 2023 Marina Egner
 * @module n4-simple-build
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.readWriteConfig = exports.listConfig = exports.runBuild = exports.getHelp = exports.lexiconCsvImport = exports.lexiconCsvExport = exports.initProject = exports.extractLexiconFiles = void 0;
const buntstift_1 = require("buntstift");
const exportCSV_1 = require("./modules/csv/export/exportCSV");
const storeConfig_1 = require("./modules/config/storeConfig");
const getHelp_1 = require("./modules/cli/getHelp");
Object.defineProperty(exports, "getHelp", { enumerable: true, get: function () { return getHelp_1.getHelp; } });
const importCsv_1 = require("./modules/csv/import/importCsv");
const initProject_1 = require("./modules/init/initProject");
Object.defineProperty(exports, "initProject", { enumerable: true, get: function () { return initProject_1.initProject; } });
const listConfig_1 = require("./modules/config/listConfig");
Object.defineProperty(exports, "listConfig", { enumerable: true, get: function () { return listConfig_1.listConfig; } });
const readWriteConfig_1 = require("./modules/config/readWriteConfig");
Object.defineProperty(exports, "readWriteConfig", { enumerable: true, get: function () { return readWriteConfig_1.readWriteConfig; } });
const runBuild = ({ minify }) => {
    // ...
    buntstift_1.buntstift.verbose('Run Build');
    buntstift_1.buntstift.verbose(`Option minify ${minify}`);
};
exports.runBuild = runBuild;
const extractLexiconFiles = ({ searchPath }) => {
    // ...
    buntstift_1.buntstift.verbose('Extract Lexicon files');
    buntstift_1.buntstift.verbose(`searchPath ${searchPath}`);
};
exports.extractLexiconFiles = extractLexiconFiles;
const lexiconCsvExport = async () => {
    const config = await (0, storeConfig_1.getExistingConfig)();
    await (0, exportCSV_1.exportCSV)({ config });
};
exports.lexiconCsvExport = lexiconCsvExport;
const lexiconCsvImport = async () => {
    const config = await (0, storeConfig_1.getExistingConfig)();
    await (0, importCsv_1.importCSV)({ config });
};
exports.lexiconCsvImport = lexiconCsvImport;

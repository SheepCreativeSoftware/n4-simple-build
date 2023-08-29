"use strict";
/**
 * @author Marina Egner <marinafcegner@sheepcs.de>
 * @copyright Copyright © 2023 Marina Egner
 * @module n4-simple-build
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.runBuild = exports.getHelp = exports.lexiconCsvImport = exports.lexiconCsvExport = exports.initProject = exports.extractLexiconFiles = void 0;
const buntstift_1 = require("buntstift");
const getHelp_1 = require("./modules/cli/getHelp");
Object.defineProperty(exports, "getHelp", { enumerable: true, get: function () { return getHelp_1.getHelp; } });
const initCliPromt_1 = require("./modules/init/initCliPromt");
const initProject = () => {
    // ...
    buntstift_1.buntstift.verbose('Init Project');
    (0, initCliPromt_1.initCliPromt)();
};
exports.initProject = initProject;
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
const lexiconCsvExport = () => {
    // ...
    buntstift_1.buntstift.verbose('Lexicon CSV Export');
};
exports.lexiconCsvExport = lexiconCsvExport;
const lexiconCsvImport = () => {
    // ...
    buntstift_1.buntstift.verbose('Lexicon CSV Import');
};
exports.lexiconCsvImport = lexiconCsvImport;

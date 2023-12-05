"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCsvOutput = void 0;
const createCsvOutput = function (lexiconObject, languages, csv) {
    let csvFile = 'key' + csv.delimiter;
    languages.forEach((language) => {
        csvFile += language + csv.delimiter;
    });
    csvFile += '\r\n';
    Object.keys(lexiconObject).forEach((key) => {
        let currentText = '';
        const lexiconKey = lexiconObject[key];
        currentText += key + csv.delimiter;
        languages.forEach((language) => {
            if (typeof lexiconKey[language] === 'undefined')
                currentText += csv.delimiter;
            if (typeof lexiconKey[language] !== 'undefined')
                currentText += lexiconKey[language] + csv.delimiter;
        });
        currentText += '\r\n';
        csvFile += currentText;
    });
    return csvFile;
};
exports.createCsvOutput = createCsvOutput;

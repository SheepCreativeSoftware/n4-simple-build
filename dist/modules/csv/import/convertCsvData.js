import { convertCsvLine } from './convertCsvLine.js';
import { escapeString } from '../../misc/escapeString.js';
import { getCurrentDateTimeString } from '../../misc/getDate.js';
import { getFileLineEnding } from '../../misc/getFileLineEnding.js';
const startWithThirdRow = 2;
const startAfterHeader = 1;
const startAtBegining = 2;
const nextBuild = 1;
const lexiconFileLineEnding = '\r\n';
/** Evaluates Additional languages inside the CSV file */
const getLanguagesFromHeader = ({ headerElements, lexicon }) => {
    const languages = [];
    for (const headerElement of headerElements) {
        // Must be a additional language code if not empty, not "key" and not the default langauge
        if (headerElement !== '' && headerElement !== 'key' && headerElement !== lexicon.defaultLang)
            languages.push(headerElement);
    }
    return languages;
};
const generateLexiconFileHeader = ({ modules }) => {
    let fileHeader = `# ${modules.name} ${modules.version}.${modules.buildVersion + nextBuild}${lexiconFileLineEnding}`;
    fileHeader += `# Date: ${getCurrentDateTimeString()}${lexiconFileLineEnding}`;
    return fileHeader;
};
/** Converts the CSV data into separate data sets for each language */
const convertCsvData = function ({ csvFile, lexicon, csv, modules }) {
    const lineEnding = getFileLineEnding({ fileData: csvFile });
    // Split into single lines
    const lines = csvFile.split(lineEnding);
    // First line of CSV are header elements
    const headerElements = convertCsvLine({ csv, line: lines[0] });
    const languages = getLanguagesFromHeader({ headerElements, lexicon });
    // Create header for each language file
    const fileData = [];
    const header = [];
    for (let index = 0; index < languages.length; index++) {
        const generatedHeader = generateLexiconFileHeader({ modules });
        fileData.push(generatedHeader);
        header.push(generatedHeader);
    }
    for (let indexLines = startAfterHeader; indexLines < lines.length; indexLines++) {
        const line = lines[indexLines];
        const rowElements = convertCsvLine({ csv, line });
        // First and second row are for key and default langauge
        const key = rowElements[0];
        // Additional languages are coming after them beginging with third row
        for (let indexRow = startWithThirdRow; indexRow < rowElements.length; indexRow++) {
            // Skip Row Elements if these are empty
            if (rowElements[indexRow] === '')
                continue;
            const escapedText = escapeString({ text: rowElements[indexRow] });
            // Every row is a item of a single language
            const arrayPosition = indexRow - startAtBegining;
            const text = `${key}=${escapedText}${lexiconFileLineEnding}`;
            fileData[arrayPosition] += text;
        }
    }
    return [
        languages,
        fileData,
        header,
    ];
};
export { convertCsvData, generateLexiconFileHeader };

const firstChar = 1;
const lastChar = -1;
const nextArrayElement = 1;
const convertConplex = (element, index, array, csv) => {
    let newText = element;
    for (let index2 = index + nextArrayElement; index2 < array.length; index2++) {
        const nextElement = array[index2];
        // Destroy array content to be not computed for something else
        array[index2] = null;
        newText += csv.delimiter + nextElement;
        if (nextElement?.endsWith(csv.escapeCharacter))
            break;
    }
    return newText.slice(firstChar, lastChar);
};
/**
 * Converts a line of CSV into a usefull array of content
 * CSV can contain it's own delimiters as character but then the whole string will be wrapped in the escape character
 * Same happens if the escape character is included, but then the original escape character is used doubled.
 */
const convertCsvLine = ({ csv, line }) => {
    // Remove double double quotes by single double quotes
    const convertedQuotes = line.replaceAll(csv.escapeCharacter + csv.escapeCharacter, csv.escapeCharacter);
    // Type definition for null is needed for later usage
    const splittedLine = convertedQuotes.split(csv.delimiter);
    // Creates a new array which corrects some specific lines
    // eslint-disable-next-line complexity
    const reconstructedLines = splittedLine.map((element, index, array) => {
        // If element has been used by last if statement, then it will be null
        if (element === null)
            return null;
        // If element is not special, then do nothing
        if (!element.startsWith(csv.escapeCharacter) && !element.endsWith(csv.escapeCharacter))
            return element;
        // This case should never happening
        if (!element.startsWith(csv.escapeCharacter) && element.endsWith(csv.escapeCharacter))
            throw new Error(`Format Error at line ${line}`);
        // In case the string is wrapped in escape characters then this will happen
        if (element.startsWith(csv.escapeCharacter + csv.escapeCharacter) && element.endsWith(csv.escapeCharacter)) {
            // ...
            return convertConplex(element, index, array, csv);
        }
        // If it starts and end with then just remove escape at start and end, except it is only a escape character
        if (element.startsWith(csv.escapeCharacter) && element.endsWith(csv.escapeCharacter) && element !== csv.escapeCharacter) {
            // ...
            return element.slice(firstChar, lastChar);
        }
        // If only starts with escape then then the next element or elements are also part of the text
        if (element.startsWith(csv.escapeCharacter))
            return convertConplex(element, index, array, csv);
        // It should not happen that nothing matches
        throw new Error(`Format Error at line ${line}`);
    });
    // Get rid of null holes
    const onlyDefinedContent = reconstructedLines.filter((element) => element !== null);
    return onlyDefinedContent;
};
export { convertCsvLine };

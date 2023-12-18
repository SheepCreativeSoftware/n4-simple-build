const unescapeCsvChars = ({ inputText, csv }) => {
    const escapeCharacter = csv.escapeCharacter;
    const delimiter = csv.delimiter;
    // Delimiter as text must be unescaped from CSV
    let outputText = inputText.replaceAll(escapeCharacter + delimiter + escapeCharacter, delimiter);
    // Escape character is doubled to be valid text in csv
    outputText = outputText.replaceAll(escapeCharacter + escapeCharacter, escapeCharacter);
    return outputText;
};
export { unescapeCsvChars };

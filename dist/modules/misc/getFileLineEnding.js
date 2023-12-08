const unixLineEnding = '\n';
const windowsLineEnding = '\r\n';
/**
 * Checks the line ending
 * @returns evaluated line ending
 */
const getFileLineEnding = ({ fileData }) => {
    // If cariage return and line feed included then it must be a windows line ending
    if (fileData.includes(windowsLineEnding))
        return windowsLineEnding;
    return unixLineEnding;
};
export { getFileLineEnding };

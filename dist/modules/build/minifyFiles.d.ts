/**
 * Minifies all files from the config array
 * @param {Object} param
 * @param {String} param.basePath - base folder path to files
 * @param {Array} param.paths - Array with relative path from base folder to the files
 */
declare const minifyFiles: ({ basePath }: {
    basePath: string;
}) => Promise<void>;
export { minifyFiles };

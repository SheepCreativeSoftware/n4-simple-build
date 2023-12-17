import * as fs from 'fs/promises';
import { buntstift } from 'buntstift';
import path from 'path';
import { showProgressBar } from '../misc/showProgressBar.js';
import { unzipFileMultiple } from './unzipFile.js';
const maxFiles = 700;
/** Search in path for jar files and unzip metadata and lexicon file */
const searchInPath = async ({ config, searchPath }) => {
    const lexiconExtension = `.${config.lexicon.extension}`;
    const filePath = await fs.readdir(searchPath);
    buntstift.success(`Found ${filePath.length} files in path to extract`);
    const promisesUnzip = [];
    if (filePath.length >= maxFiles) {
        buntstift.error('Too many files');
        throw new Error('Too many files');
    }
    let index = 0;
    for (const file of filePath) {
        if (file.includes('.jar') === false)
            continue;
        const zipFilePath = path.join(searchPath, file);
        const promiseUnzip = await unzipFileMultiple({
            findFiles: ['META-INF/module.xml', lexiconExtension],
            outputPath: path.resolve('.temp', file.replace('.jar', '')),
            zipFilePath,
        });
        promisesUnzip.push(promiseUnzip);
        index++;
        showProgressBar('Extracting', index, filePath.length);
    }
    const promiseResults = await Promise.allSettled(promisesUnzip);
    return promiseResults;
};
export { searchInPath };

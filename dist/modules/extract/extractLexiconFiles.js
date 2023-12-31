import * as fse from 'fs-extra/esm';
import { buntstift } from 'buntstift';
import { copyLexiconBaseFiles } from './copyLexiconBaseFiles.js';
import { getExistingConfig } from '../config/storeConfig.js';
import { indexResultingFiles } from './indexResultingFiles.js';
import { searchInPath } from './searchInPath.js';
const extractLexiconFiles = async ({ searchPath }) => {
    try {
        buntstift.header(`Extract Lexicon files from: ${searchPath}`);
        const config = await getExistingConfig();
        if (config.modules.type !== 'Lexicon') {
            buntstift.error('Not a Lexicon module');
            return;
        }
        const promiseResults = await searchInPath({ config, searchPath });
        const indexedFiles = await indexResultingFiles({ config, promiseResults });
        await copyLexiconBaseFiles({ config, indexedFiles });
        await fse.emptyDir('.temp');
        buntstift.success('Removed temporary files');
    }
    catch (error) {
        if (error instanceof Error)
            buntstift.error(error.message);
    }
};
export { extractLexiconFiles };

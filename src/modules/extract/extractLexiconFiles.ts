import { buntstift } from 'buntstift';
import { copyLexiconBaseFiles } from './copyLexiconBaseFiles.js';
import { getExistingConfig } from '../config/storeConfig.js';
import { indexResultingFiles } from './indexResultingFiles.js';
import { searchInPath } from './searchInPath.js';

const extractLexiconFiles = async ({ searchPath }: {
	searchPath: string,
}) => {
	buntstift.header(`Extract Lexicon files from: ${searchPath}`);
	const config = await getExistingConfig();
	const promiseResults = await searchInPath({ config, searchPath });
	const indexedFiles = await indexResultingFiles({ config, promiseResults });
	await copyLexiconBaseFiles({ config, indexedFiles });
};

export { extractLexiconFiles };

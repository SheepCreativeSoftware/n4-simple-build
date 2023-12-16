import { BuildConfig } from '../../interfaces/BuildConfig/BuildConfig.js';
import { buntstift } from 'buntstift';
import { getModuleName } from './getModuleName.js';
import { IndexedFiles } from '../../interfaces/extract/IndexedFiles.js';

const indexResultingFiles = async({ config, promiseResults }: {
	config: BuildConfig,
	promiseResults: PromiseSettledResult<string[]>[],
}) => {
	buntstift.info('Indexing File Data');
	const indexedFiles = {} as IndexedFiles;
	for(const promiseResult of promiseResults) {
		if(promiseResult.status === 'rejected') {
			buntstift.error(promiseResult.reason);
			continue;
		}
		let moduleName = null;
		let lexiconFilePath = null;

		for(const result of promiseResult.value) {
			if(result.includes('module.xml')) moduleName = await getModuleName({ encoding: config.lexicon.encoding, filePath: result });
			if(result.includes(config.lexicon.extension)) lexiconFilePath = result;
		}
		if(!moduleName || !lexiconFilePath) continue;
		if(typeof indexedFiles[moduleName] === 'undefined') {
			// Create new entry
			indexedFiles[moduleName] = { lexiconFilePaths: [lexiconFilePath] };
		} else {
			indexedFiles[moduleName].lexiconFilePaths.push(lexiconFilePath);
		}
	}
	return indexedFiles;
};

export { indexResultingFiles };

import { BuildConfig } from '../../interfaces/BuildConfig/BuildConfig.js';
import { buntstift } from 'buntstift';
import { getModuleName } from './getModuleName.js';
import { IndexedFiles } from '../../interfaces/extract/IndexedFiles.js';

const moreThanTwo = 2;

/** Analyse promise from unzip to evaluate which files to copy later */
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

		// Should include a module.xml and a lexicon file path
		for(const result of promiseResult.value) {
			if(result.includes('module.xml')) moduleName = await getModuleName({ encoding: config.lexicon.encoding, filePath: result });
			if(result.includes(config.lexicon.extension)) lexiconFilePath = result;
		}

		if(promiseResult.value.length > moreThanTwo) buntstift.warn(`Module: ${moduleName} two many files`);

		// If one of these files is missing than it cannot be used (Most probably if there is no lexicon file included)
		if(!moduleName || !lexiconFilePath) continue;
		if(typeof indexedFiles[moduleName] === 'undefined') {
			// Create new entry as it is not yet exiting
			indexedFiles[moduleName] = { lexiconFilePaths: [lexiconFilePath] };
		} else {
			indexedFiles[moduleName].lexiconFilePaths.push(lexiconFilePath);
		}
	}
	return indexedFiles;
};

export { indexResultingFiles };

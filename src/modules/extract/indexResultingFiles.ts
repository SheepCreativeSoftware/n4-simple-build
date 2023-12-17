import { BuildConfig } from '../../interfaces/BuildConfig/BuildConfig.js';
import { buntstift } from 'buntstift';
import { getModuleData } from './getModuleData.js';
import { IndexedFiles } from '../../interfaces/extract/IndexedFiles.js';

const moreThanTwo = 2;

const checkFiles = async (value: string[], lexiconEncoding: string, lexiconExtension: string): Promise<[string|null, boolean, string|null]> => {
	let moduleName = null;
	let lexiconType = false;
	let lexiconFilePath = null;
	for(const result of value) {
		if(result.includes('module.xml')){
			// ...
			[moduleName, lexiconType] = await getModuleData({ encoding: lexiconEncoding, filePath: result });
		}
		if(result.includes(lexiconExtension)) lexiconFilePath = result;
	}
	return [moduleName, lexiconType, lexiconFilePath];
};

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

		const [moduleName, lexiconType, lexiconFilePath] = await checkFiles(promiseResult.value, config.lexicon.encoding, config.lexicon.extension);

		// If one of these files is missing or if lexicon type than it cannot be used (Most probably if there is no valid lexicon file included)
		if(!moduleName || !lexiconFilePath || lexiconType) continue;
		if(promiseResult.value.length > moreThanTwo) buntstift.warn(`Module: ${moduleName} two many files`);

		if(typeof indexedFiles[moduleName] === 'undefined') {
			// Create new entry as it is not yet exiting
			indexedFiles[moduleName] = { lexiconFilePaths: [lexiconFilePath] };
		} else {
			indexedFiles[moduleName].lexiconFilePaths.push(lexiconFilePath);
		}
	}
	buntstift.success('Indexing completed');
	return indexedFiles;
};

export { indexResultingFiles };

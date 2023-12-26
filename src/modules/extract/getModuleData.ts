import { ObjectWriterOptions, XMLBuilderCreateOptions } from 'xmlbuilder2/lib/interfaces.js';
import { convert } from 'xmlbuilder2';
import { ModuleMetaFile } from '../../interfaces/moduleMeta/ModuleMetaFile.js';
import { readFile } from '../misc/copyFiles.js';

const buildOptions:XMLBuilderCreateOptions = {
	convert: {
		att: '@',
	},
};

const convertOptions: ObjectWriterOptions = {
	format: 'object',
	group: true,
};

/** Reads the modulename from the module.xml file */
const getModuleData = async ({ encoding, filePath }: {
	encoding: string,
	filePath: string,
}): Promise<[string, boolean]> => {
	const xmlData = await readFile(filePath, { encoding });
	const dataObject = convert(buildOptions, xmlData, convertOptions) as unknown as ModuleMetaFile;
	const moduleName = dataObject.module['@'].moduleName;
	let lexiconType = false;
	if(dataObject.module.lexicons) lexiconType = true;
	return [moduleName, lexiconType];
};

export { getModuleData };

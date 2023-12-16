import { ParsedModuleMetaFile } from '../../interfaces/extract/ParsedMetaFile.js';
import { readFile } from '../misc/copyFiles.js';
import { XMLParser } from 'fast-xml-parser';

const getModuleName = async ({ encoding, filePath }: {
	encoding: string,
	filePath: string,
}) => {
	const parser = new XMLParser({ attributeNamePrefix: '@', ignoreAttributes: false });
	const xmlData = await readFile(filePath, { encoding });
	const dataObject = parser.parse(xmlData) as ParsedModuleMetaFile;
	return dataObject.module['@moduleName'];
};

export { getModuleName };

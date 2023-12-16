import { readFile } from '../misc/copyFiles.js';
import { XMLParser } from 'fast-xml-parser';
/** Reads the modulename from the module.xml file */
const getModuleName = async ({ encoding, filePath }) => {
    const parser = new XMLParser({ attributeNamePrefix: '@', ignoreAttributes: false });
    const xmlData = await readFile(filePath, { encoding });
    const dataObject = parser.parse(xmlData);
    return dataObject.module['@moduleName'];
};
export { getModuleName };

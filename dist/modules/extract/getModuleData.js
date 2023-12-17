import { readFile } from '../misc/copyFiles.js';
import { XMLParser } from 'fast-xml-parser';
/** Reads the modulename from the module.xml file */
const getModuleData = async ({ encoding, filePath }) => {
    const parser = new XMLParser({ attributeNamePrefix: '@', ignoreAttributes: false });
    const xmlData = await readFile(filePath, { encoding });
    const dataObject = parser.parse(xmlData);
    const moduleName = dataObject.module['@moduleName'];
    let lexiconType = false;
    if (dataObject.module.lexicons)
        lexiconType = true;
    return [moduleName, lexiconType];
};
export { getModuleData };

import { create } from 'xmlbuilder2';
import { hostname } from 'os';
/**
 * Creates a module.xml file based on the config file and informations from the build process
 * @param {Object} param
 * @param {String} param.basePath - base path to the configuration file
 * @param {String} param.outPath - Output path
 * @param {String} param.version - Version of the tool
 * @param {String} param.vendor - Vendor of the tool
 * @returns converted module xml file data
 */
const createModuleXml = function ({ moduleConfig, buildConfig }) {
    moduleConfig.module['@'].buildMillis = String(Date.now());
    moduleConfig.module['@'].vendorVersion = buildConfig.modules.version;
    moduleConfig.module['@'].vendor = buildConfig.vendor;
    moduleConfig.module['@'].buildHost = hostname();
    const doc = create().ele(moduleConfig);
    return doc.end({ prettyPrint: true });
};
export { createModuleXml };

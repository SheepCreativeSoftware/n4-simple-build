import { BuildConfig } from '../../../interfaces/BuildConfig/BuildConfig.js';
import { ModuleMetaFile } from '../../../interfaces/moduleMeta/ModuleMetaFile.js';
/**
 * Creates a module.xml file based on the config file and informations from the build process
 * @param {Object} param
 * @param {String} param.basePath - base path to the configuration file
 * @param {String} param.outPath - Output path
 * @param {String} param.version - Version of the tool
 * @param {String} param.vendor - Vendor of the tool
 * @returns converted module xml file data
 */
declare const createModuleXml: ({ moduleConfig, buildConfig }: {
    moduleConfig: ModuleMetaFile;
    buildConfig: BuildConfig;
}) => string;
export { createModuleXml };

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCliPromt = void 0;
const fs_extra_1 = require("fs-extra");
const basicModuleConfig_1 = require("./basicModuleConfig");
const buntstift_1 = require("buntstift");
const path = require("path");
const buildConfigFilePath = path.resolve('./', 'buildConfig.json');
/** Read existing config or provide a default */
const checkExistingConfig = async () => {
    try {
        const config = await (0, fs_extra_1.readJSON)(buildConfigFilePath);
        return config;
    }
    catch {
        return basicModuleConfig_1.baseConfig;
    }
};
/** Promts to the user via CLI to configure the project */
const initCliPromt = async () => {
    buntstift_1.buntstift.header('Initialize Module');
    const config = await checkExistingConfig();
    // Ask user for specific settings of the Project
    config.modules.name = await buntstift_1.buntstift.ask('Name for the module:', { default: config.modules.name });
    config.vendor = await buntstift_1.buntstift.ask('Vendor of the module:', { default: config.vendor });
    config.modules.description = await buntstift_1.buntstift.ask('Description of the module:', { default: config.modules.description });
    config.modules.preferredSymbol = await buntstift_1.buntstift.ask('Preferred unique Symbol (max. 8 characters):', {
        default: config.modules.preferredSymbol,
        mask: /^([a-zA-Z]){1,8}$/g,
    });
    config.modules.version = await buntstift_1.buntstift.ask('Version (major.minor.patch):', {
        default: config.modules.version,
        mask: /^[0-9].+[0-9].+[0-9]/g,
    });
    config.modules.type = await buntstift_1.buntstift.select('Select the Type of the module:', ['Lexicon', 'rt', 'ux']);
    // Check UX module specific config
    if (config.modules.type === 'ux') {
        // ..
        config.modules.hasTypeScript = await buntstift_1.buntstift.confirm('Has this Project TypeScript?', config.modules.hasTypeScript);
    }
    // Check Lexicon module specific config
    if (config.modules.type === 'Lexicon') {
        config.lexicon.defaultLang = await buntstift_1.buntstift.ask('Default Language of original lexicon files:', { default: config.lexicon.defaultLang });
        config.lexicon.encoding = await buntstift_1.buntstift.ask('Encoding for lexicon files:', { default: config.lexicon.encoding });
        config.lexicon.defaultType = await buntstift_1.buntstift.confirm('Is this Lexicon a default Lexicon?', config.lexicon.defaultType);
        config.csv.encoding = await buntstift_1.buntstift.ask('Encoding for CSV files:', { default: config.csv.encoding });
        config.csv.delimiter = await buntstift_1.buntstift.ask('Delimiter for CSV files:', { default: config.csv.delimiter });
    }
    const twoSpaces = 2;
    buntstift_1.buntstift.raw(JSON.stringify(config, null, twoSpaces));
    buntstift_1.buntstift.info(buildConfigFilePath);
    await (0, fs_extra_1.writeJSON)(buildConfigFilePath, config);
};
exports.initCliPromt = initCliPromt;

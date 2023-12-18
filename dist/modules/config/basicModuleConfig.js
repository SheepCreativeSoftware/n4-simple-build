const baseModuleConfig = {
    buildVersion: 0,
    description: 'Some module',
    filterFiles: [
        '.d.ts',
        '.tsbuildinfo',
    ],
    lastBuildVersion: '0.0.0',
    name: 'moduleName',
    preferredSymbol: 'someMod',
    version: '0.0.0',
};
const baseConfig = {
    baseFolder: './module/src',
    buildPath: './module/.build',
    csv: {
        delimiter: ';',
        encoding: 'win1252',
        escapeCharacter: '"',
        exportPath: 'lex-export',
        extension: 'csv',
        importPath: 'lex-import',
    },
    lexicon: {
        defaultLang: 'en',
        encoding: 'utf-8',
        extension: 'lexicon',
    },
    modules: {
        ...baseModuleConfig,
    },
    outputPath: 'output',
    vendor: 'The Company',
};
export { baseConfig };

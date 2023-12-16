import { ParsedDependencyConfig } from './ParsedDependencyConfig.js';
import { ParsedLexiconConfig } from './ParsedLexiconConfig.js';
interface ParsedModuleMetaFile {
    module: {
        '@name': string;
        '@runtimeProfile': 'rt' | 'ux' | 'wb';
        '@moduleName': string;
        '@buildHost': string;
        '@buildMillis': string;
        '@bajaVersion': string;
        '@vendor': string;
        '@vendorVersion': string;
        '@description': string;
        '@preferredSymbol': string;
        '@nre': 'true' | 'false';
        '@installable': 'true' | 'false';
        '@autoload': 'true' | 'false';
        dependencies: {
            dependency?: ParsedDependencyConfig[];
        };
        dirs: string;
        defs?: {
            def: {
                '@name': string;
                '@value': string;
            };
        };
        lexicons?: {
            lexicon: ParsedLexiconConfig[];
        };
    };
}
export { ParsedModuleMetaFile };

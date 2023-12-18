import { BuildConfig } from '../../interfaces/BuildConfig/BuildConfig.js';
import { buntstift } from 'buntstift';
import { ModuleType } from '../../types/ModuleType.js';
import { VersionPattern } from '../../types/VersionPattern.js';

/** Promts to the user via CLI to configure the project */
const initCliPromt = async ({ config }: {
	config: BuildConfig
}): Promise<BuildConfig> => {
	// Ask user for specific settings of the Project
	config.modules.name = await buntstift.ask('Name for the module:', { default: config.modules.name });
	config.vendor = await buntstift.ask('Vendor of the module:', { default: config.vendor });
	config.modules.description = await buntstift.ask('Description of the module:', { default: config.modules.description });
	config.modules.preferredSymbol = await buntstift.ask('Preferred unique Symbol (max. 8 characters):', {
		default: config.modules.preferredSymbol,
		mask: /^([a-zA-Z]){1,8}$/g,
	});
	config.modules.version = await buntstift.ask('Version (major.minor.patch):', {
		default: config.modules.version,
		mask: /^[0-9].+[0-9].+[0-9]/g,
	}) as VersionPattern;
	config.modules.type = await buntstift.select('Select the Type of the module:', ['Lexicon', 'rt', 'ux']) as ModuleType;

	// Check Lexicon module specific config
	if(config.modules.type === 'Lexicon') {
		config.lexicon.defaultLang = await buntstift.ask('Default Language of original lexicon files:', { default: config.lexicon.defaultLang });
		config.lexicon.encoding = await buntstift.ask('Encoding for lexicon files:', { default: config.lexicon.encoding });
		config.lexicon.defaultType = await buntstift.confirm('Is this Lexicon a default Lexicon?', config.lexicon.defaultType);
		config.csv.encoding = await buntstift.ask('Encoding for CSV files:', { default: config.csv.encoding });
		config.csv.delimiter = await buntstift.ask('Delimiter for CSV files:', { default: config.csv.delimiter });
		config.csv.escapeCharacter = await buntstift.ask('Escape character for CSV files:', { default: config.csv.escapeCharacter });
		config.modules.relativeLexiconBasePath = 'lex-base';
	}

	return config;
};

export { initCliPromt };


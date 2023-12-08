import { BuildConfig } from '../../../interfaces/BuildConfig/BuildConfig.js';
import { buntstift } from 'buntstift';
import { getLanguageFolders } from '../../csv/export/getLanguageFolders.js';
import { ModuleMetaFile } from '../../../interfaces/moduleMeta/ModuleMetaFile.js';
import { searchLexiconFiles } from '../../csv/export/searchLexiconFiles.js';
import path = require('path');

const nothing = 0;

const addLexiconToModuleMeta = async ({ config, moduleMetaFile }: {
	config: BuildConfig,
	moduleMetaFile: ModuleMetaFile,
}) => {
	buntstift.info('- Update Lexicon entries in Metadata');
	const  { baseFolder, lexicon } = config;

	const defaultType = String(lexicon.defaultType) as 'true' | 'false';
	const moduleFolder = path.join(process.cwd(), baseFolder);
	const languages = await getLanguageFolders({ defaultLang: lexicon.defaultLang, moduleFolder });
	if(languages.length === nothing) {
		// Remove everything
		// eslint-disable-next-line no-undefined
		delete moduleMetaFile.module.lexicons;
	}

	// Replace all content with nothing and add everything new to remove and update possible old data
	moduleMetaFile.module.lexicons = { lexicon: [] };

	for(const language of languages) {
		if(language === lexicon.defaultLang) continue;
		const folderContent = await searchLexiconFiles({ baseFilePath: path.join(moduleFolder, language), lexiconExtension: lexicon.extension });
		for(const content of folderContent) {
			const moduleName = content.replace(`.${lexicon.extension}`, '');
			moduleMetaFile.module.lexicons.lexicon.push({
				'@': {
					default: defaultType,
					language,
					module: moduleName,
					resource: `${language}/${content}`,
				},
			});
		}
	}
};

export { addLexiconToModuleMeta };

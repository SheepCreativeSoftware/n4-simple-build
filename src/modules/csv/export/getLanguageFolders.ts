import * as fs from 'fs/promises';

/** Search base files and store their name in an array if they are lexicons */
const getLanguageFolders = async ({ moduleFolder, defaultLang }: {
	moduleFolder: string,
	defaultLang: string,
}): Promise<string[]> => {
	const moduleFolders = await fs.readdir(moduleFolder, { withFileTypes: true });
	const languages = [defaultLang];
	for(const folder of moduleFolders) {
		if(!folder.isDirectory()) continue;
		const languageFolder = folder.name;
		languages.push(languageFolder);
	}
	return languages;
};

export { getLanguageFolders };

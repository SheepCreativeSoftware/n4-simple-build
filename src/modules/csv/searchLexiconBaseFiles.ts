import * as fse from 'fs-extra';

/** Search base files and store their name in an array if they are lexicons */
const searchLexiconBaseFiles = async ({ baseFilePath, lexiconExtension }: {
	baseFilePath: string,
	lexiconExtension: string,
}): Promise<string[]> => {
	const baseFiles = await fse.readdir(baseFilePath);
	const lexFiles = [] as string[];
	for(const file of baseFiles) if(file.includes(`.${lexiconExtension}`)) lexFiles.push(file);

	return lexFiles;
};

export { searchLexiconBaseFiles };

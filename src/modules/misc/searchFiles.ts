import { readdir } from 'fs/promises';

/**
 * Search for files with a specific file extension in a specific path
 * @returns Array of files with that type
 */
const searchForFiles = async function({ filePath, extension }: {
	/** File path to search in */
	filePath: string,

	/** File sextension to search for */
	extension: string,
}): Promise<string[]> {
	const filesInFolder = await readdir(filePath);
	const files = [] as string[];
	filesInFolder.forEach((file) => {
		if(file.includes(`.${extension}`)) files.push(file);
	});
	return files;
};

export { searchForFiles };

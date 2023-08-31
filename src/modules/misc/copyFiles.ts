
import * as fse from 'fs-extra';
import * as iconv from 'iconv-lite';

/** Copies multiple files on the same path at once */
const copyMultipleFilesSync = function({ files, oldPath, newPath }: {
	files: string[],
	oldPath: string,
	newPath: string,
}) {
	for(const file of files) {
		fse.copySync(oldPath + file, newPath + file, {
			overwrite: true,
			preserveTimestamps: true,
		});
	}
};

const copySrcFiles = async function({ oldPath, newPath, filterFiles }: {
	/** Source path */
	oldPath: string,

	/** Destination path */
	newPath: string,

	/** List of files that should not be copied */
	filterFiles: string,
}) {
	const filterFunction = (src: string) => {
		for(const filterFile of filterFiles) {
			// Ignore these files
			if(src.includes(filterFile)) return false;
		}
		return true;
	};

	await fse.copy(oldPath, newPath, {
		filter: filterFunction,
		overwrite: true,
		preserveTimestamps: true,
	});
};

/** Writes a file with almost any encoding */
const writeFile = async function(file: string, fileData: string, { encoding }: {
	encoding: string,
}): Promise<void> {
	try {
		const buffer = iconv.encode(fileData, encoding);
		await fse.outputFile(file, buffer);
		return Promise.resolve();
	} catch (error) {
		return Promise.reject(error);
	}
};

/** Reads a file with almost any encoding */
const readFile = async function(file: string, { encoding }: {
	encoding: string,
}): Promise<string> {
	try {
		const buffer = await fse.readFile(file);
		const fileData = iconv.decode(buffer, encoding);
		return Promise.resolve(fileData);
	} catch (error) {
		return Promise.reject(error);
	}
};

export { copySrcFiles, copyMultipleFilesSync, readFile, writeFile };

import { FileHandle } from 'fs/promises';
import { PathLike } from 'fs';

interface OutputInfo {
	fileHandle: FileHandle,
	filename: string,
	filePath: PathLike,
	language: string,
	hasDataAdded: boolean,
}

export { OutputInfo };

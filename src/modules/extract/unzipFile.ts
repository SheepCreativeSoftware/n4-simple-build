import * as fs from 'fs';
import * as fse from 'fs-extra/esm';
import * as unzipper from 'unzipper';
import path from 'path';

const unzipFile = ({ zipFilePath, outputPath, findFiles }: { zipFilePath: string, outputPath: string, findFiles: string[] }): Promise<string[]> => {
	const filePaths = [] as string[];
	return new Promise((resolve, reject) => {
		fs.createReadStream(zipFilePath).
			// eslint-disable-next-line new-cap
			pipe(unzipper.Parse()).
			on('entry', function (entry) {
				const zipFileName = entry.path as string;
				let foundFile = false;
				for(const findFile of findFiles) {
					if(zipFileName.includes(findFile)) {
						const fullPath = path.join(outputPath, zipFileName);
						const basename = path.basename(fullPath);
						const realFullpath = path.join(outputPath, basename);
						fse.ensureDirSync(outputPath);
						entry.pipe(fs.createWriteStream(realFullpath));
						foundFile = true;
						filePaths.push(realFullpath);
					}
				}
				if(foundFile === false) entry.autodrain();
			}).on('finish', () => {
				return resolve(filePaths);
			}).on('error', (error) => {
				return reject(error);
			});
	});
};

export { unzipFile };

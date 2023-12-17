import * as fs from 'fs';
import * as fse from 'fs-extra/esm';
import * as unzipper from 'unzipper';
import path from 'path';
const unzipFile = ({ zipFilePath, outputPath, findFile }) => {
    let realFullpath = null;
    return new Promise((resolve, reject) => {
        fs.createReadStream(zipFilePath).
            // eslint-disable-next-line new-cap
            pipe(unzipper.Parse()).
            on('entry', function (entry) {
            const zipFileName = entry.path;
            // Search if one of the files has been found
            if (zipFileName.includes(findFile)) {
                const fullPath = path.join(outputPath, zipFileName);
                const basename = path.basename(fullPath);
                realFullpath = path.join(outputPath, basename);
                fse.ensureDirSync(outputPath);
                // Finish pipe if found
                entry.pipe(fs.createWriteStream(realFullpath)).on('finish', () => {
                    return resolve(realFullpath);
                });
            }
            else {
                entry.autodrain();
            }
        }).on('finish', () => {
            // Finish Pipe in any case
            return resolve(realFullpath);
        }).on('error', (error) => {
            return reject(error);
        });
    });
};
const unzipFileMultiple = async ({ zipFilePath, outputPath, findFiles }) => {
    const filePaths = [];
    try {
        const promiseResults = [];
        for (const findFile of findFiles)
            promiseResults.push(unzipFile({ findFile, outputPath, zipFilePath }));
        const results = await Promise.allSettled(promiseResults);
        for (const result of results) {
            if (result.status === 'rejected')
                throw new Error(result.reason);
            if (result.value)
                filePaths.push(result.value);
        }
        return Promise.resolve(filePaths);
    }
    catch (error) {
        return Promise.reject(error);
    }
};
export { unzipFile, unzipFileMultiple };

import * as fs from 'fs';
import * as fse from 'fs-extra/esm';
import * as unzipper from 'unzipper';
import path from 'path';
const unzipFile = ({ zipFilePath, outputPath, findFiles }) => {
    const filePaths = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(zipFilePath).
            // eslint-disable-next-line new-cap
            pipe(unzipper.Parse()).
            on('entry', function (entry) {
            const zipFileName = entry.path;
            let foundFile = false;
            // Search if one of the files has been found
            for (const findFile of findFiles) {
                if (zipFileName.includes(findFile)) {
                    const fullPath = path.join(outputPath, zipFileName);
                    const basename = path.basename(fullPath);
                    const realFullpath = path.join(outputPath, basename);
                    fse.ensureDirSync(outputPath);
                    entry.pipe(fs.createWriteStream(realFullpath));
                    foundFile = true;
                    filePaths.push(realFullpath);
                }
            }
            // Drain pipe in case nothing was found in
            if (foundFile === false)
                entry.autodrain();
        }).on('finish', () => {
            return resolve(filePaths);
        }).on('error', (error) => {
            return reject(error);
        });
    });
};
export { unzipFile };

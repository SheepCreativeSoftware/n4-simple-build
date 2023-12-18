import * as fse from 'fs-extra/esm';
import { fileURLToPath } from 'url';
import path from 'path';
const getAppVersion = async () => {
    const filename = fileURLToPath(import.meta.url);
    const dirname = path.dirname(filename);
    const appPackageJsonPath = path.join(dirname, '..', '..', '..', 'package.json');
    const appPackageJson = await fse.readJson(appPackageJsonPath);
    const version = appPackageJson.version;
    return version;
};
export { getAppVersion };

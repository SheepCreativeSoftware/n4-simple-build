
import { getExistingConfig, writeBuildConfig } from './storeConfig.js';
import { buntstift } from 'buntstift';

import { VersionPattern } from '../../types/VersionPattern.js';

const setVersion = async () => {
	const config = await getExistingConfig();
	config.modules.version = await buntstift.ask('Version (major.minor.patch):', {
		default: config.modules.version,
		mask: /^[0-9].+[0-9].+[0-9]/g,
	}) as VersionPattern;
	await writeBuildConfig({ config });
};

const setConfig = (options: {
	version?: boolean,
}) => {
	if(options.version) return setVersion();
	return Promise.reject(Error('Option not available'));
};

export { setConfig };

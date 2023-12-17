import { getExistingOrNewConfig, writeBuildConfig } from '../config/storeConfig.js';
import { BuildConfig } from '../../interfaces/BuildConfig/BuildConfig.js';
import { buntstift } from 'buntstift';
import { createBasicFolders } from './createBasicFolders.js';
import { createModuleMeta } from './createModuleMeta.js';
import { initCliPromt } from './initCliPromt.js';

/** Create a module config and create base folder based on questions to the user */
const initProject = async (testConfig?: BuildConfig): Promise<void> => {
	try {
		buntstift.header('Initialize Module');
		const config = await getExistingOrNewConfig();
		let newConfig = testConfig;
		if(typeof newConfig === 'undefined') newConfig = await initCliPromt({ config });
		buntstift.line();
		await writeBuildConfig({ config: newConfig });
		await createBasicFolders({ config: newConfig });
		await createModuleMeta({ config: newConfig });
	} catch (error) {
		buntstift.error('Init failed!');
		if(error instanceof Error) buntstift.error(JSON.stringify(error));
	}
};

export { initProject };

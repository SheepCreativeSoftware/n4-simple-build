import { getExistingOrNewConfig, writeBuildConfig } from '../config/storeConfig';
import { buntstift } from 'buntstift';
import { createBasicFolders } from './createBasicFolders';
import { createModuleMeta } from './createModuleMeta';
import { initCliPromt } from './initCliPromt';

const initProject = async (): Promise<void> => {
	try {
		buntstift.header('Initialize Module');
		const config = await getExistingOrNewConfig();
		const newConfig = await initCliPromt({ config });
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

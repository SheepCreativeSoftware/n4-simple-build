import { getExistingOrNewConfig, writeBuildConfig } from '../config/storeConfig';
import { buntstift } from 'buntstift';
import { createBasicFolders } from './createBasicFolders';
import { initCliPromt } from './initCliPromt';

const initProject = async (): Promise<void> => {
	try {
		buntstift.header('Initialize Module');
		const config = await getExistingOrNewConfig();
		const newConfig = await initCliPromt({ config });
		await writeBuildConfig({ config: newConfig });
		await createBasicFolders({ config: newConfig });
	} catch (error) {
		buntstift.error('Init failed!');
		if(error instanceof Error) buntstift.error(JSON.stringify(error));
	}
};

export { initProject };

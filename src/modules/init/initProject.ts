import { getExistingOrNewConfig, writeBuildConfig } from '../config/storeConfig';
import { buntstift } from 'buntstift';
import { initCliPromt } from './initCliPromt';

const initProject = async (): Promise<void> => {
	buntstift.header('Initialize Module');
	const config = await getExistingOrNewConfig();
	const newConfig = await initCliPromt({ config });
	await writeBuildConfig({ config: newConfig });
};

export { initProject };

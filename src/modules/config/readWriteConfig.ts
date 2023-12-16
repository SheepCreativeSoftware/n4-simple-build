import { addConfig } from './addConfig.js';
import { buntstift } from 'buntstift';
import { listConfig } from './listConfig.js';
import { removeConfig } from './removeConfig.js';
import { setConfig } from './setConfig.js';

const atLeastOne = 1;

/** Evaluate what to do with the config */
// eslint-disable-next-line complexity
const readWriteConfig = async (mode: 'LIST' | 'SET' | 'ADD' | 'RM', options: {
	dependency?: boolean,
	version?: boolean,
}) => {
	try {
		let returnValue = null;
		switch (mode) {
		case 'ADD':
			await addConfig(options);
			break;
		case 'LIST':
			returnValue = await listConfig(options);
			break;
		case 'RM':
			await removeConfig(options);
			break;
		case 'SET':
			await setConfig(options);
			break;
		default:
			throw new Error('Mode does not exist');
		}

		if(typeof returnValue === 'string') buntstift.info(returnValue);
		if(Array.isArray(returnValue) && returnValue.length >= atLeastOne) buntstift.table(returnValue);
		return Promise.resolve(returnValue);
	} catch (error) {
		if(error instanceof Error) {
			buntstift.error('Could not load list');
			if(error.stack) buntstift.error(error.stack);
		}
		return Promise.reject(error);
	}
};

export { readWriteConfig };

import { readJSON, writeJSON } from 'fs-extra/esm';
import { baseConfig } from './basicModuleConfig.js';
import { BuildConfig } from '../../interfaces/BuildConfig/BuildConfig.js';
import { buntstift } from 'buntstift';

import path = require('path');

const buildConfigFilePath = path.join(process.cwd(), './buildConfig.json');

/** Read existing config or provide a new default config */
const getExistingOrNewConfig = async (): Promise<BuildConfig> => {
	try {
		const config = await readJSON(buildConfigFilePath) as BuildConfig;
		return config;
	} catch {
		return baseConfig;
	}
};

/** Read existing config or provide a new default config */
const getExistingConfig = async (): Promise<BuildConfig> => {
	try {
		const config = await readJSON(buildConfigFilePath) as BuildConfig;
		return Promise.resolve(config);
	} catch (error) {
		if(error instanceof Error) {
			buntstift.error(`Error: Config file could not be found': ${buildConfigFilePath}`);
			if(error.stack) buntstift.error(error.stack);
			buntstift.info('You might need to init the project first with "n4-simple-build init" command');
		}
		return Promise.reject(error);
	}
};

/** Writes the config to the file system */
const writeBuildConfig = async ({ config }: {
	config: BuildConfig,
}) => {
	const twoSpaces = 2;
	try {
		buntstift.list('Save build config file');
		await writeJSON(buildConfigFilePath, config, { spaces: twoSpaces });
	} catch (error) {
		if(error instanceof Error) {
			buntstift.error(`Could not save build config file: ${buildConfigFilePath}`);
			if(error.stack) buntstift.error(error.stack);
		}
	}
};

export { getExistingConfig, getExistingOrNewConfig, writeBuildConfig };

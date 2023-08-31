import { readJSON, writeJSON } from 'fs-extra';
import { baseConfig } from './basicModuleConfig';
import { BuildConfig } from '../../interfaces/BuildConfig/BuildConfig';
import { buntstift } from 'buntstift';

import path = require('path');

const buildConfigFilePath = path.resolve('./', 'buildConfig.json');

/** Read existing config or provide a new default config */
const getExistingOrNewConfig = async (): Promise<BuildConfig> => {
	try {
		const config = await readJSON(buildConfigFilePath) as BuildConfig;
		return config;
	} catch {
		return baseConfig;
	}
};

/** Writes the config to the file system */
const writeBuildConfig = async ({ config }: {
	config: BuildConfig,
}) => {
	const twoSpaces = 2;
	try {
		await writeJSON(buildConfigFilePath, config, { spaces: twoSpaces });
	} catch (error) {
		if(error instanceof Error) {
			buntstift.error(`Could not save config file: ${buildConfigFilePath}`);
			if(error.stack) buntstift.error(error.stack);
		}
	}
};

export { getExistingOrNewConfig, writeBuildConfig };

import * as fse from 'fs-extra';
import { buntstift } from 'buntstift';
import { ModuleMetaFile } from '../../interfaces/moduleMeta/ModuleMetaFile';
import path = require('path');

const listDependencies = async () => {
	const moduleMetaFile = await fse.readJSON(path.resolve(process.cwd(), 'module', 'META-INF', 'module.json')) as ModuleMetaFile;
	if(typeof moduleMetaFile.module.dependencies.dependency === 'undefined') {
		buntstift.verbose('No dependecies defined');
		return Promise.resolve([]);
	}

	const thatDependencies = [];
	for(const dependency of moduleMetaFile.module.dependencies.dependency) {
		thatDependencies.push({
			name: dependency['@'].name,
			vendor: dependency['@'].vendor,
			'vendor-version': dependency['@'].vendorVersion,
		});
	}

	return Promise.resolve(thatDependencies);
};

const listConfig = (options: {
	dependency?: boolean,
}) => {
	if(options.dependency) return listDependencies();
	return Promise.reject(Error('Option not available'));
};

export { listConfig };

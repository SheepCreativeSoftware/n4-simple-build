import * as fse from 'fs-extra';
import { buntstift } from 'buntstift';
import { ModuleMetaFile } from '../../interfaces/moduleMeta/ModuleMetaFile';
import path = require('path');


const listDependencies = async () => {
	try {
		const moduleMetaFile = await fse.readJSON(path.resolve(process.cwd(), 'module', 'META-INF', 'module.json')) as ModuleMetaFile;
		if(typeof moduleMetaFile.module.dependencies.dependency === 'undefined') {
			buntstift.verbose('No dependecies defined');
			return Promise.resolve();
		}
		buntstift.header('Dependencies');
		const thatDependencies = [];
		for(const dependency of moduleMetaFile.module.dependencies.dependency) {
			thatDependencies.push({
				name: dependency['@'].name,
				vendor: dependency['@'].vendor,
				'vendor-version': dependency['@'].vendorVersion,
			});
		}
		buntstift.table(thatDependencies);
		return Promise.resolve();
	} catch (error) {
		if(error instanceof Error) {
			buntstift.error('Could not load list');
			if(error.stack) buntstift.error(error.stack);
		}
		return Promise.reject(error);
	}
};


const listConfig = async ({ dependency }: {
	dependency?: boolean,
}) => {
	if(dependency) await listDependencies();
};

export { listConfig };

import * as fse from 'fs-extra';
import { buntstift } from 'buntstift';
import { ModuleMetaFile } from '../../interfaces/moduleMeta/ModuleMetaFile';
import path = require('path');

const twoSpaces = 2;

const addDependency = async () => {
	const moduleName = await buntstift.ask('Name for the module:', { default: 'someModule' });
	const vendor = await buntstift.ask('Vendor of the module:', { default: 'The Company' });
	const version = await buntstift.ask('Version (major.minor):', {
		default: '4.10',
		mask: /^[0-9].+[0-9]/g,
	});
	const newDependency = {
		'@': {
			name: moduleName,
			vendor,
			vendorVersion: version,
		},
	};
	const moduleMetaFile = await fse.readJSON(path.resolve(process.cwd(), 'module', 'META-INF', 'module.json')) as ModuleMetaFile;
	if(moduleMetaFile.module.dependencies.dependency) moduleMetaFile.module.dependencies.dependency.push(newDependency);
	if(typeof moduleMetaFile.module.dependencies.dependency === 'undefined') moduleMetaFile.module.dependencies.dependency = [newDependency];
	await fse.writeJSON(path.resolve(process.cwd(), 'module', 'META-INF', 'module.json'), moduleMetaFile, { spaces: twoSpaces });
};

const addConfig = (options: {
	dependency?: boolean,
}) => {
	if(options.dependency) return addDependency();
	return Promise.reject(Error('Option not available'));
};

export { addConfig };

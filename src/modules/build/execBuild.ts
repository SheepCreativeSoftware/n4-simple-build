import * as fs from 'fs/promises';
import * as fse from 'fs-extra/esm';
import { COMPRESSION_LEVEL, zip } from 'zip-a-folder';
import { addLexiconToModuleMeta } from './meta/addLexiconToModuleMeta.js';
import { BuildConfig } from '../../interfaces/BuildConfig/BuildConfig.js';
import { buntstift } from 'buntstift';
import { copySrcFiles } from '../misc/copyFiles.js';
import { createManifest } from './meta/createManifest.js';
import { createModuleXml } from './meta/createModuleXml.js';
import { minifyFiles } from './minifyFiles.js';
import { ModuleMetaFile } from '../../interfaces/moduleMeta/ModuleMetaFile.js';
import path = require('path');

/**
 * Builds the files
 * @returns {Boolean} true if successfull
 */
const execBuild = async function({ config, noMinify, noPackage }: {
	config: BuildConfig,
	noMinify?: boolean,
	noPackage?: boolean,
}) {
	buntstift.header('Start build process');

	const  { buildPath, baseFolder, modules, outputPath, vendor } = config;

	const { filterFiles, type, version } = modules;

	modules.buildVersion++;

	// Construct version string
	let currentVersion = modules.lastBuildVersion+'.'+modules.buildVersion;
	if(modules.lastBuildVersion !== version) {
		// Reset build version and reconstruct version string on version change
		config.modules.lastBuildVersion = version;
		config.modules.buildVersion = 0;
		currentVersion = modules.lastBuildVersion+'.'+modules.buildVersion;
	}

	buntstift.info(`--Build module: ${modules.name} v${modules.lastBuildVersion}+${modules.buildVersion}--`);

	const modulesFolder = path.join(process.cwd(), baseFolder);
	const buildPathFolder = path.join(process.cwd(), buildPath);

	// Copy all source files into the build folder
	buntstift.info('- Copy source files');
	buntstift.verbose(`(Exclude: ${JSON.stringify(filterFiles)})`);
	await copySrcFiles({ filterFiles,
		newPath: buildPathFolder,
		oldPath: modulesFolder });

	// Create basic files
	buntstift.info('- Create module Metadata');
	const manifestData = createManifest({ vendor, version: currentVersion });

	const moduleMetaFile = await fse.readJSON(path.join(process.cwd(), 'module', 'META-INF', 'module.json')) as ModuleMetaFile;
	if(type === 'Lexicon') await addLexiconToModuleMeta({ config, moduleMetaFile });
	const moduleXmlData = createModuleXml({ buildConfig: config, moduleConfig: moduleMetaFile });

	await fse.ensureDir(path.join(buildPathFolder, 'META-INF'));

	await Promise.all([
		fs.writeFile(path.join(buildPathFolder, 'META-INF', '/MANIFEST.MF'), manifestData),
		fs.writeFile(path.join(buildPathFolder, 'META-INF', '/module.xml'), moduleXmlData),
	]);

	// Minify files from config file except for when minify is disabled or if it is a Lexicon module
	if(type !== 'Lexicon' && noMinify) {
		try {
			buntstift.info('- Minify files');
			await minifyFiles({ basePath: buildPathFolder });
		} catch (error) {
			if(error instanceof Error) buntstift.error(error.message);
		}
	}

	if(noPackage) return config;

	// Finally Zip the files and name it .jar (Must be uncompressed in never versions of N4)
	buntstift.info('- Create module');
	await zip(buildPathFolder, path.join(outputPath, `${modules.name}-${currentVersion}.jar`), {
		compression: COMPRESSION_LEVEL.uncompressed,
	});

	return config;
};

export { execBuild };

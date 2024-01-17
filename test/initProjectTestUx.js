/* eslint-disable sort-keys */
/* eslint-disable max-nested-callbacks */
/* eslint-disable no-console */
/* eslint-disable no-undef */
import * as assert from 'assert';
import * as fs from 'fs/promises';
import * as fse from 'fs-extra/esm';
import { baseConfig } from '../dist/modules/config/basicModuleConfig.js';
import { initProject } from '../dist/index.js';


const defaulTimeout = 10000;


describe('#initProjectTestUx', function () {
	// Root hook to run before every test (even in other files)
	before(async function () {
		await fse.emptyDir('./');

		const newConfig = JSON.parse(JSON.stringify(baseConfig));
		newConfig.modules.type = 'ux';

		await initProject(newConfig);
		console.log('Before Hook');
	});
	after(async function () {
		await fse.emptyDir('./');
		console.log('After Hook');
	});
	// eslint-disable-next-line no-invalid-this
	this.timeout(defaulTimeout);
	it('#Folder and files should be created for a ux module', async function () {
		const fileHandle = await fs.readdir('./', { recursive: true, withFileTypes: true });
		assert.deepEqual(fileHandle, [
			{
				'name': '.temp',
				'path': './',
			},
			{
				'name': 'buildConfig.json',
				'path': './',
			},
			{
				'name': 'module',
				'path': './',
			},
			{
				'name': 'output',
				'path': './',
			},
			{
				'name': 'signed',
				'path': './',
			},
			{
				'name': '.build',
				'path': 'module',
			},
			{
				'name': 'META-INF',
				'path': 'module',
			},
			{
				'name': 'src',
				'path': 'module',
			},
			{
				'name': 'module.json',
				'path': 'module/META-INF',
			},
			{
				'name': 'rc',
				'path': 'module/.build',
			},
		]);
	});
	it('#It should create a ux specific module meta file', async function () {
		const output = await fse.readJSON('module/META-INF/module.json');
		assert.deepEqual(output, {
			'module': {
				'@': {
					'name': 'moduleName-ux',
					'runtimeProfile': 'ux',
					'moduleName': 'moduleName',
					'buildHost': '',
					'buildMillis': '',
					'bajaVersion': '0',
					'vendor': 'The Company',
					'vendorVersion': '0.0.0',
					'description': 'Some module',
					'preferredSymbol': 'someMod',
					'nre': 'true',
					'installable': 'true',
					'autoload': 'true',
				},
				'dependencies': {},
				'dirs': '',
			},
		});
	});
	it('#It should create a ux specific buildConfig file', async function () {
		const output = await fse.readJSON('./buildConfig.json');
		assert.deepEqual(output, {
			'baseFolder': './module/src',
			'buildPath': './module/.build',
			'csv': {
				'delimiter': ';',
				'encoding': 'win1252',
				'escapeCharacter': '"',
				'exportPath': 'lex-export',
				'extension': 'csv',
				'importPath': 'lex-import',
			},
			'lexicon': {
				'defaultLang': 'en',
				'encoding': 'utf-8',
				'extension': 'lexicon',
			},
			'modules': {
				'buildVersion': 0,
				'description': 'Some module',
				'filterFiles': [
					'.d.ts',
					'.tsbuildinfo',
				],
				'lastBuildVersion': '0.0.0',
				'name': 'moduleName',
				'preferredSymbol': 'someMod',
				'version': '0.0.0',
				'type': 'ux',
			},
			'outputPath': 'output',
			'vendor': 'The Company',
		});
	});
});

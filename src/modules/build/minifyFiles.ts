import * as fs from 'fs/promises';
import { minify, Options } from 'minify';
import { buntstift } from 'buntstift';
import tryToCatch = require('try-to-catch');
import path = require('path');

/* eslint-disable id-length */
const options: Options = {
	css: {
		compatibility: '*',
	},
	html: {
		ignoreCustomComments: [/(@noSnoop)/, /(Copyright)/],
		removeAttributeQuotes: false,
		removeOptionalTags: false,
	},
	img: {
		maxSize: 4096,
	},
	js: {
		ecma: 2020,
	},
};
/* eslint-enable id-length */

const isMinifiableFile = ({ fileName }: {
	fileName: string
}) => {
	if(fileName.includes('.html')) return true;
	if(fileName.includes('.htm')) return true;
	if(fileName.includes('.css')) return true;
	if(fileName.includes('.js')) return true;
	if(fileName.includes('.mjs')) return true;
	return false;
};

/**
 * Minifies all files from the config array
 * @param {Object} param
 * @param {String} param.basePath - base folder path to files
 * @param {Array} param.paths - Array with relative path from base folder to the files
 */
const minifyFiles = async function({ basePath }: {
	basePath: string,
}) {
	const files = await fs.readdir(basePath, { recursive: true, withFileTypes: true });

	for(const file of files) {
		if(!file.isFile() || isMinifiableFile({ fileName: file.name })) continue;
		const filePath = path.join(file.path, file.name);
		buntstift.info('- Minify:' + file);
		/* eslint-disable id-denylist */
		const [error, data] = await tryToCatch(minify, filePath, options);
		if(error) buntstift.error(error.message);

		// Only write file if there was no error
		if(!error && typeof data === 'string') await fs.writeFile(filePath, data);
		/* eslint-enable id-denylist */
	}
};

export { minifyFiles };

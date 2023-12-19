/* eslint-disable sort-keys */
/* eslint-disable max-nested-callbacks */
/* eslint-disable no-console */
/* eslint-disable no-undef */
import * as assert from 'assert';
import { escapeCsvChars } from '../dist/modules/csv/export/escapeCsvChars.js';

const defaulTimeout = 10000;

const csv = {
	delimiter: ';',
	escapeCharacter: '"',
};

const testStrings = [
	'Sometext',
	'"Sometext"',
	'Sometext"',
	'"Sometext',
	'Some"text',
	';Sometext;',
	'Sometext;',
	';Sometext',
	'Some;text',
	'Sometext;',
	'"Sometext";',
	';"Sometext"',
	'"Sometext;"',
	'";Sometext"',
	'"Some" random "Text"',
	'"Some" random ;"Text"',
];

const expectedStrings = [
	'Sometext',
	'"""Sometext"""',
	'"Sometext"""',
	'"""Sometext"',
	'"Some""text"',
	'";Sometext;"',
	'"Sometext;"',
	'";Sometext"',
	'"Some;text"',
	'"Sometext;"',
	'"""Sometext"";"',
	'";""Sometext"""',
	'"""Sometext;"""',
	'""";Sometext"""',
	'"""Some"" random ""Text"""',
	'"""Some"" random ;""Text"""',
];

describe('#csv-escapeCsvChars', function () {
	// Root hook to run before every test (even in other files)
	before(function () {
		console.log('Before Hook');
	});
	after(function () {
		console.log('After Hook');
	});
	// eslint-disable-next-line no-invalid-this
	this.timeout(defaulTimeout);
	it('#Should escape CSV Chars strings', function () {
		for(let index = 0; index < testStrings.length; index++) {
			const testString = testStrings[index];
			const expectedString = expectedStrings[index];
			const output = escapeCsvChars({ csv, inputText: testString });
			assert.strictEqual(output, expectedString);
		}
	});
});

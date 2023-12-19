/* eslint-disable sort-keys */
/* eslint-disable max-nested-callbacks */
/* eslint-disable no-console */
/* eslint-disable no-undef */
import * as assert from 'assert';
import { convertCsvLine } from '../dist/modules/csv/import/convertCsvLine.js';
import { escapeCsvChars } from '../dist/modules/csv/export/escapeCsvChars.js';

const defaulTimeout = 10000;

const csv = {
	delimiter: ';',
	escapeCharacter: '"',
};

const testStrings = [
	[
		'Sometext',
		'Sometext',
		'Sometext',
		'Sometext',
	],
	[
		'"Sometext"',
		'Sometext"',
		'"Sometext',
		'Some"text',
	],
	[
		';Sometext;',
		'Sometext;',
		';Sometext',
		'Some;text',
	],
	[
		'Sometext;',
		'"Sometext";',
		';"Sometext"',
		'"Sometext;"',
	],
	[
		'";Sometext"',
		'"Some" random "Text"',
		'"Some" random ;"Text"',
		'"Some" random"; "Text"',
	],
];

const expectedStrings = [
	[
		'Sometext',
		'Sometext',
		'Sometext',
		'Sometext',
	],
	[
		'"""Sometext"""',
		'"Sometext"""',
		'"""Sometext"',
		'"Some""text"',
	],
	[
		'";Sometext;"',
		'"Sometext;"',
		'";Sometext"',
		'"Some;text"',
	],
	[
		'"Sometext;"',
		'"""Sometext"";"',
		'";""Sometext"""',
		'"""Sometext;"""',
	],
	[
		'""";Sometext"""',
		'"""Some"" random ""Text"""',
		'"""Some"" random ;""Text"""',
		'"""Some"" random""; ""Text"""',
	],
];

describe('#csv-convertCsvLine', function () {
	// Root hook to run before every test (even in other files)
	before(function () {
		console.log('Before Hook');
	});
	after(function () {
		console.log('After Hook');
	});
	// eslint-disable-next-line no-invalid-this
	this.timeout(defaulTimeout);
	it('#Should escape delimiter separated CSV Chars strings', function () {
		for(let index = 0; index < testStrings.length; index++) {
			const testString = testStrings[index];
			const expectedString = expectedStrings[index];
			let actual = '';
			let expected = '';
			for(let index2 = 0; index2 < testString.length; index2++) {
				actual += escapeCsvChars({ csv, inputText: testString[index2] })+csv.delimiter;
				expected += expectedString[index2]+csv.delimiter;
			}
			assert.strictEqual(actual, expected);
		}
	});
	it('#Should convert CSV line to normal string', function () {
		for(let index = 0; index < testStrings.length; index++) {
			const testString = testStrings[index];
			const expectedString = JSON.parse(JSON.stringify(testStrings[index]));
			let actual = '';
			for(let index2 = 0; index2 < testString.length; index2++) {
				// ...
				actual += escapeCsvChars({ csv, inputText: testString[index2] })+csv.delimiter;
			}
			const actualConverted = convertCsvLine({ csv, line: actual });
			assert.deepStrictEqual(actualConverted, expectedString);
		}
	});
});

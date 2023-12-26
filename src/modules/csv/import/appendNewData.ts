import iconv from 'iconv-lite';
import { OutputInfo } from '../../../interfaces/Lexicon/OutputInfo.js';

const appendNewData = (outputInfos: OutputInfo[], fileData: string[], encoding: string) => {
	const promiseAppend = [];

	for(let index = 0; index < outputInfos.length; index++) {
		const outputInfo = outputInfos[index];
		const lexiconData = fileData[index];

		// Don't generate output if only header is present in file
		if(typeof lexiconData === 'undefined' || lexiconData === '') continue;

		const buffer = iconv.encode(lexiconData, encoding);
		promiseAppend.push(outputInfo.fileHandle.appendFile(buffer));
		outputInfo.hasDataAdded = true;
	}
	return promiseAppend;
};

export { appendNewData };

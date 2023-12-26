import { getCurrentDateTimeString } from '../../misc/getDate.js';
import { LexiconModuleConfig } from '../../../interfaces/BuildConfig/LexiconModuleConfig.js';

const nextBuild = 1;
const lexiconFileLineEnding = '\r\n';

const generateLexiconFileHeader = ({ modules }: {
	/** Module specific config */
	modules: LexiconModuleConfig
}) => {
	let fileHeader = `# ${modules.name} ${modules.version}.${modules.buildVersion+nextBuild}${lexiconFileLineEnding}`;
	fileHeader += `# Date: ${getCurrentDateTimeString()}${lexiconFileLineEnding}`;
	return fileHeader;
};

export { generateLexiconFileHeader };

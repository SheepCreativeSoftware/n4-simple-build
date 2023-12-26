import { LexiconFileConfig } from '../../../interfaces/BuildConfig/LexiconFileConfig.js';

/** Evaluates Additional languages inside the CSV file */
const getLanguagesFromHeader = ({ headerElements, lexicon }: {
	/** Elements from CSV Header */
	headerElements: string[],

	/** Lexicon file specific config */
	lexicon: LexiconFileConfig,
}): string[] => {
	const languages = [];
	for(const headerElement of headerElements) {
		// Must be a additional language code if not empty, not "key" and not the default langauge
		if(headerElement !== '' && headerElement !== 'key' && headerElement !== lexicon.defaultLang) languages.push(headerElement);
	}
	return languages;
};

export { getLanguagesFromHeader };

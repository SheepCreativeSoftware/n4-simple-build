
import { DependencyConfig } from './DependencyConfig.js';
import { LexiconConfig } from './LexiconConfig.js';

interface ModuleMetaFile {
	module: {
		'@': {
			name: string,
			runtimeProfile: 'rt' | 'ux' | 'wb',
			moduleName: string,
			buildHost: string,
			buildMillis: string,
			bajaVersion: string,
			vendor: string,
			vendorVersion: string,
			description: string,
			preferredSymbol: string,
			nre: 'true' | 'false',
			installable: 'true' | 'false',
			autoload: 'true' | 'false',
		}
		dependencies: {
			dependency?: DependencyConfig[],
		},
		dirs: string,
		defs?: {
			def: {
				'@': {
					name: string,
					value: string,
				}
			}
		},
		lexicons?: {
			lexicon: LexiconConfig[]
		},
	}
}

export { ModuleMetaFile };

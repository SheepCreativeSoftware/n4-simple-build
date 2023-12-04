
import { DependencyConfig } from './DependencyConfig';

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
			dependency: DependencyConfig[] | undefined,
		},
		dirs: string,
	}
}

export { ModuleMetaFile };

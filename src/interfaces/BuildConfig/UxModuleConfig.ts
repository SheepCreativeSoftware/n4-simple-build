import { BaseModuleConfig } from './BaseModuleConfig.js';

interface UxModuleConfig extends BaseModuleConfig {
	type: 'ux',
	hasTypeScript: boolean,
}

export { UxModuleConfig };

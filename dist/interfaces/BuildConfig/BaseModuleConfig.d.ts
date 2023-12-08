import { VersionPattern } from '../../types/VersionPattern.js';
interface BaseModuleConfig {
    buildVersion: number;
    description: string;
    filterFiles: string[];
    lastBuildVersion: VersionPattern;
    name: string;
    preferredSymbol: string;
    version: VersionPattern;
}
export { BaseModuleConfig };

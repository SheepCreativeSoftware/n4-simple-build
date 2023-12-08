/**
 * Creates a manifest file with the current vendor and version
 * @returns manifest file content
 */
const createManifest = function ({ vendor, version }) {
    return `Manifest-Version: 1.0
Implementation-Vendor: ${vendor}
Implementation-Version: ${version}
Sealed: true`;
};
export { createManifest };

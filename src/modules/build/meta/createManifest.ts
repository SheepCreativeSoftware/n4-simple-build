
/**
 * Creates a manifest file with the current vendor and version
 * @returns manifest file content
 */
const createManifest = function({ vendor, version }: {
	/** Vendor name */
	vendor: string,

	/** Version of the tool */
	version: string,
}): string {
	return `Manifest-Version: 1.0
Implementation-Vendor: ${vendor}
Implementation-Version: ${version}
Sealed: true`;
};

export { createManifest };

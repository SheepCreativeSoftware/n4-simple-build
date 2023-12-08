/**
 * Creates a manifest file with the current vendor and version
 * @returns manifest file content
 */
declare const createManifest: ({ vendor, version }: {
    /** Vendor name */
    vendor: string;
    /** Version of the tool */
    version: string;
}) => string;
export { createManifest };

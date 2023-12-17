/** Reads the modulename from the module.xml file */
declare const getModuleData: ({ encoding, filePath }: {
    encoding: string;
    filePath: string;
}) => Promise<[string, boolean]>;
export { getModuleData };

/** Reads the modulename from the module.xml file */
declare const getModuleName: ({ encoding, filePath }: {
    encoding: string;
    filePath: string;
}) => Promise<string>;
export { getModuleName };

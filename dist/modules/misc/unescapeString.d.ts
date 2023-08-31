/**
 * Unescapes a string with '\uXXXX'-Escapes
 * @returns Unescaped string
 */
declare const unescapeString: ({ text }: {
    /** Text to be unescaped */
    text: string;
}) => string;
export { unescapeString };

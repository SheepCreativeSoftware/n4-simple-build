/**
 * Escapes a string with '\uXXXX'-Escapes
 * @returns Escaped string
 */
declare const escapeString: ({ text }: {
    /** Text to be escaped */
    text: string;
}) => string;
export { escapeString };

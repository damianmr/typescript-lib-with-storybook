// A stub file to return in Jest's tests whenever a CSSf ile is required/imported.
/**
 * This is rather limited. If we find that returning a simple stylesheet rule is holding us
 * from making a good test, then we could change the jestFileTransformer.js file so that it
 * returns some sort of stylesheet based on the name of the imported file.
 */
export const color = 'inherit';

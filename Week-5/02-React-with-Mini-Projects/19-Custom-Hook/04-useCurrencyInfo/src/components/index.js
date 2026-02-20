/**
 * Centralized Export:
 * By using 'index.js' file, all components or modules in a directory
 * can be exported from a single place. For example, if you have multiple
 * components in the same folder(InputBox, Button, Header, etc), you
 * can centralize their exports.
 * 
 * Instead of importing each component individually in another file,
 * you can import them all at once.
*/

import InputBox from "./InputBox";

export { InputBox }
/**
 * The Module System: default export
 * - Default exports provide a convenient way to export a single, often
 *   used entity from a module without requiring other modules to use
 *   a specific name or syntax to import it.
 * - The key difference between named and default import/export is that
 *   named exports allow multiple functions to be exported from a module,
 *   whereas default exports only allow one function to be designated
 *   as the default export and need to be used without parentheses.
*/

const square = (a) => a * a;

export default square;
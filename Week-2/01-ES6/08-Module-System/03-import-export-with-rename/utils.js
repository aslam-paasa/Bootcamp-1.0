/**
 * Import/Export with rename:
 * - 'add' is defined in a module '/utils.js' and export using the 
 *   'export' keyword with a renamed identifier using the 'as' keyword.
 * - The renamed 'sum' is exported instead of the original 'add', so
 *   that can be imported with the new name using the 'import' statement
 *   in another module.
 * - In the '/app.js' module, the 'import' keyword is used to import
 *   the 'sum' from the 'utils.js', but it is given a new name 'xyz'
 *   using the 'as' keyword.
 * - This allows the function to be used in the importing module with
 *   the new name while still referring to the original function defined
 *   in the exporting module.
 * 
 * - Renaming imports and exports can be helpful in several scenarios,
 *   such as:
 *   1. Avoiding naming conflicts
 *   2. Simplifying the code
 *   3. Adapting to renaming conventions:
*/

const add = (x, y) => x + y;

export { add as sum };
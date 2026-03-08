/**
 * Interfaces with Optional Properties:
 * - interface InterfaceName {
 *      propertyName: propertyType;
 *      **anotherPropertyName?**: anotherPropertyType;
 *   }
*/

/**
 * Q. Create an interface Book with the following properties:
 *    - title(string)
 *    - author(string)
 *    - year(number)
 *    - genre(string, optional)
 * 
 * => Todo
 *    - Define two books one with genre and another without it. See if
 *      the one without that key gives an error.
 *    - Now try this without optional property and see the errors. Did
 *      you learn something?
*/

interface Book {
    title: string
    author: string
    year: number
    genre?: string
}
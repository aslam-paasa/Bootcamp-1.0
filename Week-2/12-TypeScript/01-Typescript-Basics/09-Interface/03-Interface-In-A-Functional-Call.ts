/**
 * Using interface in a function call:
 * - interface InterfaceName {
 *      propertyName: propertyType
 *      anotherProperty: anotherPropertyType
 *   }
 * - function functionName(parameter: InterfaceName): functionReturnType{}
*/

/**
 * Q. Define a fn displayPerson that takes a parameter of type Person
 *    and consoles a message like "Name: [Name], Age: [Age]".
*/

interface Person {
    name: string
    age: number
}

function displayPerson(person: Person): void {
    console.log(`Name: ${person.name}, Age: ${person.age}`)
}

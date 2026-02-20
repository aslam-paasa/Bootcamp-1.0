/**
 * Function that converts object types:
 * type Type1 = {
 *   ...
 *   ...
 * };
 * 
 * type Type2 = Type1 & {
 *   ...
 *   ...
 * }
 * 
 * function functionName(parameter:Type1): Type2 {}
 * */ 

/**
 * Q. Define a function convertPersonToStudent that takes an object
 *    of type Person and returns an object of type Student. The Person
 *    object has properties name(string) and age(number), while the
 *    Student object should have properties name(string), age(number),
 *    and studentId(string).
*/

type Person = {
    name: string;
    age: number;
};

type Student = Person & {
    studentId: string;
};

function convertPersonToStudent(person: Person): Student {
    return { ...person, studentId: "S123" };
}
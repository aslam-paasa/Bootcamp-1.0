/**
 * Q. Define an object named personDetails with properties:
 *    a. name(string)
 *    b. age(number)
 *    c. hobbies(array of strings)
 *    d. address(object) with properties:
 *       i. street(string)
 *       ii. city(string)
 *    e. isStudent(boolean)
 *    f. scores(array of numbers)
 *    g. extraInfo(null)
 * */ 

let personDetails: {
    name: string;
    age: number;
    hobbies: string[];
    address: {
        street: string;
        city: string;
    };
    isStudent: boolean;
    scores: number[];
    extraInfo: null;
} = {
    name: 'Jane',
    age: 25,
    hobbies: ['reading', 'hiking'],
    address: {
        street: '123 Main St',
        city: 'Cityville',
    },
    isStudent: false,
    scores: [90, 85, 78],
    extraInfo: null
}
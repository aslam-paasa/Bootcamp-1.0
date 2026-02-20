/**
 * 1. Define a type Person which has properties name(String) and age(number).
 * 2. Define a type Student which extends Person and adds a property
 *    studentId(string).
 * 3. Define a type Teacher which extends Person and adds a property
 *    subject(string).
 * 
 * Note: Extends means we want everything which is in:
 *       (a) Person & Student
 *       (b) Person & Teacher
 * */ 


type Person = {
    name: string;
    age: number;
};

type Student = Person & {
    studentId: string;
};

type Teacher = Person & {
    subject: string;
}
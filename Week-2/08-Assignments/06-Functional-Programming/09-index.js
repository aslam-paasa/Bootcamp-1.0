/**
 * Write an ES6 fn that takes an array of objects representing students
 * with properties name and grade. Return the first student object that
 * has a grade of "A".
*/

const students = [
    { name: "John", grade: "B" },
    { name: "Mary", grade: "A" },
    { name: "Sam", grade: "C" },
    { name: "Sarah", grade: "A" },
];

// Your code here

const studentWithGradeA = findStudentWithGradeA(students);
console.log(studentWithGradeA);
// Output: { name: "Mary", grade: "A" }
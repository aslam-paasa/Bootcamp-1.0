/**
 * Optional Parameters
 * - You can make properties optional by adding a question mark (?) after 
 *   the property name.
 * 
 *   interface User {
 *     name: string; 
 *     age: number; 
 *     address?: { // Optional property for the user's address.
 *       city: string; 
 *       country: string; 
 *       pincode: number; 
 *     };
 *   }
*/

interface Users {
    name: string; 
    age: number; 
    address?: { // Optional property for the user's address
        city: string; 
        country: string; 
        pincode: number; 
    };
}

/**
 * Q. Create a user object that matches the defined interface structure.
 * 
 *    a. Arguments - user
 *    b. Returns  - void
 *    c. Logs     - User is an adult!
*/
let user1: Users = {
    name: "Rohan Dev", 
    age: 23, 
    address: { 
        city: "Panagarh",
        country: "India",
        pincode: 713148
    }
};



/**
 * Q. Create another user object without the optional address field.
 *    a. Arguments - user
 *    b. Returns  - void
 *    c. Logs     - User is an adult!
 * 
 * - Since 'address' is optional, it is not included here.
 * - However, if 'address' is included, all fields (city, country, pincode) 
 *   must be specified.
 * 
 * - Invalid structure will throw an error.
 *   address {
 *     pincode: 123456 // Missing 'city' and 'country' fields, so this would throw an error.
 *   }
 * - To make individual fields of 'address' optional, you need to mark each 
 *   field with '?'.
 *   address?: { 
 *      city?: string; 
 *      country?: string; 
 *      pincode?: number; 
 *   }
*/

let user2: Users = {
    name: "Gaurav", 
    age: 22
};

if (user2.age > 18) {
    console.log("User is an adult!");
}




/**
 * Repeating Parameters
 * - You can create interfaces that contain multiple properties with the same
 *   name.
 * 
 *   interface Subject {
 *     subject1: string;
 *     subject2: string;
 *     subject3: string;
 *   }
*/

/**
 * Q. Create an interface for subjects, containing three subject properties.
 * 
 *    a. Arguments - subject
 *    b. Returns  - void
 *    c. Logs     - Subject is an adult!
*/
interface Subject {
    subject1: string;
    subject2: string;
    subject3: string;
}

/**
 * Q. Create an interface for a student, which includes a name, roll number, 
 *    and an optional subjects property of type Subject.
 * 
 *    a. Arguments - student
 *    b. Returns  - void
 *    c. Logs     - Student is an adult!
*/
interface Student {
    name: string;
    rollNo: number;
    subjects?: Subject; // Optional property
}

/**
 * Q. Create an interface for a teacher, which includes a name and 
 *    an optional subjects property of type Subject.
 * 
 *    a. Arguments - teacher
 *    b. Returns  - void
 *    c. Logs     - Teacher is an adult!
*/
interface Teacher {
    name: string;
    subjects?: Subject; // Optional property
}

/**
 * Q. Create a student object with subjects.
 * 
 *    a. Arguments - student
 *    b. Returns  - void
 *    c. Logs     - Student is an adult!
*/
const student1: Student = {
    name: "Rohan Dev Singh",
    rollNo: 1,
    subjects: {
        subject1: "Physics",
        subject2: "Chemistry",
        subject3: "Mathematics",
    },
};

/**
 * Q. Create a teacher object without subjects.
 * 
 *    a. Arguments - teacher
 *    b. Returns  - void
 *    c. Logs     - Teacher is an adult!
*/
const teacher1: Teacher = {
    name: "Mr. X",
};


/**
 * Output examples
 * 
 *    a. Arguments - student
 *    b. Returns  - void
 *    c. Logs     - Student is an adult!
*/
console.log("Student Information:");
console.log(`Name: ${student1.name}`);
console.log(`Roll Number: ${student1.rollNo}`);
if (student1.subjects) {
    console.log("Subjects:");
    console.log(`  Subject 1: ${student1.subjects.subject1}`);
    console.log(`  Subject 2: ${student1.subjects.subject2}`);
    console.log(`  Subject 3: ${student1.subjects.subject3}`);
}

console.log("\nTeacher Information:");
console.log(`Name: ${teacher1.name}`);
if (teacher1.subjects) {
    console.log("Subjects assigned.");
} else {
    console.log("No subjects assigned.");
}
/**
 * Object Utility Methods:
 * > JavaScript objects by default mutable hote hain - aap koi bhi property 
 *   add, delete ya update kar sakte hain. 
 * > But real world applications mein aisa nahi hona chahiye!
 * 
 * Real World Examples:
 * > Bank Account: Account Number change nhi hona chaiye
 * > Student Roll Number: Permanent hona chaiye
 * > Product Price: Fixed rahna chaiye
 * > User Roles: Admin, User, Guest fixed honi chaiye
 * 
 * Solution: JS ne diye hai special methods jo objects ko control karte hai
*/


/**
 * Step 1: delete - Properties Remove karna
 * > Agar aap object ki koi property permanently remove karna chahte hai,
 *   toh 'delete' operator use karein.
*/


/* Example 1: Delete Properties from Object */

/* Step 1: Object banayein */
let student = {
  name: "Rahul",
  age: 20,
  city: "Delhi",
  phone: "9876543210"
};
console.log("\n✅ Original Student:", student);

/* Step 2: Property delete karein */
delete student.city;    // city property remove ho gayi
delete student.phone;   // phone property remove ho gayi
console.log("\n✅ After Deleting Properties:", student);


/* Example 2: Remove Object Properties */

/* Step 1: Cart object banayein */
const cart = {
  items: ["Laptop", "Mouse", "Keyboard"],
  total: 55000,
  discount: 1000,
  coupon: "WELCOME10"
};
console.log("\n🛒 Original Cart:", cart);

/* Step 2: Coupon use karne ke baad remove kar dena */
delete cart.coupon;
console.log("\n🛒 After Using Coupon:", cart);



/**
 * Step 2: Object.freeze() - Permanent Lock
 * > Object ko completely lock kar deta hai
 * > Koi changes nahi kar sakte:
 *   a. New properties add nahi kar sakte
 *   b. Existing properties delete nahi kar sakte
 *   c. Existing properties update nahi kar sakte
 * > Syntax: Object.freeze(yourObj)
 * 
 * > Why this is needed? 
 *   JS objects are by default mutable. You can always add, delete or update
 *   keys. But what if you want to read-only constants? To solve that,
 *   freeze() was born.
 * 
 * > What problem does it solve?
 *   It makes the object completely read-only. You can't
 *   > Change values
 *   > Add new keys
 *   > Delete keys
 *   > Perfect for constants, settings, environment values, etc.
*/

/**
 * When to use:
 * a. Configuration settings jo change nahi honi chahiye
 * b. Constants jaise prices, roles, types
 * c. Default values jo fixed rehne chahiye
*/

/* Example 1: Freeze Product Object */

/* Step 1: Product object banayein */
const product = {
  name: "iPhone 14",
  price: 79999,
  color: "Black",
  category: "Electronics"
};
console.log("\n✅ Original Product:", product);

/* Step 2: Product ko freeze karna - ab koi change nahi kar sakta */
Object.freeze(product);
console.log("\n✅ Product is frozen now!");

/* Step 3: Ab changes try karein */
product.price = 69999;           // ❌ Price change nahi hoga
product.storage = "128GB";       // ❌ New property add nahi hogi  
delete product.category;         // ❌ Property delete nahi hogi

console.log("\n📱 After Trying Changes:", product);
console.log("\n✅ Product unchanged - Freeze is working!");



/* Example 2: Freeze User Roles Object */

/* Step 1: User roles object banayein */  
const USER_ROLES = Object.freeze({
  ADMIN: "admin",
  MODERATOR: "moderator",
  USER: "user",
  GUEST: "guest"
});
console.log("\n👥 User Roles:", USER_ROLES);

/* Step 2: Changes try karein */
USER_ROLES.SUPER_ADMIN = "super_admin";  // ❌ Add nahi hoga
USER_ROLES.ADMIN = "administrator";      // ❌ Update nahi hoga
delete USER_ROLES.GUEST;                 // ❌ Delete nahi hoga
console.log("\n👥 Roles After Changes:", USER_ROLES);


/**
 * When not to use:
 * a. Jab aapko object update karna ho baad mein
 * b. Jab object ke andar nested objects ho (shallow freeze hota hai)
*/







/**
 * 2. Object.seal() - Lock Structure but allow editing
 *    > Object ki structure lock kar deta hai lekin values update (add/remove)
 *      kar sakte hain.
 *    > Allowed: Existing properties update kar sakte hain
 *    > Not Allowed:
 *      a. New properties add nahi kar sakte
 *      b. Existing properties delete nahi kar sakte
 *    > Syntax: Object.seal(yourObj)
*/

/**
 * Why this method exists?
 * - Sometimes, you want to protect the structure of an object (i.e., don't
 *   want anyone adding or removing keys), but still want to allow changes
 *   to values.
*/

/**
 * What problem it solves:
 * - It prevents accidental structural changes while still allowing updates.
*/

/**
 * When to use:
 * > Jab object ki structure fixed rakhni ho
 * > Lekin values update karne ki permission ho
 * > Form data jahan fields fixed hain but values change ho sakti hain
*/

/**
 * When not to use:
 * - When you need to dynamically add or delete keys.
 * - When you need to deeply seal an object.
*/


/**
 * Example 1: Admin Object
 * > Admin object structure should stay the same, but role can be updated:
 */

const admin = {
  name: "Aslam",
  role: "moderator"
};

/**
 * Object ko seal karna
 */
Object.seal(admin);

/**
 * Ab koi bhi changes nahi kar sakta
 */
admin.role = "admin";    // ✅ Allowed
admin.status = "active"; // ❌ Not allowed
delete admin.name;       // ❌ Not allowed


/**
 * Checking if object is sealed
 */
console.log("Is admin sealed?", Object.isSealed(admin)); // true





/**
 * Example 2: Student Database
 * > Imagine aap ek school ka database bana rahe hain jahan student ki basic 
 *   information (name, roll number) permanent rakhni hai, lekin marks update 
 *   ho sakte hain.
 * 
 * > Aap nahi chahte ki koi accidentally student ki basic info delete ya 
 *   add kar de.
*/

/**
 * Ex-1: Student object without seal
 */
const studentWithoutSeal = {
  name: "Rahul Sharma",
  rollNumber: "STU001"
}

console.log("Original student data:", studentWithoutSeal);

/**
 * Without seal, we can delete and add properties
 */
delete studentWithoutSeal.rollNumber;  // deleting roll number
console.log("After deleting roll number:", studentWithoutSeal);

studentWithoutSeal.marks = 85;  // adding marks
console.log("After adding marks:", studentWithoutSeal);



/**
 * Ex-2: Student object with seal
 */
const studentWithSeal = {
  name: "Priya Patel",
  rollNumber: "STU002"
}

/**
 * Object ko seal karna
 */
Object.seal(studentWithSeal);
console.log("Original sealed student:", studentWithSeal);

/**
 * Ab koi bhi new property add nahi kar sakta
 */
delete studentWithSeal.rollNumber;  // roll number delete nahi hoga
console.log("After trying to delete roll number:", studentWithSeal);

studentWithSeal.marks = 90;  // marks add nahi honge
console.log("After trying to add marks:", studentWithSeal);


/**
 * Example 3: User Profile
*/

/* Step 1: User profile object banayein */
const userProfile = {
  username: "rahul_kumar",
  email: "rahul@example.com",
  age: 25
};
console.log("\n👤 Original Profile:", userProfile);

/* Step 2: Profile ko seal karna */
Object.seal(userProfile);
console.log("\n👤 Profile is sealed now!");

/* Step 3: Allowed changes */
userProfile.age = 26;                      // ✅ Age update kar sakte hain
userProfile.email = "rahul.new@email.com"; // ✅ Email update kar sakte hain

/* Step 4: Not allowed changes */
userProfile.isAdmin = true;                // ❌ New property add nahi kar sakte
delete userProfile.username;               // ❌ Existing property delete nahi kar sakte
console.log("\n👤 Final Profile:", userProfile);

/**
 * Practical Use Cases:
 * 1. Student Database: Basic info (name, roll number) sealed, marks updatable
 * 2. Employee Records: Permanent details sealed, performance metrics updatable
 * 3. Product Catalog : Basic product info sealed, stock/price updatable
 * 4. User Profiles   : Core information sealed, preferences updatable
*/




/**
 * 3. Object.is() - Precise Value Comparison
 * > Normal === operator kuch cases mein sahi se kaam nahi karta.
 * > Example:
 *   a. NaN === NaN is false (weird right?)
 *   b. +0 === -0 is true, but they're technically different.
 * > Solution: Object.is() - It gives accurate comparisons especially for:
 *   a. NaN
 *   b. +0 vs -0
 * > Syntax: Object.is(value1, value2)
*/

/**
 * When to use:
 * a. Comparing two values where accuracy really matters.
 * b. Avoiding buggy behavior with NaN or 0.
*/

/**
 * When not to use:
 * - For simple number or string comparisons, === is enough.
*/


/* Example 1: NaN comparison */
const a = NaN;
const b = NaN;

console.log(Object.is(a, b)); // ✅ true
console.log(a === b);         // ❌ false

/* Example 2: +0 and -0 comparison */
const zeroA = +0;
const zeroB = -0;

console.log(Object.is(zeroA, zeroB)); // ❌ false
console.log(zeroA === zeroB);         // ✅ true


/**
 * Real World Example: Calculator App
 * You're building a calculator app and want to detect if the input is
 * truly NaN.
*/


/* Step 1: Function banayein */
function calculateDivision(a, b) {
  const result = a / b;
  
  /* Check if result is NaN */
  if (Object.is(result, NaN)) {
    return "Error: Invalid calculation!";
  }
  
  /* Check if result is Infinity */
  if (!isFinite(result)) {
    return "Error: Division by zero!";
  }
  
  return result;
}

/* Step 2: Test cases */
console.log("🧮 Calculator Tests:");
console.log("10 / 2 =", calculateDivision(10, 2));       // ✅ 5
console.log("10 / 0 =", calculateDivision(10, 0));       // ✅ Error
console.log("0 / 0 =", calculateDivision(0, 0));         // ✅ Error
console.log("NaN check =", calculateDivision("abc", 2)); // ✅ Error




/**
 * 4. Object.isSealed() - Check if Object is Sealed
 * > This method checks if an object is sealed.
 * > Sealed objects are those that cannot have new properties added to them,
 *   but existing properties can be modified.
 * > Returns: true if object is sealed, false if not.
 * > Syntax: Object.isSealed(obj)
*/

/**
 * Why this method exists?
 * - To check if an object is sealed.
*/

/**
 * What problem it solves:
 * - Helps you debug and verify whether an object has been sealed.
*/

/**
 * When to use:
 * a. In codebases where sealing/freeze is applied - you want to verify it
 *    at runtime.
 * b. In testing or debug environments.
*/

const obj = { name: "Aslam" };
console.log(Object.isSealed(obj)); // false
Object.seal(obj);
console.log(Object.isSealed(obj)); // true


/**
 * Real World Example: Student Database System
 * - Imagine aap ek school ka database system bana rahe hain jahan:
 *   a. Student ka basic information (name, roll number) change nahi hona 
 *      chahiye
 *   b. Lekin marks update karne ki permission honi chahiye
*/

/**
 * Student ka basic information
 */
const studentRecord = {
  name: "Rahul Sharma",
  rollNumber: "2024CS001"
};

/**
 * a. Check karenge ki student record sealed hai ya nahi
 */
console.log("Kya student record sealed hai?", Object.isSealed(studentRecord)); // false

/**
 * b. Ab hum student record ko seal kar denge
 */
Object.seal(studentRecord);

/**
 * c. Dobara check karenge
 */
console.log("Kya student record sealed hai?", Object.isSealed(studentRecord)); // true

/**
 * d. Ab ye changes possible hain:
 */
studentRecord.marks = 85; // Error: Cannot add property marks
studentRecord.name = "Rahul Kumar"; // Works: Can modify existing property


/**
 * Example 2: Quality Check System
*/

/* Step 1: Function banayein */
function validateStudentRecord(student) {
  console.log("🔍 Checking Student Record...");
  
  if (Object.isSealed(student)) {
    console.log("✅ Student record properly sealed - Structure protected!");
    return true;
  } else {
    console.log("❌ Student record NOT sealed - Structure can be modified!");
    return false;
  }
}

/* Step 2: Test cases */
/* Test case 1: Without seal */
const student1 = {
  name: "Amit",
  rollNumber: "STU001"
};

/* Check if student record is sealed */
console.log("\nTest 1 - Without Seal:");
console.log(validateStudentRecord(student1));

/* Test case 2: With seal */
const student2 = {
  name: "Neha", 
  rollNumber: "STU002"
};

/* Seal the student record */
Object.seal(student2);

/* Check if student record is sealed */
console.log("Test 2 - With Seal:");
console.log(validateStudentRecord(student2));


/**
 * Example 3: Database Validation
*/

/* Step 1: Database config object banayein */
const databaseConfig = {
  host: "localhost",
  port: 5432,
  username: "admin"
};

/* Step 2: Function banayein */
function checkConfigSecurity(config) {
  if (Object.isSealed(config)) {
    console.log("🔒 Database config secured - No structural changes allowed");
    return true;
  } else {
    console.log("⚠️  Warning: Database config not secured!");
    console.log("   Sealing the config now...");
    Object.seal(config);
    return false;
  }
}

/* Step 3: Check if database config is sealed */
console.log("Is config sealed?", checkConfigSecurity(databaseConfig));
console.log("Checking again after sealing...");
console.log("Is config sealed now?", checkConfigSecurity(databaseConfig));





/**
 * 5. Object.isFrozen() - Check if Object is Frozen
 * - This method checks if an object is frozen i.e. read-only.
 * - Frozen objects are those that cannot have new properties added to them,
 *   and existing properties cannot be modified.
 * 
 * - Syntax: Object.isFrozen(obj)
 */

/**
 * What problem it solves:
 * - Confirms if Object.freeze() worked properly or not.
*/

/**
 * When to use:
 * a. During unit testing or debugging.
 * b. When dealing with config/data that should never change.
*/

const objFrozen = { status: "readonly" };
console.log(Object.isFrozen(objFrozen)); // false
Object.freeze(objFrozen);
console.log(Object.isFrozen(objFrozen)); // true


/**
 * Real World Example: Bank Account System
 * Imagine aap ek bank ka system bana rahe hain jahan:
 * - Account holder ka basic information (name, account number) change nahi 
 *   hona chahiye
 * - Koi bhi changes na ho sake account details mein
*/

/**
 * Bank account ka basic information
 */
const bankAccount = {
  accountHolder: "Priya Patel",
  accountNumber: "SB1234567890"
};

/**
 * a. Check karenge ki account frozen hai ya nahi
 */
console.log("Kya account frozen hai?", Object.isFrozen(bankAccount)); // false

/**
 * b. Ab hum account ko freeze kar denge
 */
Object.freeze(bankAccount);

/**
 * c. Dobara check karenge
 */
console.log("Kya account frozen hai?", Object.isFrozen(bankAccount)); // true

/**
 * Ab ye changes possible nahi hain:
 */
// bankAccount.balance = 5000; // Error: Cannot add property balance
// bankAccount.accountHolder = "Priya Sharma"; // Error: Cannot modify existing property




/**
 * Summary:
 * 1. Object.freeze(obj) : 
 *    > Prevents all changes (add, remove, modify)
 *    > Complete read-only banata hai
 * 2. Object.seal(obj): 
 *    > Prevents adding/deleting properties, but allows updates
 *    > Structure protect karta hai, values change kar sakte hain
 * 3. Object.is(a, b): 
 *    > Comapres values (better than === in edge cases)
 *    > NaN aur ±0 ke liye better comparison
 * 4. Object.isSealed(obj) : Checks if object is sealed
 * 5. Object.isFrozen(obj) : Checks if object is frozen
*/

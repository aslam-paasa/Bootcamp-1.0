/**
 * Update Objects:
*/

/**
 * Mutable vs Immutable in JavaScript:
 * - Before we go deep, let's first understand the terms:
 *   a. Mutable   → Something that 'can be changed/updated' after creation.
 *   b. Immutable → Something that 'cannot be changed' after creation.
 * 
 * Think like this:
 * a. If I create a file and I can 'edit its content later', it's mutable.
 * b. If I write something on a stone and I can't change it, it's immutable.
 */

/**
 * In JavaScript:
 * a. Objects → Mutable      ✔️  (change ho sakti hai)
 * b. Arrays  → Also Mutable ✔️  (change ho sakti hai)
 * c. Strings → Immutable    ❌
 * d. Numbers → Immutable    ❌
 * e. Booleans → Immutable   ❌
*/


/**
 * Updating Objects Using Object Literal: (Mutable)
*/

/**
 * Example-1: Updating object using Object Literal
 * > We have created a student object with some properties.
 * > We can update the properties of the object like
*/

/* Step 1: Pehle object banayein */
const student = {
  name: "Rahul",
  rollNumber: 5,
  isDayScholar: true,
  subjects: ["maths", "english", "hindi"],
  marks: 85
};

console.log("✅ Pehle student ka data:");
console.log(`Name: ${student.name}`);
console.log(`Roll Number: ${student.rollNumber}`);
console.log(`Marks: ${student.marks}`);

/* Step 2: Ab object ki properties ko update karein */
student.rollNumber = 10;      // Roll number change kiya
student.marks = 92;           // Marks improve kiye
student.name = "Rahul Kumar"; // Name update kiya

console.log("\n✅ Update ke baad student ka data:");
console.log(`Name: ${student.name}`);
console.log(`Roll Number: ${student.rollNumber}`);
console.log(`Marks: ${student.marks}`);

/* Step 3: Nayi property bhi add kar sakte hain */
student.city = "Delhi";
student.phone = "9876543210";

console.log("\n✅ Nayi properties add karne ke baad:");
console.log(`City: ${student.city}`);
console.log(`Phone: ${student.phone}`);


/**
 * What’s happening here?
 * - We created the object `student` using Object Literal.
 * - Later, we 'updated' its roll number, marks, name and added new properties
 *   using :
 *   > student.rollNumber = 10, 
 *   > student.marks = 92, 
 *   > student.name = "Rahul Kumar", 
 *   > student.city = "Delhi", 
 *   > student.phone = "9876543210".
 * - This is possible because objects in JavaScript are 'mutable'.
 */

/**
 * Output:
 * ✅ Pehle student ka data:
 *    Name: Rahul
 *    Roll Number: 5
 *    Marks: 85
 * 
 * ✅ Update ke baad student ka data:
 *    Name: Rahul Kumar
 *    Roll Number: 10
 *    Marks: 92
 * 
 * ✅ Nayi properties add karne ke baad:
 *    City: Delhi
 *    Phone: 9876543210
*/

/**
 * Example 2: Updating Shopping Cart Object using Object Literal
*/

/* Step 1: Shopping cart banayein */
const shoppingCart = {
  customerName: "Priya",
  items: [],
  totalAmount: 0,
  discount: 0
};

/* Step 2: Pehle state */
console.log("🛒 Shopping Cart - Start:");
console.log(`Customer: ${shoppingCart.customerName}`);
console.log(`Items: ${shoppingCart.items.length}`);
console.log(`Total: ₹${shoppingCart.totalAmount}`);

/* Step 3: Cart ko update karein */
shoppingCart.items.push("Laptop");
shoppingCart.items.push("Mouse");
shoppingCart.totalAmount = 55000;
shoppingCart.discount = 1000;

console.log("\n🛒 Shopping Cart - After Adding Items:");
console.log(`Items: ${shoppingCart.items.join(", ")}`);
console.log(`Total: ₹${shoppingCart.totalAmount}`);
console.log(`Discount: ₹${shoppingCart.discount}`);
console.log(`Final Amount: ₹${shoppingCart.totalAmount - shoppingCart.discount}`);

/* Step 4: Aur updates */
shoppingCart.items.push("Laptop Bag");
shoppingCart.totalAmount = 58000;

console.log("\n🛒 Shopping Cart - Final State:");
console.log(`Items: ${shoppingCart.items.join(", ")}`);
console.log(`Final Amount: ₹${shoppingCart.totalAmount - shoppingCart.discount}`);



/**
 * Updating Objects Using 'new' keyword: (Mutable)
*/

/* Step 1: new Object() se object banayein */
const newStudent = new Object();

/* Step 2: Pehle properties set karein */
newStudent.name = "Anjali";
newStudent.rollNumber = 15;
newStudent.isDayScholar = false;
newStudent.subjects = ["science", "maths", "sst"];

console.log("🎓 New Student - Initial Data:");
console.log(`Name: ${newStudent.name}`);
console.log(`Roll Number: ${newStudent.rollNumber}`);

/* Step 3: Properties update karein */
newStudent.rollNumber = 21;
newStudent.isDayScholar = true;  // Hosteller se Day Scholar ban gaya
newStudent.subjects.push("computer"); // Naya subject add kiya

console.log("\n🎓 New Student - After Updates:");
console.log(`Name: ${newStudent.name}`);
console.log(`Roll Number: ${newStudent.rollNumber}`);
console.log(`Day Scholar: ${newStudent.isDayScholar ? "Yes" : "No"}`);
console.log(`Subjects: ${newStudent.subjects.join(", ")}`);


/**
 * Mutable Array:
*/

/* Step 1: Students array banayein */
const students = ["Rahul", "Priya", "Amit"];
console.log("📚 Original Students Array:");
console.log(students);

/* Step 2: Array ko modify karein */
students[1] = "Priyanka";    // Element change kiya
students.push("Neha");       // Naya element add kiya
students.pop();              // Last element remove kiya

console.log("\n📚 Modified Students Array:");
console.log(students);
console.log("✅ Arrays bhi mutable hote hain - change ho sakte hain!");


/**
 * Summary So Far:
 * - Objects are mutable : You can update/change properties later.
 * - This makes objects flexible and useful when you want to:
 *   a. update user profile
 *   b. modify settings
 *   c. change state/data dynamically
 */





/**
 * Immutable values (like strings, numbers):
 */

/**
 * Example 1: String Immutability
*/
let studentName = "Mohammad";
console.log("📝 String Immutability Test:");
console.log(`Original Name: ${studentName}`);

/* String ko direct change karne ki koshish karein */
studentName[0] = "Z";  // Ye kaam nahi karega!
console.log(`After trying to change first letter: ${studentName}`);
console.log("❌ String change nahi hua - Kyuki strings immutable hote hain!");

/* Correct tarika: Puri string ko replace karein */
studentName = "Zohammad";  // Naya string assign karein
console.log(`✅ Correct way - New string: ${studentName}`);


/**
 * Example 2: Number Immutability
*/
let studentAge = 20;

console.log("\n🔢 Number Immutability:");
console.log(`Original Age: ${studentAge}`);

/**
 * Number ko change karne ka koi direct tarika nahi hai
 * Aap sirf naya value assign kar sakte hain
*/
studentAge = 21;  // Naya value assign kiya
console.log(`After update: ${studentAge}`);




/**
 * When to use Mutable (Objects/Arrays)?
 * > When you want to 'update/change/edit' data.
 * > For example: A shopping cart, user profile, app settings, etc.
*/

/* Example 1: User Profile - Update ho sakta hai */

/* Step 1: User profile banayein */
const userProfile = {
  name: "Rahul",
  email: "rahul@example.com",
  preferences: { theme: "dark", language: "hindi" }
};

/* Step 2: User apna profile update kar sakta hai */
userProfile.name = "Rahul Sharma";
userProfile.preferences.theme = "light";



/* Example 2: Shopping Cart - Items add/remove ho sakte hain */

/* Step 1: Shopping cart banayein */
const cart = {
  items: [],
  total: 0
};

/* Step 2: Items add/remove ho sakte hain */
cart.items.push({ product: "Phone", price: 20000 });
cart.total += 20000;



/* Example 3: Game Character - Stats change ho sakte hain */

/* Step 1: Game character banayein */
const player = {
  health: 100,
  score: 0,
  level: 1
};

/* Step 2: Stats change ho sakte hain */
player.health -= 10;  // Damage laga
player.score += 100;  // Score badha



/**
 * When NOT to use Mutable:
 * - When data should never be changed once set (e.g., unique IDs, tokens).
*/



/**
 * When to use Immutable:
 * - When you want 'data consistency', safety, and predictability.
 * - Useful in: Redux (state management), functional programming.
*/

/* Example 1: Configuration jo change nahi honi chahiye */
const APP_VERSION = "1.0.0";
const MAX_USERS = 1000;
const API_KEY = "abc123-immutable";

/* Example 2: Unique IDs jo fixed hone chahiye */
const STUDENT_ID = "STU2024001";
const COURSE_CODE = "JS101";


/**
 * Common Mistakes aur unke solutions:
*/

/* Mistake 1: String ko directly change karna */
/* ❌ Galat Tarika */
let name = "John";
name[0] = "D";     // Kaam nahi karega!
console.log(name); // "John" hi rahega
console.log("❌ Galat Tarika - String ko directly change karna");

/* ✅ Sahi Tarika */
let name = "John";
name = "Dohn";     // Puri string replace karein
console.log(name); // "Dohn"
console.log("✅ Sahi Tarika - Puri string replace karein");


/* Mistake 2: Object ko reassign karna jabki update karna tha */
const config = { theme: "dark", language: "en" };

/* ❌ Galat - Const object ko reassign nahi kar sakte */
/* config = { theme: "light" };  // Error! */
console.log("❌ Galat Tarika - Const object ko reassign nahi kar sakte");

/* ✅ Sahi - Properties update kar sakte hain */
config.theme = "light";
config.language = "hi";
console.log(config); // { theme: "light", language: "hi" }
console.log("✅ Sahi Tarika - Properties update kar sakte hain");


/**
 * Final Thoughts:
 * - Mutable = Changeable     → Objects, Arrays
 * - Immutable = Unchangeable → Strings, Numbers
 * - Use based on your use-case
 */

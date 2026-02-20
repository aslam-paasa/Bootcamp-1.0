/**
 * Concept of Binding:
 * - Binding ek JS ka concept hai jo 'function context' ko define karta hai,
 *   means kis object ka 'this' function ke andr point karega jb wo function
 *   call hoga.
 * - In simple terms, binding ka matlab hai function ke 'this' ko ek specific
 *   object se link karna (i.e., bind karna).
 * 
 * - Jab hum kisi function ko call karte hai, tab function ka 'this' by
 *   default context ko refer karta hai jahan function call ho rha hota
 *   hai. Lekin hum call(), apply(), and bind() ka use karke 'explicitly'
 *   specify kar skte hai ki 'this' kis object ko point karega.
*/


/**
 * Why binding is important?
 * - JS mein functions first-class citizens hote hai, matlab functions ko
 *   variables ke jaise treat kiya jaa skta hai. 
 * - Jab function kisi object se directly associated nahi hota, toh 'this'
 *   ka behavior unpredictable ho sakta hai.
 * - Is situation ko handle karne ke liye hum 'binding' ka use karte hai
 *   taaki function ko ek particular object ke saath link kiya jaa sake.
*/

/**
 * Types of Binding in JavaScript:
 * - Implicit Binding  (when using a dot notation)
 * - Explicit Binding  (call(), apply(), bind())
 * - New Binding       (when using a constructor function)
 * - Default Binding   (global context or undefined in strict mode)
*/


/**
 * 1. Implicit Binding:
 *    - Implicit binding tab hota hai jab function ko object ke andar 
 *      define kiya gaya ho aur tum usse dot notation (.) se call karo.
 *    - JavaScript khud samajh jaata hai ki this kisko point kare.
*/

const personImplicit = {
    name: "Amit",
    greet: function() {
        console.log(`Hello, my name is ${this.name}`);
    }
};

personImplicit.greet();  // 'this' points to the 'personImplicit' object


/**
 * Jab hum personImplicit.greet() call karte hai, toh 'this' will implicitly
 * refer to the 'personImplicit' object.
*/


/**
 * Problem kab aati hai implicit binding mein?
 * - Problem tab aati hai jab function ko alag kar diya jaata hai 
 *   (e.g., kisi variable ya callback ke form me), toh implicit binding 
 *   toot jaata hai. 
 * - Us case me this ka reference global object (window) ho jaata hai ya 
 *   undefined (strict mode).
*/

const userImplicit = {
    name: "Amit",
    greet() {
      console.log(`Hi, I am ${this.name}`);
    }
  };
  
  const greetFuncImplicit = userImplicit.greet;  // function detach ho gaya
  
  greetFuncImplicit();  // ❌ 'this' is undefined or global, NOT 'user'
  

/**
 * Yahan par JS confused ho jaata hai: "bhai kis object ka this use karu?"
*/


/**
 * 2. Explicit Binding:
 *    - Explicit binding me tum JS ko force karte ho ki:
 *      "Bhai, this ko yahi object banao!". 
 *    - Iske liye hum use karte hai:
 *      - call()
 *      - apply()
 *      - bind()
*/


/**
 * Call() Method:
*/

/**
 * Problem: Context Confusion with this keyword.
 * - Let's say we have an object:
*/
const person = {
    name: "Alice",
    greet: function () {
        console.log("Hi, " + this.name);
    }
};


/**
 * Now everything works fine jab hum person.greet() call karte hai - because
 * 'this' points to 'person'. But... what if you did this:
*/

const greetFn = person.greet;
greetFn();                     // ❌ this becomes undefined or window!


/**
 * Uh oh! this.name ab undefined ho gya. Because function to ab aloo ban
 * gya - koi context nahi hai. It lost reference to person. 
 * 
 * Ye context-loss problem baar-baar ho rhi thi - especiallu jab:
 * a. Function ko pass kiya jaa rha tha as callbacks. 
 * b. Function reuse ho rha tha across objects. 
 * c. Event handling ho rha tha. 
 * 
 * JS Devs literally couldn't control 'this' easily. 
*/


/**
 * Solution: Manual 'this' binding
 * - To fix this, JS ne kuch advanced concepts introduce kiye, jisme se:
 *   a. call - Immediately invoke a function with a custom 'this'
 *   b. apply - Same as call() but arguments in array format
 *   c. bind  - Same as call() but returns a new function with bound 'this'
 * 
 * - Ye teeno aye ECMAScript ke earlier versions mein (ECMAScript 3/late 90s
 *   - early 2000s), aur ye revolution le aaye!
*/

/**
 * Function Reuse Became Easier:
 * - With call(), ab tum kisi ek function ko multiple objects ke liye use
 *   kar sakte the without rewriting:
*/

function introduce() {
    console.log(`Hi, I'm ${this.name}`);
}

const user1 = { name: "Anjali" };
const user2 = { name: "Rohit" };

introduce.call(user1); // Hi, I'm Anjali
introduce.call(user2); // Hi, I'm Rohit

/**
 * BOOM - ab code DRY hai (Don't Repeat Yourself), aur context bhi safe hai.
*/


/**
 * Now let's learn through a real-world example:
 * 1. Pehle ek simple si problem se shuru karte hain
 *    - Socho aapne ek social media app banai hai
 *    - Usme users posts share kar sakte hain
 *    - Har user ka profile alag hai, lekin post share karne ka system same
 *      hai
 */

// User 1 ka profile
const userOne = {
    name: "Priya Sharma",
    followers: 1000,
    profilePic: "priya.jpg"
};

// User 2 ka profile  
const userTwo = {
    name: "Rahul Kumar",
    followers: 500,
    profilePic: "rahul.jpg"
};

/**
 * 2. Ab hum ek post share karne ka function banayenge
 */

function sharePost(content, location) {
    console.log(`
        👤 Posted by: ${this.name}
        👥 Followers: ${this.followers}
        📝 Content: ${content}
        📍 Location: ${location}
        ⏰ Time: ${new Date().toLocaleTimeString()}
    `);
}

/**
 * 3. Problem ye hai ki function ko nahi pata post kis user ki hai
 *    - Agar hum direct function call karenge to error aayegi
 */

/**
 * ❌ Ye kaam nahi karega:
 *  -  sharePost("Having fun!"); // Error: this.name is undefined
*/

/**
 * 4. call() method ka use karke solution:
 *    - call() method se hum function ko bata sakte hain ki 'this' kaun 
 *      hai
 */

console.log("Priya ki post:");
sharePost.call(user1, "Beach pe masti! 🏖️", "Goa");

console.log("\nRahul ki post:");
sharePost.call(user2, "Office mein busy 💼", "Delhi");



/**
 * Ex-2: E-commerce product review system
 */

/**
 * 1. Ek user banayenge:
 *    - Amazon user
 *    - Flipkart user
 */
const amazonUser = {
    name: "Amit",
    verifiedBuyer: true,
    purchaseCount: 50
};

const flipkartUser = {
    name: "Neha",
    verifiedBuyer: false,
    purchaseCount: 10
};

/**
 * 2. Ab hum ek post share karne ka function banayenge
 */

function submitReview(product, rating, review) {
    const verifiedBadge = this.verifiedBuyer ? "✅" : "❌";

    console.log(`
        📦 Product Review
        ================
        👤 Reviewer: ${this.name} ${verifiedBadge}
        🛍️ Total Purchases: ${this.purchaseCount}
        🏷️ Product: ${product}
        ⭐ Rating: ${rating}/5
        💭 Review: ${review}
    `);
}

/**
 * 3. Different users using same review function
 */
console.log("\nAmazon Review:");
submitReview.call(amazonUser, "Smartphone", 4, "Badhiya product hai!");

console.log("\nFlipkart Review:");
submitReview.call(flipkartUser, "Headphones", 3, "Theek hai, could be better");


/**
 * Ex-3: Youtube Video Upload System
*/

/**
 * 1. Alag-alag creators banayenge
 */
const techCreator = {
    channelName: "TechWithRaj",
    subscribers: 120000
};

const vlogCreator = {
    channelName: "NehaVlogs",
    subscribers: 25000
};

/**
 * 2. Ab ek function banayenge jo video upload dikhata hai
 */
function uploadVideo(title, category, duration) {
    console.log(`
        🎬 New Video Uploaded!
        ======================
        📺 Channel: ${this.channelName}
        👥 Subscribers: ${this.subscribers}
        🏷️ Title: ${title}
        📂 Category: ${category}
        ⏱️ Duration: ${duration} mins
    `);
}

/**
 * 3. Dono creators ek hi function ka use karke upload karenge
 */
console.log("\nTech Channel Upload:");
uploadVideo.call(techCreator, "Build a Gaming PC", "Technology", 15);

console.log("\nVlog Channel Upload:");
uploadVideo.call(vlogCreator, "Trip to Manali", "Lifestyle", 10);



/**
 * Ex-4: Food Delivery Order Summary System
*/

/**
 * 1. Alag-alag users ka data
 */
const zomatoUser = {
    username: "RaviFoodie",
    deliveryAddress: "Sector 22, Gurgaon"
};

const swiggyUser = {
    username: "PoojaEats",
    deliveryAddress: "Andheri West, Mumbai"
};

/**
 * 2. Order summary function
 */
function orderSummary(itemName, quantity, paymentMethod) {
    console.log(`
        🍽️ Order Summary
        ==================
        👤 Username: ${this.username}
        📍 Address: ${this.deliveryAddress}
        🍔 Item: ${itemName}
        🔢 Quantity: ${quantity}
        💳 Payment: ${paymentMethod}
    `);
}

/**
 * 3. Dono platform users same function use kar rahe hain
 */
console.log("\nZomato Order:");
orderSummary.call(zomatoUser, "Paneer Tikka", 2, "UPI");

console.log("\nSwiggy Order:");
orderSummary.call(swiggyUser, "Burger", 1, "COD");



/**
 * Ex-5: Student Attendance System
*/

/**
 * 1. School Students
 */
const student1 = {
    name: "Rohan",
    roll: 12,
    class: "10th A"
};

const student2 = {
    name: "Simran",
    roll: 5,
    class: "10th B"
};

/**
 * 2. Attendance function
 */
function markAttendance(date, status) {
    console.log(`
        🏫 Attendance Record
        ======================
        👩‍🎓 Name: ${this.name}
        🆔 Roll No: ${this.roll}
        📚 Class: ${this.class}
        📅 Date: ${date}
        ✅ Status: ${status}
    `);
}

/**
 * 3. Marking attendance using same function
 */
console.log("\nMarking Attendance for Rohan:");
markAttendance.call(student1, "14-May-2025", "Present");

console.log("\nMarking Attendance for Simran:");
markAttendance.call(student2, "14-May-2025", "Absent");



/**
 * Kab use karein call() method?
 * - Jab same function different objects ke sath use karna ho
 * - Jab existing function ko borrow karna ho
 * - Jab code reuse karna ho
 * 
 * Kab use nahi karein?
 * - Arrow functions humaare this ko lock kar deta hau at definition time.
 * - Uske baad chahe jitna .call() lga le, uska 'this' change nhi hoga.
 * 
 * Note: Arrow Function != Suitable for object methods with 'this'. 
 *       Use normal fns expression if you need to bind 'this' using .call()
 *       or .bind().
 * 
 * Real examples: 
 * - Social media posts
 * - E-commerce reviews
 * - Chat applications
 * - Payment systems
 */

/**
 * Practice ke liye ideas:
 * 1. Chat app banao jahan different users same message system use karein
 * 2. Food delivery app mein restaurant reviews
 * 3. Cab booking system mein driver ratings
 * 4. Social media mein photo sharing system
 */






/**
 * apply() Method:
*/

/**
 * apply() bilkul call() ki tarah hi kaam karta hai, bas ek chota sa farak hai:
 * - call() mein arguments individually pass karte hain
 * - apply() mein arguments array ke form mein pass karte hain
 * 
 * - Syntax Comparison:
 *   call()  -> function.call(thisArg, param1, param2, param3)
 *   apply() -> function.apply(thisArg, [param1, param2, param3])
*/



/**
 * Ex-1: User Introduction System
*/
function introduce(hobby1, hobby2) {
    console.log(`
        Hi, main ${this.name} hun!
        Mujhe ${hobby1} aur ${hobby2} pasand hai
    `);
}

const user = {
    name: "Priya"
};

/**
 * call() vs apply() comparison:
*/
introduce.call(user, "dancing", "singing");    // individually arguments
introduce.apply(user, ["dancing", "singing"]); // array mein arguments



/**
 * Ex-2: Student Attendance System
 * - Socho humein ek classroom management system banana hai
 * - Different classes ke students ka attendance track karna hai
*/

/**
 * Class A ka data
*/
const classA = {
    name: "Class 10-A",
    teacher: "Sharma Sir",
    totalStudents: 40
};

/**
 * Class B ka data
*/
const classB = {
    name: "Class 10-B",
    teacher: "Verma Ma'am",
    totalStudents: 45
};

/**
 * Attendance mark karne ka function
*/
function markAttendance(presentStudents, absentStudents, date) {
    const attendance = (presentStudents / this.totalStudents) * 100;
    
    console.log(`
        📚 ${this.name} | Teacher: ${this.teacher}
        📅 Date: ${date}
        ==========================================
        ✅ Present: ${presentStudents} students
        ❌ Absent: ${absentStudents} students
        📊 Attendance: ${attendance.toFixed(2)}%
    `);
}

/**
 * Ab attendance mark karein apply() ka use karke
*/
console.log("Class A ka Attendance:");
markAttendance.apply(classA, [35, 5, "2024-01-20"]);

console.log("\nClass B ka Attendance:");
markAttendance.apply(classB, [40, 5, "2024-01-20"]);

/**
 * apply() ka ek aur common use case:
 * - Math.max() ko array ke saath use karna
*/

const marks = [85, 97, 44, 67, 90];

/**
 * ❌ Ye kaam nahi karega
*/
console.log(Math.max(marks)); // NaN

/**
 * ✅ apply() ke saath
*/
console.log("\nHighest marks:", Math.max.apply(null, marks)); // 97




/**
 * Ex-3: Restaurant Order System
 */

const restaurant = {
    name: "Sharma Restaurant",
    location: "Delhi"
};

function orderFood(dish1, dish2, price) {
    console.log(`
        🏪 Restaurant: ${this.name}
        📍 Location: ${this.location}
        🍽️ Order: ${dish1}, ${dish2}
        💰 Total: ₹${price}
    `);
}

/**
 * call() ke sath
*/
console.log("Using call():");
orderFood.call(restaurant, "Butter Chicken", "Naan", 500);

/**
 * apply() ke sath - same result, different way to pass parameters
*/
console.log("\nUsing apply():");
orderFood.apply(restaurant, ["Butter Chicken", "Naan", 500]);



/**
 * When to use apply()?
 * 1. Jab parameters array ke form mein already available hon
 * 2. Jab dynamic number of parameters pass karne hon
 * 3. Jab array methods use kar rahe hon
 */


/**
 * Ex-4: Math.max() ke sath
 */

const numbers = [5, 6, 2, 3, 7];

/**
 * ❌ Ye kaam nahi karega
*/
console.log("\nDirect array with Math.max():");
console.log(Math.max(numbers));  // Output: NaN

/**
 * ✅ apply() ke sath
*/
console.log("\nUsing apply() with Math.max():");
console.log(Math.max.apply(null, numbers));  // Output: 7



/**
 * Ex-5: Restaurant Menu System
 */

const indianRestaurant = {
    name: "Spice Paradise",
    cuisine: "Indian",
    calculateBill: function(items) {
        const total = items.reduce((sum, item) => sum + item.price, 0);
        return total;
    }
};

const chineseRestaurant = {
    name: "Dragon Wok",
    cuisine: "Chinese",
    // Ye restaurant calculateBill function nahi hai
};

/**
 * Menu items with prices
*/
const orderItems = [
    { dish: "Noodles", price: 200 },
    { dish: "Manchurian", price: 250 },
    { dish: "Spring Rolls", price: 150 }
];

/**
 * Using apply() to borrow calculateBill function
*/
console.log("\nRestaurant Billing Example:");
const totalBill = indianRestaurant.calculateBill.apply(chineseRestaurant, [orderItems]);
console.log(`Bill for ${chineseRestaurant.name}: ₹${totalBill}`);




/**
 * Ex-6: Student Grade Calculator
 */

const schoolA = {
    name: "DPS",
    passingMarks: 35,
    calculateGrade: function(marks) {
        const average = marks.reduce((sum, mark) => sum + mark, 0) / marks.length;
        if (average >= 90) return 'A+';
        if (average >= 80) return 'A';
        if (average >= 70) return 'B';
        if (average >= 60) return 'C';
        if (average >= this.passingMarks) return 'D';
        return 'F';
    }
};

const schoolB = {
    name: "Modern School",
    passingMarks: 40  // Different passing marks
};

/**
 * Calculate grades for different students
*/
const student1Marks = [85, 92, 78, 88, 95];
const student2Marks = [45, 55, 65, 50, 60];

console.log("\nGrade Calculation Example:");
/**
 * Using schoolA's grading system for both schools
*/
console.log(`School A Grade: ${schoolA.calculateGrade.apply(schoolA, [student1Marks])}`);
console.log(`School B Grade: ${schoolA.calculateGrade.apply(schoolB, [student2Marks])}`);




/**
 * Ex-7: Dynamic Arguments
 */

function createStudentReport(...args) {
    const [name, age, ...marks] = args;
    const average = marks.reduce((sum, mark) => sum + mark, 0) / marks.length;
    
    console.log(`
        👤 Student: ${name}
        📅 Age: ${age}
        📝 Marks: ${marks.join(', ')}
        📊 Average: ${average.toFixed(2)}
    `);
}

/**
 * Different ways to call with dynamic arguments
*/
const studentData = ["Rahul", 15, 85, 92, 78, 88, 95];
console.log("\nDynamic Arguments Example:");
createStudentReport.apply(null, studentData);

/**
 * apply() vs call() - When to use?
 * 1. apply() use karein jab:
 *    - Parameters array mein hon
 *    - Dynamic number of arguments hon
 *    - Array methods ka use kar rahe hon
 * 
 * 2. call() use karein jab:
 *    - Fixed number of arguments hon
 *    - Arguments individually pass karne hon
 *    - Code readability important ho
 */

/**
 * Ex-8: Sports Tournament System:
 * 1. Different teams with different scoring systems
 * 2. Common functions for:
 *    - Score calculation
 *    - Player performance analysis
 *    - Team ranking
 * 3. Use apply() to share these functions between teams
 */

const cricketTeam = {
    name: "Mumbai Indians",
    scoringSystem: "runs",
    calculateScore: function(scores) {
        return scores.reduce((total, score) => total + score, 0);
    }
};

const footballTeam = {
    name: "Delhi Dynamos",
    scoringSystem: "goals"
    // No scoring function
};

/**
 * Practice: Implement the tournament system
*/
const cricketScores = [45, 67, 23, 89];
const footballScores = [2, 1, 3];

console.log("\nTournament Scoring Example:");
console.log(`Cricket Team Score: ${cricketTeam.calculateScore.apply(cricketTeam, [cricketScores])}`);
console.log(`Football Team Score: ${cricketTeam.calculateScore.apply(footballTeam, [footballScores])}`);

/**
 * 🎯 Additional Practice Tasks:
 * 1. Add more team types (basketball, hockey)
 * 2. Add player statistics calculation
 * 3. Implement team ranking system
 * 4. Add performance comparison
 * 5. Create tournament leaderboard
 */







/**
 * 1. bind() kya hai?
 *    a. Ye ek method hai jo function ka new copy banata hai
 *    b. Iska main kaam hai 'this' keyword ko fix karna
 * 
 * 2. bind() ki zarurat kab padti hai?
 *    a. Jab hum function ko object se alag use karna chahte hain, aur
 *       uss function ko kisi aur object ke saath use karna chahte hain
 *       baad mein. (Function Reuse in different contexts in future)
 *    b. Jab 'this' keyword ka context lost ho jata hai
 * 
 * 3. Context loss ka simple example:
 *    - Jab aap kisi object ke method ko direct call karte hain (obj.method()), 
 *      tab 'this' object ko 'refer' karta hai
 *    - Lekin jab aap usi method ko kisi variable mein store karke call karte hain,
 *      tab 'this' ka context lost ho jata hai aur wo 'undefined' ya 'window' ko 
 *      refer karne lagta hai
 *    - Jaise: const func = obj.method; func(); // 'this' lost ho gaya
 * 
 * 4. Real-world analogy:
 *    - Imagine kijiye ki aap ek restaurant mein waiter hain
 *    - Jab aap restaurant ke andar hain, tab aapko pata hai ki aapka boss kaun hai
 *    - Lekin agar aap restaurant se bahar nikal jayein, tab aapka boss kaun hai 
 *      ye context lost ho jayega
 *    - bind() isi tarah se 'this' ko fix karke rakhta hai, chahe function kahan 
 *      bhi use ho
 * 
 * Syntax:
 * const newFunction = originalFunction.bind(thisArg, param1, param2, ...)
 */




/**
 * Why bind() is needed after storing function in a variable?
 * - Socho aapke paas ek special recipe hai (function) jo aapke restaurant 
 *   (object) ka hai:
 *   a. Recipe mein likha hai "MERA special masala daalo".
 *   b. Jab recipe restaurant/object k andr mein use karte ho, to pata hai ki
 *      "MERA" matlab restaurant/object ka masala.
 *   c. Lekin jab recipe ko copy karke restaurant/object k bahar le jaate ho,
 *      to "MERA" ka matlab kho jata hai.
 * 
 * 
 * Yahi 'this' keyword ke saath hota hai:
 * - Object ke andar function mein 'this' matlab wo object. 
 * - Lekin function ko variable mein copy karne par 'this' ka connection toot
 *   jata hai
 * 
 * Solution: bind()
*/

/**
 * Why bind() is creating a new function everytime?
 * - Socho aapke paas ek remote control hai (function):
 *   a. Ek hi remote se aap different TVs (objects) ko control karna chahte 
 *      hain.
 *   b. Har TV ke liye alag settings hoti hain.
 *   c. Agar same remote use karein, toh settings mix ho jayengi
 *   d. Isliye har TV ke liye naya remote (function copy) banana padta hai
 * 
 * 
 * Real example se samjhein:
 * const tv1 = { channel: "Sony" }
 * const tv2 = { channel: "Star" }
 * 
 * function changeChannel() {
 *    console.log("Changed to " + this.channel);
 * }
 * 
 * const sonyRemote = changeChannel.bind(tv1);  // copy of changeChannel(tv1)
 * const starRemote = changeChannel.bind(tv2);  // copy of changeChannel(tv2)
 * 
 * Ab dono remotes alag-alag TVs ke liye kaam karengi,
 * kyunki har remote ki apni fixed settings hain.
 * 
 * Agar same function reuse karein bind ke bina:
 * - Har baar 'this' ka value change hoga
 * - Function confused ho jayega ki use kis object ke saath kaam karna hai
 * - Code unpredictable ho jayega
 */



const studentOne = {
    name: 'Rahul',
    rollNo: 101,
    sayHello() {
        console.log(`Hello! Main ${this.name} hoon, roll number ${this.rollNo}`);
    }
};

const studentTwo = {
    name: 'Raj',
    rollNo: 102,
    sayHello() {
        console.log(`Hello! Main ${this.name} hoon, roll number ${this.rollNo}`);
    }
};

/**
 * 1. Normal use - sab kuch sahi chalega
 */

studentOne.sayHello();  // "Hello! Main Rahul hoon, roll number 101"
studentTwo.sayHello();  // "Hello! Main Raj hoon, roll number 102"

/**
 * 2. Problem: Function ko alag variable mein store karne par
 *    (studentOne & studentTwo k andr ek function hai jisko hum uske object
 *     k bahar use krna chahte hai, but wo apna context loose kr de rha h)
 */
const helloFunctionOne = studentOne.sayHello;
const helloFunctionTwo = studentTwo.sayHello;

helloFunctionOne();  // "Hello! Main undefined hoon, roll number undefined"
helloFunctionTwo();  // "Hello! Main undefined hoon, roll number undefined"

/**
 * 3. Solution: bind() use karke
 *    - bind() function ka new copy banata hai
 *    - Iska main kaam hai 'this' keyword ko fix karna
 *    - bind() function ko call & uske andar jo v parameter pass krnge wo
 *      uska new 'this' context ban jaata hai.
 */

const boundHelloOne = studentOne.sayHello.bind(studentTwo);
boundHelloOne();  

/**
 * 4. Simple Explanation:
 *    - bind() ne studentOne ka sayHello() function liya
 *    - Uska ek naya copy banaya
 *    - Aur bola ki "ab iss function ka 'this' studentTwo hai"
 *    - Matlab jab bhi ye function chalega:
 *      - this.name = "Raj" hoga (studentTwo ka name)
 *      - this.rollNo = 102 hoga (studentTwo ka rollNo)
 *    - Output: "Hello! Main Raj hoon, roll number 102"
 * 
 *    Bilkul simple words mein:
 *    - Rahul ka introduction dene wala function
 *    - Ab Raj ke liye kaam kar raha hai 😊
 */


/**
 * Real examples:
 * 1. Button click handler mein:
 *    const btn = {
 *      name: "Submit Button",
 *      click() { console.log(this.name + " clicked") }
 *    }
 *    const handler = btn.click;        // ❌ this.name undefined
 *    const handler = btn.click.bind(btn); // ✅ this.name = "Submit Button"
 * 
 *    - click() outside the btn object lost its context.
 *    - bind() function ko uske object se jodke rakhta hai, taaki baad mein
 *      use karne par bhi 'this' sahi object ko point kare.
 * 
 * 2. setTimeout mein:
 *    const user = {
 *      name: "Rahul",
 *      sayHi() { console.log("Hi " + this.name) }
 *    }
 *    setTimeout(user.sayHi, 1000);        // ❌ this.name undefined
 *    setTimeout(user.sayHi.bind(user), 1000); // ✅ this.name = "Rahul"
 * 
 * Simple words mein - bind() function ko uske object se jodke rakhta hai,
 * taaki baad mein use karne par bhi 'this' sahi object ko point kare
 */



/**
 * Ex-2: Restaurant Order System
*/
const restaurants = {
    name: "Sharma Restaurant",
    menu: ["Dosa", "Samosa", "Chai"],
    
    showMenu: function() {
        console.log(`\n${this.name} ka Menu:`);
        this.menu.forEach(item => console.log(`- ${item}`));
    }
};

/**
 * Dusre restaurant ke liye same function use karein
*/
const anotherRestaurant = {
    name: "Gupta Restaurant",
    menu: ["Chole Bhature", "Paratha", "Lassi"]
};

/**
 * bind() ka use karke naya function banayein
*/
const showGuptaMenu = restaurants.showMenu.bind(anotherRestaurant);

/**
 * Dono restaurants ka menu display karein
*/
console.log("Restaurants ka Menu:");
restaurants.showMenu();
showGuptaMenu();




/**
 * Ex-3: Calculator with Fixed Values
*/
function multiply(a, b) {
    return a * b;
}

/**
 * bind() se 2 se multiply karne wala special function banayein
*/
const multiplyByTwo = multiply.bind(null, 2);

console.log("\nCalculator Example:");
console.log(`2 × 5 = ${multiplyByTwo(5)}`);  // 10
console.log(`2 × 8 = ${multiplyByTwo(8)}`);  // 16




/**
 * Ex-4: Simple Shopping Cart
*/
const cart = {
    items: [],
    
    addItem: function(item) {
        this.items.push(item);
        console.log(`${item} cart mein add ho gaya. Total items: ${this.items.length}`);
    }
};

/**
 * Wishlist ke liye same function use karein
*/
const wishlist = {
    items: []
};

const addToWishlist = cart.addItem.bind(wishlist);

console.log("\nShopping Example:");
cart.addItem("Phone");  // Cart mein add
addToWishlist("Laptop");  // Wishlist mein add




/**
 * Ex-5: Simple Example se samjhein
 */

const persons = {
    name: "Rahul",
    greet: function() {
        console.log(`Hello, main ${this.name} hun!`);
    }
};

/**
 * Normal call
*/
persons.greet();  // "Hello, main Rahul hun!"

/**
 * Function ko variable mein store karna
*/
const greetFunction = persons.greet;

/**
 * ❌ Ab ye kaam nahi karega
*/
greetFunction();  // "Hello, main undefined hun!"

/**
 * ✅ bind() ke sath fix karein
*/
const boundGreet = persons.greet.bind(persons);
boundGreet();  // "Hello, main Rahul hun!"





/**
 * Ex-6: Real World Example 1: Event Handlers
 */

const users = {
    name: "Priya",
    age: 25,
    handleClick: function() {
        console.log(`${this.name} ne button click kiya!`);
    }
};

/**
 * Button click simulation
*/
function simulateButtonClick(clickHandler) {
    console.log("Button clicked!");
    clickHandler();
}

/**
 * ❌ Without bind
*/
console.log("\nWithout bind:");
simulateButtonClick(users.handleClick);  // "undefined ne button click kiya!"

/**
 * ✅ With bind
*/
console.log("\nWith bind:");
simulateButtonClick(users.handleClick.bind(users));  // "Priya ne button click kiya!"




/**
 * Ex-7: Real World Example 3: Logger System
 * ---------------------------------
 */

const logger = {
    level: "INFO",
    log: function(message) {
        console.log(`[${this.level}] ${message}`);
    }
};

/**
 * Create different types of loggers
*/
const errorLogger = logger.log.bind({ level: "ERROR" });
const warnLogger = logger.log.bind({ level: "WARNING" });
const debugLogger = logger.log.bind({ level: "DEBUG" });

console.log("\nLogger System Example:");
errorLogger("Server connection failed");  // [ERROR] Server connection failed
warnLogger("Memory usage high");          // [WARNING] Memory usage high
debugLogger("Processing request");        // [DEBUG] Processing request


/**
 * bind() ke Important Points
 * -------------------------
 * 1. Permanent Binding:
 *    - bind() se jo binding hoti hai wo permanent hoti hai
 *    - Bound function ko dubara bind nahi kar sakte
 * 
 * 2. Parameters:
 *    - bind() mein parameters fix kar sakte hain
 *    - Bache hue parameters function call ke time pe de sakte hain
 * 
 * 3. Use Cases:
 *    - Event handlers mein
 *    - Callback functions mein
 *    - Method borrowing mein
 *    - Partial application mein
 */




/**
 * Ex-8: Practice Assignment: Student Management System
 */

const studentSystem = {
    schoolName: "Delhi Public School",
    
    generateReport: function(student, term) {
        console.log(`
            🏫 School: ${this.schoolName}
            👤 Student: ${student}
            📅 Term: ${term}
            ----------------------
        `);
    }
};

/**
 * Different schools using same report system
*/
const dpsReport = studentSystem.generateReport.bind({ schoolName: "DPS Noida" });
const kvsReport = studentSystem.generateReport.bind({ schoolName: "KV Delhi" });

console.log("School Reports:");
dpsReport("Rahul Kumar", "First");
kvsReport("Priya Sharma", "Second");


/**
 * Practice Tasks:
 * 1. Add more report types (sports, academic, cultural)
 * 2. Add student performance tracking
 * 3. Add attendance management
 * 4. Create different report formats for different schools
 * 5. Add grade calculation system
 */


/**
 * bind() ke main points:
 * 1. Function ko object se permanent jodta hai
 * 2. Naya function return karta hai
 * 3. Original function ko change nahi karta
 * 4. Code reuse karne mein help karta hai
 */

/**
 * JSON (JavaScript Object Notation) - Ek Simple Data Format
 * - JSON ek aisa format hai jisse hum data ko store aur transfer kar sakte 
 *   hain.
 * - Ye JavaScript objects ki tarah dikhta hai, lekin ye ek string format hai.
*/ 

/**
 * Real World Example:
 * - Maan lijiye aap ek weather app banana chahte hain. 
 * - Server se weather data JSON format mein aata hai:
 */

/**
 * Weather data in JSON format:
 */
const weatherData = {
    "city": "Mumbai",
    "temperature": 32,
    "humidity": 75,
    "forecast": ["Sunny", "Cloudy", "Rainy"]
};

/**
 * JSON ke Main Features:
 * 1. Simple Syntax - JavaScript objects ki tarah
 * 2. Lightweight - XML se bahut chota hota hai
 * 3. Easy to Read - Humans ke liye samajhna aasan hai
 * 4. Easy to Parse - JavaScript mein direct use kar sakte hain
 */

/**
 * 1. JSON ko JavaScript Object mein convert karna:
 */
const jsonString = `{
    "name": "Rahul",
    "age": 25,
    "isStudent": true
}`;

/**
 * JSON.parse() se string ko object mein convert karte hain
 */
const person = JSON.parse(jsonString);
console.log(person.name); // "Rahul"


/**
 * 2. JavaScript Object ko JSON string mein convert karna:
 */
const student = {
    name: "Priya",
    age: 20,
    courses: ["Math", "Science"]
};

/**
 * JSON.stringify() se object ko string mein convert karte hain
 */
const jsonStudent = JSON.stringify(student);
console.log(jsonStudent); // {"name":"Priya","age":20,"courses":["Math","Science"]}




/**
 * Real World Use Cases:
 * 
 * 1. API Responses:
 *    - Jab aap server se data fetch karte hain
 *    - Example: Weather API, News API
 * 
 * 2. Form Data:
 *    - User input ko server par bhejne ke liye
 *    - Example: Registration form, Login form
 * 
 * 3. Configuration Files:
 *    - App settings store karne ke liye
 *    - Example: package.json in Node.js
 */

/**
 * Example: API Response Handling
 */
fetch('https://api.example.com/weather')
    .then(response => response.json())
    .then(data => {
        console.log(data.temperature);
        console.log(data.forecast);
    });

/**
 * JSON vs JavaScript Object:
 * 
 * 1. JSON mein keys double quotes mein honi chahiye
 * 2. JSON mein functions nahi ho sakte
 * 3. JSON mein comments nahi ho sakte
 * 4. JSON mein trailing commas nahi ho sakte
 */

/**
 * Example: Valid JSON
 */
const validJSON = {
    "name": "Amit",
    "age": 30,
    "address": {
        "city": "Delhi",
        "pincode": "110001"
    }
};

/**
 * Example: Invalid JSON (JavaScript object)
 */
const invalidJSON = {
    name: "Amit",  // No quotes around key
    age: 30,
    sayHello() {   // Function not allowed in JSON
        console.log("Hello");
    }
};

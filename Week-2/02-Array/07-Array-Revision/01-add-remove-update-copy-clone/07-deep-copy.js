/**
 * Deep Copy means:
 * - Pure array/object ki complete copy ban jati hai
 * - Har level par new memory allocation hoti hai
 * - Original array/object mein koi bhi change karein, copied 
 *   version par koi effect nahi padega
 * - Deep copy ke liye hum JSON.parse(JSON.stringify()) ya 
 *   structuredClone() use kar sakte hain
 * 
 * Real World Example - E-commerce Product Catalog:
 * - Jab aap product catalog ka backup lena chahte hain
 * - Ya phir product variants create karna chahte hain
 */

/**
 * Product Catalog Example
*/
const products = [
    {
        id: 1,
        name: "Smartphone",
        price: 15000,
        specifications: {
            ram: "8GB",
            storage: "128GB",
            colors: ["Black", "Blue", "Red"]
        }
    },
    {
        id: 2,
        name: "Laptop",
        price: 45000,
        specifications: {
            ram: "16GB",
            storage: "512GB",
            colors: ["Silver", "Space Gray"]
        }
    }
];

/**
 * 1. Deep Copy using JSON.parse(JSON.stringify())
*/
const productsDeepCopy = JSON.parse(JSON.stringify(products));

/**
 * 2. Deep Copy using structuredClone() (Modern browsers mein available)
*/
const productsDeepCopy2 = structuredClone(products);

/**
 * Ab hum copied arrays mein changes karenge
*/
productsDeepCopy[0].price = 16000;
productsDeepCopy[0].specifications.colors.push("White");

productsDeepCopy2[1].price = 47000;
productsDeepCopy2[1].specifications.ram = "32GB";

console.log("Original Products:");
console.log(JSON.stringify(products, null, 2));

console.log("\nDeep Copy 1 (JSON method):");
console.log(JSON.stringify(productsDeepCopy, null, 2));

console.log("\nDeep Copy 2 (structuredClone):");
console.log(JSON.stringify(productsDeepCopy2, null, 2));

/**
 * Deep Copy ke Advantages:
 * 1. Complete independence - original data se koi connection nahi
 * 2. Nested objects/arrays bhi completely copy ho jate hain
 * 3. Data backup ke liye perfect solution
 * 
 * Deep Copy ke Disadvantages:
 * 1. Performance - shallow copy se thoda slow hota hai
 * 2. Functions, Date objects, etc. ko handle nahi kar pata
 * 3. Circular references ko handle nahi kar pata
 */

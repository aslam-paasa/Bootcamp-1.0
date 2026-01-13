/**
 * reduceRight() Method Explanation:
 * - reduceRight() bilkul reduce() ki tarah kaam karta hai, lekin right se left ki taraf
 * - Ye array ke elements ko right se left ki taraf process karta hai
 * - Iska use tab karna chahiye jab aapko right-to-left processing chahiye ho
 */

/**
 * Example 1: Basic Usage
 */
const numbers = [10, 20, 30, 40];
const sum = numbers.reduceRight((accumulator, currentValue) => {
    return accumulator + currentValue;
});

console.log("Sum using reduceRight:", sum); // Output: 100

/**
 * Example 2: Real World Problem - URL Path Construction
 * - URL paths ko right se left construct karna
 * - Nested routes ko handle karna
 */
const pathSegments = ['users', 'profile', 'settings', 'security'];

const constructedPath = pathSegments.reduceRight((path, segment) => {
    return `/${segment}${path}`;
}, '');

console.log("Constructed URL Path:", constructedPath); // Output: /users/profile/settings/security

/**
 * Example 3: Complex Problem - Nested Object Flattening
 * - Deep nested objects ko right se left flatten karna
 * - Parent-child relationships ko maintain karna
 */
const nestedData = {
    user: {
        profile: {
            settings: {
                theme: 'dark',
                language: 'en'
            }
        }
    }
};

const flattenObject = (obj) => {
    return Object.keys(obj).reduceRight((acc, key) => {
        if (typeof obj[key] === 'object') {
            const flattened = flattenObject(obj[key]);
            return { ...flattened, ...acc };
        }
        return { [key]: obj[key], ...acc };
    }, {});
};

const flattenedData = flattenObject(nestedData);
console.log("Flattened Object:", flattenedData);
// Output: { theme: 'dark', language: 'en' }
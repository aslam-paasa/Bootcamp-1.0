/**
 * Cookies:
 * - Ye bhi data store karta hai and humara data browser ke cookies naam
 *   ki property mai save hota hai and ye cookie kam data ya light data
 *   k liye hota hai.
 * - Nearly 4kb data store kar sakte hai, jabki local storage aur session
 *   storage 5mb data store kar sakte hai.
*/

/**
 * Cookies mai jo v data store karnge wo data page reload hone par server
 * par jaega. It means jab hum page reload karte hai:
 * 1. Ek naya HTTP request server ko bheja jata hai (like GET /home).
 * 2. Is request ke headers m browser automatically cookies attach karta
 *    hai (agar us URL ke liye cookies present hai)
 * 3. Server unn cookies ko read karta hai jaise:
 *    a. User login hai ya nahi
 *    b. Session ID kya hai
 *    c. Preferences kya hai 
*/

/**
 * 1. How to store data?     - setItem()
 * 2. How to get data?       - getItem()
 * 4. How to update data?    - setItem()    [overrides the old value]
 * 3. How to delete data?    - removeItem()
 * 5. How to clear all data? - clear()
*/

document.cookie = 'email=john@example.com';
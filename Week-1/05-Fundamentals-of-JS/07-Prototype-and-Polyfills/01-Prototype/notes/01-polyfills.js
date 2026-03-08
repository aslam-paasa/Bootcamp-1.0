/**
 * Polyfills - Bridging Gaps in JS
 * 1. What is a Polyfill and why is it important?
 * 2. Writing your own polyfills - step-by-step
 * 3. Common Polyfills every developer should know
 * 4. Use real-world examples (e.g., an old browser not supporting
 *    Array.includes())
 * 5. Explain how JS Engines work and why polyfills are needed
*/

/**
 * Polyfill Introduction:
 * > A Polyfill is a piece of JavaScript code that adds support for 
 *   modern features in older browsers that do not support those features
 *   natively.
 * > In simple words, Polyfills allows old browsers to use new JS features.
 * 
 * Problem Statement (Why Polyfill was needed):
 * > JavaScript is constantly evolving. New features are added every year
 *   to make development easier and more powerful.
 * > Examples of modern features:
 *   - Array.prototype.map()
 *   - Array.prototype.filter()
 *   - Promise
 *   - fetch()
 *   - Array.prototype.includes()
 * 
 * > The problem is: Not all browsers support new features immediately.
 * > Older browsers like:
 *   - Internet Explorer
 *   - Old Chrome Versions
 *   - Old Firefox Versions
 *   do not understand modern JavaScript features.
 * > Polyfills help bridge this gap by providing backward compatibility.
*/

/**
 * Solution: Why Polyfill was introduced
 * > To solve this problem, developers created Polyfills.
 * > Polyfills manually adds missing features into older browsers using
 *   JavaScript.
 * > So even if browser does not support the feature, Polyfill provides
 *   its own implementation. And this makes the browser behave like
 *   a modern browser.
 * 
 * What Polyfill does:
 * > Polyfill checks:
 *   - If features exists -> do nothing
 *   - If features doesn't exist -> create it
 * > So it fills the missing functionality. That's why it's calld:
 *   Polyfill = Poly(many) + Fill (fill missing features)
*/

/**
 * How Polyfill works?
 * 1. Check if feature exists
 *    if(!Array.prototype.includes) {
 *       // create include method
 *    }
 * 
 * 2. If not exists, create custom implementation
 *    if (!Array.prototype.includes) {
 *        Array.prototype.includes = function(element) {
 *            for (let i = 0; i < this.length; i++) {
 *                if (this[i] === element) {
 *                    return true;
 *                }
 *            }
 *            return false;
 *        };
 *    }
 *    
 * 3. Now old browsers can use includes()
 *    const arr = [1, 2, 3];
 *    console.log(arr.includes(2)); // true
*/

/**
 * Real World Analogy:
 * > Imagine: You visit a country where people do not understand English.
 *   - You bring a translator.
 *   - You speak English > Translator converts > People understand
 * 
 * > Here:
 *   - You = Modern JavaScript
 *   - Old Browser = People
 *   - Translator  = Polyfill
 * 
 * > Polyfill translates modern features into something old browsers
 *   understand.
*/

/**
 * Where Polyfills are commonly used?
 * > Polyfills are used for modern features like:
 *   - Promise
 *   - fetch()
 *   - includes()
 *   - map()
 *   - filter()
 *   - reduce()
 *   - Object.assign
 *   - Array.from()
*/

/**
 * Difference b/w Polyfill and Transpiler:
 * 1. Polyfill: Adds missing features at runtime
 * 2. Transpiler(Babel): Converts modern code into older syntax
 *    - Modern Code: ES6+ features
 *      const sum = (a, b) => a + b;
 *    - Older Code: ES5 features
 *      var sum = function(a, b) { return a + b; };
*/
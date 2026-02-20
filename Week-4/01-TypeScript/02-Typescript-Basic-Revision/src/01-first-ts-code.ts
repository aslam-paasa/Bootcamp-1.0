/**
 * Step-1: Types of languages
 * 1. Strongly types vs loosely types
 *    The terms strongly types and loosely typed refer to how programming
 *    languages handle types, particularly how strict they are about type
 *    conversions and type safety.
 * 
 *    a. Strongly typed languages:
 *       - Ex: Java, C#, TypeScript, Rust, etc.
 *       - Benefits:
 *         - Lesser runtime errors
 *         - Stricter codebase
 *         - Easy to catch errors at compile time
 * 
 *    b. Loosely typed languages:
 *       - Ex: JavaScript, Python, Ruby, etc.
 *       - Benefits:
 *         - Easy to write code
 *         - Fast to bootstrap
 *         - Low learning curve
 * 
 * Note: People realized that javascript is a powerful language, but lacks
 *       types. TypeScript was introduced as a new language to add types on
 *       top of javascript.
*/

/**
 * Step-2: What is TypeScript?
 * TypeScript is a programming language developed and maintained by Microsoft.
 * It is a strict syntactical superset of JavaScript and adds optional
 * static typing to the language. [Wrapper over javascript]
 * 
 * Where/How does TypeScript code run?
 * - TypeScript code never runs in your browser. Your browser can only 
 *   understand javascript.
 *   a. JavaScript is the runtime language (the thing that actually runs in
 *      your browser/nodejs runtime).
 *   b. TypeScript is something that compiles down to javascript.
 *   c. When typescript is compiled down to javascript, you get type checking
 *      (similar to c++). If there is an error, the conversion to javascript
 *      fails.
 *                        
 *      +----+     tsc      +----+
 *      | TS |------------->| JS |--------> Browser/Nodejs
 *      +----+              +----+
 *      main.ts             main.js
 * 
*/

/**
 * Step-3: The tsc compiler
 * - tsc is the official typescript compiler that you can use to convert
 *   typescript code to javascript code.
 * - There are many other famous compilers/transpilers for converting
 *   typescript to javascript. Some famous ones are:
 *   a. esbuild
 *   b. swc
 * 
 * 1. Install tsc/typescript globally:
 *    - npm install -g typescript
 * 
 * 2. Initialize an empty Node.js project with typescript:
 *    - mkdir node-app
 *    - cd node-app
 *    - npm init -y
 *    - npx tsc --init
 *    These commands should initialize two files in your project:
 *    a. package.json
 *    b. tsconfig.json
 * 
 * 3. Configure the tsconfig.json file:
 *    - Add the following lines to the tsconfig.json file:
 *      {
 *        "compilerOptions": {
 *          "target": "ES2016",
 *          "module": "CommonJS",
 *          "outDir": "./dist",
 *          "rootDir": "./src"
 *        },
 *        "include": ["src"],
 *        "exclude": ["node_modules"]
 *      }
 * 
 * 4. Create a src/index.ts file:
 *    - touch src/index.ts
 * 
 * 5. Add the following code to the src/index.ts file:
 *    - let x: number = 10;
 *    - console.log(x);
*/


/**
 * Basic Types in TypeScript:
 * a. number
 * b. string
 * c. boolean
 * d. null
 * e. undefined
*/

/**
 * Q. Declare a variable 'x' and initialize it with a numeric value.
 *    [Number]
*/
let x: number = 10; 
console.log(x);

/**
 * Q. Attempt to reassign 'x' with a string value 
 *    [String]
 *    x = "Gaurav"; // Type error beacuse in above we specified x to be a number 
*/

/**
 * Q. Declare a variable 'fullName' and assign a string value to it
 *    [String]
*/
let fullName: string = "Rohan Dev Singh";
console.log(fullName);

/**
 * Q. Declare a variable 'isLoggedIn' and assign a boolean value to it
 *    [Boolean]
*/
let isLoggedIn: boolean = true;
console.log(isLoggedIn);

/**
 * Q. Declare a variable 'a' and assign a null value to it
 *    [null]
*/
let a: null = null;
console.log(a);

/**
 * Q. Declare a variable 'b' and assign a undefined value to it
 *    [undefined]
*/
let b: undefined = undefined;
console.log(b);

/**
 * Q. Declare a variable 'c' and assign a undefined value to it
 *    [undefined]
*/
let c: undefined = undefined;
console.log(c); 



/**
 * 6. Compile the typescript code:
 *    - npx tsc
 *    - This will create a dist/index.js file in your project.
 * 
 * 7. Run the compiled javascript code:
 *    - node dist/index.js
 *    - This will output the value of 'x' to the console.
 * 
 * 8. Set up a development script in package.json (watch mode):
 *    - "dev": "tsc --watch && node dist/index.js"
 * 
 * 9. Run the development script:
 *    - npm run dev
 *    - This will compile the typescript code and run the compiled javascript code.
*/
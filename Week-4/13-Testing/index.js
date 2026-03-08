/**
 * Software Testing: 
 * - Whether our written code is efficient for production or not.
 * */ 

/**
 * Types of Testing:
 * 1. Manual Testing: Done by humans manually
 *    a. White Box: We test internal Structure and working of software.
 *    b. Black Box: We test functionality of software/application.
 *       i. Functional Testing: Code Functionality is checked
 *          - Unit Testing: Components Testing
 *          - Integration Testing: Testing communication between two components
 *          - System Testing
 *       ii. Non-Functional Testing: Measure system behavior.
 *    c. Gray Box : We test combination of White Box and Black Box.
 *   Note: 99% times we as a developers test Black Box testing.
 * 2. Automation Testing: Done by scripts automatically
*/

/**
 * Different Testing Frameworks:
 * 1. Mocha
 * 2. Jest
 * 3. Jasmine
 * 4. Karma
*/

/**
 * Unit Testing:
 * - JEST is a JS Testing Framework.
 * - Other JS Testing Frameworks are Mocha, Jasmine, Karma etc.
 * 
 * Instructions:
 * Step-1: npm init -y
 * Step-2: npm install --save-dev jest
 * Step-3: Inside package.json => "test": "jest"
 * Step-4: npm run test
 * Step-5: File name should be based on this regex pattern
 *         ** /__tests__/* * /*.[jt]s?(x), ** /?(*.)+(spec|test).[tj]s?(x)
 *         Example: codepect.test.js
 *                  codepect.spec.js 
 * Step-6: Inside package.json => "test": "jest --coverage"
 *         => Basically coverage se humein table k form m testcase k
 *            graph hoga jo full testcases ko cover kr k detail m show
 *            krega.
*/

/**
 * 1. Create src folder
 * 2. Create test folder
 *    a. unit folder: For unit testing
 *    b. integration folder: For integration testing
 *    c. end2end folder: For end to end testing
*/
/**
 * Testing a simple app: (Jest)
 * > Final Code: https://github.com/100xdevs-cohort-2/week-24-testing/tree/main/1-simple-test
 * > Jest is one of many famous testing frameworks in TypeScript.
 *   1. Initialize a simple TS project:
 *      - npm init -y
 *      - npx tsc --init
 *   2. Change rootDir and srcDir in tsconfig.json
 *      - "rootDir": "./src",
 *      - "outDir": "./dist",
 *   3. Create src/index.ts
 *      - export function sum(a: number, b: number) {
 *        return a + b
 *      }
 *   4. Add ts-jest as dependency:
 *      - npm install --save ts-jest @jest/globals 
 * 
 *   5. Initialize jest.config.ts
 *      - npx ts-jest config:init
 * 
 *   6. Update package.json:
 *      - "scripts": {
 *        "test": "jest"
 *      },
 * 
 *   7. Create src/tests/sum.test.ts
 *      - import {describe, expect, test} from '@jest/globals';
 *      - import { sum } from './index';
 *      - test('sum should return the sum of two numbers', () => {
 *          expect(sum(1, 2)).toBe(3);
 *        });
 *      });
 * 
 *   8. Run the test: npm run test
*/

export function sum(a: number, b: number) {
    return a + b
}

export function multiply(a: number, b: number) {
    return a * b
}
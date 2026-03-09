/**
 * What is Linting?
 * > Linting is the process of running a program that analyzes source
 *   code to flag programming, bugs, stylistic error.
 * 
 * Why lint?
 * a. Multiple developers in a team can have a similar coding pattern
 * b. Good readability of the code
 * c. Automatic Linting so developer doesn't have to manually lint 
 *    their code.
 * 
 * Tools:
 * a. ESLint  : https://eslint.org/
 * b. Prettier: https://prettier.io/
 * c. Husky   : https://typicode.github.io/husky
*/

/**
 * Two types of lints:
 * 1. Code Analysis (Similar to TS checks):
 *    > Analyzes code to find and fix problems according to a set of 
 *      rules.
 *    > These problems can include syntax errors, stylistic issues,
 *      and potential bugs.
 * 
 * 2. Code Formatting (Purely Stylistic Changes):
*/

/**
 * Setup:
 * 1. Add ESLint:
 *    - npm init @eslint/configuration
 *    - Make sure your press space to actually select the values.
 *    - If you face issues, try using yarn instead of npm (npm i -g yarn)
*/

import express from "express";

const app = express();

app.get("/",(req,res) => {
  res.json({
    message: "Hi there"
  });
});

const x = {a: 1, b: 2};
const a = x.a;


/**
 * Input Validation:
 * Input Validation is a crucial aspect of security your application.
 * It helps ensure that the data received by your server is in the
 * expected format and meets certain criteria.
 * 
 * Take for instance a login schema, now instead of passing a username
 * and password in the body, the user can pass in any gibberish and
 * may try to crash the server. Thus, it is our responsibility to ensure
 * that our application logic handles all these input vulnerabilities.
 * 
 * Let's explore two approaches to input validation:
 * 1. The Naive Way - Multiple If-Else Statements
 * 2. Using zod Library for Schema Validation
 * 
*/

/**
 * Naive Way - Multiple If-Else Statements:
 * In the naive approach, you manually check each input parameter to
 * ensure it meets your criteria. Here's an example using Express.js:
 * 
 *    const express = require('express');
 *    const { z } = require('zod');
 *    const app = express();
 * 
 *    app.use(express.json());
 * 
 *    const loginSchema = z.obj({
 *       username: z.string().min(3),
 *       password: z.string().min(6),
 *    });
 * 
 *    app.post('/login', (req, res) => {
 *       const { username, password } = req.body;
 * 
 *      try {
 *         loginSchema.parse({ username, password });
 *         // Proceed with authentication logic
 *         // ...
 *         res.json({ success: true });
 *      } catch (error) {
 *         res.status(400).json({ error: 'Invalid input.', details: error.errors });
 *      }
 *    });
 * 
 *    const PORT = 3000;
 *    app.listen(PORT, () => {
 *       console.log(`Server is running on https://localhost:${PORT}`);
 * })
 * 
 * => In this example, we manually check the 'username' and 'password'
 *    fields for existence, data type, and minimum length. This approach
 *    can become cubersome as the number of input parameters increases,
 *    and it may lead to code duplication.
*/

/**
 * 2. Using zod library for Schema Validation:
 * 'zod' is a TypeScript-first schema declaration and validation library.
 * It provides a concise way to define schemas and validate input data.
 * Here's an example using 'zod' for the same login scenarios:
 * 
 *    const express = require('express');
 *    const { z } = require('zod');
 *    const app = express();
 * 
 *    app.use(express.json());
 * 
 *    const loginSchema = z.object({
 *       username: z.string().min(3);
 *       password: z.string().min(6);
 *    });
 * 
 *    app.post('/login', (req, res) => {
 *       const { username, password } = req.body;
 * 
 *       try {
 *          loginSchema.parse({ username, password });
 *          // Proceed with authentication logic
 *          // ...
 *          res.json({ sucess: true });
 *       } catch(error) {
 *          res.status(400).json({ error: 'Invlaid input.', details: error.errors });
 *       }
 *    });
 * 
 *    const PORT = 3000;
 *    app.listen(PORT, () => console.log(`Server is running on https://localhost:${PORT}`));
 * 
 * In this example, we define 'loginSchema' using zod that specifies the
 * expected structure and constraints for the input data. The 'parse'
 * method is then used to validate the input against the schema. If the
 * input is invalid, 'zod' throws an error, and we can handle it
 * appropriately. This approach is more concise and less error-prone
 * compared to the manual if-else checks.
 * 
 *    
*/


/**
 * Zod:
 * Zod is a TypeScript-first schema declaration and validation library.
 * It provides a simple and expressive way to define the structure and
 * constraints of your data, allowing you to easily validate and parse
 * input against those specifications. Here's a brief explanation of
 * Zod and its syntax:
 * 
 * Zod Syntax Overview:
 * 1. Basic Types:
 *    Zod provides basic types such as:
 *    (a) string,
 *    (b) number,
 *    (c) boolean,
 *    (d) null
 *    (e) undefined etc.
 * 
 *    const schema = z.string();
 * 
 * 2. Object schema:
 *    You can define the structure of an object using the 'object'
 *    method and specify the shape of its properties.
 * 
 *    const userSchema = z.object({
 *       username: z.string(),
 *       age: z.number(),
 *    });
 * 
 * 3. Nested Schemas:
 *    You can nest schemas within each other to create more complex
 *    structure.
 * 
 *    const addressSchema = z.object({
 *       street: z.string(),
 *       city: z.string(),
 *    });
 * 
 *    const userName = z.object({
 *       username: z.string(),
 *       address: addressSchema,
 *    })
 * 
 * 4. Array Schema:
 *    You can define the schema for arrays using the 'array' method.
 * 
 *    const numbersSchmea = z.array(z.number());
 * 
 * 5. Union and Intersection Types:
 *    Zod supports union and intersection types for more flexibility.
 * 
 *    const numberOrStringSchema = z.union([z.number(), z.string()]);
 *    const combinedSchema = z.intersection([userSchema, addressSchema]);
 * 
 * 6. Optional and Nullable:
 *    You can make properties optional or nullable using 'optional' and
 *    'nullable' methods.
 * 
 *    const userSchema = z.object({
 *       username: z.string(),
 *       age: z.optional(z.number()),
 *       email: z.nullable(z.string())
 *    });
 * 
 * 7. Custom Validators:
 *    Zod allows you to define custom validation logic using the 'refine'
 *    method.
 * 
 *    const positiveNumberSchema = z.number().refine((num) = > num > 0, {
 *       message: 'Number must be positive',
 *    });
 * 
 * 8. Parsing and validation:
 *    To validate and parse data, use the 'parse' method. If the data
 *    is invalid, it throws an error with details about the validation
 *    failure.
 * 
 *    try {
 *       const userData = userSchema.parse({
 *          username: 'john_doe',
 *          age: 25,
 *          address: {
 *             street: '123 Main St',
 *             city: 'Exampleville',
 *          },
 *       });
 *       console.log('Parsed data:', userData);
 *    } catch (error) {
 *       console.log('Validation error:', error.errors);
 *    }
*/

/**
 * Why Zod?
 * 1. TypeScript-First Approach:
 *    Zod is designed with TypeScript in mind providing string type-checking
 *    and autocompletion for you schemas.
 * 2. Consise and Expressive Syntax:
 *    Zod's syntax is concise and expressive, making it easy to define
 *    data structures with minimal code.
 * 3. Validation and Parsing:
 *    Zod not only validates data but also automatically parses it into
 *    the expected TypeScript types.
 * 4. Rich Set of Features:
 *    Zod includes a variety of features, such as custom validation,
 *    optional and nullable types, union and intersection types, making
 *    it a powerful tool for data validation in your applications.
 * 
 * Overall, Zod simplifies the process of declaring and validating data
 * structures, reducing the likelihood of runtime errors and improving
 * the overall robustness of your code. 
*/


/**
 * Q. How can you do better input validation?
*/

import { z } from 'zod';

/**
 * 1. Primitive Values:
 */ 
z.string;
z.number();
z.bigint();
z.boolean;
z.date();
z.symbol;


/**
 * 2. Empty Types:
*/
z.undefined();
z.null();
z.void();  // => accepts undefined


/**
 * 3. catch-all types: allows any value
*/
z.any();
z.unknown();


/**
 * 4. never type: allows not value
*/
z.never();


/**
 * 5. Coercion for Primitives:
 * => Means to push someone to do something (not important)
 * => ZOD now provides more convenient way to coerce primitive values.
*/

const schema = z.coerce.string();
schema.parse("tuna"); // => "tuna"
schema.parse(12);     // => "12"
schema.parse(true);   // => "true"


/**
 * => https://zod.dev/?id=basic-usage
*/
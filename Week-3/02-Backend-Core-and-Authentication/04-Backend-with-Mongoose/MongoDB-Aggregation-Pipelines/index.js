/**
 * Agenda:
 * 1. What is an Aggregation Pipeline?
 * 2. Question-Based Learning
 * 3. Our Arsenal
 * 4. Practice Worksheet
*/

/**
 * What is an Aggregation Pipeline?
 * - A pipeline is a sequence of data processing stages (filtering, grouping,
 *   sorting, etc).
 * - Each stage takes an input, processes(filter, group, sort, etc) it, and 
 *   passes the output to the next stage.
 * - The output of the last stage is the final output of the pipeline.
 * - Ex: Once chai is ready, we filter the tea leaves, before serving it to
 *       the customer. So, the filtering is the first stage, and the second
 *       stage is serving it to the customer.
*/

/**
 * Why do we need Aggregation Pipeline?
 * - We have two ways to send data to the frontend:
 *   a. Send the complete data to the frontend.
 *   b. Process the data at the backend and send the processed data to the
 *      frontend.
 * 
 * Issue with the first approach:
 * a. Sending complete data is time consuming, which increases the
 *    bandwidth usage.
 * b. The frontend will have to handle the data, which will increase the
 *    complexity of the code.
 * c. The frontend will have to render the data, which will increase the
 *    load on the browser.
 * 
 * Solution:
 * - Approach-2: Process the data at the backend and send the processed data
 *   to the frontend.
 * - Ex: We want to display the top 10 users who have the most number of
 *       followers.
 * - We can do this by using the Aggregation Pipeline.
*/

/**
 * MongoDB Aggregation Pipeline Syntax:
 * - Hmein jitne level m data ko process karna hai hum utne filter lagaate
 *   hai.
 * - Each curly braces process the data and pass the processed data to the
 *   next stage (top-to-bottom execution) is called pipeline.
 * - So, we can say each curly braces is a stage(query) in the pipeline. 
 * - [
 *      {} <=== Pipeline (Stage-1)
 *      {} <=== Pipeline (Stage-2)
 *      {} <=== Pipeline (Stage-3)
 *      ...
 *      {} <=== Pipeline (Stage-N)
 *   ]
*/

/**
 * Use Cases:
 * 1. Summarize user activity
 * 2. Join data across collections (like SQL Joins)
 * 3. Filter + Group + Compute Stats
 * 4. Format nested or array data
*/

/**
 * Practice Worksheet:
 * 1. Open MongoDB Compass
 * 2. Create a new collection
 * 3. Import the students.json file
 * 4. Open the Aggregation tab in the collection
 * 5. Select the text editor mode in the aggregation tab
 * 6. Write the aggregation pipeline query:
*/

/**
 * $match Operator:
 * - Documents ko filter karta hai
 * - Sirf matching documents ko aage pass karta hai
 * 
 * Example: India mein rehne wale users ko find karna
 * [
 *    {
 *       $match: {
 *          "profile.country": "India"  // Country field ko check karta hai
 *       }
 *    }
 * ]
 * 
 * Result:
 * - Sirf India ke users ka data milega
 * - Baaki countries ke users filter ho jayenge
*/

/**
 * $group & $sum Operators:
 * - $group: Documents ko groups mein organize karta hai
 * - $sum  : Group ke andar values ko sum karta hai
 * 
 * Example: Country-wise user count nikalna
 * [
 *    {
 *       $group: {
 *          _id: "$profile.country",    // 1. Group by country (unique country)
 *          userCount: { $sum: 1 }      // 2. Count users in each group (+1 for each user)
 *       }
 *    }
 * ]
 * 
 * Result: 
 * [
 *    { _id: "India", userCount: 5 },
 *    { _id: "USA", userCount: 3 },
 *    { _id: "UK", userCount: 2 }
 * ]
*/

/**
 * $count Operator Example:
 * Question: Count unique countries from student profiles
 * 
 * Pipeline Steps:
 * 1. $group: Group students by country
 * 2. $count: Count total number of unique groups
 * 
 * [
 *    {
 *       $group: {
 *          _id: "$profile.country"  // 1. Group by country field
 *       }
 *    },
 *    {
 *       $count: "uniqueCountries"   // 2. Count number of unique groups came after processing the data
 *    }
 * ]
 * 
 * Result Example:
 * { "uniqueCountries": 5 }  // If students are from 5 different countries
*/
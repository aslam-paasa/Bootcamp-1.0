/**
 * SELECT:
 * - SELECT specifies the columns you want to retrieve from the table.
 * - Without SELECT, SQL does not know what data you want to view.
 * 
 * FROM:
 * - FROM tells SQL which table to read data from.
 *
 * Q. If you want to see all columns and all rows from a table named,
 *    countries, you would use this query:
 *
 *                   SELECT *
 *                   FROM countries;
 *
 *    Output:
 *    +------------+------------+---------+---------------+
 *    | Country    | Population | Area    | Region        |
 *    +------------+------------+---------+---------------+
 *    | India      | 1400000000 | 3287000 | Asia          |
 *    | China      | 1200000000 | 4287000 | Asia          |
 *    | Brazil     | 214000000  | 8516000 | South America |
 *    | Australia  | 25700000   | 7692000 | Oceania       |
 *    | USA        | 331000000  | 9834000 | North America |
 *    +------------+------------+---------+---------------+
 *
 * Q. If you only care about each country name and population, this
 *    means selecting specific columns:
 *     
 *                SELECT country, population
 *                FROM countries;
 *
 *    Output:
 *    +------------+------------+
 *    | Country    | Population |
 *    +------------+------------+
 *    | India      | 1400000000 |
 *    | China      | 1200000000 |
 *    | Brazil     | 214000000  |
 *    | Australia  | 25700000   |
 *    | USA        | 331000000  |
 *    +------------+------------+
*/


/**
 * Deep Dive: How SELECT and FROM Actually Work?
 *
 * a. The Order of Execution
 *    - In English, we read from left to right.
 *    - We see SELECT first, so we might think the computer selects
 *      the data first.
 *
 *    - SQL processes the query in this order:
 *      > FROM  : The db first finds the table you are talking about,
 *                It goes to the filing cabinet and opens it.
 *      > SELECT: Once it has access to the table, it then looks at
 *                which specific columns are requested and extracts 
 *                only those.
 *
 *    Example: The Inventory System
*/
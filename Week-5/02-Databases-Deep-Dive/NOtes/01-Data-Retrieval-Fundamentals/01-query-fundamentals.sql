/**
 * Basic SQL Commands:
 * 1. SELECT       : which columns to show
 * 2. FROM         : where to read from
 * 3. WHERE        : which rows to keep
 * 4. ORDER BY     : how to sort
 * 5. LIMIT/OFFSET : how many rows to return
 * 6. DISTINCT     : whether to remove duplicates
 * 7. AS(Alias)    : how to rename columns/tables in the output
*/

/**
 * Create Table:
*/
CREATE TABLE countries (
  id SERIAL PRIMARY KEY,
  country VARCHAR(64) NOT NULL,
  population BIGINT,
  area INT NOT NULL,
  region VARCHAR(64) NOT NULL
);


/**
 * Insert Data:
*/
INSERT INTO countries (country, population, area, region) VALUES
('India',     1400000000, 3287000, 'Asia'),
('China',     1200000000, 4287000, 'Asia'),
('Brazil',     214000000, 8516000, 'South America'),
('Australia',   25700000, 7692000, 'Oceania'),
('USA',        331000000, 9834000, 'North America');

/**
 * +------------+------------+---------+---------------+
 * | Country    | Population | Area    | Region        |
 * +------------+------------+---------+---------------+
 * | India      | 1400000000 | 3287000 | Asia          |
 * | China      | 1200000000 | 4287000 | Asia          |
 * | Brazil     | 214000000  | 8516000 | South America |
 * | Australia  | 25700000   | 7692000 | Oceania       |
 * | USA        | 331000000  | 9834000 | North America |
 * +------------+------------+---------+---------------+
*/


/**
 * 1. SELECT & FROM
 *    - SELECT specifies the columns you want to retrieve from a table.
 *    - Without SELECT, SQL doesn't know what data you want to view.
 *    - FROM tells SQL which table to read data from. 
 *
 *    a. If you want to see all columns and all rows from a table named 
 *       countries:
 *                       SELECT *
 *                       FROM countries;
 *
 *       Output:
 *       +------------+------------+---------+---------------+
 *       | Country    | Population | Area    | Region        |
 *       +------------+------------+---------+---------------+
 *       | India      | 1400000000 | 3287000 | Asia          |
 *       | China      | 1200000000 | 4287000 | Asia          |
 *       | Brazil     | 214000000  | 8516000 | South America |
 *       | Australia  | 25700000   | 7692000 | Oceania       |
 *       | USA        | 331000000  | 9834000 | North America |
 *       +------------+------------+---------+---------------+
 *
 *   b. See specific columns (country's name and population):
 *     
 *                        SELECT country, population
 *                        FROM countries;
 *
 *       Output:
 *       +------------+------------+
 *       | Country    | Population |
 *       +------------+------------+
 *       | India      | 1400000000 |
 *       | China      | 1200000000 |
 *       | Brazil     | 214000000  |
 *       | Australia  | 25700000   |
 *       | USA        | 331000000  |
 *       +------------+------------+
 *
*/


/**
 * 4. WHERE:
 *    - WHERE restricts rows by applying logical conditions.
 *    - Only rows that satisfy the conditions(s) are included in the
 *      final result.
 *
 *    a. If you want to find countries in the oceania region:
 *
 *                      SELECT *
 *                      FROM countries
 *                      WHERE region = 'Oceania';
 * 
 *       Output:
 *       +------------+------------+---------+---------------+
 *       | Country    | Population | Area    | Region        |
 *       +------------+------------+---------+---------------+
 *       | Australia  | 25700000   | 7692000 | Oceania       |
 *       +------------+------------+---------+---------------+
 *        WHERE decides which rows are allowed to stay.
*/


/**
 * 3. Comparison Operators:
 *    +----------+--------------------------+-----------------------+
 *    | Operator | Meaning                  | Example               |
 *    +----------+--------------------------+-----------------------+
 *    |  <       | Less than                | population < 50000000 |
 *    |  >       | Greater than             | salary > 30000        |
 *    |  <=      | Less than or equal to    | age <= 18             |
 *    |  >=      | Greater than or equal to | marks >= 90           |
 *    |  =       | Equal to                 | city='Delhi'          |
 *    |  <> / != | Not equal to             | status!='active'      |
 *    +----------+--------------------------+-----------------------+
 *
 *    - These comparison operators form the foundation of filtering data
 *      in SQL.
 *    - You will use them frequently while writing conditions.
*/


/**
 * 4. Logical Operators:
 *    - These (AND, OR, NOT) combine or modify conditions in WHERE clause.
 *    
 *    a. AND: All conditions must be true.
 *       If you want to find data where population greater than 50M and
 *       area  less than 5M sq km.
 *              
 *                    SELECT *
 *                    FROM countries
 *                    WHERE population > 50000000 AND area < 5000000;
 *
 *       Output:
 *       +------------+------------+---------+---------------+
 *       | Country    | Population | Area    | Region        |
 *       +------------+------------+---------+---------------+
 *       | India      | 1400000000 | 3287000 | Asia          |
 *       +------------+------------+---------+---------------+
 *
 *    b. OR: At least one condition must be true.
 *       If you want to find nations located in Asia or Oceania.
 *
 *                     SELECT *
 *                     FROM countries
 *                     WHERE region = 'Asia' OR region = 'Oceania';
 *
 *       Output:
 *       +------------+------------+---------+---------------+
 *       | Country    | Population | Area    | Region        |
 *       +------------+------------+---------+---------------+
 *       | India      | 1400000000 | 3287000 | Asia          |
 *       | Australia  | 25700000   | 7692000 | Oceania       |
 *       +------------+------------+---------+---------------+
 *
 *    c. NOT: Negates a condition
 *       If you want to exclude North America, ignore records where the
 *       region is North America.
 *
 *                      SELECT *
 *                      FROM countries
 *                      WHERE NOT region = 'North America';
 *
 *       Output:
 *       +------------+------------+---------+---------------+
 *       | Country    | Population | Area    | Region        |
 *       +------------+------------+---------+---------------+
 *       | India      | 1400000000 | 3287000 | Asia          |
 *       | China      | 1200000000 | 4287000 | Asia          |
 *       | Brazil     | 214000000  | 8516000 | South America |
 *       | Australia  | 25700000   | 7692000 | Oceania       |
 *       +------------+------------+---------+---------------+
*/


/**
 * 5. Arithmetic Operators:
 *    - These operators are straightforward and commonly used while 
 *      writing queries.
 *    - These arithmetic operators include:
 *
 *    +----------------+--------------------------------------------------------+-----------------------------+
 *    | Operator       | Definition                                             | Example Query               |
 *    +----------------+--------------------------------------------------------+-----------------------------+
 *    | Addition       | Adds two nums/expressions                              | SELECT 10 + 5 AS result;    |
 *    | Subtraction    | Subtracts the second nums/expression from the first    | SELECT 10 - 5 AS result;    |
 *    | Multiplication | Multiples two numbers/expressions                      | SELECT 10 * 5 AS result;    |
 *    | Division       | Divides the first number/expression by the second      | SELECT 10 / 5 AS result;    |
 *    | Modulus (%)    | Returns the remainder after division                   | SELECT 10 % 3 AS remainder; |
 *    | DIV            | MySQL-only operator: returns quotient without decimals | SELECT 7 DIV 2 AS quotient; |
 *    +----------------+--------------------------------------------------------+-----------------------------+
*/


/**
 * 6. ORDER BY & LIMIT
 *    - ORDER BY is used to sort the rows of a result set based on one
 *      or more columns.
 *    - By default, sorts in ASC (ascending) order, which means values 
 *      go from small to large or alphabetically from A-Z.
 *    - When you want to reverse arrangement, you use DESC (descending)
 *      to sort from large to small or from Z-A.
 *
 *    - LIMIT, Returns only a fixed number of rows from the top to the
 *      result.
 *    - If you want to find the top 2 countries with the greatest land
 *      area, select after sorting largest first:
 *
 *                         SELECT country, area
 *                         FROM countries
 *                         ORDER BY area DESC
 *                         LIMIT 2;
 *
 *       Output:
 *       +------------+------------+
 *       | Country    | Population |
 *       +------------+------------+
 *       | USA        | 331000000  |
 *       | Brazil     | 214000000  |
 *       +------------+------------+
 *
 *       First sort by area (largest to smallest), then return only
 *       the top 2 rows using LIMIT.
*/


/**
 * 7. DISTINCT & AS (Aliases):
 *    - DISTINCT is used when you want your result to contain only
 *      unique values by removing any duplicates from the selected
 *      column.
 *
 *    - The AS (alias) keyword allows you to assign temporary, user-friendly
 *      names to columns or tables, making your queries cleaner and
 *      easier to understand without changing the actual database
 *      structure.
 *
 *    - If you want to find all the unique regions, select distinct
 *      region and rename it as unique_region:
 *
 *              SELECT DISTINCT region as unique_region
 *              FROM countries;
 *
 *      Output:
 *      +---------------+
 *      | unique_region |
 *      +---------------+
 *      | Asia          |
 *      | South America |
 *      | Oceania       |
 *      | North America |
 *      +---------------+
*/
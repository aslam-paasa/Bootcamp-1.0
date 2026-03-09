/*
  ALTER TABLE Commands:
  The ALTER TABLE command modifies existing table structures without
  losing data.
  1. Adding Columns     [done]
  2. Dropping Columns
  3. Renaming Columns
  4. Modifying Column Data Types
  5. Setting and Dropping DEFAULT Values
  6. Adding and Dropping NOT NULL Constraints
  7. Renaming Tables
  8. Complete Example: Building a Stream Platform
*/

/*
    4. Modifying Column Data Types:
       a. Change Columne Type
       b. Change with USING clause for complex conversions
       c. Change column to allow more precision
*/

/* 4.a. Change column type */
ALTER TABLE movies
ALTER COLUMN year_released TYPE SMALLINT;

/* 4.b. Change with USING clause for complex conversions */
ALTER TABLE movies
ALTER COLUMN rating TYPE VARCHAR(20)
USING rating::VARCHAR(20);

/* 4.c. Change column to allow more precision */
ALTER TABLE movies
ALTER COLUMN year_released TYPE NUMERIC(4, 0);
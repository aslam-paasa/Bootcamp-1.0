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
    5. Setting and Dropping DEFAULT VALUES:
       a. Set a default value
       b. Drop default value
       c. Set default with expression
       d. Drop and reset default
*/

/* 5.a. Set a default value */
ALTER TABLE movies
ALTER COLUMN rating SET DEFAULT 'Not Rated';

/* 5.b. Drop default value */
ALTER TABLE movies
ALTER COLUMN rating DROP DEFAULT;

/* 5.c. Set default with expression */
ALTER TABLE movies
ADD COLUMN added_date DATE DEFAULT CURRENT_DATE;

/* 5.d. Drop and reset default */
ALTER TABLE movies
ALTER COLUMN added_date DROP DEFAULT;

ALTER TABLE movies
ALTER COLUMN added_date SET DEFAULT NOW();
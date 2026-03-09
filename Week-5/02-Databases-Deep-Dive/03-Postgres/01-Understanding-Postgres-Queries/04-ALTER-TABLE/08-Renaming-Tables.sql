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
    7. Renaming Tables:
       a. Rename the entire table
       b. Rename it back
*/

-- Rename the entire table
ALTER TABLE movies
RENAME TO films;

-- Rename it back
ALTER TABLE films
RENAME TO movies;
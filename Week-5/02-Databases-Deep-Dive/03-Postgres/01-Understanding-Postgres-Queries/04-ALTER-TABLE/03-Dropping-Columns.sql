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
    2. Dropping Columns:
       a. Dropping a single column
       b. Drop multiple columns
       c. Drop column with CASCADE (removes dependent objects)
*/


/* 2.a. Drop a single column */
ALTER TABLE movies
DROP COLUMN budget;

/* 2.b Drop multiple columns */
ALTER TABLE movies
DROP COLUMN box_office,
DROP COLUMN duration_minutes;

/* 2.c Drop column with CASCADE (removes dependent objects) */
ALTER TABLE movies
DROP COLUMN director CASCADE;
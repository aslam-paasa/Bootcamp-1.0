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
    6. Adding and Dropping NOT NULL Constraints:
       a. Add NOT NULL constraint (ensure no existing NULL values first)
       b. Drop NOT NULL constraint
       c. Example workflow: handle existing NULLs before adding constraint
       d. Set default for "unknown" and make NOT NULL
*/

-- Add NOT NULL constraint (ensure no existing NULL values first)
ALTER TABLE movies
ALTER COLUMN film_title SET NOT NULL;

-- Drop NOT NULL constraint
ALTER TABLE movies
ALTER COLUMN rating DROP NOT NULL;

-- Example workflow: handle existing NULLs before adding constraint
UPDATE movies SET director = 'Unknown' WHERE director IS NULL;

ALTER TABLE movies
ALTER COLUMN director SET NOT NULL;

-- Set default for "unknown" and make NOT NULL
ALTER TABLE movies
ALTER COLUMN director SET DEFAULT 'Unknown';

ALTER TABLE movies
ALTER COLUMN director SET NOT NULL;
/*
1. Adding Columns:
   a. Create our base table
   b. Add a new column
   c. Add multiple columns at once
   d. Add column with default value
*/


/* 1.a. Create our base table */
CREATE TABLE movies (
    movie_id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    release_year INTEGER
);


/* 1.b. Add a new column */
ALTER TABLE movies
ADD COLUMN director VARCHAR(100);


/* 1.c. Add multiple columns at once */
ALTER TABLE movies
ADD COLUMN budget DECIMAL(12, 2),
ADD COLUMN box_office DECIMAL(12, 2);


/* 1.d. Add column with default value */
ALTER TABLE movies
ADD COLUMN rating VARCHAR(10) DEFAULT 'PG-13';


/* 1.e. Add column with NOT NULL constraint 
        (must provide default or populate existing rows) 
*/
ALTER TABLE movies
ADD COLUMN duration_minutes INTEGER NOT NULL DEFAULT 120;
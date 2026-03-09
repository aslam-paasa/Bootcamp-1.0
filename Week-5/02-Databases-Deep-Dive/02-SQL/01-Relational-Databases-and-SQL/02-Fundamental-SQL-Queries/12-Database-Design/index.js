/**
 * Normalization:
 * > Database design is the process of creating a logical structure for
 *   storing data in a database. 
 * > It involves defining the relationships between tables, identifying
 *   the primary and foreign keys, and ensuring that the data is 
 *   normalized to minimize redundancy and improve data integrity.
*/

/**
 * Understanding Database Design Principles:
 * > Good database design avoids 'data redundancy' and ensures 
 *   'data integrity'.
 * > Example: Instead of storing the city name in every row for each 
 *   chai type, store city details in a separate 'Cities' table and 
 *   link it with the 'Chai' table using foreign keys.
*/

/**
 * What is Normalization?
 * > Normalization organizes a database into tables and columns to:
 *   a. Eliminate data redundancy.
 *   b. Ensure data dependencies are logical.
 * 
 * First Normal Form (1NF):
 * > 1NF ensures that the data in a table is organized into rows and 
 *   columns, with each column holding atomic (indivisible) values.
 * > Example: A 'Chai' table should have columns like name, ingredients,
 *   price, and each cell should contain a single value. You shouldn’t
 *   have multiple cities listed in one cell.
 * 
 * Second Normal Form (2NF):
 * > 2NF ensures that each table depends on the primary key. 
 *   There should be no partial dependencies (where a non-key column 
 *   depends on part of a composite key).
 * > Example: If a table has a composite key (chai_id, city_id), ensure
 *   all non-key columns (like price) depend on the entire key, not just
 *   one part.
 * 
 * Third Normal Form (3NF):
 * > 3NF ensures that non-primary-key columns do not depend on other 
 *   non-primary-key columns.
 * > Example: A Chai table shouldn’t have both city_name and 
 *   city_population. Instead, city_name and city_population should 
 *   belong in a separate City table, and you can link it to the Chai 
 *   table with a city_id.
*/

/**
 * Entity Relationship Diagrams (ERDs):
 * > ERDs are used to visually represent relationships between database
 *   entities.
 * > Example: You might have two tables: Chai and City. An ERD would 
 *   show a one-to-many relationship between cities and chai varieties.
 * > One-to-Many Relationship: One city can have many chai varieties, 
 *   but each chai variety is sold in one city.
*/

/**
 * Relationship in SQL:
 * > There are different types of relationships in SQL:
 * 
 *   a. One-to-One Relationship: 
 *      One entity can have only one instance of another entity.
 * 
 *   b. One-to-Many Relationship: 
 *      One entity can have multiple instances of another entity.
 * 
 *   c. Many-to-Many Relationship: 
 *      One entity can have multiple instances of another entity, and 
 *      vice versa.
*/

/**
 * LMS Practice Exercise:
 * > We will create a fun practice database design for Learning 
 *   Management System (LMS) using SQL. 
 * > The LMS will have the following entities:
 *   - Users
 *   - Courses
 *   - Videos
 *   - Enrollments
 * 
 * Database Design:
 * a. Users
 *    users [icon:user] {
 *      _id string pk
 *      name string
 *      email string unique
 *      password string
 *      userType enum "student", "instructor", "admin"
 *      isPaid boolean
 *      enrolledCourses ObjectId[] courses
 *      createdAt Date
 *      updatedAt Date
 *    }
 * 
 * b. Courses:
 *    courses [icon:book] {
 *      _id string pk
 *      title string
 *      description string
 *      price number
 *      instructorId ObjectId users
 *      category string
 *      tags string[]
 *      durationInHours number
 *      videos ObjectId[] videos
 *      createdAt Date
 *      updatedAt Date
 *    }
 * 
 * c. Videos:
 *    videos [icon:video] {
 *      _id string pk
 *      courseId ObjectId courses
 *      title string
 *      description string
 *      url string
 *      durationInMinutes number
 *      createdAt Date
 *      updatedAt Date
 *    }
 * 
 * d. Enrollments:
 *    enrollments [icon:user] {
 *      _id string pk
 *      userId ObjectId users
 *      courseId ObjectId courses
 *      enrollmentDate Date
 *      progress number
 *      completedAt Date
 *      createdAt Date
 *      updatedAt Date
 *    }
 * 
 * 
 *    users._id < enrollments.userId
 *    enrollments.userId > users._id
 *    courses._id < enrollments.courseId
 *    enrollments.courseId > courses._id
 *    courses._id < videos.courseId
 *    videos.courseId > courses._id
 *    users._id < courses.instructorId
 *    courses.instructorId > users._id
*/ 

/**
 * Summary:
 * > We have learned about database design and normalization. 
 * > We have also learned about the basic data types and how to use them. 
 * > We have also learned about the different types of relationships and
 *   how to use them.
*/
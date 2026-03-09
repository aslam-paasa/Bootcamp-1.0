/**
 * Data Modeling:
 * > Database modeling is the process of designing and structuring data 
 *   efficiently so that it can be stored, managed, and retrieved 
 *   optimally. 
 * > It defines how different pieces of data relate to each other and 
 *   ensures the following:
 *   1. Data Integrity – Ensures data is accurate and consistent.
 *   2. Redundancy Reduction – Prevents storing the same data multiple times.
 *   3. Efficient Queries – Helps in retrieving data quickly.
 *   4. Scalability – Allows databases to grow as new features or data 
 *      are added.
*/

/**
 * 1. Prevents Redundant (Duplicate Data):
 *    > Redundant data means storing the same information multiple times,
 *      leading to wasted storage and data inconsistency.
 *    > Example: Without Proper Database Modeling (Bad Design)
 * 
 *      +------------+--------+------------+--------------------+
 *      | EmployeeId | Name   | Department | DepartmentLocation |
 *      +------------+--------+------------+--------------------+
 *      |      1     | Alice  |     HR     |     3rd Floor      |
 *      |      2     | Bob    |     HR     |     3rd Floor      |
 *      |      3     | Charlie|     IT     |     2nd Floor      |
 *      +------------+--------+------------+--------------------+
 * 
 *    > Problem:
 *      - The "HR" department’s location is stored twice. 
 *      - If the HR department moves, you need to update multiple rows, 
 *        leading to inconsistencies.
 * 
 *    > Solution: Normalize the Database (Good Design)
 *      [Employee Table]
 *      +------------+--------+--------------+
 *      | EmployeeId | Name   | DepartmentID |
 *      +------------+--------+--------------+
 *      |      1     | Alice  |     101      |
 *      |      2     | Bob    |     101      |
 *      |      3     | Charlie|     102      |
 *      +------------+--------+--------------+
 * 
 *      [Department Table]
 *      +------------+-------------------+-----------+
 *      | DepartmentID | DepartmentName  | Location  |
 *      +------------+-------------------+-----------+
 *      |     101    |     HR            | 3rd Floor |
 *      |     102    |     IT            | 2nd Floor |
 *      +------------+-------------------+-----------+
 * 
 *    > Now, if the HR department moves, you only update one row.
*/


/**
 * 2. Enforce Rules:
 *    > Enforcing rules in a database ensures data accuracy, security, 
 *      and consistency. This is done using constraints, relationships, 
 *      and automation.
 * 
 *    2.1. Constraints:
 *    > Constraints are rules that define valid values for columns.
 *    > Example: 
 *      a. Primary Key(PK):
 *         - Ensures unique identification of each row
 *         - Ex: UserID in Users table
 *      b. Foreign Key(FK):
 *         - Links tables and enforces relationships
 *         - Ex: CustomerID in Orders table references Customers
 *      c. Not Null:
 *         - Prevents empty(NULL) values
 *         - Ex: Email must not be NULL
 *      d. Unique:
 *         - Prevents duplicate values
 *         - Ex: Each username must be unique
 *      e. Check:
 *         - Restricts values based on a condition
 *         - Ex: Age must be >= 18.
 * 
 *    > Example: Applying Constraints in SQL
 *      CREATE TABLE Users (
 *        UserID INT PRIMARY KEY,
 *        Email VARCHAR(100) NOT NULL,
 *        Username VARCHAR(100) UNIQUE,
 *        Age INT CHECK (Age >= 18)
 *      );                    |
 *                            V
 *       This ensures users have a name, unique email, and are at least 
 *       18 years old.
 * 
 * 
 *    2.2. Enforcing Business Rules with Triggers:
 *    > Triggers automate rule enforcement when data is inserted or updated.
 *    > Example: Prevent Nagative Account Balance
 *      CREATE TRIGGER prevent_nagative_balance
 *         BEFORE UPDATE ON Accounts
 *            FOR EACH ROW
 *          WHEN (NEW.Balance < 0)
 *                  BEGIN
 *                    RAISE ABORT 'Balance cannot be negative!';
 *                  END;
 * 
 *    > This ensures that no account can have a negative balance.
 * 
 * 
 *    2.3. Referential Integrity (Maintaining Data Consistency):
 *    > Foreign keys enforce relationships and prevent orphaned data.
 *    > Example: Preventing Orders Without a Customer
 *      CREATE TABLE Orders (
 *        OrderID INT PRIMARY KEY,
 *        CustomerID INT,
 *        Amount DECIMAL(10,2),
 *        FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
 *      );
 * 
 *    > A new order cannot be placed unless a valid CustomerID exists.
 *    > If a customer is deleted, all their orders are automatically 
 *      deleted.
 *    > This ensures data consistency.
 * 
 * 
 *    2.4. Organize Data Logically:
 *    > Organizing data logically ensures efficient storage, easy 
 *      retrieval, and scalability.
 *    > A well-structured database minimizes redundancy, improves 
 *      performance, and makes data easier to manage.
 *      - Normalization reduces redundancy and improves consistency.
 *      - Indexing speeds up searches and enhances performance.
 *      - Data Warehouses help analyze large-scale historical data.
*/ 


/**
 * Fundamental Concepts:
 * 1. Relations (Tables):
 *    - A realtion represents a table in a database. 
 *    - It consists of rows and columns where wach row is record (tuple),
 *      and each column is an attribute.
 * 
 * 2. Tuple (Record):
 *    - A single row in a table that represents one entity instance.
 *    - Ex: A row in a users table containing id, name and email.
 * 
 * 3. Attribute (Column):
 *    - A column represents a specific property of an entity.
 *    - Ex: In a users table, name and email are attributes.
 * 
 * 4. Keys (Identifiers for Uniqueness & Relationships):
 *    > Primary Key(PK): 
 *      - Uniquely identifies each row. 
 *      - Ex: id in users.
 *    > Foreign Key (FK): 
 *      - Establishes a relationship between two tables. 
 *      - Ex: user_id in orders references id in users.
*/

/**
 * Types of Relationships:
 * 1. One-to-One (1:1):
 *    - Each row in Table A relates to only one row in Table B.
 *    - Example: A user can have only one profile and vice versa.
 *      CREATE TABLE users {
 *         id INT PRIMARY KEY,
 *         name VARCHAR(255)
 *      };
 * 
 *      CREATE TABLE profiles {
 *         id INT PRIMARY KEY,
 *         user_id INT UNIQUE,
 *         bio TEXT,
 *         FOREIGN KEY (user_id) REFERENCES users(id)
 *      };
 * 
 * 
 * 2. One-to-Many (1:M):
 *    - Each row in Table A relates to multiple rows in Table B.
 *    - Example: A customer can place multiple orders.
 *      CREATE TABLE customers {
 *         id INT PRIMARY KEY,
 *         name VARCHAR(255)
 *      };
 * 
 *      CREATE TABLE orders {
 *         id INT PRIMARY KEY,
 *         customer_id INT,
 *         amount DECIMAL(10,2),
 *         FOREIGN KEY (customer_id) REFERENCES customers(id)
 *      };
 * 
 * 
 * 3. Many-to-Many (M:N):
 *    - Multiple rows in Table A relate to multiple rows in Table B.
 *    - Example: A student can enroll in multiple courses, and a course 
 *      can have multiple students. Implemented via a junction table.
 * 
 *      CREATE TABLE students {
 *         id INT PRIMARY KEY,
 *         name VARCHAR(255)
 *      };
 * 
 *      CREATE TABLE courses {
 *         id INT PRIMARY KEY,
 *         name VARCHAR(255)
 *      };
 * 
 *      CREATE TABLE student_courses {
 *         student_id INT,
 *         course_id INT,
 *         PRIMARY KEY (student_id, course_id),
 *         FOREIGN KEY (student_id) REFERENCES students(id),
 *         FOREIGN KEY (course_id) REFERENCES courses(id)
 *      };
*/


/**
 * Normalization forms (NF) in Databases:
 * > Normalization means: "Organize data in such a way that duplication
 *   is minimized, while preserving the relationships"
 * > In simple words:
 *   - Don't store the same information again and again.
 *   - Break big tables into smaller logical tables.
 * 
 * There are different Normalization Forms (NFs), each ensuring a high
 * level of data consistency.
 * 1. First Normal Form (1NF)
 *    > Goal: Atomic values (No multiple values in one cell)
 *    > A table is in 1NF if:
 *      - Each column contains atomic (single) values
 *      - Each row is unique (Primary Key exists)
 *      - No repeating groups or arrays
 * 
 *    > Problem Example: Non-1NF (Repeating Groups)
 *        +---------+----------+----------------+-------+
 *        | OrderID | Customer | Product(s)     | Price |
 *        +---------+----------+----------------+-------+
 *        | 1       | Alice    | Laptop, Mouse  | 1000  |
 *        | 2       | Bob      | Phone, Earbuds | 1200  |
 *        +---------+----------+----------------+-------+
 * 
 *      Problem: "Product(s)" contains multiple values (not atomic).
 * 
 *      Solution: Converted to 1NF (Atomic Values in Rows):
 *      +---------+----------+---------+-------+
 *      | OrderID | Customer | Product | Price |
 *      +---------+----------+---------+-------+
 *      | 1       | Alice    | Laptop  | 1000  |
 *      | 1       | Alice    | Mouse   | 50    |
 *      | 2       | Bob      | Phone   | 800   |
 *      | 2       | Bob      | Earbuds | 100   |
 *      +---------+----------+---------+-------+
 * 
 *      > Now each cell contains only ONE value.
 *      > Rule: One cell → One value
 * 
 * 2. Second Normal Form (2NF) 
 *    > Goal: Removing Partial Dependencies
 *    > A table is in 2NF if:
 *      - It is already in 1NF.
 *      - All non-key columns are fully dependent on the primary key.
 * 
 *    What are Partial Dependency?
 *    > If a table has a composite key (Ex: OrderID + Product)
 *      and some columns depend only on part of that key, that is
 *      called Partial Dependency.
 * 
 *    > Problem Example: Non-2NF (Partial Dependency)
 *      +---------+---------+----------+---------+
 *      | OrderID | Product | Customer | Address |
 *      +---------+---------+----------+---------+
 *      | 1       | Laptop  | Alice    | NYC     |
 *      | 2       | Phone   | Bob      | LA      |
 *      +---------+---------+----------+---------+
 * 
 *      Suppose Primary Key = (OrderID + Product)
 *      Problem : CustomerName & Address depend only on OrderID, not on Product.
 *      
 *    > Solution: Converted to 2NF (Separate Related Data into Tables):
 * 
 *      [Customers Table]
 *      +------------+----------+---------+
 *      | CustomerID | Customer | Address |
 *      +------------+----------+---------+
 *      | 1          | Alice    | NYC     |
 *      | 2          | Bob      | LA      |
 *      +------------+----------+---------+
 * 
 *      [Orders Table]
 *      +---------+------------+
 *      | OrderID | CustomerID |
 *      +---------+------------+
 *      | 1       | 1          |
 *      | 2       | 2          |
 *      +---------+------------+
 *
 *      [OrderDetails Table]
 *      +---------+---------+
 *      | OrderID | Product |
 *      +---------+---------+
 *      | 1       | Laptop  |
 *      | 1       | Mouse   |
 *      | 2       | Phone   |
 *      | 2       | Earbuds |
 *      +---------+---------+
 * 
 *   > Now each table has data that fully depends on its primary key.
 *   > Rule: Every column must depend on the WHOLE primary key.
 * 
 * 3. Third Normal Form (3NF)
 *    > Goal: Removing Transitive Dependencies
 *    > A table is in 3NF if:
 *      - It is already in 2NF.
 *      - No column should depend on another non-key column
 * 
 *    What is Transitive Dependency?
 *    > If: A > B, B > C, then:
 *      - C id indirectly depends on A.
 *      - That is transitive dependency.
 * 
 *    > Problem Example: Non-3NF (Transitive Dependency)
 *      +----------------------+--------+-------------+-----------------+
 *      | StudentId | Name     | Course | Instructor  | InstructorPhone |
 *      +----------------------+--------+-------------+-----------------+
 *      | 1         | Alice    | Math   | Prof. Smith | 123-456-7890    |
 *      | 2         | Bob      | Science| Prof. Lee   | 987-654-3210    |
 *      +----------------------+--------+-------------+-----------------+
 * 
 *    > Problem: InstructorPhone depends on Instructor, not directly on
 *      StudentId.
 * 
 *    > Solution: Converted to 3NF (Separate Related Data into Tables):
 *    
 *    [Students Table]
 *    +------------+-------------+
 *    | StudentID  | StudentName |
 *    +------------+-------------+
 *    | 1          | Alice       |
 *    | 2          | Bob         |
 *    +------------+-------------+
 * 
 *    [Course Table]
 *    +------------+-------------+-------------+
 *    | CourseID   | CourseName  | InstructorID|
 *    +------------+-------------+-------------+
 *    | 101        | Math        | 1           |
 *    | 102        | Science     | 2           |
 *    +------------+-------------+-------------+
 * 
 *    [Instructors Table]
 *    +--------------+-----------------+-------------+
 *    | InstructorID | InstructorName  | Phone       |
 *    +--------------+-----------------+-------------+
 *    | 1            | Prof. Smith     | 123-456-7890|
 *    | 2            | Prof. Lee       | 987-654-3210|
 *    +--------------+-----------------+-------------+
 * 
 *    > Now every column depends only on its own primary key.
 *    > Rule: Only depend on PRIMARY KEY
 * 
 * Remember:
 * 1. 1NF: Remove multiple values in one cell
 * 2. 2NF: Remove data that depends on part of key
 * 3. 3NF: Remove data that depends on other non-key columns
 * 
 * Normalization = Clean Database = Less Bugs + Better Performance
 */
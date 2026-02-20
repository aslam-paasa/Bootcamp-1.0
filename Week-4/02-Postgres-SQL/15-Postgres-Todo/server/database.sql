-- 1. Create a database
CREATE DATABASE perntodo;

-- 2. Create a table
CREATE TABLE todo(
  todo_id SERIAL PRIMARY KEY,
  description VARCHAR(255)
);
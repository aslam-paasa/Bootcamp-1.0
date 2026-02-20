/**
 * Installation on Windows:
 * 1. Download and Install
 *    a. Visit PostgreSQL Official Download Page
 *    b. Download the installer (recommended: latest stable version)
 *    c. Run the installer and follow these steps: 
 *       - Choose installation directory (default: C:\Program Files\PostgreSQL\16)
 *       - Select components: PostgreSQL Server, pgAdmin 4, Command Line Tools
 *       - Set data directory (default: C:\Program Files\PostgreSQL\16\data)
 *       - Set superuser password (remember this!)
 *       - Set port (default: 5432)
 *       - Set locale (default is fine)
 * 
 * 2. Verify Installation:
 *    - Open Command Prompt or PowerShell: psql --version
 *    - Should output: psql (PostgreSQL) 16.x
 * 
 * 3. Finish Time Setup:
 *    - Connect to PostgreSQL as superuser: psql -U postgres
 *    - You'll be prompted for the password you set during installation
*/

/**
 * Basic PLSQL Commands: Meta Commands (start with backslash)
 * \l                    -- List all databases
 * \l+                   -- List databases with additional info
 * \c database_name      -- Connect to a database
 * \dt                   -- List all tables in current database
 * \dt+                  -- List tables with additional info
 * \d table_name         -- Describe table structure
 * \du                   -- List all users/roles
 * \dn                   -- List all schemas
 * \df                   -- List all functions
 * \dv                   -- List all views
 * \q                    -- Quit psql
 * \?                    -- Help on meta-commands
 * \h                    -- Help on SQL commands
 * \h CREATE TABLE       -- Help on specific SQL command
 * 
 * -- Windows-specific commands
 * \! cls                -- Clear screen (Windows)
 * \! dir                -- Run Windows dir command
*/
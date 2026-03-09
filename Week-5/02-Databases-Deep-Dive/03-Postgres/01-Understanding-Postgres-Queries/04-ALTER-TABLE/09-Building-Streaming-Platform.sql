-- Start with basic table
CREATE TABLE streaming_users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50)
);

-- Expand the structure
ALTER TABLE streaming_users
ADD COLUMN email VARCHAR(100),
ADD COLUMN signup_date DATE DEFAULT CURRENT_DATE,
ADD COLUMN subscription_type VARCHAR(20) DEFAULT 'free';

-- Make email required
ALTER TABLE streaming_users
ALTER COLUMN email SET NOT NULL;

-- Add payment information
ALTER TABLE streaming_users
ADD COLUMN payment_method VARCHAR(50),
ADD COLUMN last_payment_date DATE;

-- Rename for clarity
ALTER TABLE streaming_users
RENAME COLUMN subscription_type TO plan_type;

-- Drop unnecessary column
ALTER TABLE streaming_users
DROP COLUMN payment_method;

-- Change data type for optimization
ALTER TABLE streaming_users
ALTER COLUMN username TYPE VARCHAR(30);
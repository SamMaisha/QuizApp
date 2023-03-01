-- Drop and recreate Quizzes table

DROP TABLE IF EXISTS quizzes CASCADE;

CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES users(id) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  link VARCHAR(255) NOT NULL,
  is_public BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true,
  total_attempts INT DEFAULT 0,
  thumbnail_photo_url VARCHAR(255),
  cover_photo_url VARCHAR(255)
);

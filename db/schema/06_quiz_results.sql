-- Drop and recreate quiz_results table (Example)

DROP TABLE IF EXISTS quiz_results CASCADE;

CREATE TABLE quiz_results (
  id SERIAL PRIMARY KEY NOT NULL,
  quiz_id INTEGER REFERENCES quizzes(id),
  user_id INTEGER REFERENCES users(id),
  score INT DEFAULT 0,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  link VARCHAR(255) NOT NULL
);

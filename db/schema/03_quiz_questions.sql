-- Drop and recreate quiz_questions table (Example)

DROP TABLE IF EXISTS quiz_questions CASCADE;

CREATE TABLE quiz_questions (
  question_id SERIAL PRIMARY KEY NOT NULL,
  quiz_id INTEGER REFERENCES quizzes(id),
  question TEXT NOT NULL,
  photo_url VARCHAR(255)
);

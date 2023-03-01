-- Drop and recreate quiz_answers table (Example)

DROP TABLE IF EXISTS quiz_answers CASCADE;

CREATE TABLE quiz_answers (
  id SERIAL PRIMARY KEY NOT NULL,
  quiz_id INTEGER REFERENCES quizzes(id),
  question_id INTEGER REFERENCES quiz_questions(id),
  is_correct BOOLEAN DEFAULT false
);

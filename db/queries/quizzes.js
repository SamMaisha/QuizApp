const { compile } = require('ejs');
const db = require('../connection');

// get all public quizzes from quizzes table (HOMEPAGE)
const getQuizzes = () => {
  return db.query('SELECT quizzes.*, users.name, type as category FROM quizzes JOIN users ON owner_id = users.id')
    .then(data => {
      const allQuizzes = data.rows;
      console.log(allQuizzes);
      return allQuizzes;
    });
};

// get individual quiz from quizzes table when user clicks on a quiz - show quiz questions and options (VIEW QUIZ)
const getSelectedQuiz = function(quiz_id) {
  const queryParams = [quiz_id];
  const parameterizedQuery = 'SELECT title, description, quiz_questions.id as question_id, quiz_questions.quiz_id as quiz_id, quiz_questions.question, quiz_questions.photo_url, quizzes.type, users.name as owner_name FROM quiz_questions JOIN quizzes ON quiz_id = quizzes.id JOIN users ON owner_id = users.id WHERE quiz_id = $1';
  return db.query(parameterizedQuery, queryParams)
    .then(data => {
      const selectedQuiz = data.rows;
      console.log(selectedQuiz)
      return selectedQuiz;
    });
};

//create new query for answers to questions (pass through question_id, quiz_id,) -- Answer check may have to be different (not boolean based)
const getAnswersForSelectedQuiz = function(quiz_id, question_id) {
  const queryParams = [quiz_id, question_id];
  const parameterizedQuery = `SELECT quiz_answers.* FROM quiz_answers WHERE quiz_id = $1 AND question_id = $2`;
  return db.query(parameterizedQuery, queryParams)
    .then(data => {
      const optionsArray = [];
      const selectedAnswers = data.rows;
      console.log(selectedAnswers);
      return selectedAnswers;
    })
}

// insert results to quiz_results table after user has taken quiz (VIEW QUIZ)
const addQuizResult = function(quizResultData) {
  const queryParams = [quizResultData.id, quizResultData.quiz_id, quizResultData.user_id, quizResultData.score, quizResultData.completed_at, quizResultData.link];
  const parameterizedQuery = 'INSERT INTO quiz_results VALUES ($1, $2, $3, $4, $5, $6)';
  return db.query(parameterizedQuery, queryParams);
}

// insert new quiz to relevant tables when a user creates a quiz (CREATE QUIZ)
const addNewQuiz = function(newQuizData) {
  const queryParams = [newQuizData.id, newQuizData.owner_id, newQuizData.title, newQuizData.description, newQuizData.link, newQuizData.is_public, newQuizData.is_active, newQuizData.total_attempts, newQuizData.thumbnail_photo_url, newQuizData.cover_photo_url];
  const parameterizedQuery = 'INSERT INTO quizzes VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
  return db.query(parameterizedQuery, queryParams); //tested with fake object
}


module.exports = { getQuizzes, getSelectedQuiz, addQuizResult, addNewQuiz };

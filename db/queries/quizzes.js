const { compile } = require('ejs');
const db = require('../connection');

// get all public quizzes from quizzes table (HOMEPAGE)
const getQuizzes = () => {
  return db.query('SELECT quizzes.*, users.name, type as category FROM quizzes JOIN users ON owner_id = users.id')
    .then(data => {
      const allQuizzes = data.rows;
      return allQuizzes;
    });
};

// get individual quiz from quizzes table when user clicks on a quiz - show quiz questions and options (VIEW QUIZ)
const getSelectedQuiz = function(quizId) {
  const queryParams = [quizId];
  const parameterizedQuery = 'SELECT title, description, quiz_questions.id as question_id, quiz_questions.quiz_id as quiz_id, quiz_questions.question, quiz_questions.photo_url, quizzes.type, users.name as owner_name FROM quiz_questions JOIN quizzes ON quiz_id = quizzes.id JOIN users ON owner_id = users.id WHERE quiz_id = $1';
  return db.query(parameterizedQuery, queryParams)
    .then(data => {
      const selectedQuiz = data.rows;
      return selectedQuiz;
    });
};

//create new query for answers to questions (pass through quizId,) -- Answer check may have to be different (not boolean based)
const getAnswersForSelectedQuiz = function(quizId) {
  const queryParams = [quizId];
  const parameterizedQuery = `SELECT quiz_answers.* FROM quiz_answers WHERE quiz_id = $1`;
  return db.query(parameterizedQuery, queryParams)
    .then(data => {
      const selectedAnswers = data.rows;
      return selectedAnswers;
    })
}

// get correct answers for a quizId
const getCorrectAnswerForQuiz = function(quizId) {
  const queryParams = [quizId];
  const parameterizedQuery = `
  SELECT quiz_answers.* FROM quiz_answers
  WHERE quiz_id = $1
  AND is_correct IS TRUE
  `
  return db.query(parameterizedQuery, queryParams)
  .then(data => {
    return data.rows;
  })
}

// insert results to quiz_results table after user has taken quiz (VIEW QUIZ)
const addQuizResult = function(quizId, userId, quizScore, resultLink) {
  const queryParams = [quizId, userId, quizScore, resultLink]
  const parameterizedQuery = `
  INSERT INTO quiz_results (quiz_id, user_id, score, link)
  VALUES ($1, $2, $3, $4)
  RETURNING *
  `;
  return db.query(parameterizedQuery, queryParams)
  .then(data => {
    return data.rows;
  })
}

// insert new quiz to relevant tables when a user creates a quiz (CREATE QUIZ)
const addNewQuiz = function(newQuizData) {
  const queryParams = [newQuizData.id, newQuizData.owner_id, newQuizData.title, newQuizData.description, newQuizData.link, newQuizData.is_public, newQuizData.is_active, newQuizData.total_attempts, newQuizData.thumbnail_photo_url, newQuizData.cover_photo_url];
  const parameterizedQuery = 'INSERT INTO quizzes VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
  return db.query(parameterizedQuery, queryParams); //tested with fake object
}


module.exports = { getQuizzes, getSelectedQuiz, getAnswersForSelectedQuiz , getCorrectAnswerForQuiz,addQuizResult, addNewQuiz };

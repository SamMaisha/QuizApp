const { compile } = require('ejs');
const db = require('../connection');

// get all public quizzes from quizzes table (HOMEPAGE)
const getQuizzes = () => {
  return db.query('SELECT * FROM quizzes;')
    .then(data => {
      const allQuizzes = data.rows;
      return allQuizzes;
    });
};

// get individual quiz from quizzes table when user clicks on a quiz - show quiz questions and options (VIEW QUIZ)
const getSelectedQuiz = function(quiz_id) {
  return db.query('SELECT quizzes.id, title, description, quiz_questions.* FROM quiz_questions JOIN quizzes ON quiz_id = quizzes.id')
  .then(data => {
    const quizData = data.rows;
    return quizData; //will make this function parameterized
  })
}

// insert results to quiz_results table after user has taken quiz (VIEW QUIZ)

const addQuizResult = function(quizResultData) {
  const queryParams = [quizResultData.id, quizResultData.quiz_id, quizResultData.user_id, quizResultData.score, quizResultData.completed_at, quizResultData.link];
  const parameterizedQuery = 'INSERT INTO quiz_results VALUES ($1, $2, $3, $4, $5, $6)';
  return db.query(parameterizedQuery, queryParams);
}

// insert new quiz to relevant tables when a user creates a quiz (CREATE QUIZ)
const addNewQuiz = function() {
}

// module.exports = { getQuizzes };

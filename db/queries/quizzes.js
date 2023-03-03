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
    return quizData;
  })
}

// insert results to quiz_results table after user has taken quiz (VIEW QUIZ)
const addQuizResult = function() {
}

// insert new quiz to relevant tables when a user creates a quiz (CREATE QUIZ)
const addNewQuiz = function() {
}

getSelectedQuiz();

// module.exports = { getQuizzes };

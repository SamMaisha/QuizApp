const db = require('../connection');

// get all public quizzes from quizzes table (HOMEPAGE)
const getQuizzes = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

// get individual quiz from quizzes table when user clicks on a quiz - show quiz questions and options (VIEW QUIZ)
const getSelectedQuiz = function() {
}

// insert results to quiz_results table after user has taken quiz (VIEW QUIZ)
const addQuizResult = function() {
}

// insert new quiz to relevant tables when a user creates a quiz (CREATE QUIZ)
const addNewQuiz = function() {
}



module.exports = { getQuizzes };

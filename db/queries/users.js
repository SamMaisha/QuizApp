const { param } = require('express/lib/request');
const db = require('../connection');

// get quiz results for user from quiz_results table (QUIZ RESULT)
getQuizResultsForUser = function(user) {
    const queryParams = [user.id];
    const parameterizedQuery = 'SELECT quiz_results.*, quizzes.title FROM quiz_results JOIN quizzes ON quiz_id = quizzes.id WHERE user_id = $1'
    return db.query(parameterizedQuery,queryParams)
      .then(data => {
        const quizResults = data.rows;
        console.log(quizResults);
        return quizResults;
      });
};

// get quizzes that were created by a user (MY QUIZZES)
getQuizzesCreatedByUser = function(user) {
    const queryParams = [user.id];
    const parameterizedQuery = 'SELECT * FROM quizzes WHERE owner_id = $1'
    return db.query(parameterizedQuery,queryParams)
      .then(data => {
        const userCreatedQuiz = data.rows;
        console.log(userCreatedQuiz);
        return userCreatedQuiz;
      });
}

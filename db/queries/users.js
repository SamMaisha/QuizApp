const { param } = require('express/lib/request');
const db = require('../connection');

// get quiz results for user from quiz_results table (QUIZ RESULT)
const getQuizResultsForUser = function(userId) {
    const queryParams = [userId];
    const parameterizedQuery = 'SELECT quiz_results.*, quizzes.title as quiz_title FROM quiz_results JOIN quizzes ON quiz_id = quizzes.id WHERE user_id = $1'
    return db.query(parameterizedQuery,queryParams)
      .then(data => {
        const quizResults = data.rows;
        console.log(quizResults);
        return quizResults;
      });
};

// get quizzes that were created by a user (MY QUIZZES)
const getQuizzesCreatedByUser = function(user) {
    const queryParams = [user.id];
    const parameterizedQuery = 'SELECT * FROM quizzes WHERE owner_id = $1'
    return db.query(parameterizedQuery,queryParams)
      .then(data => {
        const userCreatedQuiz = data.rows;
        console.log(userCreatedQuiz);
        return userCreatedQuiz;
      });
}

module.exports = { getQuizResultsForUser, getQuizzesCreatedByUser };

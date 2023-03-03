const { param } = require('express/lib/request');
const db = require('../connection');

// get quiz results for user from quiz_results table (QUIZ RESULT)
getQuizResultsForUser = function(user) {
    const queryParams = [user.id];
    const parameterizedQuery = 'SELECT * FROM quiz_results WHERE user_id = $1'
    return db.query(parameterizedQuery,queryParams);
}

// get quizzes that were created by a user (MY QUIZZES)
getQuizzesCreatedByUser = function(user) {
    const queryParams = [user.id];
    const parameterizedQuery = 'SELECT * FROM quizzes WHERE owner_id = $1'
    return db.query(parameterizedQuery,queryParams);
}


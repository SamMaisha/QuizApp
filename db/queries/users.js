const { param } = require('express/lib/request');
const db = require('../connection');

//get user credentials by ID
const getUserById = function (userID) {
  const queryParams = [userID];
  const parameterizedQuery = `
  SELECT users.email, users.password, users.id FROM users WHERE users.id = $1 
  `
  return db.query(parameterizedQuery, queryParams)
    .then(data => {
      const userCreds = data.rows[0];
      return userCreds;
    })
};

//get user credentials by email
const getUserIdByEmail = function(email) {
  const queryParams = [email];
  const parameterizedQuery = `
  SELECT users.id FROM users WHERE users.email = $1
  `
  return db.query(parameterizedQuery, queryParams)
    .then(data => {
      const userId = data.rows[0];
      return userId;
    })
};

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
const getQuizzesCreatedByUser = function(userId) {
    const queryParams = [userId];
    const parameterizedQuery = 'SELECT * FROM quizzes WHERE owner_id = $1'
    return db.query(parameterizedQuery,queryParams)
      .then(data => {
        const userCreatedQuiz = data.rows;
        console.log(userCreatedQuiz);
        return userCreatedQuiz;
      });
}

const addUser = function(userCredentials) { //tested with fake object, inserts
  const queryParams = [userCredentials.name, userCredentials.email, userCredentials.password];
  const parameterizedQuery = `
  INSERT INTO users (name, email, password) VALUES ($1, $2, $3)
  RETURNING *`
  
  console.log('worked');
  return db.query(parameterizedQuery, queryParams);
}

const getAllEmails = function() {
  return db.query(`SELECT email FROM users`)
    .then(data => {
      const allEmails = data.rows;
      return allEmails;
    })
}

module.exports = { getQuizResultsForUser, getQuizzesCreatedByUser, getUserById, getAllEmails, addUser, getUserIdByEmail };
